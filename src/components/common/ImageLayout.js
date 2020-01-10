'use strict';

import React from 'react'
import { Image, ImageBackground, ActivityIndicator, View, StyleSheet } from 'react-native'
import { ActivityIndicatorProps, ImageStyle, ViewStyle } from 'react-native'
import FastImageProperties from 'react-native-fast-image/src/index'
import FastImage from 'react-native-fast-image'
import { isObservable, toJS } from 'mobx'
import { isEmpty } from '@utils/Utils'
import { images as Resource } from '@resource'
import * as Colors from '@constants/Colors'

export interface LoadingProps extends FastImageProperties {
    style: ViewStyle,
    showLoading: boolean,
    loadingStyle: ActivityIndicatorProps,
    placeholder: string,
    holderStyle: ImageStyle,
    containerColor: string, // not for source, but just for loading background and holder background
    resizeMode: 'contain' | 'cover' | 'stretch' | 'center',
    holderMode: 'contain' | 'cover' | 'stretch' | 'center',
    useFastImage: boolean
}

export default class ImageLayout extends React.Component<LoadingProps> {

    static defaultProps = {
        showLoading: true,
        style: { flex: 1 },
        holderMode: 'contain',
        containerColor: Colors.blackAlpha,
        loadingStyle: { size: 'small', color: 'gray' },
        holderStyle: { width: 48, height: 48, tintColor: 'white' },
        useFastImage: true,
    }

    constructor(props) {
        super(props)
        this.state = { isLoaded: false, isError: false }
        this._parseSource(props)
    }

    UNSAFE_componentWillReceiveProps(props) {
        this._parseSource(props)
    }

    _parseSource = ({ source, needResize = false, style }) => {
        if (isObservable(source)) {
            source = toJS(source)
        }

        this._source = null
        if (typeof source == 'object') {
            const { uri, url } = source ? source : {}
            let urlstr = isEmpty(uri) ? (isEmpty(url) ? '' : url) : uri
            if (urlstr.startsWith('http')) {
                if (needResize) {
                    let width = Number.parseInt(style.width);
                    let height = Number.parseInt(style.height);
                    let length = width > height ? height : width;
                    urlstr = urlstr + '?x-oss-process=image/resize,s_' + length * 2;
                }
                this._source = { ...source, uri: urlstr }
            }
        } else if (typeof source == 'string' && source.indexOf('http') == 0) {
            this._source = { uri: source }
        } else if (typeof source == 'number') {
            this._source = source
        }
    }

    _renderLoading = () => {
        let { isError, isLoaded } = this.state
        const { showLoading, loadingStyle } = this.props
        return (!this._source || !showLoading || isLoaded) ? null
            : <View style={styles.container}>
                <ActivityIndicator {...loadingStyle} />
            </View>
    }

    _renderHolder = (style) => {
        let { isError, isLoaded } = this.state
        let { placeholder, holderMode, containerColor } = this.props
        const fixStyle = { backgroundColor: containerColor }
        if (isLoaded && isError) {
            placeholder = Resource.icon.default_failed()
        } else if (!this._source) {
            placeholder = placeholder ? placeholder : Resource.icon.default()
        } else { // isLoading || (isLoaded && !isError)
            placeholder = null
        }

        return !placeholder ? null : (
            <View style={[styles.container, fixStyle]}>
                <Image resizeMode={holderMode}
                    style={this.props.holderStyle}
                    source={placeholder}
                />
            </View>
        )
    }

    render() {
        const Container = this.props.useFastImage ? FastImage : ImageBackground
        if (this._source) {
            return <Container
                {...this.props}
                source={this._source}
                onError={() => {
                    this.setState({ isError: true })
                }}
                onLoadEnd={() => {
                    this.setState({ isLoaded: true })
                }}
            >
                {this._renderHolder()}
                {this.props.children}
                {this._renderLoading()}
            </Container>
        } else {
            let { style, placeholder, holderStyle, holderMode, containerColor } = this.props
            const _style = { backgroundColor: containerColor, alignItems: 'center', justifyContent: 'center' }
            return <View style={[_style, style]}>
                <Image resizeMode={holderMode}
                    style={this.props.holderStyle}
                    source={placeholder ? placeholder : Resource.icon.default()}
                />
                {this.props.children}
            </View >
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
