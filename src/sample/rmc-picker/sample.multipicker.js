/* tslint:disable:no-console */
import MultiPicker from '../../tscomponents/rmc-picker/MultiPicker';
import Picker from '../../tscomponents/rmc-picker/Picker';
import * as React from 'react';
import { View } from 'react-native';
export class MultiPickerSample extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            value: ['1', '11'],
        };
        this.onChange = (value) => {
            console.log('onChange', value);
            this.setState({
                value,
            });
        };
    }
    render() {
        return (<View style={{ borderWidth: 2, padding: 10 }}>
        <MultiPicker style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
        }} selectedValue={this.state.value} onValueChange={this.onChange}>
          <Picker style={{ flex: 1 }}>
            <Picker.Item value="1">one</Picker.Item>
            <Picker.Item value="2">two</Picker.Item>
            <Picker.Item value="3">three</Picker.Item>
            <Picker.Item value="4">four</Picker.Item>
            <Picker.Item value="5">five</Picker.Item>
            <Picker.Item value="6">six</Picker.Item>
            <Picker.Item value="7">seven</Picker.Item>
            <Picker.Item value="8">eight</Picker.Item>
          </Picker>
          <Picker style={{ flex: 1 }}>
            <Picker.Item value="11">eleven</Picker.Item>
            <Picker.Item value="12">twelve</Picker.Item>
            <Picker.Item value="13">thirteen</Picker.Item>
            <Picker.Item value="14">fourteen</Picker.Item>
            <Picker.Item value="15">fifteen</Picker.Item>
            <Picker.Item value="16">sixteen</Picker.Item>
            <Picker.Item value="17">seventeen</Picker.Item>
            <Picker.Item value="18">eighteen</Picker.Item>
          </Picker>
        </MultiPicker>
      </View>);
    }
}
export const Demo = MultiPickerSample;
export const title = 'multi-picker';
//# sourceMappingURL=sample.multipicker.js.map