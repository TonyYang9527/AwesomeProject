/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-04 16:42:36
 * @LastEditTime: 2019-12-05 10:49:32
 * @Author: 朱子豪
 * @Description: 
 */
import React from 'react';
import { withNavigation, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from "react-navigation-drawer";
import { View, TouchableOpacity, Text } from 'react-native';
import RootNavigator from "./RootNavigation";

class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
        
    }
    _goPage=()=>{
        console.log("====>",this.props.navigation.navigate("LoginScreen"))
    }
    render() {
        return (
            <View style={{ flex:1,paddingTop:40}}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: "red", padding: 10 }} onPress={this._goPage}>
                    <Text>Go Account Login</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const DrawerNavigator = createDrawerNavigator(
    {
        RootNavigator: RootNavigator,
    },
    {
        headerMode: 'screen', //'float' will has different animation effect on android.
        contentComponent: withNavigation(DrawerMenu),
        headerTransitionPreset: 'fade-in-place',
        drawerLockMode: 'locked-closed',
        initialRouteName: 'RootNavigator',
        navigationOptions: {
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0
            }
        }
    }
)
export default createAppContainer(DrawerNavigator);
