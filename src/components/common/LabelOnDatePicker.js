import React from 'react'
import ImgTxtItem from '../../components/common/ImgTxtItem'
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {images as Resource} from '@resource'
import {format, convertToStringMonth, DISPLAY_DATE} from '@utils/DateUtil';
import PopPicker from '@tscomponents/rmc-date-picker/Popup';
import DatePicker from '@tscomponents/rmc-date-picker/DatePicker';
import PopupStyles from '@tscomponents/rmc-date-picker/PopupStyles';
import {now} from '@tscomponents/rmc-date-picker/utils';
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import i18n from '@utils/i18n'
import {CHINESE,langStore} from '@stores/lang/LangStore';

export interface LabelOnDatePickerProps {
    // label: PropTypes.string.isRequired, placeholder: PropTypes.string, onOk:
    // PropTypes.func,
}
export default class LabelOnDatePicker extends React.Component < LabelOnDatePickerProps > {
    constructor(props) {
        super(props)
        this.onChange = (date) => {
            this.props.onOk && this.props.onOk(date)
        };
        this.onDismiss = () => {
            console.log('onDismiss');
        };
        this.show = () => {
            console.log('my click');
        };
        this.state = {
            date: null,
        };
    }

    _formatMonth= (i, date)=>{
        let lang = langStore.getLanguage();
        if (lang !== CHINESE) {
            return convertToStringMonth(i+1)
        }
        return i + 1 + ''
        
    }


    render() {
        let lang = langStore.getLanguage();
        const props = this.props;
        const datePicker = (<DatePicker
            defaultDate={now}
            minDate={new Date(1995, 1, 1, 0, 0, 0)}
            maxDate={new Date(2050, 1, 1, 23, 59, 59)}
            mode={props.mode}
            formatMonth={this._formatMonth}
            locale={props.locale}/>);
        return (
            <View style={props.style}>
            <PopPicker
                datePicker={datePicker}
                styles={PopupStyles}
                title={this.props.placeholder}
                okText={i18n.t('mobile.OK')}
                dismissText={i18n.t('editprodinfo.button.cancel')}
                date={props.value}
                onDismiss={this.onDismiss}
                onChange={this.onChange}>
                <TouchableOpacity
                    onPress={this.show}
                    style={Styles.container}>
                    <Text style={[Styles.label, props.value ? Styles.value : undefined, props.textStyle]}>
                        {props.value && format(props.value,lang !== CHINESE ? 'DD MMM YYYY' : DISPLAY_DATE)
                         || this.props.placeholder}
                    </Text>
                    {
                        props.hideIcon ? null : (
                            <Image
                                source={Resource.icon.calendar()}
                                resizeMode="contain"/>
                        )
                    }
                </TouchableOpacity>
            </PopPicker>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: Dimens.font_size_normal,
        color: Colors.textLabel,
        textAlign: 'left',
        marginRight: Dimens.space_large,
    },
    value: {
        color: Colors.textColor,
    },
});
