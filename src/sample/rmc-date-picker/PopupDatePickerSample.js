import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import * as React from 'react';
import PopPicker from '../../tscomponents/rmc-date-picker/Popup';
import DatePicker from '../../tscomponents/rmc-date-picker/DatePicker';
import PopupStyles from '../../tscomponents/rmc-date-picker/PopupStyles';
import zhCn from '../../tscomponents/rmc-date-picker/locale/zh_CN';
import enUs from '../../tscomponents/rmc-date-picker/locale/en_US';
import { cn, format, minDate, maxDate, now } from '../../tscomponents/rmc-date-picker/utils';
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 5,
        width: 300,
    },
});
export class PopupDemo extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (date) => {
            console.log('onChange', format(date));
            this.setState({
                date,
            });
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
    render() {
        const props = this.props;
        const { date } = this.state;
        const datePicker = (<DatePicker defaultDate={now} minDate={minDate} maxDate={maxDate} mode={props.mode} locale={props.locale}/>);
        return (<View style={{ margin: 20 }}>
      <View>
        <Text>popup date picker</Text>
      </View>
      <View>
        <PopPicker datePicker={datePicker} styles={PopupStyles} title="Date picker" date={date} onDismiss={this.onDismiss} onChange={this.onChange}>
          <TouchableHighlight onPress={this.show} activeOpacity={0.5} style={[styles.button]} underlayColor="#a9d9d4">
            <Text>{date && format(date) || 'open'}</Text>
          </TouchableHighlight>
        </PopPicker>
      </View>
    </View>);
    }
}
PopupDemo.defaultProps = {
    mode: 'datetime',
    locale: cn ? zhCn : enUs,
};
export const PopupDatePickerSample = PopupDemo;
export const title = 'popup';
//# sourceMappingURL=PopupDatePickerSample.js.map