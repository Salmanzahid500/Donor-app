import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from "../../Theme/Color/Index";
import { Route } from "../../Constant/Route";
import UniversityDashboardScreen from '../../Screen/App/UniversityFlow/UniversityDashboardScreen/UniversityDashboardScreen';
import UniversityRewardScreen from '../../Screen/App/UniversityFlow/UniversityRewardScreen/UniversityRewardScreen';
import UniversityReportScren from '../../Screen/App/UniversityFlow/UniverityReportScreen/UniversityReportScren';

import { Images } from "../../Assets/Index";
import { hp, wp } from "../../Component/ResponsiveComponent";
import Spacer from '../../Component/Spacer';

const { Navigator, Screen } = createBottomTabNavigator();

const UniversityBottomNavigation = () => {
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: hp(7),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: Color.gray4,
                    backgroundColor: Color.WHITE,
                },
                tabBarActiveTintColor: Color.RED,
                tabBarInactiveTintColor: Color.LIGHTGREY,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Screen
                name={Route.UNIVERSITYDASHBOARDSCREEN}
                component={UniversityDashboardScreen}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            activeOpacity={1}
                            style={styles.tabButton}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={Images.homeIcon}
                                style={[
                                    styles.iconSize,
                                    { tintColor: focused ? Color.RED : Color.LIGHTGREY },
                                ]}
                                resizeMode="contain"
                            />
                            <Spacer height={hp(0.7)} />
                        </View>
                    ),
                    tabBarLabel: '',
                }}
            />

            <Screen
                name={Route.UNIVERSITYREWARDSCREEEN}
                component={UniversityRewardScreen}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            activeOpacity={1}
                            style={styles.tabButton}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={Images.RewardIcon}
                                style={[
                                    styles.iconSize,
                                    { tintColor: focused ? Color.RED : Color.LIGHTGREY },
                                ]}
                                resizeMode="contain"
                            />
                            <Spacer height={hp(0.7)} />
                        </View>
                    ),
                    tabBarLabel: '',
                }}
            />
             <Screen
                name={Route.UNIVERSITYREPORTSCREEEN}
                component={UniversityReportScren}
                options={{
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            activeOpacity={1}
                            style={styles.tabButton}
                        />
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.iconContainer}>
                            <Image
                                source={Images.ReportIcon}
                                style={[
                                    styles.iconSize,
                                    { tintColor: focused ? Color.RED : Color.LIGHTGREY },
                                ]}
                                resizeMode="contain"
                            />
                            <Spacer height={hp(0.7)} />
                        </View>
                    ),
                    tabBarLabel: '',
                }}
            />
        </Navigator>
    );
};

export default UniversityBottomNavigation;

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSize: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
    },
});
