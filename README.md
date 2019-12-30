If you're coming from React version 0.60 and above, you should be referencing the package from GitHub instead of NPM. The author haven't released auto-linking support on NPM yet, even though it's already merged!?

Try these steps after you unlink and uninstall the existing version of react-native-config. Remember to revert to default Info.plist preprocessor settings in XCode build settings.

yarn add https://github.com/luggit/react-native-config.git

cd ios && pod install