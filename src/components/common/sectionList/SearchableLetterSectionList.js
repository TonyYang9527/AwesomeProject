import React, {Fragment, PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '@constants/Colors';
import LetterSectionList from './LetterSectionList';
import SimpleSearchBar from '../SimpleSearchBar';
import {CHINESE,langStore} from '@stores/lang/LangStore';
import { pinyin } from '@utils/Pinyin';
import ContentLayout from '@components/common/ContentLayout'

export default class SearchableLetterSectionList extends PureComponent {
    state = {
        inputText: '',
    };

    onValueChange = text => {
        this.setState({
            inputText: text.toLowerCase(),
        });
    };

    filterData = () => {
        const {sections, itemTextKey} = this.props;
        const {inputText} = this.state;
        if (!inputText || !Array.isArray(sections)) {
            return sections;
        }

        const filteredSections = [];
        sections.forEach(section => {
            if (Array.isArray(section?.data)) {
                let filteredData = []
                if (itemTextKey === 'display' && langStore.getLanguage()=== CHINESE) {
                    const inputTextLetter = pinyin.getFullChars(inputText).toLowerCase();
                    filteredData = section.data.filter(item =>
                        pinyin.getFullChars(item?.display).toLowerCase().includes(inputTextLetter),
                    );
                }else{
                    filteredData = section.data.filter(item =>
                        item?.name?.toLowerCase().includes(inputText),
                    );
                }
                if (filteredData.length > 0) {
                    filteredSections.push({
                        ...section,
                        data: filteredData,
                    });
                }
            }
        });
        return filteredSections;
    };

    render() {
        const {searchHint, sections, ...otherProps} = this.props;
        const finalSections = this.filterData();
        return (
            <ContentLayout style={{backgroundColor:Colors.white}}>
                <SimpleSearchBar
                    hint={searchHint}
                    hintColor={Colors.extraColor}
                    onValueChange={this.onValueChange}
                />
                <View style={Style.line} />
                <LetterSectionList sections={finalSections} {...otherProps} />
            </ContentLayout>
        );
    }
}
const Style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    line: {
        width: '100%',
        height: 0.5,
        backgroundColor: '#e7e7e7',
    },
});
