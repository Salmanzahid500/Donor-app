import { Image, StyleSheet, Text, View, ScrollView } from 'react-native'
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
    const { headerButtonPress, setHeaderButtonPress } = UseDashboard()
    return (
        <MainContainer style={styles.mainContainer}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Professional Top Bar */}
                <View style={styles.topBar}>
                    <WelcomeHeader />
                </View>
                
                {/* Content Area */}
                <View style={styles.contentArea}>
                    {/* Statistics Section */}
                    <View style={styles.sectionContainer}>
                        <StatsCards />
                    </View>
                    
                    {/* Navigation Tabs */}
                    <View style={styles.tabsContainer}>
                        <HeaderButton
                            headerPress={headerButtonPress}
                            setHeaderPress={setHeaderButtonPress}
                        />
                    </View>
                    
                    {/* Main Content */}
                    <View style={styles.sectionContainer}>
                        {headerButtonPress === "request" ? (
                            <>
                                <View style={styles.sectionHeader}>
                                    <ResponsiveText style={styles.sectionTitle}>Blood Donation Requests</ResponsiveText>
                                    <ResponsiveText style={styles.sectionSubtitle}>Review and respond to urgent blood donation needs from local healthcare facilities</ResponsiveText>
                                </View>
                                <BloodRequest onpress={() => props?.navigation?.navigate(Route.STACKNAVIGATION,{screen:Route.STUDENTEVENTSIGNUPSCREEN})} />
                            </>
                        ) : (
                            <>
                                <View style={styles.sectionHeader}>
                                    <ResponsiveText style={styles.sectionTitle}>Rewards & Recognition</ResponsiveText>
                                    <ResponsiveText style={styles.sectionSubtitle}>Exchange your donation points for exclusive rewards and certificates of recognition</ResponsiveText>
                                </View>
                                <Redeem />
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

