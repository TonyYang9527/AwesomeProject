import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '@constants/Colors';
import HomeNavigator from '@navigator/HomeNavigator';
import CommonHeader from '@components/common/CommonHeader';

//Home
import LoadingPortScreen from "@screens/home/LoadingPortScreen";
import MatchedVesselsScreen from "@screens/home/MatchedVesselsScreen";
import SendEnquiryScreen from "@screens/home/SendEnquiryScreen";

//User
import ForgotPasswordScreen from "@screens/user/ForgotPasswordScreen";
import LoginScreen from "@screens/user/LoginScreen";
import MyProfileScreen from '@screens/user/MyProfileScreen';
import RegisterScreen from "@screens/user/RegisterScreen";
import UserAvatarEditScreen from '@screens/user/UserAvatarEditScreen';
import UserAvatarPreviewScreen from "@screens/user/UserAvatarPreviewScreen";

//My cargo
import CargoFixedScreen from "@screens/cargo/CargoFixedScreen";
import CounterOfferedScreen from "@screens/cargo/CounterOfferedScreen";
import CounterScreen from "@screens/cargo/CounterScreen";
import LiftSubScreen from "@screens/cargo/LiftSubScreen";
import OfferDetailsScreen from "@screens/cargo/OfferDetailsScreen";
import OffersScreen from "@screens/cargo/OffersScreen";
import PendingOfferScreen from "@screens/cargo/PendingOfferScreen";
import RecapScreen from "@screens/cargo/RecapScreen";
import SearchScreen from "@screens/cargo/SearchScreen";
import VesselDetailsScreen from "@screens/cargo/VesselDetailsScreen";

//Setting
import AboutScreen from "@screens/setting/AboutScreen";
import AgreementScreen from "@screens/setting/AgreementScreen";
import ChangeLanguageScreen from "@screens/setting/ChangeLanguageScreen";
import ChangePasswordScreen from "@screens/setting/ChangePasswordScreen";

//Common
import CitySelectList from "@components/common/CitySelectList";



const defaultOptions = ({ navigation }) => ({
    headerLeft: null,
    headerTintColor: Colors.white,
    headerStyle: {
        backgroundColor: Colors.baseColor,
        elevation: 0,
        shadowOpacity: 0,
    },
    headerTitle: <CommonHeader
        navigation={navigation}
        title={navigation.getParam('title')}
    />
});

const RootNavigator = createStackNavigator(
    {
        Home: HomeNavigator,
        //Home
        LoadingPortScreen:LoadingPortScreen,
        MatchedVesselsScreen:MatchedVesselsScreen,
        SendEnquiryScreen:SendEnquiryScreen,
        //User
        ForgotPasswordScreen:ForgotPasswordScreen,
        LoginScreen:LoginScreen,
        MyProfileScreen:MyProfileScreen,
        RegisterScreen:RegisterScreen,
        UserAvatarEditScreen:UserAvatarEditScreen,
        UserAvatarPreviewScreen:UserAvatarPreviewScreen,

        //Cargo
        CargoFixedScreen:CargoFixedScreen,
        CounterOfferedScreen:CounterOfferedScreen,
        CounterScreen:CounterScreen,
        LiftSubScreen:LiftSubScreen,
        OfferDetailsScreen:OfferDetailsScreen,
        OffersScreen:OffersScreen,
        PendingOfferScreen:PendingOfferScreen,
        RecapScreen:RecapScreen,
        SearchScreen:SearchScreen,
        VesselDetailsScreen:VesselDetailsScreen,
        //Setting
        AboutScreen:AboutScreen,
        AgreementScreen:AgreementScreen,
        ChangeLanguageScreen:ChangeLanguageScreen,
        ChangePasswordScreen:ChangePasswordScreen,

        //Common
        CitySelectList:CitySelectList,


        // Home: HomeScreen,
        // UserLogin:LoginScreen,
        // forgotPassword:ForgotPasswordScreen,
        // RegisterScreen:RegisterScreen,  Home: HomeScreen,
        // UserLogin:LoginScreen,
        // forgotPassword:ForgotPasswordScreen,
        // RegisterScreen:RegisterScreen,
        // Home: HomeScreen,
        // UserLogin:LoginScreen,
        // forgotPassword:ForgotPasswordScreen,
        // RegisterScreen:RegisterScreen  Home: HomeScreen,
        // UserLogin:LoginScreen,
        // forgotPassword:ForgotPasswordScreen,
        // RegisterScreen:RegisterScreen,
    },
    {
        headerMode: 'screen', 
        headerTransitionPreset: 'fade-in-place',
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerTintColor: Colors.textColor,
            headerStyle: {
                backgroundColor: Colors.white,
                elevation: 0,
                shadowOpacity: 0
            }
        }
    }
);

export default RootNavigator;