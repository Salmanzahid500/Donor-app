import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createEvent, updateEvent, closeEvent } from '../../../../../FireBase/Index'

export const UseEvents = (props) => {
    const editMode = props?.route?.params?.editMode || false;
    const eventData = props?.route?.params?.eventData || null;

    const [eventTitle, setEventTitle] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventDate, setEventDate] = useState("")
    const [eventTime, setEventTime] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [bloodDonate, setBloodDonate] = useState("")
    const [eventDescription, setEventDescription] = useState("")
    const [pointGain, setPointGain] = useState("")
    const [capacity, setCapacity] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    // Pre-fill form if in edit mode
    useEffect(() => {
        if (editMode && eventData) {
            setEventTitle(eventData.eventTitle || "");
            setEventLocation(eventData.address || "");
            setEventDate(eventData.date || "");
            setEventTime(eventData.time || "");
            
            // Parse time if it exists (e.g., "09:00 AM - 03:00 PM")
            if (eventData.time && eventData.time.includes("-")) {
                const [start, end] = eventData.time.split("-").map(t => t.trim());
                setStartTime(start);
                setEndTime(end);
            }
            
            setBloodDonate(eventData.blood || "");
            setEventDescription(eventData.description || "");
            setPointGain(String(eventData.points || ""));
            setCapacity(String(eventData.capacity || ""));
        }
    }, [editMode, eventData]);

    const handleEventPress = async () => {
        setLoading(true)
        try {
            // Combine start and end time
            const combinedTime = startTime && endTime ? `${startTime} - ${endTime}` : eventTime;
            
            const payload = {
                eventTitle: eventTitle,
                address: eventLocation,
                date: eventDate,
                time: combinedTime,
                blood: bloodDonate,
                description: eventDescription,
                points: Number(pointGain),
                capacity:Number(capacity)
            }
            
            let handleResponse;
            if (editMode && eventData?.id) {
                handleResponse = await updateEvent({eventId: eventData.id, payload});
            } else {
                handleResponse = await createEvent(payload);
            }

            console.log(handleResponse)
            if (handleResponse.success === true) {
                Alert.alert(editMode ? "Event Updated" : "Event Created")
                props?.navigation?.goBack()
            }
            else{
                setErrorMessage("Some Error Occur")
            }
        } catch (error) {
            console.log(error, "error")
            setErrorMessage("Network Error")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseEvent = () => {
        Alert.alert(
            "Close Event",
            "Are you sure you want to close this event? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Close Event",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const result = await closeEvent({ eventId: eventData.id });
                            if (result.success) {
                                Alert.alert("Success", "Event has been closed successfully.", [
                                    {
                                        text: "OK",
                                        onPress: () => props?.navigation?.goBack()
                                    }
                                ]);
                            } else {
                                setErrorMessage("Failed to close event");
                            }
                        } catch (error) {
                            console.log(error, "error");
                            setErrorMessage("Network Error");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    }

    return {
        eventTitle, setEventTitle, eventLocation, setEventLocation,
        eventDate, setEventDate, eventTime, setEventTime,
        startTime, setStartTime, endTime, setEndTime,
        bloodDonate, setBloodDonate, eventDescription, setEventDescription,
        pointGain, setPointGain, handleEventPress, loading,capacity,setCapacity,
        errorMessage, editMode, handleCloseEvent, eventData
    }
}


