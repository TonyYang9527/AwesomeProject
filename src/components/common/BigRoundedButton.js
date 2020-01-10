import React, { Component } from "react";
import { Image, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import * as Colors from '@constants/Colors'
import * as Dimension from '@constants/Dimension'
import LinearGradient from 'react-native-linear-gradient'

const { height, width } = Dimensions.get('window');
export default class BigRoundedButton extends Component {

    render() {
        const {onPress, titles, style, colors} = this.props;
        return (
            <LinearGradient 
                colors={colors || ['#0033BB','#4C7AEE' ]} 
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} 
                style={[Styles.bottomView,style]}>
                <TouchableOpacity style={Styles.bottomTabView}
                    onPress={()=>{
                        onPress && onPress()
                    }}>
                    <Text style={Styles.bottomTabText}>{titles || ''}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
}

const Styles = StyleSheet.create({
    bottomView: {
        width:width-Dimension.MySize(24),
        marginHorizontal: Dimension.MySize(12),
        height:Dimension.MySize(50),
        borderRadius: Dimension.MySize(24),
        flex:1
    },
    bottomTabView: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    bottomTabText: {
        fontSize: Dimension.MySize(16),
        fontWeight: 'normal',
        color:Colors.white,
    },
})