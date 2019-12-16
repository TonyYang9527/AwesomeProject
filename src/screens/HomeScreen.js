

import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { withNamespaces } from "react-i18next";
import { inject, observer } from "mobx-react";

@withNamespaces()
@inject("appStore")
@observer
class App extends Component {

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.message}>{this.props.t('greeting')}</Text>
        <Text style={styles.message}>  {`selected Locale: ${JSON.stringify(this.props.appStore.locale)}`} </Text>
        <Text style={styles.message}>{`i18next Derived Locale: ${this.props.i18n.language}`}  </Text>

        <Button title={this.props.t('English')} onPress={() => this.props.appStore.changeLanguage('en')} />
        <Button title={this.props.t('Chinese')} onPress={() => this.props.appStore.changeLanguage('zh')} />
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

export default App
