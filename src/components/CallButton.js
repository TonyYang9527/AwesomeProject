/*
 * Copyright (c) 2011-2018, Zingaya, Inc. All rights reserved.
 */

'use strict';

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';

export default class CallButton extends Component {

    handleButtonPressed() {
        this.props.buttonPressed();
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.handleButtonPressed()}>
                <View style={[styles.icon, { borderColor: this.props.color }]}>
                    <Text >{"CallButton"}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderRadius: 35,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    phone_icon: {
        borderColor: '#0C90E7',
        marginHorizontal: 10,
    },
    align_left: {
        alignSelf: 'flex-start',
    },
    align_right: {
        alignSelf: 'flex-end',
    },
    align_center: {
        alignSelf: 'center',
    },
});