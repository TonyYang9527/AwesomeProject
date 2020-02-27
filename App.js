

import React, { Component } from 'react';
import RootNavigator from '@navigator/RootNavigator';
import {initApplication, loadResources} from '@utils/AppLoader';
import SplashScreen from 'react-native-splash-screen';
import JPush from 'jpush-react-native';
import {appStore} from '@stores/AppStore';

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
    JPush.init();
    //连接状态
    this.connectListener = result => {
        console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(this.connectListener);
    //通知回调
    this.notificationListener = result => {
        console.log("notificationListener:" + JSON.stringify(result))
    };
    JPush.addNotificationListener(this.notificationListener);
    //本地通知回调
    this.localNotificationListener = result => {
        console.log("localNotificationListener:" + JSON.stringify(result))
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    //自定义消息回调
    this.customMessageListener = result => {
        console.log("customMessageListener:" + JSON.stringify(result))
    };
    JPush.addCustomMessagegListener(this.customMessageListener);
    //tag alias事件回调
    this.tagAliasListener = result => {
        console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(this.tagAliasListener);
    //手机号码事件回调
    this.mobileNumberListener = result => {
        console.log("mobileNumberListener:" + JSON.stringify(result))
    };
    JPush.addMobileNumberListener(this.mobileNumberListener);
   
    loadResources().then(() => {
      this.setState({ isLoading: false });
      SplashScreen.hide();
      //init jPush
      appStore.setupJpush();
  });
}

  render() {
    return (
      <RootNavigator />
    )
  }

}
export default App
