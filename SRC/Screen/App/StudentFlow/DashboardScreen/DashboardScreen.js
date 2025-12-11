import { Image, StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { styles } from "./Style"
import { Images } from '../../../../Assets/Index'
import Spacer from '../../../../Component/Spacer'
import { BloodRequest, HeaderButton, Redeem, WelcomeHeader, StatsCards } from "./Component/NewIndex"
import { UseDashboard } from "./Hooks/Index"
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { Route } from '../../../../Constant/Route'

const DashboardScreen = (props) => {
    const { headerButtonPress, setHeaderButtonPress, userData, event, handleEventRegister, reward, notification, refreshing, onRefresh } = UseDashboard(props)
    return (
        <MainContainer style={styles.mainContainer}>
            <ScrollView 
                style={styles.container} 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.topBar}>
                    <WelcomeHeader 
                    notificationPress={()=>props?.navigation?.navigate(Route.STACKNAVIGATION,{screen:Route.NOTIFICATIONSCREEN,params:{item:notification}})}
                    notification={notification?.length} userData={userData} />
                </View>

                <View style={styles.contentArea}>
                    <View style={styles.sectionContainer}>
                        <StatsCards 
                        points={userData?.user?.points}
                        Donation={userData?.user?.event}
                        />
                    </View>

                    <View style={styles.tabsContainer}>
                        <HeaderButton
                            headerPress={headerButtonPress}
                            setHeaderPress={setHeaderButtonPress}
                        />
                    </View>

                    <View style={styles.sectionContainer}>
                        {headerButtonPress === "request" ? (
                            <>
                                <View style={styles.sectionHeader}>
                                    <ResponsiveText style={styles.sectionTitle}>Blood Donation Requests</ResponsiveText>
                                    <ResponsiveText style={styles.sectionSubtitle}>Review and respond to urgent blood donation needs from local healthcare facilities</ResponsiveText>
                                </View>
                                <BloodRequest
                                    Data={event}
                                    onpress={handleEventRegister}
                                    // () => props?.navigation?.navigate(Route.STACKNAVIGATION, { screen: Route.STUDENTEVENTSIGNUPSCREEN })
                                />
                            </>
                        ) : (
                            <>
                                <View style={styles.sectionHeader}>
                                    <ResponsiveText style={styles.sectionTitle}>Rewards & Recognition</ResponsiveText>
                                    <ResponsiveText style={styles.sectionSubtitle}>Exchange your donation points for exclusive rewards and certificates of recognition</ResponsiveText>
                                </View>
                                <Redeem 
                                userData={userData}
                                rewards={reward} 
                                />
                            </>
                        )}
                    </View>
                </View>

                <Spacer height={30} />
            </ScrollView>
        </MainContainer>
    )
}

export default DashboardScreen

