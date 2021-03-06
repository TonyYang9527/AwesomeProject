import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import WithI18nProvider from '@components/hoc/WithI18nProvider';

AppRegistry.registerComponent(appName, () => WithI18nProvider(App));
