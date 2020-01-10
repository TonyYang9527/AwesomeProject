
import React from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import * as Dimens from '@constants/Dimension';

const defaultPadding = {
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 4,
    paddingTop: 3
}

const styles = StyleSheet.create({
    container: {
        width: Dimens.width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    corner: {
        borderColor: '#EFEFEF',
        borderWidth: Dimens.line,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        textAlign: 'center'
    },
});

export interface TagViewProps {
    style: ViewStyle,
    data: object, // {name: string, checked: bool}
    itemStyle: ViewStyle,
    backgroundColors: string[], //default color and selected color
    textColors: string[], //selected color and default color
    disabled: boolean,
    fontSize: number,
    onPress: () => void
}

export class TagView extends React.Component<TagViewProps> {

    static defaultProps = {
        backgroundColors: ['#F4F4F4', '#009EFF'],
        textColors: ['#222', '#FFFFFF'],
        disabled: true,
        fontSize: 12
    }

    constructor(props) {
        super(props)
        this.UNSAFE_componentWillReceiveProps(props)
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.data = props.data
        this.isSelected = this.data && (this.data.checked === true)
    }

    getBkgrdColor() {
        if (this.isSelected) {
            return this.props.backgroundColors[1];
        } else {
            return this.props.backgroundColors[0];
        }
    }

    getTextStyle() {
        if (this.isSelected) {
            return { color: this.props.textColors[1], fontSize: this.props.fontSize }
        } else {
            return { color: this.props.textColors[0], fontSize: this.props.fontSize }
        }
    }

    getItemStyle() {
        const { itemStyle } = this.props
        const _bkStyle = { backgroundColor: this.getBkgrdColor() }
        const { padding } = itemStyle ? StyleSheet.flatten(itemStyle) : {}
        const _paddStyle = (padding === undefined ? defaultPadding : {})
        return { ..._paddStyle, ..._bkStyle, ...StyleSheet.flatten(itemStyle) }
    }

    getItemName() {
        const { name } = this.data
        return name ? name : this.data
    }

    _onPress = () => {
        this.props.onPress && this.props.onPress()
    }

    render() {
        if (this.props.disabled) {
            return <View style={[styles.corner, this.getItemStyle()]}>
                <Text style={[styles.text, this.getTextStyle()]}
                >{this.getItemName()}</Text>
            </View >
        } else {
            return <TouchableOpacity
                disabled={false}
                style={this.props.style}
                onPress={this._onPress}>
                <View style={[styles.corner, this.getItemStyle()]}>
                    <Text style={[styles.text, this.getTextStyle()]}
                    >{this.getItemName()}</Text>
                </View>
            </TouchableOpacity>
        }
    }

}

export interface FlowTagsProps {
    style: ViewStyle,
    dataValue: Array<object>, // array of T: {name: string, checked: bool}
    multiselect: boolean,
    onItemPress: () => void,
    selectable: boolean,

    //TagViewProps
    itemStyle: ViewStyle,
    backgroundColors: Array<string>, //default color and selected color
    textColors: Array<string>, //selected color and default color
    onPress: () => void,
    disabled: boolean
}

export default class FlowTags extends React.Component<FlowTagsProps> {
    static defaultProps = {
        style: {},
        dataValue: [],
        multiselect: true,
        disabled: false
    }

    constructor(props) {
        super(props);
        this.state = { data: props.dataValue }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({ data: newProps.dataValue })
    }

    _onPress = (index) => {
        const { multiselect, onItemPress } = this.props
        const changs = this.state.data.map((k, i) => {
            if (multiselect && index === i) {
                k.checked = !k.checked
            } else if (!multiselect && index === i) {
                k.checked = !k.checked
            } else if (!multiselect && index !== i) {
                k.checked = false
            }
            return k
        })
        this.setState({ data: changs })
        onItemPress && onItemPress({ index: index, data: changs })
    }

    render() {
        if (this.state.data.length === 0) {
            return null
        } else {
            const { style, onItemPress, disabled } = this.props
            return <View style={[styles.container, style]}>
                {this.state.data.map((item, index) => {
                    return <TagView
                        {...this.props}
                        data={item}
                        key={index + '04'}
                        style={{ margin: 5 }}
                        disabled={onItemPress ? false : disabled}
                        onPress={() => this._onPress(index)}
                    />
                })}
            </View>
        }
    };
}
