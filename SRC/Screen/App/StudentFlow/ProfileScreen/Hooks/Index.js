import { Alert, DeviceEventEmitter, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Route } from '../../../../../Constant/Route'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getRegisteredEvents, getUser } from '../../../../../FireBase/Index'


export const UseProfile = (props) => {
    const [userData, setuserData] = useState(null)
    const [event,setEvent] = useState([])

    const getUserInfo = async () => {
        try {
            const user = await getUser()
            const formatedUser = user?.user
            setuserData(formatedUser)
        } catch (error) {
            console.log(error, "error response")
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener("profileUpdated", () => {
            console.log("Profile updated event received");
            getUserInfo();
        });

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        const res = await getRegisteredEvents();
        if (res.success) {
            setEvent(res.events);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "Logged Out Successfully",
                            "Thank you for being a life-saver! See you soon.",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        props?.navigation?.reset({
                                            index: 0,
                                            routes: [{ name: Route.AUTHNAVIGATION }],
                                        })
                                    }
                                }
                            ]
                        )
                    }
                }
            ]
        )
    }
    return {
        handleLogout, userData,event

    }
}


