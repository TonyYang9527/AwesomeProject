import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native'
import { images as Resource } from '@resource/'
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import { isEmpty } from '@utils/Utils'

export interface ImgTxtItemProps {
    style?: ViewStyle;
    borderColor?: string;
    label: boolean;
    labelMark: boolean;
    labelStyle: TextStyle;
    icon: string,
    iconStyle: ViewStyle;
    text: string,
    textStyle: TextStyle;
    extra: string;
    extraStyle: TextStyle;
    multipleLine: true | false;
    arrow: 'right' | 'up' | 'down' | 'empty';
    rightImg: object;
    rightStyle: ViewStyle;
    placeholder: string;
    placeholderColor: string;
    disabled: boolean;
    disableColor: string; // this is for text
    disColor: string; // this is for whole bar
    onPress: () => any;
}

const defaultPadding = {
    paddingLeft: 10,
    paddingRight: 10
}

export default class ImgTxtItem extends React.Component<ImgTxtItemProps> {

    static defaultProps = {
        onPress: () => { },
        multipleLine: false,
        placeholderColor: Colors.textHolder,
        disableColor: Colors.textLabel,
        showExtra: true,
    }

    constructor(props) {
        super(props)
        this.text = props.text
        this.disabled = props.disabled
    }

    UNSAFE_componentWillReceiveProps(n) {
        this.text = n.text
        this.disabled = n.disabled
    }

    _getStyle = (hasborder) => {
        const { style, borderColor, disabled } = this.props
        const { padding } = style ? style : {}
        const _bdStyle = hasborder && borderColor ? { borderColor: borderColor } : undefined
        const _paddStyle = (padding === undefined) ? defaultPadding : undefined
        return StyleSheet.flatten([_paddStyle, _bdStyle, style])
    }

    _renderLabel = () => {
        const { label, labelStyle, multipleLine, placeholder, labelMark } = this.props
        // const _markColor = { color: this.disabled ? Colors.textLabel : 'red' }
        const _text = isEmpty(label) ? placeholder : label
        const _lineProps = multipleLine ? undefined : { numberOfLines: 1, ellipsizeMode: 'tail' }
        const hasborder = (this.text === undefined && placeholder === undefined)
        return (
            <View style={[Styles.labelBar, this._getStyle(hasborder)]}>
                {labelMark && <Text style={[Styles.label, labelStyle, Styles.markStar]}>{'*'}</Text>}
                <Text style={[Styles.label, labelStyle]}
                    {..._lineProps} ellipsizeMode='tail'>{_text}</Text>
            </View>
        )
    }

    _renderText = () => {
        const { placeholder, multipleLine, placeholderColor } = this.props
        const _lineProps = multipleLine ? undefined : { numberOfLines: 1, ellipsizeMode: 'tail' }

        if (isEmpty(this.text)) {
            return (
                <Text style={[Styles.text, { color: placeholderColor }]}
                    {..._lineProps}
                >{placeholder}</Text>
            )
        } else {
            let { textStyle, disableColor, disabled } = this.props
            return (
                <Text style={[Styles.text, textStyle, disabled && { color: disableColor }]}
                    {..._lineProps}
                >{this.text}</Text>
            )
        }
    }

    _renderExtra = () => {
        const { extra, extraStyle, multipleLine } = this.props
        if (!extra) {
            return null
        } else if (React.isValidElement(extra)) {
            return extra
        }

        const _lineProps = multipleLine ? undefined : { numberOfLines: 1, ellipsizeMode: 'tail' }
        return (
            <Text style={[Styles.extra, extraStyle]}
                {..._lineProps}
            >{extra}</Text>
        )
    }

    _renderRight = () => {
        const { arrow, rightImg, rightStyle } = this.props
        let _icon = null, _style = { rotate: '0deg' }
        if (rightImg === undefined && arrow === 'empty') {
            return null
        } else if (rightImg !== undefined) {
            _icon = rightImg
        } else {
            _icon = Resource.icon.next();
            switch (arrow) {
                case 'up': _style = { rotate: '-90deg' }; break
                case 'down': _style = { rotate: '90deg' }; break
                default: _style = { rotate: '0deg' }
            }
        }
        return (
            <Image
                style={[Styles.rightImg, { transform: [_style] }, rightStyle]}
                source={_icon} resizeMode={'contain'}
            />
        )
    }

    _renderBody = () => {
        const { label, icon, iconStyle, placeholder, onPress, disabled, disColor,showExtra, bodyStyle } = this.props
        if (this.text === undefined && placeholder === undefined) {
            return null
        }
        const ChildComponent = () => {
            let _style = (!disabled || !disColor) ? null : { backgroundColor: disColor }
            return (
                <View style={[Styles.default, this._getStyle(true), _style, bodyStyle]}>
                    {icon !== undefined && (
                        <Image style={[Styles.icon, iconStyle]} source={icon} resizeMode={'contain'}/>
                    )}
                    {this._renderText()}
                    {showExtra && this._renderExtra()}
                    {this._renderRight()}
                </View>
            )
        }
        if (onPress && !this.disabled) {
            return <TouchableOpacity
                onPress={onPress}
                disabled={this.disabled}
                activeOpacity={Dimens.opacity}>
                {ChildComponent()}
            </TouchableOpacity>
        } else {
            return ChildComponent()
        }
    }

    render() {
        if (isEmpty(this.props.label)) {
            return this._renderBody()
        } else {
            return <View
                style={this.props.style}>
                {this._renderLabel()}
                {this._renderBody()}
            </View>
        }
    }
}

const Styles = StyleSheet.create({
    labelBar: {
        flexDirection: 'row',
        height: Dimens.section_height,
        paddingTop: 13,
        borderBottomWidth: Dimens.line,
        borderColor: Colors.borderColor
    },
    label: {
        fontSize: Dimens.font_size_normal,
        color: Colors.textLabel,
        textAlign: 'left'
    },
    markStar: {
        color: 'red',
        paddingTop: 2,
        marginRight: 3
    },
    default: {
        height: Dimens.item_height,
        flexDirection: 'row',
        borderBottomWidth: Dimens.line,
        borderColor: Colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    icon: {
        width: 22,
        height: 22,
        marginRight: Dimens.padding
    },
    text: {
        flexGrow: 1,
        fontSize: Dimens.font_size_normal,
        color: Colors.textColor,
        padding: 0,
        marginLeft: 10,
    },
    extra: {
        flexShrink: 1,
        textAlign: 'right',
        fontSize: Dimens.font_size_normal,
        color: Colors.textLabel,
        padding: 0,
        paddingLeft: 10,
    },
    rightImg: {
        width: 22,
        height: 22,
        tintColor: Colors.lightGrey
    }
})
