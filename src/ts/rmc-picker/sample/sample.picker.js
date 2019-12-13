/* tslint:disable:no-console */
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import Picker from '../Picker';
import * as React from 'react';
let count = 0;
const len = 10;
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 5,
        width: 100,
    },
});
export class PickerSample extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: this.getItems(count),
            value: `${count + len / 2}`,
        };
        this.onChange = (value) => {
            console.log('onChange', value);
            this.setState({
                value,
            });
        };
        this.rerender = () => {
            count += len;
            const items = this.getItems(count);
            this.setState({
                items,
                value: String(count),
            });
        };
    }
    getItems(start) {
        const items = [];
        for (let i = start; i < start + len; i++) {
            items.push(<Picker.Item value={i} key={i}>
        {count + '' + i}
      </Picker.Item>);
        }
        return items;
    }
    render() {
        return (<View style={{ padding: 10 }}>
      <TouchableHighlight onPress={this.rerender} activeOpacity={0.5} style={[styles.button]} underlayColor="#a9d9d4">
        <Text>rerender</Text>
      </TouchableHighlight>
      <Picker selectedValue={this.state.value} onValueChange={this.onChange}>
        {this.state.items}
      </Picker>
    </View>);
    }
}
export const Demo = PickerSample;
export const title = 'picker';
//# sourceMappingURL=sample.picker.js.map