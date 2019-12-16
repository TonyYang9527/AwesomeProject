import React from 'react';
import { I18nextProvider} from 'react-i18next';
import i18 from '@utils/i18n';

export default function WithI18nProvider(WrappedComponent){
    return class extends React.Component{
        render(){
            return(
                <I18nextProvider i18n={i18}>
                    <WrappedComponent {...this.props}/>
                </I18nextProvider>
            );
        }
    };
}
