import React, {PureComponent} from 'react';
import {
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import PortSectionList from '../PortSectionList';
import * as Dimens from '@constants/Dimension';
import * as Colors from '@constants/Colors';
import * as CommonStyle from '@constants/Style';
import ErrorComponent from '../ErrorComponent'
import i18n from '@utils/i18n'
import { images as Resource } from '@resource'

const ITEM_HEIGHT = Dimens.MySize(42.5); //item的高度
const HEADER_HEIGHT = Dimens.MySize(49); //分组头部的高度
const SEPARATOR_HEIGHT = Dimens.MySize(1); //分割线的高度

export default class LetterSectionList extends PureComponent {
    static propTypes = {
        idKey: PropTypes.string.isRequired, // item ID 从 item 取值的 key 名
        itemSubTextKey: PropTypes.string, // item 次标题从 item 取值的 key 名
    };

    static defaultProps = {
        idKey: 'id',
        itemTextKey: 'name',
    };

    // 这边返回的是A,0这样的数据
    _onSectionSelect = (section, index) => {
        // 跳转到某一项
        if (this.sectionList != null) {
            // this.sectionList.scrollToIndex({animated: true, index: this.state.sectionSize[index]})
            this.sectionList.scrollToLocation({
                sectionIndex: index,
                itemIndex: 0,
                viewPosition: 0,
                viewOffset: 0,
            });
        }
    };

    _keyExtractor = item => String(item[this.props.idKey]);

    _getItemLayout(data, index) {
        let [length, separator, header] = [
            ITEM_HEIGHT,
            SEPARATOR_HEIGHT,
            HEADER_HEIGHT,
        ];
        return {length, offset: (length + separator) * index + header, index};
    }

    _renderItem = ({item}) => {
        const {idKey, itemSubTextKey, itemTextKey } = this.props;
        return (
            <TouchableOpacity
                key={item[idKey]}
                onPress={() => {
                    let {key, selectCallBack, navigation} = this.props;
                    selectCallBack &&
                        selectCallBack({
                            ...item,
                            key,
                        });
                    navigation.goBack();
                }}>
                <View style={styles.itemView}>
                    <Text style={CommonStyle.textNormalBlack}>{item[itemTextKey]}</Text>
                    {itemSubTextKey ? (
                        <Text style={styles.itemSubText}>
                            {item[itemSubTextKey]}
                        </Text>
                    ) : null}
                </View>
            </TouchableOpacity>
        );
    };

    _renderSectionHeader = ({section}) => {
        return (
            <View style={styles.headerView}>
                <Text style={CommonStyle.textNormalBlack}>{section.key}</Text>
            </View>
        );
    };

    render() {
        if (this.props.sections.length > 0) {
            return (
                <View style={{paddingTop: 0,flex:1}}>
                    <SectionList
                        ref={ref => (this.sectionList = ref)}
                        // enableEmptySections
                        stickySectionHeadersEnabled={true}
                        sections={this.props.sections}
                        renderItem={this._renderItem}
                        renderSectionHeader={this._renderSectionHeader}
                        keyExtractor={this._keyExtractor}
                        getItemLayout={this._getItemLayout}
                    />
                    {/*<PortSectionList*/}
                    {/*    sections={this.props.letters}*/}
                    {/*    onSectionSelect={this._onSectionSelect}*/}
                    {/*/>*/}
                </View>
            );
        } else {
            return <ErrorComponent
                        title={i18n.t('mobile.common.text.noresult')}
                        iconStyle={{ width: 132, height: 137, }}
                        icon={Resource.icon.noResult()}
                    />
        }
    }
}

const styles = StyleSheet.create({
    headerView: {
        justifyContent: 'center',
        height: HEADER_HEIGHT,
        paddingLeft: Dimens.MySize(28),
        backgroundColor: '#F8F8F8',
    },
    itemView: {
        flexDirection: 'row',
        marginHorizontal: Dimens.MySize(28),
        alignItems: 'center',
        height: ITEM_HEIGHT,
        borderBottomColor: Colors.lineGrey,
        borderBottomWidth: SEPARATOR_HEIGHT,
    },
    itemSubText: {
        fontSize: Dimens.font_size_normal,
        color: Colors.textLabel,
        marginLeft: 'auto',
        marginRight: Dimens.margin,
    },
});
