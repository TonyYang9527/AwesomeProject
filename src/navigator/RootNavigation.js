/*
 * @ one cat biubiubiu ~~~
 * @Date: 2019-12-04 16:44:16
 * @LastEditTime: 2019-12-05 15:32:19
 * @Author: 朱子豪
 * @Description: 
 */
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreenPage from "@screens/home/HomeScreenPage";
import LoginScreen from "@screens/user/LoginScreen";
import ForgotPasswordScreen from '@screens/user/ForgotPasswordScreen';
import RegisterScreen from "@screens/user/RegisterScreen";

export default  createStackNavigator(
    {
        Home: HomeScreenPage,
        UserLogin:LoginScreen,
        forgotPassword:ForgotPasswordScreen,
        RegisterScreen:RegisterScreen
    },
    {
        headerMode: 'screen', //'float' will has different animation effect on android.
        headerTransitionPreset: 'fade-in-place',
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerTintColor: "red",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0
            }
        }
    }
);