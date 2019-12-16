
import React from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { ViewStyle, TextStyle } from 'react-native'
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import { images as Resource } from '@resource'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: Dimens.bw_button_height,
		borderTopWidth: Dimens.line,
		borderColor: Colors.line
	},
	buttonbox: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonText: {
		fontSize: 16,
		justifyContent: 'center'
	}
})

export interface MultipleButtonProps {
	style?: ViewStyle;
	btnStyle?: ViewStyle;
	textStyle?: TextStyle;
	titles: string[],
	disable: boolean,
	dividerColor: string,
	dividerWidth: number,
	defaultColor?: string;
	activateColor?: string;
	textColor?: string;
	borderRadius: number;
	activateIndex?: number;
	onPress?: (item: object) => any;
}

export const DefaultConfig = {
	style: {
		height: 42,
		marginLeft: Dimens.padding,
		marginRight: Dimens.padding,
		marginTop: Dimens.margin,
		marginBottom: Dimens.margin
	},
	borderRadius: 3
}

export const NoMarginConfig = {
	style: { height: 42 },
	borderRadius: 3
}

export const AddButtonCfg = {
	style: { margin: 10 },
	borderRadius: 4,
	icons: [Resource.icon.plus()],
	btnStyle: { flexDirection: 'row', alignItems: 'center' }
}

export const BorderConfig = {
	...AddButtonCfg,
	style: {
		margin: 10,
		height: 42,
		borderColor: Colors.baseColor,
		borderWidth: Dimens.line * 3,
		borderTopWidth: Dimens.line * 3
	},
	activateColor: Colors.background,
	textColor: Colors.baseColor
}

export default class MultipleButton extends React.Component<MultipleButtonProps>{

	static defaultProps = {
		icons: [],
		titles: [],
		onPress: () => { },
		defaultColor: Colors.white,
		activateColor: Colors.baseColor,
		disableColor: Colors.lightGrey,
		dividerWidth: Dimens.line,
		dividerColor: Colors.line,
		activateIndex: 0,
	}

	constructor(props) {
		super(props)
		this.UNSAFE_componentWillReceiveProps(props)
	}

	UNSAFE_componentWillReceiveProps(newprop) {
		this.disable = newprop.disable
		this.titles = newprop.titles
		if (this.titles.length < 2) {
			this.style = StyleSheet.flatten([{
				borderRadius: newprop.borderRadius, borderColor: 'transparent'
			}, newprop.style])
		}
	}

	_getItemRadius = (index, radius) => {
		const lRadius = index === 1 ? radius : null
		const rRadius = index === this.titles.length ? radius : null
		return {
			borderBottomLeftRadius: lRadius,
			borderTopLeftRadius: lRadius,
			borderBottomRightRadius: rRadius,
			borderTopRightRadius: rRadius
		}
	}

	_renderButton = (title, index) => {
		const _icon = index < this.props.icons.length ? this.props.icons[index] : null
		const { activateIndex, activateColor, defaultColor, borderRadius, btnStyle, textStyle,
			disableColor, textColor, dividerColor, dividerWidth, onPress, borderStyle } = this.props

		const bcolor = activateIndex === index ? activateColor : defaultColor
		const fcolor = activateIndex === index ? defaultColor : activateColor

		const bgColor = this.disable ? disableColor : bcolor
		const txtcolor = this.disable ? Colors.white : textColor ? textColor : fcolor
		const divider = index === 0 ? { backgroundColor: bgColor }
			: { backgroundColor: bgColor, borderColor: dividerColor, borderLeftWidth: dividerWidth }
		const radiu = borderRadius ? this._getItemRadius(index + 1, borderRadius) : null
		const touchStyle = StyleSheet.flatten([styles.buttonbox, divider, radiu, btnStyle, borderStyle])

		return <TouchableOpacity
			key={index + '05'}
			activeOpacity={0.6}
			disabled={this.disable}
			style={touchStyle} 
			onPress={() => { onPress({ title, index }) }}>
			{_icon != null && <Image source={_icon}
				style={{ tintColor: txtcolor, width: 20, height: 20 }}
			/>}
			<Text style={[styles.buttonText, textStyle, { color: txtcolor }]}> {title} </Text>
		</TouchableOpacity>;
	}

	render() {
		let border = this.disable ? { borderColor: this.props.disableColor } : {}
		const totalStyle = StyleSheet.flatten([styles.container, this.style, border]);
		delete totalStyle.borderRadius;
		delete totalStyle.borderTopWidth;
		return (
			<View 
				style={totalStyle}>
				{this.titles.map((el, index) => {
					return this._renderButton(el, index)
				})}
			</View>
		)
	}
}
