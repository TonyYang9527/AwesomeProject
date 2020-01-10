import React, {Fragment, PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '@constants/Colors';
import SimpleSearchBar from './SimpleSearchBar';
import SimpleFlatList from './SimpleFlatList';
import CommonHeader from './CommonHeader';
import { withNamespaces } from "react-i18next";

/**
 * 实例：
 * const data = [{
 *     id: "282263493145526326",
 *     vesselTypeFrom: "DRY BULK",
 *     vesselTypeTo: "Bulk Carrier, Self-Discharging, Laker",
 *     createdDttm: "1577773288000",
 *     updatedDttm: "1577773412000",
 *     shipTypeDisplay: "大湖型自卸散货船",
 *     label: "大湖型自卸散货船",
 *     value: "Bulk Carrier, Self-Discharging, Laker",
 * }];
 * this.props.navigation.navigate('SearchableFlatList', {
 *     data,
 *     itemTextKey: 'label',
 *     itemMatchKeys: ['value', 'label'],
 *     selectCallBack: (item = {}) => console.log(item.value),
 * });
 */
@withNamespaces()
export default class SearchableFlatList extends PureComponent {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerLeft: null,
        headerTitle: (
            <CommonHeader
                navigation={navigation}
                title={navigation.getParam('headerTitle')}
            />
        ),
    });

    state = {
        inputText: '',
    };

    onValueChange = text => {
        this.setState({
            inputText: text.toLowerCase(),
        });
    };

    matchInputText = (item, key) => {
        const {inputText} = this.state;
        if (item && item.hasOwnProperty(key)) {
            return item[key]?.toLowerCase().includes(inputText);
        } else {
            return false;
        }
    };

    filterData = () => {
        const {navigation} = this.props;
        const {data, itemTextKey, itemMatchKeys} = navigation.state.params || {};
        const {inputText} = this.state;
        if (!inputText || !Array.isArray(data)) {
            return data;
        }

        return data.filter(item => {
            if (Array.isArray(itemMatchKeys) && itemMatchKeys.length > 0) {
                return itemMatchKeys.some(key => this.matchInputText(item, key));
            } else {
                return this.matchInputText(item, itemTextKey);
            }
        });
    };

    render() {
        const {navigation} = this.props;
        const {itemTextKey, searchHint, selectCallBack} = navigation.state.params || {};
        const finalData = this.filterData();
        return (
            <Fragment>
                <SimpleSearchBar
                    hint={searchHint}
                    hintColor={Colors.extraColor}
                    onValueChange={this.onValueChange}
                />
                <View style={Style.line} />
                <SimpleFlatList
                    data={finalData}
                    itemTextKey={itemTextKey}
                    selectCallBack={selectCallBack}
                    navigation={navigation}/>
            </Fragment>
        );
    }
}
const Style = StyleSheet.create({
    line: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#e7e7e7',
    },
});
