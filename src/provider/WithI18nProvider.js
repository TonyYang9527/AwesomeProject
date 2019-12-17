import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from "mobx-react";
import appStore,{HomeTabArray,HomeTabbar} from '@stores/AppStore';
import i18n from '@utils/i18n';

console.log("appStore >>>>>>>>>>>",appStore )
console.log("HomeTabArray >>>>>>>>>>>",HomeTabArray )
console.log("HomeTabbar >>>>>>>>>>>",HomeTabbar )
export default function WithI18nProvider(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                 <Provider appStore={appStore}>
                    <I18nextProvider i18n={i18n}>
                        <WrappedComponent {...this.props} />
                    </I18nextProvider>
                 </Provider>
            );
        }
    };
}
