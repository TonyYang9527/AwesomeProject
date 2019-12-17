import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import CommonHeader from '@components/common/CommonHeader';
import { withNamespaces } from "react-i18next";

@withNamespaces()
export default class LanguageScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerLeft: null,
        headerTitle: <CommonHeader navigation={navigation} title={screenProps.t('Chinese')}
        />
    });

    render() {
        return (
            <View style={styles.container}>
                <Text> LanguageScreen </Text>
                <Text style={styles.message}>{this.props.t('greeting')}</Text>
                <Button title={this.props.t('English')} onPress={() => this.props.i18n.changeLanguage('en')} />
                <Button title={this.props.t('Chinese')} onPress={() => this.props.i18n.changeLanguage('zh')} />

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