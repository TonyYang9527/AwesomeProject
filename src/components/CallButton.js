
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default class CallButton extends Component {


    constructor(props) {
        super(props);
        const { t, i18n } = useTranslation();
    }

    changeLanguage(lng) {
        this.i18n.changeLanguage(lng);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>{t('THE FIRST WORD IN ENTERTAINMENT')}</Text>
                <Button title={this.t('English')} onPress={() => changeLanguage('en')} />
                <Button title={this.t('Chinese')} onPress={() => changeLanguage('zh')} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 20,
    },
});