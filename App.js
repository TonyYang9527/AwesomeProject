/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import CallScreen from '@screens/CallScreen';
import Counter from '@ts/Counter';
import { Hello } from '@ts/Hello';
import { PickerSample } from '@ts/rmc-picker/sample/sample.picker';
import { MultiPickerSample } from '@ts/rmc-picker/sample/sample.multipicker';
import { PopupPickerSample } from '@ts/rmc-picker/sample/sample.popup';
import { DatePickerSample } from '@ts/rmc-date-picker/sample/DatePickerSample';
import { PopupDatePickerSample } from '@ts/rmc-date-picker/sample/PopupDatePickerSample';
import { CascaderPickerSample } from '@ts/rmc-cascader/sample/picker';
import { CascaderPopupPickerSample } from '@ts/rmc-cascader/sample/popup';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* <PickerSample />
        <MultiPickerSample />
        <PopupPickerSample />
        <DatePickerSample />
        <PopupDatePickerSample /> */}
        <CascaderPickerSample />
        <CascaderPopupPickerSample />
      </SafeAreaView>
    </>
  );
};


export default App;
