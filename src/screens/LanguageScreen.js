import React ,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';

export default class LanguageScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text> LanguageScreen </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});