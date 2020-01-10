import * as React from 'react';
import { View, Text } from 'react-native';
import DatePicker from '../../tscomponents/rmc-date-picker/DatePicker';
import zhCn from '../../tscomponents/rmc-date-picker/locale/zh_CN';
import enUs from '../../tscomponents/rmc-date-picker/locale/en_US';
import { cn, format, minDate, maxDate, now } from '../../tscomponents/rmc-date-picker/utils';

export class PickerDemo extends React.Component<any, any> {
  static defaultProps = {
    mode: 'datetime',
    locale: cn ? zhCn : enUs,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  onDateChange = (date) => {
    this.setState({
      date,
    });
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
        <DatePicker
          defaultDate={date || now}
          mode={props.mode}
          locale={props.locale}
          maxDate={maxDate}
          minDate={minDate}
          onDateChange={this.onDateChange}
        />
      </View>
    </View>);
  }
}

export const DatePickerSample = PickerDemo;
export const title = 'picker';