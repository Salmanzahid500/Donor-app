import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import React from 'react'
import { MainContainer } from "../../../../Component/MainContainer"
import { styles } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { hp } from '../../../../Component/ResponsiveComponent'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { EventInfo, EventRequired, EventHeader } from "./Component/Index"
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'
import { UseEventSignUpScreen } from "./Hooks/Index"

const EventSignupScreen = (props) => {
  const { event, errorMessage, handleRegistration,loading, isRegistered } = UseEventSignUpScreen(props)

  return (
    <MainContainer style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <EventHeader />

        <View style={styles.contentCard}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ResponsiveText style={styles.sectionTitle}>Event Details</ResponsiveText>
              <ResponsiveText style={styles.sectionSubtitle}>Blood donation drive information</ResponsiveText>
            </View>
            <EventInfo events={event} />
          </View>

          <Spacer height={hp(3)} />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ResponsiveText style={styles.sectionTitle}>Eligibility Requirements</ResponsiveText>
              <ResponsiveText style={styles.sectionSubtitle}>Please ensure you meet these criteria</ResponsiveText>
            </View>
            <EventRequired />
          </View>

          <Spacer height={hp(4)} />

          <View style={styles.buttonContainer}>
            <SimpleButton
              textColor={Color.WHITE}
              text={isRegistered ? "Already Registered" : "Complete Registration"}
              backgroundColor={isRegistered ? Color.TEXT_LIGHT : Color.PRIMARY}
              style={styles.submitButton}
              onPress={isRegistered ? null : handleRegistration}
              loading={loading}
              disabled={isRegistered}
            />
            <ResponsiveText style={styles.disclaimerText}>
              By registering, you confirm that you meet all eligibility requirements
            </ResponsiveText>
            <Spacer />
            {errorMessage &&
              <ResponsiveText style={styles.errorMessage}>{errorMessage}</ResponsiveText>
            }
          </View>
        </View>
      </ScrollView>
    </MainContainer>
  )
}

export default EventSignupScreen

