import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import React from 'react'
import { MainContainer } from "../../../../Component/MainContainer"
import { styles } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { Images } from '../../../../Assets/Index'
import { hp } from '../../../../Component/ResponsiveComponent'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import {EventInfo, EventRequired, EventHeader} from "./Component/Index"
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

const EventSignupScreen = () => {
  const navigation = useNavigation()
  // Handle Android back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack()
        return true
      }

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => subscription.remove()
    }, [navigation])
  )

  return (
    <MainContainer style={styles.mainContainer}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Professional Header */}
        <EventHeader />
        
        {/* Main Content Card */}
        <View style={styles.contentCard}>
          {/* Event Information Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ResponsiveText style={styles.sectionTitle}>Event Details</ResponsiveText>
              <ResponsiveText style={styles.sectionSubtitle}>Blood donation drive information</ResponsiveText>
            </View>
            <EventInfo />
          </View>
          
          <Spacer height={hp(3)} />
          
          {/* Requirements Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ResponsiveText style={styles.sectionTitle}>Eligibility Requirements</ResponsiveText>
              <ResponsiveText style={styles.sectionSubtitle}>Please ensure you meet these criteria</ResponsiveText>
            </View>
            <EventRequired />
          </View>
          
          <Spacer height={hp(4)} />
          
          {/* Registration Button */}
          <View style={styles.buttonContainer}>
            <SimpleButton
              textColor={Color.WHITE}
              text={"Complete Registration"}
              backgroundColor={Color.PRIMARY}
              style={styles.submitButton}
            />
            <ResponsiveText style={styles.disclaimerText}>
              By registering, you confirm that you meet all eligibility requirements
            </ResponsiveText>
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  )
}

export default EventSignupScreen

