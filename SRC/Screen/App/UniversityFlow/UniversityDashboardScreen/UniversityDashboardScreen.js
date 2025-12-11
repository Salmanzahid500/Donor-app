import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { Style } from "./Style"
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import Spacer from '../../../../Component/Spacer'
import { WelcomeHeader, StatsCards, ActiveEvent, RecentDonorList } from "./Component/Index"
import { UseUniversityDashboardScreen } from "./Hooks/Index"
import { closeEvent } from '../../../../FireBase/Index'
import { Route } from '../../../../Constant/Route'
import { useNavigation } from '@react-navigation/native'

const UniversityDashboardScreen = (props) => {
  const { handleLogout, event, loading, donor, activeEventsCount, closedEventsCount, stats } = UseUniversityDashboardScreen(props)
  const navigation = useNavigation()

  const handleEventPress = (eventData) => {
    Alert.alert(
      eventData.eventTitle,
      `Description: ${eventData.description || 'No description'}\n\n` +
      `Location: ${eventData.address || 'Not specified'}\n` +
      `Date: ${eventData.date || 'Not specified'}\n` +
      `Time: ${eventData.time || 'Not specified'}\n` +
      `Points: ${eventData.points || 0}\n` +
      `Capacity: ${eventData.capacity || 'Not specified'}`,
      [
        {
          text: "OK",
          style: "cancel"
        }
      ]
    )
  }

  const handleEditPress = (eventData) => {
    navigation.navigate(Route.STACKNAVIGATION, {
      screen: Route.UNIVERSITYCREATEEVENTSCREEEN,
      params: {
        editMode: true,
        eventData: eventData
      }
    });
  }

  const handleClosePress = (eventData) => {
    Alert.alert(
      "Close Event",
      `Are you sure you want to close "${eventData.eventTitle}"?\n\nThis event will no longer be visible to students.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Close Event",
          style: "destructive",
          onPress: async () => {
            const result = await closeEvent({ eventId: eventData.id });
            if (result.success) {
              Alert.alert("Success", "Event has been closed successfully.");
            } else {
              Alert.alert("Error", "Failed to close event. Please try again.");
            }
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
        <StatsCards 
          activeEvent={activeEventsCount}
          closedEvent={closedEventsCount}
          totalDonor={donor?.length || 0}
        />

        <Spacer height={25} />

        {/* Active Events */}
        <View style={Style.sectionContainer}>
          <ActiveEvent 
            data={event} 
            onEventPress={handleEventPress}
            onEditPress={handleEditPress}
            onClosePress={handleClosePress}
          />
        </View>

        <Spacer height={25} />

        {/* Recent Donors */}
        <View style={Style.sectionContainer}>
          <RecentDonorList
          donors={donor}
          />
        </View>

        <Spacer height={30} />
      </ScrollView>
    </MainContainer>
  )
}

export default UniversityDashboardScreen

