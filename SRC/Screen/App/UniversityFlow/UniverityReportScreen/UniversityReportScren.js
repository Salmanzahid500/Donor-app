import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { Style } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { ReportHeader, StatsOverview, BloodTypeDistribution, DonorsList, QuickActions } from './Component/Index'
import { SimpleButton } from '../../../../Component/SimpleButton'
import { hp } from '../../../../Component/ResponsiveComponent'
import { Color } from '../../../../Theme/Color/Index'
import { Route } from '../../../../Constant/Route'


const UniversityReportScren = (props) => {
    return (
        <MainContainer style={Style.mainContainer}>
            <ScrollView 
                style={Style.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Style.scrollContent}
            >
                {/* Professional Header */}
                <ReportHeader />
                
                <Spacer height={25} />
                
                {/* Stats Overview Cards */}
                <StatsOverview />
                
                <Spacer height={25} />
                
                {/* Blood Type Distribution */}
                <View style={Style.sectionContainer}>
                    <BloodTypeDistribution />
                </View>
                
                <Spacer height={25} />
                
                {/* Donors List */}
                <View style={Style.sectionContainer}>
                    <DonorsList />
                </View>
                
                <Spacer height={25} />
                
                {/* Quick Actions */}
                <QuickActions navigation={props?.navigation} />
                  <Spacer height={30} />
            </ScrollView>
        </MainContainer>
    )
}

export default UniversityReportScren

