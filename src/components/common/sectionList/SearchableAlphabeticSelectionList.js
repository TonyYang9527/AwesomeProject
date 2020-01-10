'use strict';

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {computed, observable} from 'mobx';
import AlphabetSectionsList from './AlphabetSectionsList';
import SearchBar from '@components/common/SearchBar';
import {font_size_normal, margin, radius, space_6, space_least, space_small} from '@constants/Dimension';
import Colors from '@constants/Colors';
import ContentLayout from '@components/common/ContentLayout';

@observer
class SearchableAlphabeticSelectionList extends Component {
    @observable inputText = '';

    @computed
    get _filterData() {
        const { data, textPropertyName, phonecodePropertyName} = this.props;
        return data ? data.filter((item) => {
            let text = item[textPropertyName].toLowerCase();
            let code = '+'+item[phonecodePropertyName];

            if (text.includes(this.inputText)){
                return text.includes(this.inputText);
            } else if (code.includes(this.inputText)){
                return code.includes(this.inputText);
            }
            return false;
        }) : [];
    }

    render() {
        const {
            textPropertyName,
            phonecodePropertyName,
            onItemPress,
            searchEnable,
            searchHint,
            renderItem
        } = this.props;

        return (
            <ContentLayout >

                {searchEnable === true && <SearchBar
                    style={Style.searchBar}
                    boxStyle={Style.boxStyle}
                    iconStyle={Style.searchIconStyle}
                    textStyle={Style.searchTextStyle}
                    hint={searchHint}
                    hintColor={Colors.extraColor}
                    rightText={''}
                    onValueChange={(text) => {
                        this.inputText = text.toLowerCase();
                    }}
                    useClearButton={false}/>
                }

                <View style={Style.line}/>
                <AlphabetSectionsList
                    data={this._filterData}
                    renderItem={renderItem}
                    textPropertyName={textPropertyName}
                    onItemPress={onItemPress}/>
            </ContentLayout>
        );
    }
}

AlphabetSectionsList.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,

    textPropertyName: PropTypes.string,
    searchHint: PropTypes.string,

    onItemPress: PropTypes.func,
    searchEnable:PropTypes.bool,
    renderItem:PropTypes.func
};

const Style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    searchBar: {
        backgroundColor: '#f7f7f7',
        paddingLeft: space_least,
        paddingRight: space_least,
        paddingTop: space_small,
        paddingBottom: space_small,
    },
    boxStyle: {
        backgroundColor: Colors.white,
        borderRadius: radius,
        borderWidth: 0.5,
        borderColor: '#e7e7e7'
    },
    searchIconStyle: {
        tintColor: Colors.extraColor,
    },
    searchTextStyle: {
        color: Colors.textColor,
        fontSize: font_size_normal,
        paddingTop: space_6,
        paddingBottom: space_6,
    },

    line: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#e7e7e7'
    },
});

export default SearchableAlphabeticSelectionList;
