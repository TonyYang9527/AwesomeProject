'use strict';

import { Dimensions, PixelRatio, StyleSheet, Platform } from 'react-native';
import {isAndroid ,isIOS} from '@utils/Utils';

export const { height, width } = Dimensions.get('window');
export const ratio = () => { return PixelRatio.get() }

export const MySize = (size) => { return width / 375 * size }

export const StatsBarHeight = isAndroid ? '70%' : '100%';
export const PaddingStatsBarHeight = isAndroid ? MySize(10) : 0;
// base font size
export const font_size_huge = MySize(22);
export const font_size_big = MySize(18);
export const font_size_middle = MySize(16);
export const font_item_title = MySize(15);
export const font_size_normal = MySize(14);
export const font_size_small = MySize(12);
export const font_size_min = MySize(10);
export const font_size_least = MySize(8);
export const font_size_tiny = MySize(6);
export const font_title = MySize(18);

export const space_1 = MySize(1);
export const space_2 = MySize(2);
export const space_4 = MySize(4);
export const space_6 = MySize(6);
export const space_min = MySize(8);
export const space_least = MySize(10);
export const space_small = MySize(12);
export const space = MySize(16);
export const space_large = MySize(20);
export const space_huge = MySize(24);

export const line = MySize(1);
export const border = MySize(0.6);
export const radius = MySize(4);
export const opacity = MySize(0.7);

export const margin = MySize(15);
export const padding = MySize(15);
export const padding14 = MySize(14);
export const margin_horizontal = MySize(15);
export const margin_vertical = MySize(12);

export const item_height = MySize(42); // don't change this, design value is 42
export const section_height = MySize(38);
export const title_height = MySize(44); // don't change this, design value is 44
export const bw_button_height = MySize(47); // don't change this, design value is 47

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
