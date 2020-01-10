/**
 * Modify from "https://github.com/beefe/react-native-actionsheet"
 */
import React from 'react'
import {
	ActionSheetIOS, Image, Text, View, Dimensions, Modal, TouchableOpacity,
	Platform, Animated, StyleSheet, ScrollView, StatusBar, Easing
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import * as Dimens from '../../constants/Dimension'

const BACKGROUND = '#FFFFFFEF'
const WARN_COLOR = '#FF3B30'
const ICON_WIDTH = 20
const MARGIN = 10, PADDING = 20, RADIUS = 12, MSG_HEIGHT = 40
const MAX_HEIGHT = Dimens.height * 0.7
const MAX_WIDTH = Dimens.width - (MARGIN * 2) - (PADDING * 2) - ICON_WIDTH

const hasItem = (res, i) => {
	const _length = Array.isArray(res) ? res.length : 0
	if (typeof i === 'undefined') {
		return false
	}
	if (0 > i || i > _length - 1) {
		return false
	}
	return true
}

const Styles = {
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		opacity: 0.4,
		backgroundColor: '#000'
	},
	wrapper: {
		flex: 1,
		flexDirection: 'row'
	},
	body: {
		flex: 1,
		alignSelf: 'flex-end',
		marginLeft: MARGIN,
		marginRight: MARGIN,
		marginTop: MARGIN,
		marginBottom: MARGIN
	},
	titleBox: {
		height: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	titleText: {
		paddingLeft: PADDING,
		paddingRight: PADDING,
		color: '#757575',
		fontSize: 14
	},
	messageBox: {
		height: MSG_HEIGHT,
		alignItems: 'center',
		justifyContent: 'center'
	},
	messageText: {
		paddingTop: 5,
		paddingLeft: PADDING,
		paddingRight: PADDING,
		paddingBottom: PADDING,
		color: '#9a9a9a',
		fontSize: 12
	},
	leftIcon: {
		width: ICON_WIDTH,
		height: ICON_WIDTH,
		position: 'absolute',
		left: 0,
	},
	buttonBox: {
		height: 50,
		width: '100%',
		flexDirection: 'row',
		borderTopWidth: Dimens.line,
		borderColor: '#CFCFCF80',
		alignItems: 'center',
		justifyContent: 'center'
	},
	cancelButtonBox: {
		height: 50,
		marginTop: 6,
		alignItems: 'center',
		justifyContent: 'center'
	}
}

export interface ActionSheetProps {
	// a list of button titles (required)
	options: string[],

	// a list of button left icon
	optionsIcon: object[],
	// only available with left icon
	alignLeft: boolean,

	//index of cancel button in options
	cancelButtonIndex: int,

	// index of destructive button in options
	destructiveButtonIndex: int,

	// a title to show above the action sheet
	title: string,

	//a message to show below the title
	message: string,

	//if message content is too long, need to measure the height by yourself
	messageHeight: number,

	// the color used for non-destructive button titles
	tintColor: string,

	// the color used for android's statusbar color
	statusbarColor: string,

	// The 'callback' function takes one parameter, the zero-based index of the selected item
	onPress: func,
}

class ActionSheetModal extends React.Component<ActionSheetProps> {
	static defaultProps = {
		tintColor: '#007AFF',
		buttonUnderlayColor: '#F4F4F4',
		statusbarColor: '#004D7A',
		onPress: () => { },
		styles: {}
	}

	constructor(props) {
		super(props)
		this.scrollEnabled = false
		this.translateY = this._calculateHeight(props)
		this.sheetAnim = new Animated.Value(this.translateY)
		this.state = {
			visible: false,
			textWidth: MAX_WIDTH,
			alignLeft: MAX_WIDTH / 2
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.translateY = this._calculateHeight(nextProps)
	}

	show = () => {
		this.setState({ visible: true }, () => {
			this._showSheet()
		})
	}

	_alignLeft = (width) => {
		const left = (MAX_WIDTH - width) / 2
		if (left < this.state.alignLeft && left > 0) {
			this.setState({
				textWidth: width + ICON_WIDTH,
				alignLeft: left
			})
		}
	}

	_hide = (index) => {
		this._hideSheet(() => {
			this.setState({ visible: false }, () => {
				this.props.onPress(index)
			})
		})
	}

	_cancel = () => {
		const { cancelButtonIndex, options } = this.props
		// 保持和 ActionSheetIOS 一致，
		// 未设置 cancelButtonIndex 时，点击背景不隐藏 ActionSheetModal
		if (hasItem(options, cancelButtonIndex)) {
			this._hide(cancelButtonIndex)
		}
	}

	_showSheet = () => {
		Animated.timing(this.sheetAnim, {
			toValue: 0,
			duration: 250,
			easing: Easing.out(Easing.ease)
		}).start()
	}

	_hideSheet(callback) {
		Animated.timing(this.sheetAnim, {
			toValue: this.translateY,
			duration: 200
		}).start(callback)
	}

	_getStyles = ({ styles }) => {
		const obj = {}
		Object.keys(Styles).forEach((key) => {
			const arr = [Styles[key]]
			if (styles[key]) {
				arr.push(styles[key])
			}
			obj[key] = arr
		})
		return obj
	}

	_getItemRadius = (tRadius, bRadius) => {
		return {
			borderTopLeftRadius: tRadius,
			borderTopRightRadius: tRadius,
			borderBottomLeftRadius: bRadius,
			borderBottomRightRadius: bRadius,
			backgroundColor: BACKGROUND
		}
	}

	/**
	 * elements: titleBox, messageBox, buttonBox, cancelButtonBox
	 * box size: height, marginTop, marginBottom
	 */
	_calculateHeight(props) {
		this.styles = this._getStyles(props)
		const getHeight = (name) => {
			const style = this.styles[name][this.styles[name].length - 1]
			let h = 0;
			['height', 'marginTop', 'marginBottom'].forEach((attrName) => {
				if (typeof style[attrName] !== 'undefined') {
					h += style[attrName]
				}
			})
			return h
		}

		let height = 0
		if (props.title) height += getHeight('titleBox')
		if (props.message) {
			let h = getHeight('messageBox')
			let { messageHeight } = props
			height += messageHeight > h ? messageHeight : h
		}
		if (hasItem(props.options, props.cancelButtonIndex)) {
			height += getHeight('cancelButtonBox')
			height += (props.options.length - 1) * getHeight('buttonBox')
		} else {
			height += props.options.length * getHeight('buttonBox')
		}

		if (height > MAX_HEIGHT) {
			this.scrollEnabled = true
			height = MAX_HEIGHT
		} else {
			this.scrollEnabled = false
		}

		return height
	}

	_renderTitle() {
		const { title, message, options } = this.props
		const Styles = this.styles
		if (!title) return null

		const bRadius = message || (options && options.length > 0) ? 0 : RADIUS
		const borderStyle = this._getItemRadius(RADIUS, bRadius)
		return (
			<View style={[Styles.titleBox, borderStyle]}>
				{React.isValidElement(title) ? title : (
					<Text style={Styles.titleText}>{title}</Text>
				)}
			</View>
		)
	}

	_renderMessage() {
		const { title, message, options, messageHeight: h } = this.props
		const Styles = this.styles
		if (!message) return null

		const tRadius = title ? 0 : RADIUS
		const bRadius = (options && options.length > 0) ? 0 : RADIUS
		const borderStyle = this._getItemRadius(tRadius, bRadius)
		if (typeof h === 'number' && h > MSG_HEIGHT) {
			borderStyle['height'] = h
		}
		return (
			<View style={[Styles.messageBox, borderStyle]}>
				{React.isValidElement(message) ? message : (
					<Text style={Styles.messageText}>{message}</Text>
				)}
			</View>
		)
	}

	_createButton(title, index, tRadius, bRadius) {
		const Styles = this.styles
		const { alignLeft, optionsIcon, tintColor, cancelButtonIndex: cidx } = this.props
		const _buttonBoxStyle = cidx === index ? Styles.cancelButtonBox : Styles.buttonBox
		const _iconLeft = ICON_WIDTH / 2 + this.state.alignLeft
		const _fontColor = this.props.destructiveButtonIndex === index ? WARN_COLOR : tintColor
		const _textWrapper = { flexDirection: 'row', paddingLeft: ICON_WIDTH }
		const _textStyle = { fontSize: 18, color: _fontColor, fontWeight: cidx === index ? '500' : 'normal' }

		const _borderStyle = this._getItemRadius(tRadius, bRadius)
		const fixBorderTop = tRadius > 0 ? { borderTopWidth: 0 } : {}
		return (
			<View key={index + 'title'}
				style={[_buttonBoxStyle, _borderStyle]}>
				<TouchableOpacity key={index}
					style={[Styles.buttonBox, fixBorderTop]}
					onPress={() => this._hide(index)}
				>
					{React.isValidElement(title) ? title : !hasItem(optionsIcon, index) ? null
						: <Image style={[Styles.leftIcon, { tintColor: _fontColor, left: _iconLeft }]}
							source={optionsIcon[index]} />
					}

					{React.isValidElement(title) ? null : hasItem(optionsIcon, index) ? (
						<View style={[_textWrapper, { width: alignLeft ? this.state.textWidth : undefined }]} >
							<Text style={_textStyle}
								onLayout={(e) => { this._alignLeft(e.nativeEvent.layout.width) }}
								numberOfLines={1}
							>{title}</Text>
						</View>
					) : (
							<Text style={_textStyle}
								numberOfLines={1}
							>{title}</Text>
						)
					}
				</TouchableOpacity>
			</View>
		)
	}

	_renderOptions() {
		const { options, cancelButtonIndex: cid, title, message } = this.props
		const _length = options.length
		const _tRadius = !(title || message) ? RADIUS : 0
		const _offset = (cid == _length - 1) ? 2 : 1
		const _borderStyle = this._getItemRadius(_tRadius, RADIUS)
		_borderStyle.backgroundColor = 'transparent'
		return <ScrollView
			style={_borderStyle}
			scrollEnabled={this.scrollEnabled}>
			{
				options.map((text, index) => {
					if (hasItem(options, cid) && index === cid) return null

					let tRadius = (index == 0) && !(title || message) ? RADIUS : 0
					let bRadius = (index == _length - _offset) ? RADIUS : 0
					return this._createButton(text, index, tRadius, bRadius)
				})
			}
		</ScrollView>
	}

	_renderCancelButton() {
		const { options, cancelButtonIndex: idx } = this.props
		return !hasItem(options, idx) ? null
			: this._createButton(options[idx], idx, RADIUS, RADIUS)
	}

	render() {
		const Styles = this.styles
		const { visible, sheetAnim } = this.state
		return (
			<Modal visible={visible}
				animationType='none'
				transparent
				onRequestClose={this._cancel}
			>
				<StatusBar backgroundColor={this.state.visible ? this.props.statusbarColor : 'transparent'} />

				<SafeAreaView style={Styles.wrapper} >
					<Text
						style={Styles.overlay}
						onPress={this._cancel} />
					<Animated.View
						style={[
							Styles.body,
							{ height: this.translateY, transform: [{ translateY: this.sheetAnim }] }
						]}>
						{this._renderTitle()}
						{this._renderMessage()}
						{this._renderOptions()}
						{this._renderCancelButton()}
					</Animated.View>
				</SafeAreaView>
			</Modal>
		)
	}
}

class _ActionSheetIOS extends React.Component<ActionSheetProps> {
	optionsSchema = ['options', 'cancelButtonIndex', 'destructiveButtonIndex',
		'title', 'message', 'tintColor', 'onPress']

	// shold not update whenever, because nothing rendered
	shouldComponentUpdate() {
		return false
	}

	show() {
		const props = this.props
		const options = {}
		this.optionsSchema.forEach((name) => {
			const value = props[name]
			if (typeof value !== 'undefined') {
				options[name] = value
			}
		})
		const callback = options.onPress
		delete options.onPress
		ActionSheetIOS.showActionSheetWithOptions(options, callback)
	}

	// must not render anything
	render() {
		return null
	}
}

// module.exports = Platform.OS === 'ios' ? _ActionSheetIOS : ActionSheetModal
export default ActionSheetModal