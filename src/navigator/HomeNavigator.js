import React, { Component } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { observer } from 'mobx-react';
import { observe, observable } from 'mobx';
import HomeScreen from '@screens/HomeScreen';
import MyCargoScreen from '@screens/MyCargoScreen';
import MeScreen from '@screens/MeScreen';
import appStore, { HomeTabbar, HomeTabArray } from '@stores/APPStore'
import UserStore, { TestLogin, NoCompanyInfo, isVerify } from '@stores/user/UserStore';
import * as Colors from '@constants/Colors';
import { images as Resource } from '@resource';
import ContentLayout from '@components/common/ContentLayout';

import Events from "@utils/Events";

import {DID_FOCUS, EVENT_LOGIN_EXPIRED} from '@constants/String';


@observer
export default class HomeNavigator extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.navi = props.navigation

        appStore.addOpenNotificationListener('HomeNavigator', () => {
            this._onItemPress(HomeTabArray.homeTab);
        })
        
        this.disposer = observe(UserStore, 'isLogin', (change) => {
            if (change.newValue === false) {
                HomeTabbar.selectedTab = HomeTabArray.homeTab
            }
        })
    }

    componentWillUnmount() {
        this.disposer && this.disposer()
        appStore.removeOpenNotificationListener('HomeNavigator');
        if (this.loginExpiredSubscriber) {
            this.loginExpiredSubscriber.remove();
        }
    }

    _onItemPress = (tab) => {
        if ([HomeTabArray.cargoTab].includes(tab)) {
            const isLogin = TestLogin(this.navi)
            if (!isLogin) {
                return
            } else if (!isVerify()) {
                UserStore.getUserInformation()
            }
        }
        HomeTabbar.selectedTab = tab
    }

    _renderTab = (Component, tab, title, renderIcon) => {
        return <TabNavigator.Item title={title}
            selected={HomeTabbar.selectedTab === tab}
            selectedTitleStyle={{ color: '#0081cc' }}
            renderIcon={() => {
                return title !== 'Notification' ? <Image style={styles.normal} source={renderIcon} />
                    : <NotificationTabBarIcon iconStyle={styles.normal} renderIcon={renderIcon} />
            }}
            renderSelectedIcon={() => {
            return title !== 'Notification'  ? <Image style={styles.selected} source={renderIcon} />
                    : <NotificationTabBarIcon iconStyle={styles.selected} renderIcon={renderIcon} />
            }}
            onPress={() => { this._onItemPress(tab) }}>
            <Component {...this.props} />
        </TabNavigator.Item >
    }

    render() {
        return (
            <ContentLayout childIsFragment={true}>
                <TabNavigator  
                tabBarStyle={{ opacity: 1, backgroundColor: Colors.white }} 
                sceneStyle={{ paddingBottom: 48 }}>
                    {this._renderTab(HomeScreen, HomeTabArray.homeTab,'Home',Resource.tabBar.tab_home())}
                    {this._renderTab(MyCargoScreen, HomeTabArray.cargoTab,'My Cargo',Resource.tabBar.tab_cargo())}
                    {this._renderTab(MeScreen, HomeTabArray.meTab,'Me',Resource.tabBar.tab_me())}
                </TabNavigator>
                {Platform.OS === 'ios' && <View style={styles.extraSafeArea} />}
            </ContentLayout>
        )
    }

    componentDidMount() {
        //测试登录逻辑，待改
        TestLogin(this.navi)

        this.loginExpiredSubscriber = Events.subscribe(EVENT_LOGIN_EXPIRED, function () {
            this.props.navigation.popToTop();
            this._onItemPress(HomeTabArray.homeTab);
        }.bind(this));
    }
}

const NotificationTabBarIcon = observer((props) => {

    let notiDot = null;
    if (UserStore.isLogin) {
        if ( (jPushInfo[JPushTypeEnum.NEWCHAT] || jPushInfo[JPushTypeEnum.NEWNOTIFICATION]) ) {
            notiDot = <View
                style={{position:'absolute',top:1, alignSelf: 'flex-end',borderRadius: 8, backgroundColor: 'red', width: 8, height: 8}}>
            </View>
        }else {
            notiDot = null;
        }
    } else {
        notiDot = null;
    }


    return <View style={{ flexDirection: 'column' }}>
        <Image
            style={props.iconStyle}
            source={props.renderIcon} />
        {notiDot}
    </View>
})

const styles = StyleSheet.create({
    normal: {
        width: 25, height: 26,
        tintColor: '#404040'
    },
    selected: {
        width: 25, height: 26,
        tintColor: '#2A72F9'
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
