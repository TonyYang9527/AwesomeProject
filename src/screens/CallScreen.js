'use strict';

import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import CallButton from '@components/CallButton';



export default class CallScreen extends React.Component {


    render() {
        return (
            <TouchableOpacity onPress={() => this.handleButtonPressed()}>
                <View>
                    <CallButton />
                </View>
            </TouchableOpacity>
        );
    }
}