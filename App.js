

import React, { Component } from 'react';
import RootNavigator from '@navigator/RootNavigator';
import {initApplication, loadResources} from '@utils/AppLoader';
import SplashScreen from 'react-native-splash-screen';



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

initApplication();
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //init jPush
    // appStore.setupJpush();
    loadResources().then(() => {
      //appStore.setupJpush();
      this.setState({ isLoading: false });
      SplashScreen.hide();
  });
}

  render() {
    return (
      <RootNavigator />
    )
  }

}
export default App
