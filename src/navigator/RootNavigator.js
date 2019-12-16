'use strict';

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import Colors from '@constants/Colors';
import CommonHeader from '@components/common/CommonHeader';

import HomeNavigator from './HomeNavigator';
import LanguageScreen from '@screens/LanguageScreen';
import CallScreen from '@screens/CallScreen';
import SettingScreen from '@screens/SettingScreen';

const defaultOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTintColor: Colors.white,
    headerStyle: {
        backgroundColor: Colors.baseColor,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTitle: <CommonHeader navigation={navigation} title={navigation.getParam('title')} />
});

const RootNavigator = createStackNavigator(
    {
        Home: HomeNavigator,
        LanguageScreen: LanguageScreen,
        CallScreen: CallScreen,
        SettingScreen: SettingScreen,
    },
    {
        headerMode: 'screen',
        headerTransitionPreset: 'fade-in-place',
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerTintColor: Colors.white,
            headerStyle: {
                backgroundColor: Colors.baseColor,
                elevation: 0,
                shadowOpacity: 0
            }
        }
    }
);

export default createAppContainer(RootNavigator);