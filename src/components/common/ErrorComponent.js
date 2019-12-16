
import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import * as Colors from '@constants/Colors';
import * as Dimens from '@constants/Dimension';
import { images as Resource } from '@resource';

const ErrorComponent = ({ style, onPress, title, icon, iconStyle, textStyle }) => (
    <View style={[Styles.container, style]}>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => { onPress && onPress(0) }}>
            <Image resizeMode='cover'
                source={icon ? icon : Resource.icon.serverError()}
                style={[Styles.image, iconStyle]} />
        </TouchableOpacity>
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => { onPress && onPress(1) }}>
            <Text style={[Styles.text, textStyle]}>
                {typeof title === 'string' ? title : 'Request error, please retry .'}
            </Text>
        </TouchableOpacity>
    </View>
);

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 18,
        height: 18,
        margin: Dimens.space_min,
        tintColor: Colors.line
    },
    text: {
        marginTop: Dimens.space_min,
        marginBottom: Dimens.space_min,
        textAlignVertical: 'center',
        fontSize: Dimens.font_size_big,
        color: Colors.line
    },
});

export default ErrorComponent;
