

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { withNamespaces } from "react-i18next";
import { inject, observer } from "mobx-react";
import CommonHeader from '@components/common/CommonHeader';

@withNamespaces()
@inject("appStore")
@observer
class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{this.props.t('greeting')}</Text>
        <Text style={styles.message}>  {`selected Locale: ${JSON.stringify(this.props.appStore.locale)}`} </Text>
        <Text style={styles.message}>{`i18next Derived Locale: ${this.props.i18n.language}`}  </Text>
        <Button title={this.props.t('English')} onPress={() => this.props.i18n.changeLanguage('en')} />
        <Button title={this.props.t('Chinese')} onPress={() => this.props.i18n.changeLanguage('zh')} />

        <Button title='Go LanguageScreen' onPress={() => this.props.navigation.navigate('LanguageScreen')} />
      </View>
    )
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
export default HomeScreen
