'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ColorPropType, StyleSheet, Text, View} from 'react-native';
// import TextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes';

const Alphabet = ({
                      index,
                      section,
                      getAlphabetTitle,
                      renderAlphabetComponent,
                      alphabetColor,
                      alphabetFontSize,
                      alphabetFontWeight,
                      alphabetPaddingHorizontal,
                      onLayout,
                  }) => {

    const title = getAlphabetTitle
        ? getAlphabetTitle(index, section)
        : section;

    const child = renderAlphabetComponent
        ? (
            renderAlphabetComponent(index, section)
        ) : (
            <Text style={{
                fontSize: alphabetFontSize,
                color: alphabetColor,
                fontWeight: alphabetFontWeight,
                paddingLeft: alphabetPaddingHorizontal,
                paddingRight: alphabetPaddingHorizontal,
                paddingTop: 2,
                paddingBottom: 2,
            }}>{title}</Text>
        );

    return (
        <View
            pointerEvents="none"
            onLayout={onLayout}>
            {child}
        </View>
    );
};

Alphabet.propTypes = {
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
};

Alphabet.defaultProps = {
    alphabetColor: '#009EFF',
    alphabetFontSize: 10,
    alphabetFontWeight: '700',
    alphabetPaddingHorizontal: 3,
};

const _returnTrue = () => true;

class AlphabetList extends Component {

    static propTypes = {
        isFloat: PropTypes.bool,

        /** Function to be called upon selecting a section list item */
        onSectionSelect: PropTypes.func,

        /** The alphabets to render */
        alphabets: PropTypes.array.isRequired,

        /** A style to apply to the section list container  */
        style: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.object,
        ]),

        ...Alphabet.propTypes,
    };

    static defaultProps = {
        isFloat: true,
    };

    constructor(props, context) {
        super(props, context);

        this.lastSelectedIndex = null;
    }

    _onSectionSelect = (sectionId, fromTouch) => {
        this.props.onSectionSelect && this.props.onSectionSelect(sectionId);

        if (!fromTouch) {
            this.lastSelectedIndex = null;
        }
    };

    _detectAndScrollToSection = (e) => {
        const ev = e.nativeEvent.touches[0];
        let targetY = ev.locationY;

        const {y, height} = this.measure;

        if (!y || targetY < y) {
            return;
        }

        const alphabets = this.props.alphabets;
        let index = Math.floor((targetY - y) / height);
        index = Math.min(index, alphabets.length - 1);
        if (this.lastSelectedIndex !== index) {
            this.lastSelectedIndex = index;
            this._onSectionSelect(alphabets[index], true);
        }

    };

    _resetSection = () => {
        this.lastSelectedIndex = null;
    };
    _renderSections = (AlphabetProps, {alphabets}) => (
        alphabets.map((section, index) => (
            <Alphabet
                key={`${section}-${index}`}
                index={index}
                section={section}
                {...AlphabetProps}
                onLayout={(event) => {
                    if (index === 0) {
                        let {y, height} = event.nativeEvent.layout;
                        this.measure = {
                            y: y,
                            height,
                        };
                    }
                }}/>
        ))
    );

    render() {
        let {
            style,
            alphabets,
            isFloat,
            getAlphabetTitle,
            renderAlphabetComponent,
            alphabetColor,
            alphabetFontSize,
            alphabetFontWeight,
            alphabetPaddingHorizontal,
        } = this.props;

        const AlphabetProps = {
            getAlphabetTitle,
            renderAlphabetComponent,
            alphabetColor,
            alphabetFontSize,
            alphabetFontWeight,
            alphabetPaddingHorizontal,
        };

        if (isFloat) {
            style = StyleSheet.flatten([style, Style.float]);
        }

        return (
            <View ref="view"
                  style={[
                      Style.container,
                      style,
                  ]}
                  onStartShouldSetResponder={_returnTrue}
                  onMoveShouldSetResponder={_returnTrue}
                  onResponderGrant={this._detectAndScrollToSection}
                  onResponderMove={this._detectAndScrollToSection}
                  onResponderRelease={this._resetSection}>

                {
                    this._renderSections(AlphabetProps, {alphabets})
                }

            </View>
        );
    }
}

const Style = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    float: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
    }
});

export default AlphabetList;
