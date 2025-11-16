import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from '../../Constant/Route';
import StudentVerificationScreen from "../../Screen/App/StudentFlow/StudentVerificationScreen/StudentVerificationScreen"
import EventSignupScreen from "../../Screen/App/StudentFlow/EventSignupScreen/EventSignupScreen"
import CreateAnEventScreen from "../../Screen/App/UniversityFlow/CreateAnEventScreen/CreateAnEventScreen"
import CompatibilityScreen from "../../Screen/App/StudentFlow/CompatibilityScreen/CompatibilityScreen"


const { Navigator, Screen } = createNativeStackNavigator();

const StackNavigation = (props) => {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name={Route.STUDENTVERIFICATIONSCREEN} component={StudentVerificationScreen} />
            <Screen name={Route.STUDENTEVENTSIGNUPSCREEN} component={EventSignupScreen} />
            <Screen name={Route.UNIVERSITYCREATEEVENTSCREEEN} component={CreateAnEventScreen} />
            <Screen name={Route.COMPATIBILITYSCREEN} component={CompatibilityScreen} />

        </Navigator>
    );
};

export default StackNavigation;