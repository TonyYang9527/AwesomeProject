import * as React from 'react';
import { View, Text } from 'react-native';
import DatePicker from '../DatePicker';
import zhCn from '../locale/zh_CN';
import enUs from '../locale/en_US';
import { cn, format, minDate, maxDate, now } from '../utils';
export class PickerDemo extends React.Component {
    constructor(props) {
        super(props);
        this.onDateChange = (date) => {
            this.setState({
                date,
            });
        };
        this.state = {
            date: null,
        };
    }
    render() {
        const props = this.props;
        const { date } = this.state;
        return (<View style={{ padding: 10 }}>
      <View><Text>date picker</Text></View>
      <View>
        <View>
          <Text>{date && format(date) || format(now)}</Text>
        </View>
        <DatePicker defaultDate={date || now} mode={props.mode} locale={props.locale} maxDate={maxDate} minDate={minDate} onDateChange={this.onDateChange}/>
      </View>
    </View>);
    }
}
PickerDemo.defaultProps = {
    mode: 'datetime',
    locale: cn ? zhCn : enUs,
};
export const DatePickerSample = PickerDemo;
export const title = 'picker';
//# sourceMappingURL=DatePickerSample.js.map