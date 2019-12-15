import * as React from 'react';
import { View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import Popup from '../Popup';
import PopupStyles from '../PopupStyles';
const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'red',
        padding: 5,
        width: 100,
    },
    root: {
        paddingTop: 100,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    content: {
        padding: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export class PopupPickerExample extends React.Component {
    render() {
        const popupContent = (<View style={styles.content}><Text>
      popupContent
    </Text></View>);
        return (<View style={{ height: 200 }}>
      <Popup styles={PopupStyles} style={styles.root} title={'title'} content={popupContent}>
        <TouchableHighlight activeOpacity={0.5} style={[styles.button]} underlayColor="#a9d9d4">
          <Text>show popup</Text>
        </TouchableHighlight>
      </Popup>
      </View>);
    }
}
export const PopupPickerSample = PopupPickerExample;
export const title = 'popup';
//# sourceMappingURL=sample.popup.js.map