import React from 'react';
import { View, Text } from 'react-native';
import Cascader from '../Cascader';
import globalData from './data';
export class CascaderPickerDemo extends React.Component {
    constructor() {
        super(...arguments);
        this.onChange = (value) => {
            console.log('onChange', value);
        };
    }
    render() {
        return (<View style={{ padding: 10 }}>
      <View><Text>simple inline</Text></View>
      <Cascader data={globalData} onChange={this.onChange}/>
    </View>);
    }
}
export const CascaderPickerSample = CascaderPickerDemo;
export const title = 'picker';
//# sourceMappingURL=picker.js.map