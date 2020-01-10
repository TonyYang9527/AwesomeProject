'use strict';

import React, {Component} from "react";
import {StatusBar, View} from "react-native";
import CommonHeader from '@components/common/CommonHeader';
import {font_size_middle, space_min} from "@constants/Dimension";
import LanguageOptions from "@components/setting/LanguageOptions";
import {langStore} from "@stores/lang/LangStore";
import Colors from "@constants/Colors";
import { withNamespaces } from "react-i18next";
import { inject, observer } from "mobx-react";


@withNamespaces()
@inject("langStore")
@observer
class ChangeLanguageScreen extends Component {

    static navigationOptions = ({ navigation ,screenProps}) => ({
        headerLeft: null,
        headerTitle: <CommonHeader
            navigation={navigation}
            title={screenProps.t('mobile.Language')}
            rightText={screenProps.t('mobile.Done')}
            onRightPress={()=>{
                langStore.setLanguage(navigation.getParam('lang'))
                navigation.goBack();
            }}
            />
    });

    constructor(props) {
        super(props)
        this.navi = props.navigation
        this.onSelected = this.onSelected.bind(this) 
       langStore.initselected();
    }

    onSelected(lang) {
        this.props.navigation.setParams({'lang':lang})
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{ paddingTop: space_min, flex: 1,backgroundColor: Colors.background,}}>
                <LanguageOptions  onSelected={this.onSelected}  selected={langStore.selected}  langStore={langStore}
                    isSimple={false}  ref={(component) => ( this.languageOptions = component )}/>
            </View>
        );
    }
}

export default ChangeLanguageScreen;
