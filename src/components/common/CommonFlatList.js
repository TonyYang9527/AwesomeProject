'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, FlatList, FlatListProps, RefreshControl, ScrollView, View } from 'react-native';
import * as Colors from '@constants/Colors';
import * as Dimens from '@constants/Dimension';

const UNIT = Platform.OS === 'ios' ? 2 : 1
const DISMISS_DELAY = 500 * UNIT, REFRESH_DELAY = 66 * UNIT

export interface CommonFlatListProps extends FlatListProps {
    loadMoreMode: 'always' | 'never';
    refreshable?: boolean;
}

export default class CommonFlatList extends Component<CommonFlatListProps>{

    static propTypes = {
        renderItem: PropTypes.func.isRequired
        // Refer to the FlatList for the rest props
    }

    static defaultProps = {
        refreshing: false,
        refreshable: true,
        keyExtractor: (item, index) => ('1000' + index),
        onEndReachedThreshold: 0.01, // don't change
        removeClippedSubviews: true,
        // ItemSeparatorComponent: () => <View style={{ height: Dimens.line, backgroundColor: Colors.line }} />
    }

    constructor(props) {
        super(props);
        this.initLoadMore = false
        this.shouldLoadMore = false
    }

    componentWillUnmount() {
        this.timer != null && clearTimeout(this.timer)
    }

    scrollToEnd = () => {
        //params?: { animated?: boolean }
        this.list.scrollToEnd();
    }

    scrollToIndex = (params) => {
        //params: { animated?: boolean; index: number; viewOffset?: number; viewPosition?: number }
        this.list.scrollToIndex(params)
    }

    scrollToOffset = (params) => {
        // { animated, offset }
        this.list.scrollToOffset(params);
    }

    scrollToItem = (params) => {
        //params: { animated?: boolean; item: ItemT; viewPosition?: number }
        this.list.scrollToItem(params)
    }

    onScrollBeginDrag = ({ nativeEvent }) => {
        const { contentOffset: co, contentSize: cs, layoutMeasurement: ls } = nativeEvent
        if (co.y > 0 && (parseInt(co.y + ls.height) >= parseInt(cs.height))) {
            this.shouldLoadMore = true
        }
        this.props.onScrollBeginDrag && this.props.onScrollBeginDrag()
    }

    onScrollEndDrag = ({ nativeEvent }) => {
        const { loadMoreMode, onScrollEndDrag } = this.props
        const { contentOffset: co, contentSize: cs, layoutMeasurement: ls, velocity } = nativeEvent
        if (loadMoreMode == 'always') {
            if (this.shouldLoadMore && Platform.OS === 'android') {
                if (velocity.y < -1.2) {
                    this._onEndReached({}, true)
                }
            } else if (this.shouldLoadMore && parseInt(co.y + ls.height) > parseInt(cs.height + 30)) {
                this._onEndReached({}, true)
            }
        }
        this.shouldLoadMore = false
        onScrollEndDrag && onScrollEndDrag()
    }

    _onEndReached = (info, load) => {
        const { loadMoreMode, onEndReached } = this.props
        if (loadMoreMode == 'always' && load === true) {
            onEndReached && onEndReached(info, true, Platform.OS === 'android')
        } else if (Platform.OS === 'android' && !this.initLoadMore &&
            loadMoreMode == 'always' && info.distanceFromEnd < -1) {

            this.initLoadMore = true
            onEndReached && onEndReached(info, true, true)
        } else {
            onEndReached && onEndReached(info, false)
        }
    }

    _renderScrollComponent = (props) => {
        let { refreshable, onRefresh, progressViewOffset } = props
        let refreshCtrl = (!refreshable || !onRefresh) ? null : (
            <RefreshControl
                colors={[Colors.baseColor]}
                tintColor={Colors.baseColor}
                refreshing={this.props.refreshing}
                progressViewOffset={progressViewOffset}
                // fixed iOS onPress not work the first time after refreshed
                onRefresh={() => {
                    this.timer = setTimeout(() => {
                        this.timer = null
                        onRefresh()
                    }, REFRESH_DELAY)
                }}
            />
        )
        return (
            <ScrollView
                {...props}
                refreshControl={refreshCtrl} />
        )
    }

    render() {
        return <FlatList
            {...this.props}
            ref={c => this.list = c}
            style={[{ backgroundColor: Colors.background }, this.props.style]}
            renderScrollComponent={this._renderScrollComponent}
            keyboardDismissMode='on-drag'
            // onScrollBeginDrag={this.onScrollBeginDrag}
            // onScrollEndDrag={this.onScrollEndDrag}
            // onEndReached={this._onEndReached}
        />
    }
}
