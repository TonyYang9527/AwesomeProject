import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

function TextButton({ disabled, onPress, title, style, titleStyle, textProps }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[Styles.button, style]}>
            <Text
                style={[Styles.title, titleStyle]}
                {...textProps}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

TextButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
};

const Styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // paddingHorizontal: 8,
        // paddingVertical: 5,
    },
    title: {
        backgroundColor: 'transparent',
        // fontSize: 16,
        textAlign: 'center',
    },
});

export default TextButton;
