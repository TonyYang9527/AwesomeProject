

import React, { Component } from 'react';
import RootNavigator from '@navigator/RootNavigator';

if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

if (!__DEV__) {
  global.console.info = () => { };
  global.console.log = () => { };
  global.console.warn = () => { };
  global.console.debug = () => { };
  global.console.error = () => { };
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RootNavigator />
    )
  }

}
export default App
