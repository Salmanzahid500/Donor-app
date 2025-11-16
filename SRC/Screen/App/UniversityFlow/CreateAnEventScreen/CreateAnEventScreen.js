import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { Style } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { EventHeader, CreateEventForm, EventPreview } from "./Component/Index"
import { hp } from '../../../../Component/ResponsiveComponent'
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'

const CreateAnEventScreen = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    date: '',
    time: '',
    reward: ''
  })

  const handleCreateEvent = () => {
    if (!formData.title || !formData.location || !formData.date) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    Alert.alert(
      "Success",
      "Event created successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            // Reset form or navigate back
            setFormData({
              title: '',
              location: '',
              description: '',
              date: '',
              time: '',
              reward: ''
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
        {/* Professional Header */}
        <EventHeader />
        
        <Spacer height={25} />
        
        {/* Create Event Form */}
        <View style={Style.sectionContainer}>
          <CreateEventForm 
            formData={formData} 
            setFormData={setFormData} 
          />
        </View>
        
        <Spacer height={25} />
        
        {/* Event Preview */}
        <View style={Style.sectionContainer}>
          <EventPreview formData={formData} />
        </View>
        
        <Spacer height={30} />
        
        {/* Create Button */}
        <View style={Style.buttonContainer}>
          <SimpleButton
            textColor={Color.WHITE}
            text={"CREATE EVENT"}
            backgroundColor={Color.PRIMARY}
            style={Style.createButton}
            onPress={handleCreateEvent}
          />
        </View>
        
        <Spacer height={30} />
      </ScrollView>    </MainContainer>
  )
}

export default CreateAnEventScreen

