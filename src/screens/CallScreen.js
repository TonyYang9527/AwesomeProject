
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { PickerSample } from '@ts/rmc-picker/sample/sample.picker';
import { MultiPickerSample } from '@ts/rmc-picker/sample/sample.multipicker';
import { PopupPickerSample } from '@ts/rmc-picker/sample/sample.popup';
import { DatePickerSample } from '@ts/rmc-date-picker/sample/DatePickerSample';
import { PopupDatePickerSample } from '@ts/rmc-date-picker/sample/PopupDatePickerSample';
import { CascaderPickerSample } from '@ts/rmc-cascader/sample/picker';
import { CascaderPopupPickerSample } from '@ts/rmc-cascader/sample/popup';





class CallScreen extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View style={styles.container}>
                <PickerSample />
                <MultiPickerSample />
                <PopupPickerSample />

                <DatePickerSample />
                <PopupDatePickerSample />

                <CascaderPickerSample />
                <CascaderPopupPickerSample />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CallScreen;