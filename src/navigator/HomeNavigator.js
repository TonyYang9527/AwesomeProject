/**
 * 首页
 * @flow
 */
import React, { Component } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { observer } from 'mobx-react';
import { images as Resource } from '@resource';
import HomeScreen from '@screens/HomeScreen';
import MyCargoScreen from '@screens/MyCargoScreen';
import MeScreen from '@screens/MeScreen';
import ContentLayout from '@components/common/ContentLayout';
import * as Colors from '@constants/Colors';
import { HomeTabbar, HomeTabArray } from '@stores/AppStore'


@observer
export default class HomeNavigator extends Component {

    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.navi = props.navigation
    }

    _onItemPress = (tab) => {
        HomeTabbar.selectedTab = tab
    }

    _renderTab = (Component, tab, title, renderIcon) => {
        return <TabNavigator.Item title={title}
            selected={HomeTabbar.selectedTab === tab}
            selectedTitleStyle={{ color: '#0081cc' }}
            renderIcon={() => {
                return <Image style={styles.normal} source={renderIcon} />

            }}
            renderSelectedIcon={() => {
                return <Image style={styles.selected} source={renderIcon} />
            }}
            onPress={() => { this._onItemPress(tab) }}>
            <Component {...this.props} />
        </TabNavigator.Item >
    }

    render() {
        return (
            <ContentLayout childIsFragment={true}>
                <TabNavigator tabBarStyle={{ opacity: 1, backgroundColor: Colors.white }} sceneStyle={{ paddingBottom: 48 }}>
                    {this._renderTab(HomeScreen, HomeTabArray.homeTab, 'Home', Resource.tabBar.ic_home())}
                    {this._renderTab(MyCargoScreen, HomeTabArray.cargoTab, 'MyCargo', Resource.tabBar.ic_tools())}
                    {this._renderTab(MeScreen, HomeTabArray.meTab, 'Me', Resource.tabBar.ic_search())}
                </TabNavigator>
                {Platform.OS === 'ios' && <View style={styles.extraSafeArea} />}
            </ContentLayout>
        )
    }


}

const styles = StyleSheet.create({
    normal: {
        width: 25, height: 26
    },
    selected: {
        width: 25, height: 26,
        tintColor: '#0081cc'
    },
    extraSafeArea: {
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 84,
        zIndex: -1000
    }
})
