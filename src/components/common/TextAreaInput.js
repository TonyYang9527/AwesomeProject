import React, { Component,Fragment } from 'react';
import { BackHandler, Platform, StyleSheet, View, Text, ScrollView, Image, } from 'react-native';
import { TextareaItem } from '@ant-design/react-native'
import TextSmallGray from '@components/cargo/TextSmallGray';
import * as Colors from '@constants/Colors'
import { withNamespaces } from "react-i18next";

@withNamespaces()
export default class TextAreaInput extends Component {

    state = {
        height:0
    }

    render() {
        let content = this.props.content || ''
        return (
            <Fragment>
                <TextSmallGray style={{ fontSize: 14, fontWeight: 'normal', }} text={content} />
                <TextareaItem
                    rows={5}
                    count={100}
                    style={Styles.view}
                    styles={{
                        input: {...Styles.input},
                        container: {...Styles.container},
                    }}
                    autoHeight={true}
                    clear={true}
                    placeholder={''}
                    onChange={this.props.onChange}
                    onFocus={()=>{
                        this.setState({
                            height:100
                        })
                    }}
                    onBlur={()=>{
                        this.setState({
                            height:0
                        })
                    }}
                />
                <View style={{height:this.state.height}}></View>
            </Fragment>
        )
    }
}

const Styles = StyleSheet.create({
    view: {
        marginTop: 8,
        padding: 10,
        height: 120,
        fontSize: 14,
        borderRadius: 8, borderWidth: 1, borderColor: '#DFDFDF',
        backgroundColor: 'transparent'
    },
    input: { 
        backgroundColor: 'transparent', 
        fontSize: 14, lineHeight: 16, 
        textAlignVertical: "top",
        color:Colors.textColor
    },
    container: {
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    },
});