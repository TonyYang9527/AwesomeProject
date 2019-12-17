'use strict';

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import Colors from '@constants/Colors';
import HomeNavigator from './HomeNavigator';
import LanguageScreen from '@screens/LanguageScreen';
import CallScreen from '@screens/CallScreen';
import SettingScreen from '@screens/SettingScreen';
import CommonHeader from '@components/common/CommonHeader';
import { withNamespaces } from 'react-i18next';



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

class WrappedRootNavigator extends React.Component {
    static router = RootNavigator.router;
    render() {
      const {t} = this.props;
      console.log("WrappedRootNavigator this.props" ,this.props)
      return <RootNavigator screenProps={{ t }} {...this.props} />;
    }
  }
export default  withNamespaces('translation',{
    bindI18n: 'languageChanged',
    bindStore: false,
  }) (createAppContainer(WrappedRootNavigator));