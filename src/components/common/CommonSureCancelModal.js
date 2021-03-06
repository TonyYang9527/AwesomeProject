import React from 'react';
import {View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import {withNamespaces} from "react-i18next";
import { images as Resource } from '@resource';
import * as Colors from '@constants/Colors'
import * as Dimens from '@constants/Dimension'
import * as CommonStyle from '@constants/Style'

@withNamespaces()
export default class CommonSureCancelModal extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            modalVisible: false,
        }
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
    }

    setModalVisible(state) {
        this.setState({
            modalVisible: state,
        })
    }

    onPressOK(state) {
        this.setModalVisible(state);
        this.props.onPressOK();
    }

    onPressCancel(state) {
        this.setModalVisible(state);
    }

    render() {
        let title = this.props.title || ''
        let content = this.props.content || ''
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(false);
                }}
            >
                <View style={{ ...Styles.content }}>
                    <View  style={{ backgroundColor: 'white',width:Dimens.width-Dimens.padding*2,borderRadius: 4 }}>

                    <View style={{ ...Styles.top }}>
                        <Text style={{ marginTop: 32, color: Colors.textColor, fontSize:Dimens.MySize(18)}}>
                            {title}</Text>
                        <Text style={{ marginTop: 26, color: '#ADADAD', }}>
                            {content}</Text>
                    </View>
                    <View style={{ marginTop: 46, backgroundColor: '#DFDFDF',  height: 1, }}></View>
                    <View style={{ display: 'flex', flexDirection: 'row', height: 58, justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{  backgroundColor: 'white', width: 110, 
                        height: 36, borderRadius: 18, borderColor: '#2A72F9', borderWidth: 2, }}>
                            <TouchableOpacity onPress={() => { this.setModalVisible(false) }}>
                                <Text style={{ textAlign: 'center', lineHeight: 32, 
                                    fontSize: 15, color: '#2A72F9', fontWeight: 'normal', }}>
                                    {this.props.t('editprodinfo.button.cancel')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 23,backgroundColor: '#2A72F9', width: 110, 
                            height: 36, borderRadius: 18, }}>
                            <TouchableOpacity onPress={() => { this.onPressOK(false) }}>
                                <Text style={{ textAlign: 'center', lineHeight: 36, fontSize: 15, 
                                    color: 'white', fontWeight: 'normal', }}>
                                    {this.props.t('mobile.OK')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }    
    
};


const Styles = {
    content:{
        display: 'flex', flex: 1, backgroundColor: '#00000055', justifyContent:'center', alignItems:'center',
    },
    top:{
         backgroundColor: 'white',justifyContent:'center', alignItems:'center',borderRadius: 4
    }
};
