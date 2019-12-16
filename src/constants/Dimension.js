'use strict';

import { Dimensions, PixelRatio, StyleSheet, Platform } from 'react-native';
export const { height, width } = Dimensions.get('window');
export const ratio = () => { return PixelRatio.get() }

// base font size
export const font_size_huge = 22;
export const font_size_big = 18;
export const font_size_middle = 16;
export const font_item_title = 15;
export const font_size_normal = 14;
export const font_size_small = 12;
export const font_size_min = 10;
export const font_size_least = 8;
export const font_size_tiny = 6;
export const font_title = 18;

export const space_1 = 1;
export const space_2 = 2;
export const space_4 = 4;
export const space_6 = 6;
export const space_min = 8;
export const space_least = 10;
export const space_small = 12;
export const space = 16;
export const space_large = 20;
export const space_huge = 24;

export const line = StyleSheet.hairlineWidth;
export const border = 0.6;
export const radius = 4;
export const opacity = 0.7;

export const margin = 16;
export const padding = 10;
export const padding14 = 14;
export const margin_horizontal = 12;
export const margin_vertical = 12;

export const item_height = 42; // don't change this, design value is 42
export const section_height = 38;
export const title_height = 44; // don't change this, design value is 44
export const bw_button_height = 47; // don't change this, design value is 47

export const weight_400 = Platform.OS == 'ios' ? '400' : '300'
export const weight_500 = Platform.OS == 'ios' ? '500' : '400'
export const weight_600 = Platform.OS == 'ios' ? '600' : '400'
export const weight_700 = Platform.OS == 'ios' ? '700' : '500'
export const weight_800 = Platform.OS == 'ios' ? '800' : '500'
export const weight_900 = Platform.OS == 'ios' ? '900' : '600'
export const weight_bold = Platform.OS == 'ios' ? 'bold' : '400'

export default {
    font_size_huge, font_size_big, font_size_middle,
    font_item_title, font_size_normal, font_size_small,
    font_size_min, font_size_least, font_title,

    space_1, space_2, space_4, space_6, space_min,
    space_least, space_small, space, space_large, space_huge,

    line, border, radius,

    margin, padding, padding14, margin_horizontal, margin_vertical,

    title_height, bw_button_height, section_height
};

export const AppDEM = Object.freeze({
    titleSize: 20,
    navTitle: 17,
    contentBig: 16,
    contentNol: 14,
    contntSml: 12,
    caption: 10,
});
