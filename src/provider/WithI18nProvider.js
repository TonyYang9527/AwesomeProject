import React from 'react';
import { I18nextProvider} from 'react-i18next';
import { Provider } from "mobx-react";
import i18n from '@utils/i18n';
import appStore from '@stores/AppStore';


export default function WithI18nProvider(WrappedComponent){
    return class extends React.Component{
        render(){
            return(
                <Provider appStore={appStore}>
                <I18nextProvider i18n={i18n}>
                    <WrappedComponent {...this.props}/>
                </I18nextProvider>
                </Provider>
            );
        }
    };
}
