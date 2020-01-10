import React from 'react';
import {
    SectionHeaderView, SectionHeaderTitleText,
    ExpandableSectionHeaderView, ExpandableSectionHeaderTitleText
} from './SSStyledComponents';
import { images as Resource } from "@resource";
import { Image } from "react-native";
import { baseColor } from "@constants/Colors";

export default class SectionHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.expandable) {
            return (
                <ExpandableSectionHeaderView borderRadius={0}>
                    <ExpandableSectionHeaderTitleText>{this.props.children}</ExpandableSectionHeaderTitleText>
                    <Image
                        tintColor={baseColor}
                        style={{ width: 18, height: 18, marginRight: 10 }}
                        source={this.props.status ? Resource.icon.arrow_up() : Resource.icon.arrow_down()} />
                </ExpandableSectionHeaderView>
            )
        } else {
            return (
                <SectionHeaderView borderRadius={0}>
                    <SectionHeaderTitleText>{this.props.children}</SectionHeaderTitleText>
                </SectionHeaderView>
            );
        }
    }
}
