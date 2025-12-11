import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Route } from '../../../../../Constant/Route'
import { getTopDonors, listenToAllEvents, getUniversityStats } from '../../../../../FireBase/Index'

export const UseUniversityDashboardScreen = (props) => {
    const [event,setEvent] = useState([])
    const [allEvents, setAllEvents] = useState([])
    const [loading,setLoading] = useState(false)
    const [donor,setDonor] = useState([])
    const [stats, setStats] = useState({
        totalBloodUnits: 0,
        totalRegistrations: 0,
        completedEvents: 0,
        activeEvents: 0,
        totalDonors: 0
    })
    
    const activeEventsCount = allEvents.filter(e => e.status !== "Closed").length
    const closedEventsCount = allEvents.filter(e => e.status === "Closed").length
    
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
                            "Thank you for managing blood donation events. See you soon!",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        // Navigate back to auth navigation (main screen)
                                        props?.navigation.reset({
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

    useEffect(() => {
        const unsubscribe = listenToAllEvents((data) => {
            console.log(data,"in hook")
            setAllEvents(data);
            // Filter active events for the active events list
            const activeEvents = data.filter(e => e.status !== "Closed");
            setEvent(activeEvents);     
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const loadTopDonors = async () => {
            const res = await getTopDonors();
            console.log(res)
            if (res.success) {
                // Sort donors by most recent first (createdAt descending)
                const sortedDonors = res.donors.sort((a, b) => {
                    const timeA = a.createdAt || 0;
                    const timeB = b.createdAt || 0;
                    return timeB - timeA; // Most recent first
                });
                setDonor(sortedDonors);
            }
        };
        loadTopDonors();
    }, []);

    useEffect(() => {
        const loadStats = async () => {
            const res = await getUniversityStats();
            if (res.success) {
                setStats(res.stats);
            }
        };
        loadStats();
        
        // Refresh stats every 30 seconds
        const interval = setInterval(loadStats, 30000);
        return () => clearInterval(interval);
    }, []);

    return {
        handleLogout,event,loading,donor,activeEventsCount,closedEventsCount,stats
    }
}


