import React from 'react';
import PropTypes from 'prop-types';
import ImgTxtItem from '../common/ImgTxtItem';
import { Picker } from '@ant-design/react-native';
import i18n from '@utils/i18n'
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {images as Resource} from '@resource'
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'

export interface LabelOnPickerProps {
    //  data: PropTypes.array.isRequired,
    //  onOk: PropTypes.func,
    //  placeholder: PropTypes.string,
    //  label:PropTypes.string
}

export default class LabelOnPicker extends React.Component <LabelOnPickerProps> {
    constructor(props) {
        super(props)
        this.state={
            picke: [''],
            display:'',
            disabled:false
        }
        this.show = () => {
        };
    }

    render(){
        const props = this.props;
        return(
            <Picker
                cols={1}
                title={this.props.title || ''}
                data={this.props.data}
                okText={i18n.t('mobile.OK')}
                dismissText={i18n.t('editprodinfo.button.cancel')}
                itemStyle={{height:40,lineHeight:40}}
                onOk={(v) => {
                    let item = this.props.data.find((e) => { return e.value === v[0] })
                    this.setState({picke: v});
                    this.setState({display :item ? item.label : ''});
                    this.props.onOk && this.props.onOk(item);
                }}
                value={this.state.picke} // default value
            >
               <TouchableOpacity
                    onPress={this.show}
                    style={Styles.container}>
                    <Text style={[Styles.label, props.value ? Styles.value : undefined, props.textStyle]}>
                        {props.value || this.props.placeholder}
                    </Text>
                    <Image
                        source={Resource.icon.next()}
                        style={[{ transform: [{ rotate: '90deg' }] }, props.iconStyle]}
                        resizeMode="contain"/>
                </TouchableOpacity>
            </Picker>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: Dimens.font_size_normal,
        color: Colors.textLabel,
        textAlign: 'left',
        marginRight: Dimens.space_large,
        flex:1
    },
    value: {
        color: Colors.textColor,
    },
});
