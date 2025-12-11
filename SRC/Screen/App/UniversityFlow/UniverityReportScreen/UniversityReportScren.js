import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { Style } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { ReportHeader, HealthcareStats, DonorsList, QuickActions, EventManagementTable } from './Component/Index'
import { SimpleButton } from '../../../../Component/SimpleButton'
import { hp } from '../../../../Component/ResponsiveComponent'
import { Color } from '../../../../Theme/Color/Index'
import { Route } from '../../../../Constant/Route'
import { getTopDonors, listenToAllEvents, getUniversityStats, openEvent, closeEvent } from '../../../../FireBase/Index'


const UniversityReportScren = (props) => {
    const [event, setEvent] = useState([])
    const [donor, setDonor] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [stats, setStats] = useState({
        totalBloodUnits: 0,
        totalRegistrations: 0,
        completedEvents: 0,
        activeEvents: 0,
        totalDonors: 0
    })

    useEffect(() => {
        const unsubscribe = listenToAllEvents((data) => {
            console.log(data, "in hook")
            setEvent(data);
        });

        return () => unsubscribe();
    }, []);

    const handleCloseEvent = async(id) => {
        try {
            const res = await closeEvent({eventId:id})
            if (res.success) {
                Alert.alert("Success", "Event closed successfully")
            } else {
                Alert.alert("Error", "Failed to close event")
            }
        } catch (error) {
            Alert.alert("Error", "Error in event closing")
        }
    }

    const handleOpenEvent = async(id) => {
        try {
            const res = await openEvent({eventId:id})
            if (res.success) {
                Alert.alert("Success", "Event reopened successfully")
            } else {
                Alert.alert("Error", "Failed to reopen event")
            }
        } catch (error) {
            Alert.alert("Error", "Error in event reopening")
        }
    }

    const onRefresh = async () => {
        setRefreshing(true)
        try {
            // Reload donors
            const donorRes = await getTopDonors()
            if (donorRes.success) {
                const sortedDonors = donorRes.donors.sort((a, b) => {
                    const timeA = a.createdAt || 0
                    const timeB = b.createdAt || 0
                    return timeB - timeA
                })
                setDonor(sortedDonors)
            }
            
            // Reload stats
            const statsRes = await getUniversityStats()
            if (statsRes.success) {
                setStats(statsRes.stats)
            }
        } catch (error) {
            console.log(error)
        }
        setRefreshing(false)
    }

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

    return (
        <MainContainer style={Style.mainContainer}>
            <ScrollView
                style={Style.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Style.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {/* Professional Header */}
                <ReportHeader />

                <Spacer height={25} />

                {/* Healthcare Analytics Stats */}
                <HealthcareStats stats={stats} />

                <Spacer height={25} />

                {/* Blood Type Distribution */}
                <View style={Style.sectionContainer}>
                    <EventManagementTable 
                    onCloseEvent={handleCloseEvent}
                    onOpenEvent={handleOpenEvent}
                    events={event} />
                </View>

                <Spacer height={25} />

                {/* Donors List */}
                <View style={Style.sectionContainer}>
                    <DonorsList donor={donor} />
                </View>

                <Spacer height={25} />

                {/* Quick Actions */}
                <QuickActions
                    eventPress={() => props?.navigation?.navigate(Route.STACKNAVIGATION, { screen: Route.UNIVERSITYCREATEEVENTSCREEEN })}
                    rewardPress={() => props?.navigation?.navigate(Route.STACKNAVIGATION, { screen: Route.UNIVERSITYADDREWARDSCREENSCREEEN })}
                    verificationPress={() => props?.navigation?.navigate(Route.STACKNAVIGATION, { screen: Route.VERIFICATIONMANAGEMENTSCREEN })}
                />
                <Spacer height={30} />
            </ScrollView>
        </MainContainer>
    )
}

export default UniversityReportScren

