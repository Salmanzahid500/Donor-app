// Authentication Navigation Stack - Handles Login and Signup flows
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../../Constant/Route';
import LoginScreen from "../../Screen/Auth/LoginScreen/LoginScreen"
import SignupScreen from "../../Screen/Auth/SignupScreen/SignupScreen"

const { Navigator, Screen } = createNativeStackNavigator();

/**
 * Auth Navigation - Stack navigator for unauthenticated users
 * Contains login and signup screens
 */
const AuthNavigation = (props) => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={Route.LOGINSCREEN} component={LoginScreen} />
            <Screen name={Route.SIGNUPSCREEN} component={SignupScreen} />
        </Navigator>
    );
};

export default AuthNavigation;