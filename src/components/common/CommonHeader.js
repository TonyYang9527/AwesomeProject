

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Platform, StatusBar } from 'react-native';
import { ImageSourcePropType, ViewStyle } from 'react-native';
import { Header } from 'react-navigation-stack';
import { images as Resource } from '@resource';
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import { font_title, title_height } from '@constants/Dimension'
import SearchBar, { SearchBarProps } from './SearchBar'


const TITLE_MARGIN = Dimens.padding;

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: Platform.OS == 'ios' ? title_height : Header.HEIGHT,
        justifyContent: 'center',
        backgroundColor: Colors.baseColor,
    },
    leftbtn: {
        position: 'absolute',
        height: '100%',
        left: 0,
        paddingLeft: Dimens.padding,
        paddingRight: Dimens.padding,
        justifyContent: 'center'
    },
    titlebar: {
        position: 'absolute',
        height: '100%',
        left: TITLE_MARGIN,
        right: TITLE_MARGIN,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: font_title,
        fontWeight: Dimens.weight_600,
        textAlignVertical: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    rightbtn: {
        position: 'absolute',
        height: '100%',
        right: 0,
        paddingLeft: Dimens.padding,
        paddingRight: Dimens.padding,
        justifyContent: 'center'
    },
    rightTxt: {
        color: 'white',
        fontSize: Dimens.font_size_middle,
        paddingRight: 4
    },
    icon: {
        height: 20,
        width: 20,
        tintColor: 'white',
        resizeMode: 'stretch'
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dot: {
        position: 'absolute',
        width: 6,
        height: 6,
        top: 0,
        right: 0,
        borderRadius: 6,
        backgroundColor: 'red'
    }
});

export const NotificationButton = (props) => {
    let { navigation, onRightPress } = props
    return <TouchableOpacity
        style={props.style}
        onPress={() => { onRightPress && onRightPress() }}>
        <View style={styles.icon}>
            <Image
                source={Resource.icon.alarm()}
                style={styles.icon} />
            <View style={styles.dot}></View>
        </View>

    </TouchableOpacity>
};

export interface SeacrhBarHeaderProps extends SearchBarProps {
    style: ViewStyle,
    value: string,
    navigation: object,
    renderRight: () => Component,
    onSearchBarPress: () => void,
    onRightPress: () => void,
    boxRadius: number,
    useDefIcon: boolean,
    noStatusbar: boolean
}

export class SearchBarHeader extends Component<SeacrhBarHeaderProps> {

    static defaultProps = { boxRadius: 15, noStatusbar: false, rightSticky: true }

    constructor(props) {
        super(props)
        this.value = props.value
        this.navi = props.navigation
    }

    UNSAFE_componentWillReceiveProps(newp) {
        this.value = newp.value
    }

    _renderSearchBar = () => {
        return <SearchBar
            {...this.props}
            value={this.value}
            style={styles.searchBar}
            onPress={this.props.onSearchBarPress}
            hint={this.props.hint ? this.props.hint : 'Search'}
            boxStyle={{ borderRadius: this.props.boxRadius }}
        />
    }

    _renderRight = () => {
        return <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <NotificationButton
                navigation={this.navigation}
                onRightPress={this.props.onRightPress} />
        </View>
    }

    render() {
        return <CommonHeader
            {...this.props}
            hideLeft={true}
            renderTitle={this._renderSearchBar}
            renderRight={this.useDefIcon ? this._renderRight : null}
            rightText={null}
        />
    }
};

export interface CommonHeaderProps {
    style: ViewStyle,
    navigation: object,
    hideLeft: boolean,
    onLeftPress: () => void,
    leftIcon: ImageSourcePropType, // or local uri
    renderLeft: () => Component,
    title: string,// title
    alignCenter: boolean,
    multipleLine: boolean,
    renderTitle: () => Component,
    renderRight: () => Component,
    rightText: string,
    rightIcon: ImageSourcePropType, // or local uri
    onRightPress: () => void,
    noStatusbar: boolean
}

export default class CommonHeader extends Component<CommonHeaderProps> {

    static defaultProps = {
        hideLeft: false,
        leftIcon: Resource.icon.back(),
        noStatusbar: false,
        alignCenter: true,
        multipleLine: false
    }

    constructor(props) {
        super(props)
        this.style = props.style
        this.title = props.title
        this.renderTitle = props.renderTitle
        this.barStyle = this.parseStyle()
        if (props.hasOwnProperty('navigation')) {
            let { state } = props.navigation
            let { routeName, params } = state
            console.log(`%c routeName: ${routeName}`, 'font-size:20px;color:#00d084;')
        }

    }

    state = {
        marginLeft: TITLE_MARGIN,
        marginRight: TITLE_MARGIN
    }

    UNSAFE_componentWillReceiveProps(newp) {
        this.title = newp.title
        this.style = newp.style
    }

    parseStyle = () => {
        if (this.props.noStatusbar && Platform.OS === 'ios') {
            const { backgroundColor: colo } = this.style ? this.style : {}
            const sh = (parseInt(Platform.Version) === 10) ? 20 : 0
            const co = colo ? colo : Colors.baseColor
            return { height: sh + title_height, backgroundColor: co, paddingTop: sh }
        }
    }

    _renderLeft = ({ hideLeft, navigation, renderLeft, leftIcon, onLeftPress }) => {
        if (hideLeft) {
            return null;
        }

        let Component = View, onPress;
        if (navigation || onLeftPress) {
            Component = TouchableOpacity;
            onPress = onLeftPress ? onLeftPress : () => {
                navigation && navigation.goBack();
            }
        }

        if (leftIcon && !React.isValidElement(leftIcon)) {
            leftIcon = <Image style={styles.icon} source={leftIcon} />
        }
        return (
            <Component
                style={styles.leftbtn} onPress={onPress}
                onLayout={(e) => { this.setState({ marginLeft: e.nativeEvent.layout.width }) }}
            >
                {renderLeft ? renderLeft() : leftIcon}
            </Component>
        )
    }

    _renderTitle = ({ marginLeft, marginRight }) => {
        this.renderTitle = this.props.renderTitle

        let max = marginLeft > marginRight ? marginLeft : marginRight
        if (max === undefined) max = 20
        const props = {
            numberOfLines: this.props.multipleLine ? 2 : 1,
            ellipsizeMode: this.props.multipleLine ? undefined : 'tail'
        }
        const style = {
            fontSize: this.props.multipleLine ? Dimens.font_size_normal
                : Dimens.font_size_big
        }
        const tiStyle = this.props.alignCenter ? { left: max, right: max }
            : { left: marginLeft, right: marginRight }
        return (
            <View style={[styles.titlebar, tiStyle]}>
                {this.renderTitle ? this.renderTitle() : (
                    <Text {...props} style={[styles.titleText, style]} >
                        {this.title}
                    </Text>
                )}
            </View>
        )
    }

    _renderRight = ({ rightText, rightIcon, onRightPress, renderRight, rightIconStyle }) => {
        const _onRightLayout = (e) => {
            this.setState({ marginRight: e.nativeEvent.layout.width })
        }

        if (renderRight) {
            return <View style={styles.rightbtn}
                onLayout={_onRightLayout}>
                {renderRight()}
            </View>

        } else if (rightText || rightIcon) {
            if (rightIcon && !React.isValidElement(rightIcon)) {
                rightIcon = <Image style={[styles.icon, rightIconStyle]} source={rightIcon} />
            }
            return <TouchableOpacity
                style={styles.rightbtn}
                activeOpacity={onRightPress ? 0.2 : 1}
                onPress={onRightPress}
                onLayout={_onRightLayout}>
                {rightText !== undefined && <Text style={styles.rightTxt}>{rightText}</Text>}
                {rightIcon !== undefined && rightIcon}
            </TouchableOpacity>

        } else {
            return null
        }
    }

    render() {
        if (this.barStyle) {
            return <View style={this.parseStyle()} >
                <View style={[styles.container, this.style]}>
                    {this._renderLeft(this.props)}
                    {this._renderTitle(this.state)}
                    {this._renderRight(this.props)}
                </View>
            </View>
        } else {
            return <View style={[styles.container, this.style]}>
                {this._renderLeft(this.props)}
                {this._renderTitle(this.state)}
                {this._renderRight(this.props)}
            </View>
        }
    }
}
