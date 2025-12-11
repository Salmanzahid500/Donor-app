import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Color } from "../../Theme/Color/Index";
import { Route } from "../../Constant/Route";
import DashboardScreen from '../../Screen/App/StudentFlow/DashboardScreen/DashboardScreen';
import ProfileScreen from '../../Screen/App/StudentFlow/ProfileScreen/ProfileScreen';
import { Images } from "../../Assets/Index";
import { hp, wp } from "../../Component/ResponsiveComponent";
import Spacer from '../../Component/Spacer';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomNavigation = () => {
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
                    borderTopColor: Color.BORDER,
                    backgroundColor: Color.WHITE,
                },
                tabBarActiveTintColor: Color.PRIMARY,
                tabBarInactiveTintColor: Color.TEXT_LIGHT,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Screen
                name={Route.DASHBOARDSCREEN}
                component={DashboardScreen}
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
                                source={Images.homeIcon} style={[
                                    styles.iconSize,
                                    { tintColor: focused ? Color.PRIMARY : Color.TEXT_LIGHT },
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
                name={Route.PROFILESCREEN}
                component={ProfileScreen}
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
                                source={Images.profileIcon}
                                style={[
                                    styles.iconSize,
                                    { tintColor: focused ? Color.PRIMARY : Color.TEXT_LIGHT },
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

export default BottomNavigation;

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
