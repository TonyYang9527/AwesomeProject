import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from "mobx-react";
import i18n from '@fmk/i18n/i18n';
import stores from '@stores';


export default function WithI18nProvider(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <I18nextProvider i18n={i18n} >
                    <Provider {...stores}>
                        <WrappedComponent    {...this.props} />
                   </Provider>
                </I18nextProvider>
            );
        }
    };
}
