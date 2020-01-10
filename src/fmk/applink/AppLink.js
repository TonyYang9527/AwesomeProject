import { Linking, Platform } from 'react-native';

const AppLink = {};

AppLink.iosScheme = 'chartereronline://';
AppLink.appName = 'chartering';
AppLink.appStoreId = '1493815568';
AppLink.playStoreId = 'com.emarineonline.chartereronline';
AppLink.androidScheme = 'chartereronline://chartereronline';
AppLink.local = 'us';

/***check local  installed and go appstore or google play****/
AppLink.maybeOpenURL = async ({iosScheme,appName,appStoreId,androidScheme,playStoreId,local}) => {
  const appLocale = typeof local === 'undefined' ? 'us' : local;
   const url  = Platform.OS === 'ios'? iosScheme:androidScheme;
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
       console.log("Detecting not installed in your Device ");
        if(Platform.OS === 'ios') {
         const appStoreLink= `https://apps.apple.com/${appLocale}/app/${appName}/id${appStoreId}`;
         return  Linking.openURL(appStoreLink);
       }else if(Platform.OS === 'android') {
         const goglePlayLink= `https://play.google.com/store/apps/details?id=${playStoreId}&hl=${appLocale}`;
         return  Linking.openURL(goglePlayLink);
       }else{
         console.log("Device Platform Unkown!!!");
       }
    } else {
      console.log("Detecting installed in Device ");
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An Detecting installed in Device Error Occurred', err));
};

AppLink.openInStore = async ({appName,appStoreId,playStoreId,local }) => {
  const appLocale = typeof local === 'undefined' ? 'us' : local;
  if (Platform.OS === 'ios') {
    Linking.openURL(`https://apps.apple.com/${appLocale}/app/${appName}/id${appStoreId}`);
  } else if (Platform.OS === 'android') {
    Linking.openURL(`https://play.google.com/store/apps/details?id=${playStoreId}&hl=${appLocale}`);
  }else{
    console.log("Device Platform Unkown!!!");
  }
};

export default AppLink;