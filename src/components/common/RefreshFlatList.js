'use strict';

import React, { Component } from 'react'
import { ActivityIndicator, Platform, ViewStyle } from 'react-native'
import { observer } from 'mobx-react'
import { observable, action, toJS, isObservableArray } from 'mobx'
import i18n from '@utils/i18n'
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import { images as Resource } from '@resource'
import ErrorComponent from './ErrorComponent'
import CommonFlatList, { CommonFlatListProps } from './CommonFlatList'
import { ObsUuKeyArray } from '@utils/UniqueKeyArray'

const UNIT = Platform.OS === 'ios' ? 2 : 1
export const DISMISS_DELAY = 500 * UNIT, RENDER_UNIT = 17

class RefreshListObs extends ObsUuKeyArray {

	@observable refreshing = false
	@observable isLoadMore = false
	@observable isError = false

	constructor(key) {
		super({ 'key': key })
		this.refreshing = false
		this.isLoadMore = false
		this.isError = false
	}

	setStatus = action(({ refreshing, isLoadMore, isError, data, pos }) => {
		if (refreshing != undefined) this.refreshing = refreshing
		if (isLoadMore != undefined) this.isLoadMore = isLoadMore
		if (isError != undefined) this.isError = isError
		if (data != undefined) {
			if (refreshing != undefined) {
				this.replace(data)
			} else {
				this.concat(data, pos)
			}
		}
	})
}

interface RefreshListProps extends CommonFlatListProps {
	emptyStyle?: ViewStyle;
	renderItem: (item: Object, index: Number, list: Array) => {}
}

class RefreshFlatList extends Component<RefreshListProps> {

	static defaultProps = {
		dataKey: 'id', //Filter key
		stickyError: true,
		stickyFooter: true,
		refreshing: false,
		loadMoreMode: 'always',
		emptyIcon: Resource.icon.noResult(),
		emptyHint: i18n.t('mobile.common.text.noresult'),
		emptyStyle: { marginTop: Dimens.height * 0.2 },
		// onUpdateList is a callback function
		// @param data: Array | undefined, when there is no data at all:
		//		1. and if 'data' is undefined, show error view,
		//		2. or if 'data' is empty array, show empty view.
		// @param pos: InsertPosition, if empty, will push new data to the tail
		onRequest: (curLength, onUpdateList: (data, pos) => void) => { },
		// call when the this view have updated data.
		onUpdateEnd: (obs: RefreshListObs, newo: RefreshListObs) => { },
		onItemPress: () => { }
	}

	constructor(props) {
		super(props)
		this.timers = []
		//filte the source array with this dataKey
		this.obs = new RefreshListObs(props.dataKey)
		if (Array.isArray(props.data) || isObservableArray(props.data)) {
			this.obs.replace(props.data)
		}
	}

	componentDidMount() {
		if (this.props.refreshing) {
			this.timers.push(setTimeout(() => {
				this.onRefresh()
			}, UNIT * 50))
		}
	}

	componentWillUnmount() {
		while (this.timers.length > 0) {
			clearTimeout(this.timers.pop())
		}
	}

	scrollToEnd = () => {
		this.listView && this.listView.scrollToEnd()
	}

	updateList = (data, insertPosition) => {
		const { length, refreshing, isLoadMore } = this.obs
		const _status = {
			data: Array.isArray(data) ? data : undefined,
			isError: !Array.isArray(data) ? true : undefined,
			isLoadMore: isLoadMore ? false : undefined,
			refreshing: refreshing ? false : undefined,
			pos: insertPosition
		}

		// delay for refrshing icon to show up at least make user see it .
		const nowt = Date.now()
		if (nowt - this.lastRequestTime >= DISMISS_DELAY) {
			this.obs.setStatus(_status)
			this.props.onUpdateEnd(this.obs, _status)
		} else this.timers.push(setTimeout(() => { // delay
			this.obs.setStatus(_status)
			this.props.onUpdateEnd(this.obs, _status)
		}, DISMISS_DELAY + this.lastRequestTime - nowt))
	}

	getList = () => {
		return this.obs.list;
	}

	replace = (arrData) => {
		this.obs.replace(arrData);
	}

	replaceAt = (index, number, item) => {
		return this.obs.replaceAt(index, number, item)
	}

	remove = (start, number) => {
		return this.obs.remove(start, number)
	}

	/* Watch Out !! */
	getSize = () => {
		// if you use this function in a callback function after refresh
		// please setTimeout more than '1100'
		// This delay is because RefreshFlatList have delay updateList
		return this.obs.length
	}

	onRefresh = () => {
		this.lastRequestTime = Date.now() // fixed unable refresh issue.
		this.obs.setStatus({ refreshing: true, data: [] })
		this.props.onRequest(0, this.updateList)
	}

	onEndReached = (info, shouldLoadMore, autoScrollToEnd) => {
		this.timers.push(setTimeout(() => {
			//fix 滚动时两次调用onEndReached
			if (this.canLoadMore) {
				this.canLoadMore = false;

				const { length, isLoadMore } = this.obs
				this.lastRequestTime = Date.now() // fixed unable dismiss loading issue.
				if (shouldLoadMore === false || length === 0 || isLoadMore) {
					return null
				}
				this.obs.setStatus({ isLoadMore: true })
				this.props.onRequest(length, this.updateList)
		
				// auto show loarding for android
				autoScrollToEnd && this.timers.push(setTimeout(() => {
					this.obs.isLoadMore && this.scrollToEnd()
				}, RENDER_UNIT))
				}
			
		}, 100));
		
	}

	_renderItem = ({ item, index }) => {
		return this.props.renderItem(item, index, this.obs.list)
	}

	_ListEmptyComponent = () => {
		const { refreshing, isError, length } = this.obs
		const { ListEmptyComponent, stickyError, emptyIcon, emptyHint, emptyStyle } = this.props
		if (refreshing || !stickyError
			|| (!isError && length != 0)) {
			return null
		}

		if (ListEmptyComponent !== undefined) {
			return ListEmptyComponent;
		}

		return <ErrorComponent
			style={emptyStyle}
			title={isError ? undefined : emptyHint}
			iconStyle={{ width: 132, height: 137, }}
			icon={isError ? Resource.icon.serverError() : emptyIcon}
		/>
	}

	_ListFooterComponent = () => {
		const { refreshing, isLoadMore, isError, length } = this.obs
		const { stickyFooter } = this.props
		if (isLoadMore && !refreshing) {
			return <ActivityIndicator
				animating={true}
				style={{ margin: Dimens.space_min }}
				color={Colors.baseColor}
			/>
		} else if (length < 1 || isError || !stickyFooter) {
			return null
		}

		const { ListFooterComponent } = this.props
		if (ListFooterComponent !== undefined) {
			return ListFooterComponent
		}

		return <ErrorComponent
			style={{ flexDirection: 'row', height: 32 }}
			textStyle={{ fontSize: Dimens.font_size_normal }}
			title={i18n.t('mobile.common.noMoreData')}
			iconStyle={{ width: 0, height: 0, margin: 0 }}
			onPress={() => {
				this.obs.setStatus({ isError: false });
				this.onEndReached({}, true);
			}}
		/>
	}

	render() {
		return <CommonFlatList
			{...this.props}
			data={this.obs.list}
			extraData={this.obs.length}
			refreshing={this.obs.refreshing}
			ref={(c) => this.listView = c}
			onRefresh={this.onRefresh}
			onEndReached={this.onEndReached}
			onEndReachedThreshold={0.5}
			onMomentumScrollBegin={() => {
				this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
			}}
			renderItem={this._renderItem}
			ListEmptyComponent={this._ListEmptyComponent()}
			ListFooterComponent={this._ListFooterComponent()}
		/>
	}
}

export default observer(RefreshFlatList)
