import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Colors from '@constants/Colors';
import * as Dimens from '@constants/Dimension';
import * as CommonStyle from '@constants/Style';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = Dimens.MySize(42.5); //item的高度
const SEPARATOR_HEIGHT = Dimens.MySize(1); //分割线的高度

const noop = () => {};

export default class SimpleFlatList extends PureComponent {
    static propTypes = {
        idKey: PropTypes.string.isRequired, // item ID 从 item 取值的 key 名
        itemTextKey: PropTypes.string, // 从 item 取值用于搜索匹配的 key 名
        selectCallBack: PropTypes.func, // 点击 item 调用的回调函数
    };

    static defaultProps = {
        idKey: 'id',
        itemTextKey: 'name',
        selectCallBack: noop,
    };

    keyExtractor = item => String(item[this.props.idKey]);

    renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    const {navigation, selectCallBack} = this.props;
                    selectCallBack && selectCallBack(item);
                    navigation.goBack();
                }}>
                <View style={styles.itemView}>
                    <Text style={CommonStyle.textNormalBlack}>
                        {item[this.props.itemTextKey]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}/>
        );
    }
}

const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row',
        marginHorizontal: Dimens.MySize(28),
        alignItems: 'center',
        height: ITEM_HEIGHT,
        borderBottomColor: Colors.lineGrey,
        borderBottomWidth: SEPARATOR_HEIGHT,
    },
});
