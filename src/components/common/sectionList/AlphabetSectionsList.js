'use strict';
/* jshint esnext: true */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sectionListGetItemLayout from './react-native-section-list-get-item-layout/dist/index'
import AlphabetList from "./AlphabetList";
import {ColorPropType, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {quickSort, isAndroid} from "@utils/Utils";
import {PixelRatio} from "react-native";

const SECTION_KEY = 'key';
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const SECTION_PADDING_VERTICAL = 8;
const SECTION_FONT_SIZE = 12;
const ITEM_PADDING_VERTICAL = 14;
const ITEM_FONT_SIZE = 14;

const fontScale = PixelRatio.getFontScale();
const SECTION_HEIGHT = SECTION_PADDING_VERTICAL * 2 + fontScale * SECTION_FONT_SIZE;
const ITEM_HEIGHT = ITEM_PADDING_VERTICAL * 2 + fontScale * ITEM_FONT_SIZE;
const SEPARATOR_HEIGHT = 1;

const AlphabetListWrapper = ({
                                 data,
                                 alphabetListProps,
                                 style,
                                 hideAlphabetList,
                                 scrollToSection
                             }) => {
    const dataIsArray = Array.isArray(data);
    if (!dataIsArray) {
        data = Object.keys(data);
    }
    if (!hideAlphabetList) {
        return (
            <AlphabetList
                {...alphabetListProps}
                style={style}
                onSectionSelect={scrollToSection}
                alphabets={data}/>
        );
    } else {
        return null;
    }
};

class SectionListWrapper extends Component {

    render() {
        const {
            initialNumToRender,
            sections,
            parentProps,
            keyExtractor,
            renderItem,
            renderSectionHeader,
            ItemSeparatorComponent,
            getItemLayout,
        } = this.props;

        const {
            onEndReached,
            extraData,
            ListEmptyComponent,
            onEndReachedThreshold,
            onRefresh,
            refreshing,
            ListHeaderComponent,
            renderSectionFooter,
            SectionSeparatorComponent,
            stickySectionHeadersEnabled,
        } = parentProps;

        return (
            <SectionList
                ref={(component) => (
                    this.sectionList = component
                )}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                ItemSeparatorComponent={ItemSeparatorComponent}
                sections={sections}
                // initialNumToRender={initialNumToRender}
                onScrollToIndexFailed={() => {
                }}
                getItemLayout={getItemLayout}
                onEndReached={onEndReached}
                extraData={extraData}
                ListEmptyComponent={ListEmptyComponent}
                onEndReachedThreshold={onEndReachedThreshold}
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListHeaderComponent={ListHeaderComponent}
                renderSectionFooter={renderSectionFooter}
                SectionSeparatorComponent={SectionSeparatorComponent}
                stickySectionHeadersEnabled={stickySectionHeadersEnabled}/>
        );
    }

    scrollToLocation = (props) => {
        this.sectionList.scrollToLocation(props);
    };
}

function _getDisplayText(item, getTextForDisplay, textPropertyName) {
    let text = getTextForDisplay
        ? getTextForDisplay(item) : item[textPropertyName];
    text = text == null ? '' : text;
    return text;
}

const _keyExtractor = (item, index) => (
    index.toString()
);

const _renderItem = ({item, textPropertyName, index, section, onItemPress}) => {
    const Component = onItemPress ? TouchableOpacity : View;
    const text = item[textPropertyName];

    return (
        <Component style={DefaultStyle.item}
                   onPress={() => (
                       onItemPress && onItemPress(item)
                   )}>
            <Text key={`${section}-${index}`}
                  style={DefaultStyle.itemText}>{text == null ? '' : text}</Text>
        </Component>
    );
};

const _renderSectionHeader = (sectionText) => (
    <View style={DefaultStyle.section}>
        <Text
            style={DefaultStyle.sectionText}>{sectionText}</Text>
    </View>
);

const _ItemSeparatorComponent = () => (
    <View style={DefaultStyle.separator}/>
);

class AlphabetSectionsList extends Component {

    constructor(props, context) {
        super(props, context);

        this.getItemLayout = sectionListGetItemLayout({
            getItemHeight: () => (
                this.props.cellHeight != null ? this.props.cellHeight : ITEM_HEIGHT
            ),
            getSeparatorHeight: () => (
                this.props.separatorHeight != null ? this.props.separatorHeight : SEPARATOR_HEIGHT
            ), 
            getSectionHeaderHeight: () => (
                this.props.sectionHeaderHeight != null ? this.props.sectionHeaderHeight : SECTION_HEIGHT
            ), 
            getSectionFooterHeight: () => 0, 
        });
    }

    _scrollToSection = (section, sections) => {
        const onScrollToSection = this.props.onScrollToSection;

        // const index = letters.indexOf(section);
        const index = sections.findIndex((element) => (
            section === element['key']
        ));
        this.refs["sectionList"].scrollToLocation({sectionIndex: index, itemIndex: 0, animated: true});

        onScrollToSection && onScrollToSection(section);
    };

    render() {
        const {
            style,
            keyExtractor,
            hideAlphabetList,
            // item
            renderItem,
            onItemPress,
            ItemSeparatorComponent,
            // section
            textPropertyName,
            getTextForDisplay,
            renderSectionHeader,
            // extra data
            extraSectionsToFirst,
            extraLettersToFirst,
            // alphabet list props
            isAlphabetListFloat,
            alphabetListStyle,
            getAlphabetTitle,
            renderAlphabetComponent,
            alphabetColor,
            alphabetFontSize,
            alphabetFontWeight,
            alphabetPaddingHorizontal,
        } = this.props;

        let {data} = this.props;

        function _compareData(a, b) {
            const aText = _getDisplayText(a, getTextForDisplay, textPropertyName);
            const bText = _getDisplayText(b, getTextForDisplay, textPropertyName);

            return ((bText < aText) ? 1 : ((bText > aText) ? -1 : 0));
        }

        data = quickSort(data, _compareData);

        let sections = new Map(), letters = new Set();

        if (extraLettersToFirst != null
            && extraLettersToFirst.hasOwnProperty('length')
            && extraLettersToFirst.length > 0) {
            // add extra letter data to Set
            extraLettersToFirst.map((item) => (
                letters.add(item)
            ));
        }

        function _putDataToMap(letter, item) {
            if (sections.has(letter)) {
                const letterData = sections.get(letter);
                letterData.push(item);

            } else {
                const letterData = [item];
                sections.set(letter, letterData);
                letters.add(letter);
            }
        }

        data.map((item) => {
            const text = _getDisplayText(item, getTextForDisplay, textPropertyName);
            const letter = text.charAt(0).toUpperCase();
            if (ALPHABET.indexOf(letter) !== -1 && letter.length > 0) {
                _putDataToMap(letter, item);
            } else {
                _putDataToMap('#', item);
            }
        });

        
        sections = Array.from(sections, (value) => {
            let key = value[0];
            let data = value[1];
            return {key: key, data: data}
        });
        letters = Array.from(letters);

        if (extraSectionsToFirst != null) {
            // add extra sections data to sections
            sections.splice(0, 0, ...extraSectionsToFirst);
        }
        let count = 20 ;
        if(isAndroid()){
            count = sections.length*2 ;
            for(let i = 0 ; i < sections.length ; i++){
                count +=sections[i].data.length;
            }
        }

        const AlphabetListProps = {
            isFloat: isAlphabetListFloat,
            getAlphabetTitle,
            renderAlphabetComponent,
            alphabetColor,
            alphabetFontSize,
            alphabetFontWeight,
            alphabetPaddingHorizontal,
        };

        let renderItemFunc = ({item, index, section}) => {
            if (renderItem) {
                return renderItem({item, index, section, textPropertyName});
            } else {
                return _renderItem({item, textPropertyName, index, section, onItemPress});
            }
        };

        let renderSectionHeaderFunc = ({section}) => {
            if (renderSectionHeader) {
                return renderSectionHeader(section);
            } else {
                return _renderSectionHeader(section['key']);
            }
        };

        const SectionListProps = {
            sections,
            initialNumToRender:count,
            parentProps: this.props,
            keyExtractor,
            renderItem: renderItemFunc,
            renderSectionHeader: renderSectionHeaderFunc,
            ItemSeparatorComponent,
            getItemLayout: this.getItemLayout,
        };

        return (
            <View
                ref="view"
                style={[
                    DefaultStyle.container,
                    style,
                ]}>

                <SectionListWrapper
                    ref={"sectionList"}
                    {...SectionListProps} />

                <AlphabetListWrapper
                    data={letters}
                    alphabetListProps={AlphabetListProps}
                    style={alphabetListStyle}
                    hideAlphabetList={hideAlphabetList}
                    scrollToSection={(section) => (
                        this._scrollToSection(section, sections)
                    )}/>

            </View>
        );
    }

}

const StyleSheetProp = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
]);

AlphabetSectionsList.propTypes = {

    /** Styles to pass to the container */
    style: StyleSheetProp,

    keyExtractor: PropTypes.func,

    /** The data to render in the SectionList */
    data: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,

    /** Whether to show the section listing or not */
    hideAlphabetList: PropTypes.bool,

    renderItem: PropTypes.func,
    onItemPress: PropTypes.func,
    ItemSeparatorComponent: PropTypes.any,

    textPropertyName: PropTypes.string,
    getTextForDisplay: PropTypes.func,
    renderSectionHeader: PropTypes.func,

    // extra data
    /** the section property name must be 'key', data property name must be 'data' */
    extraSectionsToFirst: PropTypes.array,
    extraLettersToFirst: PropTypes.array,

    /** Callback which should be called when the user scrolls to a section */
    onScrollToSection: PropTypes.func,

    // Alphabet List
    /** Styles to pass to the section list container */
    alphabetListStyle: StyleSheetProp,
    isAlphabetListFloat: PropTypes.bool,
    /** Function to provide a title the section list items. */
    getAlphabetTitle: PropTypes.func,
    /** A component to render for each section item */
    renderAlphabetComponent: PropTypes.func,
    alphabetColor: ColorPropType,
    alphabetFontSize: PropTypes.number,
    // alphabetFontWeight: TextStylePropTypes.fontWeight,
    alphabetPaddingHorizontal: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),


    /** The height of the cell component */
    cellHeight: PropTypes.number.isRequired,
    /** The height of the separator */
    separatorHeight: PropTypes.number.isRequired,
    /** The height of the section header component */
    sectionHeaderHeight: PropTypes.number.isRequired,

};

AlphabetSectionsList.defaultProps = {
    keyExtractor: _keyExtractor,
    textPropertyName: SECTION_KEY,
    stickySectionHeadersEnabled: false,
    ItemSeparatorComponent: _ItemSeparatorComponent,
    // Alphabet List
};

const DefaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    item: {
        // paddingTop: ITEM_PADDING_VERTICAL,
        // paddingBottom: ITEM_PADDING_VERTICAL,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        height: ITEM_HEIGHT,
    },
    itemText: {
        fontSize: ITEM_FONT_SIZE,
        color: '#2e2e2e',
        textAlignVertical: 'center',
    },
    section: {
        // paddingTop: SECTION_PADDING_VERTICAL,
        // paddingBottom: SECTION_PADDING_VERTICAL,
        backgroundColor: "#f7f7f7",
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        height: SECTION_HEIGHT,
    },
    sectionText: {
        fontSize: SECTION_FONT_SIZE,
        color: '#666666',
        textAlignVertical: 'center',
    },
    separator: {
        height: SEPARATOR_HEIGHT,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: '#d9d9d9',
    },

});

export default AlphabetSectionsList;
