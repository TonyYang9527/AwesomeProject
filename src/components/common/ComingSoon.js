import React, { Component } from "react";
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { images as Resource } from '@resource';
import { HomeScreenStyles } from '@screens/home/HomeStyles';
import * as CommonStyle from '@constants/Style'
import { withNamespaces } from "react-i18next";
@withNamespaces()
export default class ComingSoon extends Component {
    constructor(ops) {
        super(ops)
    }
    render() {
        return (
            <View style={HomeScreenStyles.comingsoonView}>
                <Image
                    source={Resource.home.home_comingsoon()}
                    style={HomeScreenStyles.comingsoon}
                    resizeMode='center' 
                />
                <View style={HomeScreenStyles.comingsoonText}>
                    <Text style={CommonStyle.textNormalGrey}>
                        {this.props.t('mobile.comingsoon')}
                    </Text>
                </View>
            </View>
        )
    }
}