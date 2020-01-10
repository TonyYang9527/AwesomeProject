'use strict';

import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {observer,inject} from "mobx-react";
import {observable} from "mobx";
import {border, font_size_normal, line, space, space_least} from "@constants/Dimension";
import {CHINESE, ENGLISH} from "@stores/lang/LangStore";
import {Assets} from "react-native-ui-lib";
import Colors from "@constants/Colors";
import i18n from '@utils/i18n'


const LanguageItem = ({ isSimple, language,translateKey,flag, selected, onPress }) => (
    <TouchableOpacity style={{  padding: space,  flexDirection: 'row', alignItems: 'center',}}  onPress={onPress}>
        {
         !isSimple && ( <Image  style={{width: 16,height: 16,marginRight: space_least,}} source={flag}/> )
        }
        <Text style={{  fontSize: 16,  color: Colors.textColor, }}>{translateKey}</Text>
        {/* <Text style={{  fontSize: 16,  color: Colors.textColor, }}>{i18n.t(translateKey)}</Text> */}
        <View style={{ flex: 1, }}/>
        {
         selected ? (<Image style={{width: 16, height: 16,}} source={Assets.icons.iconChecked}/> ) :(<Image style={{width: 16, height: 16,}} source={Assets.icons.iconUnChecked}/> )
        }
    </TouchableOpacity>
);


@inject("langStore")
@observer
class LanguageOptions extends Component {

  
    constructor(props) {
        super(props)
        this.onPress = this.onPress.bind(this)
    }

    onPress(lang) {
        this.props.langStore.setSelected(lang)
        this.props.onSelected(lang)
    }

    render() {
        const {isSimple,onSelected} = this.props;

        let shadowStyle;
        if(isSimple) {
            shadowStyle = {};
        }else {
            shadowStyle = {
                borderWidth: border,
                borderColor: Colors.borderColor,
                shadowRadius: 2,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowColor: Colors.shadow,
                elevation: 0.5,
            };
        }

        return (
            <View
                style={[
                    shadowStyle,
                    {
                        backgroundColor: Colors.white,
                        width: '100%',
                    }
                ]}>

                <LanguageItem
                    isSimple={isSimple}
                    language={ENGLISH}
                    translateKey={'English'}
                    flag={Assets.icons.enFlag}
                    selected={ this.props.selected === ENGLISH}
                    onPress={() => {this.onPress(ENGLISH)  }}/>


                <View style={{
                    marginHorizontal: space,
                    height: line,
                    backgroundColor: Colors.borderColor,
                }}/>

                <LanguageItem
                    isSimple={isSimple}
                    language={CHINESE}
                    translateKey={'简体中文'}
                    flag={Assets.icons.zhFlag}
                    selected={this.props.selected  === CHINESE}
                    onPress={() => {this.onPress(CHINESE)  }}/>

            </View>
        );
    }

    getSelectedLanguage() {
        return this.selectedLanguage;
    }
}

export default LanguageOptions;
