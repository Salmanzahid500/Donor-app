import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../../Constant/Route';
import LoginScreen from "../../Screen/Auth/LoginScreen/LoginScreen"
import SignupScreen from "../../Screen/Auth/SignupScreen/SignupScreen"


const { Navigator, Screen } = createNativeStackNavigator();

const AuthNavigation = (props) => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={Route.LOGINSCREEN} component={LoginScreen} />
            <Screen name={Route.SIGNUPSCREEN} component={SignupScreen} />

        </Navigator>
    );
};

export default AuthNavigation;