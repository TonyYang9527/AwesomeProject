import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from "mobx-react";
import { appStore, HomeTabArray, HomeTabbar } from '@stores/AppStore';
import i18n from '@utils/i18n';

console.log("appStore >>>>>>>>>>>", appStore)
console.log("HomeTabArray >>>>>>>>>>>", HomeTabArray)
console.log("HomeTabbar >>>>>>>>>>>", HomeTabbar)
export default function WithI18nProvider(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <I18nextProvider i18n={i18n}>
                    <Provider appStore={appStore}>
                        <WrappedComponent {...this.props} />
                    </Provider>
                </I18nextProvider>

            );
        }
    };
}
