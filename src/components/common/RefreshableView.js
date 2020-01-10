import React, { Component } from 'react'
import { Animated, Image, Platform, Text, StyleSheet, View, RefreshControl, ScrollView, TextStyle } from 'react-native'
import { images as Resource } from '@resource'
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import MultipleButton from './MultipleButton'
import ErrorComponent from './ErrorComponent'
import i18n from '@utils/i18n'
import { isEmpty } from '@utils/Utils';

export interface RefreshProps {
	refreshing: true | false;
	onRefresh: () => Promise;
	onRefreshEnd: (res) => Promise;
	onScrollBeginDrag: () => any;
	useEmptyView: boolean;
	emptyButton: () => any;
	emptyHint: string;
	emptyIcon: number; //id of icon at asset
	emptyHeight: string;
	hintStyle: TextStyle;
	renderEmpty: () => any;
}

var EMPTY_W = Dimens.width, EMPTY_H = Dimens.height
const CONTENT_H = 44 + 26 + 70

const UNIT = Platform.OS === 'ios' ? 2 : 1
const DISMISS_DELAY = 300 * UNIT, REFRESH_DELAY = 66 * UNIT

export default class RefreshableView extends Component<RefreshProps> {

	static defaultProps = {
		useEmptyView: true,
		emptyIcon: Resource.icon.noResult(),
		emptyButton: () => null,
		emptyHeight: CONTENT_H, // this is base on icon and text height in "Styles"
	}

	constructor(props) {
		super(props)
		this.state = { refreshing: false, error: false }
		this.timers = []
	}

	componentDidMount() {
		this.props.refreshing && this.timers.push(setTimeout(() => {
			this._onRefresh()
		}, REFRESH_DELAY))
	}

	componentWillUnmount() {
		while (this.timers.length > 0) {
			clearTimeout(this.timers.pop())
		}
	}

	_onRefresh = () => {
		if (this.props.onRefresh) {
			// note: All the setTimeout is to fixed iOS
			// fix onPress not work the first time after refreshed
			this.lastRequestTime = Date.now()
			this.setState({ refreshing: true })
			const pro = this.props.onRefresh()
			if (pro && typeof pro.then === 'function') {
				pro.then((res) => {
					this._onRefreshEnd(res)
				}).catch((er) => {
					this._onRefreshEnd(er)
				})
			}
		}
	}

	_onRefreshEnd = (res) => {
		// delay for refrshing icon to show up at least make user see it.
		const nowt = Date.now()
		if (nowt - this.lastRequestTime >= DISMISS_DELAY) {
			this.setState({ refreshing: false, error: res == null })
			this.props.onRefreshEnd && this.props.onRefreshEnd(res)
		} else {
			this.timers.push(setTimeout(() => {
				this.setState({ refreshing: false, error: res == null })
				this.props.onRefreshEnd && this.props.onRefreshEnd(res)
			}, DISMISS_DELAY + this.lastRequestTime - nowt))
		}
	}

	_renderEmpty = () => {
		const { emptyStyle, emptyHeight, emptyIcon, emptyButton } = this.props
		let emptyHint = this.props.emptyHint ;
		if(isEmpty(emptyHint)){
			emptyHint = i18n.t('mobile.common.text.noresult');
		}

		const fadeAnim = new Animated.Value(0)
		const transAnim = new Animated.Value(emptyHeight / 2)

		const _animStyle = { width: EMPTY_W, height: EMPTY_H, opacity: fadeAnim, transform: [{ translateY: transAnim }] }

		Animated.timing(fadeAnim, { toValue: 1, duration: 800 }).start()
		Animated.timing(transAnim, { toValue: -emptyHeight / 2, duration: 400 }).start()

		return (
			<Animated.View style={[Styles.emptyContainer, _animStyle]}>
				<ErrorComponent
					style={[Styles.emptyBox, emptyStyle]}
					title={this.state.error ? undefined : emptyHint}
					iconStyle={{ height: 48, width: 48 }}
					icon={this.state.error ? undefined : emptyIcon}
				/>
				{typeof emptyButton == 'function' ? emptyButton() : (
					<MultipleButton
						style={Styles.button}
						borderRadius={24}
						titles={[i18n.t('refresh')]}
						onPress={this._onRefresh}
					/>
				)}
			</Animated.View>
		)
	}

	renderChildren = (isRefreshing) => {
		const { children } = this.props
		if (Array.isArray(children) && children.length > 0) {
			let hasChild = children.find((el) => {
				return React.isValidElement(el)
			})
			if (hasChild) return children
		} else if (React.isValidElement(children)) {
			return children
		} else if (isRefreshing) {
			return null
		}

		// children is empty
		const { useEmptyView, renderEmpty } = this.props
		if (renderEmpty) {
			return renderEmpty()
		} else if (useEmptyView) {
			return this._renderEmpty()
		} else {
			return null
		}
	}

	render() {
		return <ScrollView
			style={this.props.style}
			showsVerticalScrollIndicator={false}
			onLayout={({ nativeEvent }) => {
				EMPTY_H = nativeEvent.layout.height
				EMPTY_W = nativeEvent.layout.width
			}}
			onScrollBeginDrag={this.props.onScrollBeginDrag}
			refreshControl={
				<RefreshControl
					colors={[Colors.baseColor]}
					tintColor={Colors.baseColor}
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh}
				/>
			}>

			{this.renderChildren(this.state.refreshing)}

		</ScrollView>
	}
}

const Styles = StyleSheet.create({
	emptyContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	emptyBox: {
		flex: null
	},
	button: {
		width: 160,
		height: 38,
		margin: 16
	}
})
