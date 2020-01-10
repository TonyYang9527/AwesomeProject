import React from 'react';
import {Provider} from 'mobx-react';
import stores from '@stores';

export default function WithStoreProvider(WrappedComponent){

    return class extends React.Component{

        render(){
            return(
                <Provider {...stores}>
                    <WrappedComponent {...this.props}/>
                </Provider>
            );
        }
    };
}
