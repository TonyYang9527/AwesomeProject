import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { InputItem } from '@ant-design/react-native';
import * as Colors from '@constants/Colors'
import { InputSingleLines } from '@constants/Style';
import * as Dimens from '@constants/Dimension'

const InputStyle = {
    ...InputSingleLines,
    container: {
        height: Dimens.MySize(50),
        borderWidth: Dimens.line,
        borderColor: Colors.line,
        backgroundColor: 'white',
        paddingLeft: Dimens.padding,
        paddingRight: Dimens.padding,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 0,
        borderRadius: Dimens.MySize(25),
        marginLeft: 0,
    }
}

export default class RoundedInputView extends React.Component {

    constructor(props) {
        super(props);
        this.inputCfg = {
            clear: true,
            styles: InputStyle,
            placeholderTextColor: Colors.textHolder
        }
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this.myRef)
      }

    render() {
        const { icon, myStyle } = this.props;
        return <View style={[Styles.content,myStyle]}>
            <InputItem
                {...this.props}
                ref={(c) => this.myRef = c}
                {...this.inputCfg}
                labelNumber={2}
            >
                <Image
                    source={icon}
                    style={{ height: Dimens.MySize(20),width:Dimens.MySize(20), margin:0 }}
                    resizeMode='center' 
                />
            </InputItem>
        </View>
    }
}

const Styles = StyleSheet.create({
    content: {
        flex: 1, width: '100%'
    },
})
