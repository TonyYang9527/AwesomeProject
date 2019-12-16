
import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';



export default class CallScreen extends Component {


    changeLanguage(lng) {
        this.props.i18n.changeLanguage(lng);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.handleButtonPressed()}>
                <View style={styles.container}>
                    <Text style={styles.message}>{this.props.i18n.t('THE FIRST WORD IN ENTERTAINMENT')}</Text>
                    <Button title={this.props.i18n.t('English')} onPress={() => changeLanguage('en')} />
                    <Button title={this.props.i18n.t('Portuguese')} onPress={() => changeLanguage('pt')} />
                </View>
            </TouchableOpacity>
        );
    }
}