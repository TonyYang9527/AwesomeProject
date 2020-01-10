import React, {PureComponent} from 'react';
import {Image, Platform, StyleSheet, TextInput, View} from 'react-native';
import Colors from '@constants/Colors';
import i18n from '@utils/i18n';
import {images as Resource} from '@resource';
import {
    font_size_normal,
    space_6,
    space_least,
    space_small,
    radius,
} from '@constants/Dimension';

export default class SimpleSearchBar extends PureComponent {
    static defaultProps = {
        searchDelay: 0,
        hint: i18n.t('mobile.search'),
        hintColor: '#DFDFDFE0',
        keyboardType: 'default',
    };

    _renderIcon = () => (
        <Image style={styles.searchIcon} source={Resource.icon.search()} />
    );

    _renderBody = () => {
        const {onValueChange, searchDelay} = this.props;
        return (
            <TextInput
                style={styles.searchText}
                selectionColor={this.props.hintColor}
                underlineColorAndroid="transparent"
                keyboardType={this.props.keyboardType}
                placeholder={this.props.hint}
                placeholderTextColor={this.props.hintColor}
                onChangeText={text => {
                    if (this.typingListener != null) {
                        clearTimeout(this.typingListener);
                        this.typingListener = null;
                    }
                    if (searchDelay > 0) {
                        this.typingListener = setTimeout(() => {
                            onValueChange && onValueChange(text);
                        }, searchDelay);
                    } else {
                        onValueChange && onValueChange(text);
                    }
                }}
            />
        );
    };

    render() {
        return (
            <View style={[styles.searchBar, this.props.style]}>
                <View style={styles.searchBox}>
                    <this._renderIcon />
                    <this._renderBody />
                </View>
            </View>
        );
    }
}

const BOX_PADDING = 7;

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        paddingLeft: space_least,
        paddingRight: space_least,
        paddingTop: space_small,
        paddingBottom: space_small,
    },
    searchBox: {
        flex: 1,
        flexDirection: 'row',
        height: 32,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: Colors.white,
        borderRadius: radius,
        borderWidth: 0.5,
        borderColor: '#e7e7e7',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: BOX_PADDING,
        marginLeft: BOX_PADDING,
        tintColor: Colors.extraColor,
    },
    searchText: {
        flex: 1,
        padding: 0,
        color: Colors.textColor,
        fontSize: font_size_normal,
        paddingTop: space_6,
        paddingBottom: space_6,
    },
});
