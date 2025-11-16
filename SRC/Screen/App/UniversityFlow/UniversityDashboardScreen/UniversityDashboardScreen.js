import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import {Style} from "./Style"
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import Spacer from '../../../../Component/Spacer'
import {WelcomeHeader, StatsCards, ActiveEvent, RecentDonorList} from "./Component/Index"
import { useNavigation } from '@react-navigation/native'
import { Route } from '../../../../Constant/Route'

const UniversityDashboardScreen = () => {
  const navigation = useNavigation()

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
            // Navigate back to auth navigation (main screen)
            navigation.reset({
              index: 0,
              routes: [{ name: Route.AUTHNAVIGATION }],
            })
          }
        }
      ]
    )
  }

  return (
    <MainContainer style={Style.mainContainer}>
        <ScrollView 
            style={Style.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={Style.scrollContent}
        >
            {/* Welcome Header */}
            <WelcomeHeader onLogout={handleLogout} />
            
            <Spacer height={20} />
            
            {/* Stats Cards */}
            <StatsCards />
            
            <Spacer height={25} />
            
            {/* Active Events */}
            <View style={Style.sectionContainer}>
                <ActiveEvent/>
            </View>
            
            <Spacer height={25} />
            
            {/* Recent Donors */}
            <View style={Style.sectionContainer}>
                <RecentDonorList/>
            </View>
            
            <Spacer height={30} />
        </ScrollView>
    </MainContainer>
  )
}

export default UniversityDashboardScreen

