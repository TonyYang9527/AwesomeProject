'use strict';

import React, {Fragment} from 'react';
import CommonHeader from '@components/common/CommonHeader';
import {StyleSheet} from 'react-native';
import  WebView from 'react-native-webview';
import {background} from "@constants/Colors";

function WebDetailScreen({navigation}) {
    const url = navigation.getParam('url', '');
    console.log('The WebView  WebDetails received url:', url);
    return (
        <Fragment>
            <WebView style={styles.container}
                     source={{uri: url}}
                     startInLoadingState={true}/>
        </Fragment>
    )
}

WebDetailScreen.navigationOptions = ({navigation}) => ({
    headerLeft: null,
    headerTitle: (
        <CommonHeader navigation={navigation}
                      title={navigation.getParam('title', '')}/>
    )
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: background,
    }
});

export default WebDetailScreen;
