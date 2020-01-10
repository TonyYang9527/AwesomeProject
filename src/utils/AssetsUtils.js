import {Assets, Typography,} from 'react-native-ui-lib';

export function loadAssets(){
    Typography.loadTypographies({
        h1: {fontSize: 12, fontWeight: '300', lineHeight: 80},
        h2: {fontSize: 24, fontWeight: '300', lineHeight: 64}
    });
    Assets.loadAssetsGroup('icons', {
        iconChecked: require('../../resource/images/round_check_yes.png'),
        iconUnChecked: require('../../resource/images/round_check_no.png'),
        zhFlag: require('../../resource/images/china.png'),
        enFlag: require('../../resource/images/unitedKingdom.png'),
    });
};
