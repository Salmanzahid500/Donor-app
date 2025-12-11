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
import { UseEvents } from "./Hooks/Index"

const CreateAnEventScreen = (props) => {
  const {
    eventTitle, setEventTitle, eventLocation, setEventLocation, eventDate, setEventDate,
    eventTime, setEventTime, startTime, setStartTime, endTime, setEndTime,
    bloodDonate, setBloodDonate, eventDescription, setEventDescription,
    pointGain, setPointGain, handleEventPress, loading, capacity, setCapacity, errorMessage, editMode,
    handleCloseEvent, eventData
  } = UseEvents(props)


  return (
    <MainContainer style={Style.mainContainer}>
      <ScrollView
        style={Style.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Style.scrollContent}
      >
        <EventHeader editMode={editMode} />

        <Spacer height={25} />

        <View style={Style.sectionContainer}>
          <CreateEventForm
            eventTitle={eventTitle}
            setEventTitle={setEventTitle}
            address={eventLocation}
            setAddress={setEventLocation}
            date={eventDate}
            setDate={setEventDate}
            time={eventTime}
            setTime={setEventTime}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            bloodDonate={bloodDonate}
            setBloodDOnate={setBloodDonate}
            description={eventDescription}
            setDescription={setEventDescription}
            pointGain={pointGain}
            setPointGain={setPointGain}
            capacity={capacity}
            setCapacity={setCapacity}
          />
        </View>

        <Spacer height={25} />

        <View style={Style.sectionContainer}>
          <EventPreview
            eventTitle={eventTitle}
            eventDate={eventDate}
            eventDescription={eventDescription}
            eventLocation={eventLocation}
            eventReward={pointGain}
            eventTime={startTime && endTime ? `${startTime} - ${endTime}` : eventTime}
          />
        </View>

        <Spacer height={30} />

        <View style={Style.buttonContainer}>
          <SimpleButton
            textColor={Color.WHITE}
            text={editMode ? "UPDATE EVENT" : "CREATE EVENT"}
            backgroundColor={Color.PRIMARY}
            style={Style.createButton}
            onPress={handleEventPress}
            loading={loading}
          />
          {editMode && eventData?.status !== "Closed" && (
            <>
              <Spacer height={15} />
              <SimpleButton
                textColor={Color.WHITE}
                text="CLOSE EVENT"
                backgroundColor="#B91C1C"
                style={Style.createButton}
                onPress={handleCloseEvent}
                loading={loading}
              />
            </>
          )}
          {errorMessage &&
            <ResponsiveText style={Style.errorMessage}>{errorMessage}</ResponsiveText>
          }
        </View>

        <Spacer height={30} />
      </ScrollView>
    </MainContainer>
  )
}

export default CreateAnEventScreen

