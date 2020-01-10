import React, { Component } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import { ViewProps, ViewStyle, ScrollViewProps } from 'react-native'
import * as Colors from '@constants/Colors'

import RefreshableView, { RefreshProps } from './RefreshableView'

declare interface LayoutProps extends ViewProps, RefreshProps {
	style: ViewStyle;
	scrollViewStyle: ViewStyle;
	avoidKBcover: boolean; // avoid keyboard cover the view on ios
	safeArea: boolean; // use this to fix iPhone X SaveAreaView area.
	childIsFragment: boolean; // use this to fix iPhone X SaveAreaView backgroundColor issue.
	refreshing: boolean;
	onRefresh: () => Promise;

	toggleIndexs: Array<number>; // it is index of children to be hide when use avoidKBcover,
	navi: object; // navigation
}

export default class ContentLayout extends Component<LayoutProps>{

	static defaultProps = {
		safeArea: true,
		avoidKBcover: false,
		useEmptyView: false,
		childIsFragment: false
	}

	constructor(props) {
		super(props)
		this.state = {
			isKbShow: false
		}
		if (props.toggleIndexs && props.navi && Platform.OS == 'ios') {
			this._addListener(props.navi)
		}
	}

	componentWillUnmount() {
		this.kSubs && this.kSubs.forEach((sub) => { sub.remove() })
		this.subs && this.subs.forEach((sub) => { sub.remove() })
	}

	_addListener = (navi) => {
		this.subs = !navi ? [] : [
			navi.addListener('willFocus', () => {
				this.kSubs = [
					Keyboard.addListener('keyboardDidHide', this._onKeyboardHide),
					Keyboard.addListener('keyboardDidShow', this._onKeyboardShow)
				]
			}),
			navi.addListener('didBlur', () => {
				this.subs.forEach((sub) => { sub.remove() })
				Keyboard.dismiss();
			})
		]
	}

	_onKeyboardHide = () => {
		this.setState({ isKbShow: false })
	}

	_onKeyboardShow = (e) => {
		this.setState({ isKbShow: true })
	}

	_onRefresh = () => {
		Keyboard.dismiss()
		return this.props.onRefresh()
	}

	_parseChild = (children, toggleIdxs) => {
		return children.map((child, index) => {
			let hasEl = toggleIdxs.find((i) => {
				return i === index
			})
			if (hasEl != null && this.state.isKbShow) {
				return null
			} else {
				return child
			}
		})
	}

	renderChildren = () => {
		const refreshProps = {}
		Object.keys(this.props).forEach((k) => {
			if (k.startsWith('empty') || k.includes('Empty')) {
				refreshProps[k] = this.props[k]
			}
		})

		const { onRefresh, children, toggleIndexs } = this.props
		let _children = children ? children : null
		if (Array.isArray(children) && toggleIndexs) {
			_children = this._parseChild(children, toggleIndexs)
		}

		return !onRefresh ? _children : (
			<RefreshableView
				{...refreshProps}
				style={this.props.scrollViewStyle}
				refreshing={this.props.refreshing}
				onRefresh={this._onRefresh}
				onRefreshEnd={this.props.onRefreshEnd} >
				{_children}
			</RefreshableView>
		)
	}

	render() {
		const { avoidKBcover, safeArea, childIsFragment: fix } = this.props
		const Container = (Platform.OS === 'ios' && safeArea) ? SafeAreaView : View
		const style = (Platform.OS === 'ios' && fix) ? Styles.safeArea : Styles.normal
		if (avoidKBcover) {
			return <Container
				style={[style, this.props.style]}>
				{fix ? <View style={Styles.fixBackground} /> : null}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 0}
					style={{ flex: 1 }}>
					{this.renderChildren()}
				</KeyboardAvoidingView>
			</Container>

		} else {
			return <Container
				style={[style, this.props.style]}>
				{fix ? <View style={Styles.fixBackground} /> : null}
				{this.renderChildren()}
			</Container>
		}
	}
}

const Styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.baseColor
	},
	normal: {
		flex: 1,
		backgroundColor: Colors.background
	},
	fixBackground: {
		backgroundColor: Colors.background,
		position: 'absolute',
		top: 84,
		right: 0,
		left: 0,
		height: '100%',
		zIndex: -1000
	}
})
