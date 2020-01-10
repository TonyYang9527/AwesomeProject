import React from 'react';
import PropTypes from 'prop-types';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { images as Resource } from '@resource';
import * as Colors from '@constants/Colors';
import * as Dimens from '@constants/Dimension';
import i18n from '@utils/i18n'

const BOX_PADDING = 7
const ITEM_PADDING = Dimens.padding

const styles = StyleSheet.create({
	searchBar: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	searchBox: {
		flex: 1,
		flexDirection: 'row',
		height: Platform.OS == 'android' ? 32 : 28,
		alignItems: 'center',
		alignSelf: 'center',
		justifyContent: 'center',
		borderRadius: 15,
		paddingLeft: 0,
		paddingRight: 0,
		backgroundColor: Colors.whiteAlpha
	},
	searchIcon: {
		width: 20,
		height: 20,
		marginRight: BOX_PADDING,
		marginLeft: BOX_PADDING,
		tintColor: 'white'
	},
	searchText: {
		flex: 1,
		padding: 0,
		color: 'white'
	},
	iconClear: {
		width: 16,
		height: 16,
		marginRight: BOX_PADDING,
		tintColor: 'white',
		alignSelf: 'center'
	},
	rightBtn: {
		marginLeft: ITEM_PADDING,
		fontSize: Dimens.font_size_middle,
		color: 'white',
	},
	rightIcon: {
		height: 20,
		width: 20,
		marginLeft: ITEM_PADDING,
		tintColor: 'white',
		resizeMode: 'stretch'
	},
});

const darkStyle = StyleSheet.create({
	searchBar: {
		margin: 10, backgroundColor: Colors.background,borderColor: Colors.line, borderWidth: Dimens.line
	},
	searchBox: {
		borderRadius: 3, backgroundColor: 'white'
	},
	textStyle: {
		color: Colors.textColor, fontSize: Dimens.font_size_normal
	},
	iconStyle: {
		tintColor: Colors.lightGrey
	},
	clearBox: {
		paddingRight: BOX_PADDING, paddingLeft: BOX_PADDING
	},
	rightStyle: {
		color: Colors.baseColor
	}
})

const inputStyle = StyleSheet.create({
	searchBar: {
		backgroundColor: 'white'
	},
	searchBox: {
		height: 42, borderWidth: 0, borderRadius: 0,
		paddingLeft: Dimens.padding, paddingRight: Dimens.padding,
		backgroundColor: Colors.white
	}
})

export const DarkTheme = {
	style: darkStyle.searchBar,
	boxStyle: darkStyle.searchBox,
	textStyle: darkStyle.textStyle,
	iconStyle: darkStyle.iconStyle,
	rightStyle: darkStyle.rightStyle,
	hintColor: Colors.lightGrey
}

export const InputItemTheme = {
	style: inputStyle.searchBar,
	boxStyle: inputStyle.searchBox,
	textStyle: darkStyle.textStyle,
	iconStyle: darkStyle.iconStyle,
	rightStyle: darkStyle.rightStyle,
	hintColor: Colors.line,
	showSearchIcon: false,
	clearSticky: false
}

export type KeyboardType = "default" | "email-address" | "numeric" | "phone-pad";
export type KeyboardTypeIOS = "ascii-capable"
	| "numbers-and-punctuation"
	| "url"
	| "number-pad"
	| "name-phone-pad"
	| "decimal-pad"
	| "twitter"
	| "web-search";
export type KeyboardTypeAndroid = "visible-password";
export type KeyboardTypeOptions = KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;

export interface SearchBarProps {
	searchDelay: number, // use to avoid immediately call api when user still typing.
	onRightPress: (keywd) => any,//Button like 'Cancle' or 'Search'
	onValueChange: (keywd) => any,//an Text Changing callback
	onClear: () => any,
	onPress: () => any,
	onFocus: (e) => any,
	onBlur: (e) => any,
	editable: boolean,
	showSearchIcon: boolean,
	useClearButton: boolean,
	clearSticky: boolean,
	iconClear: object,
	iconStyle: ImageStyle,
	hint: string,
	hintColor: string,
	keyboardType: KeyboardTypeOptions,
	style: ViewStyle,
	boxStyle: ViewStyle,
	value: string,
	textStyle: TextStyle,
	rightIcon: object, // or local uri, if this is empty, right button display 'rightText' or 'confirmText' .
	rightText: string,   // if search box is empty, right button display this value, distinguish with 'confirmText' .
	confirmText: string, // if search box is not empty, right button display this value, also the action should change.
	rightStyle: TextStyle,
	rightSticky: TextStyle,
	leftIcon: object
}

export default class SearchBar extends React.Component<SearchBarProps>{

	static defaultProps = {
		searchDelay: 0,
		showSearchIcon: true,
		useClearButton: true,
		hint: i18n.t('mobile.search'),
		hintColor: '#DFDFDFE0',
		keyboardType: 'default',
		rightSticky: false,
		clearSticky: true,
		editable: true
	};

	constructor(props) {
		super(props)
		this.keyWord = props.value
		this.hasValue = observable.box(false)
		this.isFocusing = observable.box(false)

		if (this.keyWord) setTimeout(() => {
			this.setKeyWord(this.keyWord)
			this.hasValue.set(true)
		}, 250);
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		this.setKeyWord(newProps.value || '');
	}

	setKeyWord = (value) => {
		this.inputRef && this.inputRef.setNativeProps({ text: value });
	};

	clearText = () => {
		this.inputRef && this.inputRef.setNativeProps({ text: '' });
		this.hasValue.set(false)
	}

	_onFocus = (e) => {
		this.props.onFocus && this.props.onFocus(e)
		this.isFocusing.set(true)
	}

	_onBlur = (e) => {
		this.isFocusing.set(false)
		this.props.onBlur && this.props.onBlur(e)
	}

	_renderIcon = () => {
		if (this.props.showSearchIcon) {
			return <Image
				style={[styles.searchIcon, this.props.iconStyle]}
				source={this.props.leftIcon ? this.props.leftIcon : Resource.icon.search()} />
		} else {
			return null;
		}
	};

	_renderRight = () => {
		let { renderIcon } = this.props
		let { rightIcon, confirmText, rightText, onRightPress, rightSticky } = this.props
		if (rightIcon && !React.isValidElement(rightIcon)) {
			renderIcon = () => (
				<Image source={rightIcon}
					style={[styles.rightIcon, { tintColor: this.props.hintColor }]}
				/>
			)
		} else if (confirmText || rightText) {
			const txt = confirmText ? confirmText : rightText
			renderIcon = () => observer(
				<Text style={[styles.rightBtn, this.props.rightStyle]}>
					{this.hasValue.get() ? txt : rightSticky ? rightText : ''}
				</Text>
			)
		}

		if (renderIcon != null) {
			return (
				<TouchableOpacity
					onPress={() => { onRightPress && onRightPress(this.keyWord) }}>
					{renderIcon()}
				</TouchableOpacity>
			)
		} else {
			return null;
		}
	};

	_renderClearIcon = observer(() => {
		let { iconClear: icon, clearSticky } = this.props
		let showState = (this.isFocusing.get() || clearSticky)
		if (this.props.useClearButton && this.hasValue.get() && showState) {
			return (
				<TouchableOpacity
					style={styles.clearBox}
					onPress={() => {
						this.clearText();
						this.props.onClear && this.props.onClear();
						this.props.onValueChange && this.props.onValueChange();
					}}>
					<View style={styles.clearBox}>
						{icon ? icon : <Image
							source={Resource.icon.close_wb()}
							style={[styles.iconClear, this.props.iconStyle]}
						/>}
					</View>
				</TouchableOpacity>
			);
		} else {
			return null;
		}
	})

	_renderBody = () => {
		if (this.props.onPress) {
			const { textStyle, hintColor } = this.props
			return (
				<Text style={[styles.searchText, textStyle, { color: hintColor }]}>
					{this.keyWord ? this.keyWord : this.props.hint}
				</Text>
			)

		} else {
			const { onValueChange, textStyle, searchDelay, editable } = this.props
			const rebProps = { ...this.props, value: undefined }
			const _txtColor = editable ? null : { color: Colors.textLabel }
			return <TextInput
				{...rebProps}
				ref={c => this.inputRef = c}
				style={[styles.searchText, textStyle, _txtColor]}
				selectionColor={this.props.hintColor}
				onFocus={this._onFocus}
				onBlur={this._onBlur}
				underlineColorAndroid="transparent"
				keyboardType={this.props.keyboardType}
				placeholder={this.props.hint}
				placeholderTextColor={this.props.hintColor}
				onChangeText={(text) => {
					this.keyWord = text
					if (this.typingListener != null) {
						clearTimeout(this.typingListener)
						this.typingListener = null
					}
					if (searchDelay > 0) {
						this.typingListener = setTimeout(() => {
							onValueChange && onValueChange(text)
						}, searchDelay)
					} else {
						onValueChange && onValueChange(text)
					}
					this.hasValue.set(text.length > 0)
				}}
			/>
		}
	};

	_getStyle = (bgcolor) => {
		let { editable, boxStyle } = this.props
		let _style = editable ? null : { backgroundColor: bgcolor }
		return [styles.searchBox, boxStyle, _style]
	}

	render() {
		return <View
			style={[styles.searchBar, this.props.style]}>
			<TouchableOpacity
				activeOpacity={this.props.onPress ? 0.8 : 1}
				style={this._getStyle(Colors.border)}
				onPress={this.props.onPress ? this.props.onPress : null}>
				<View style={this._getStyle(Colors.border)} >
					<this._renderIcon />
					<this._renderBody />
					<this._renderClearIcon />
				</View>
			</TouchableOpacity>

			<this._renderRight />

		</View>
	}
}
