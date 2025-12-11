import { Alert, DeviceEventEmitter, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { UpdateStudentAccount } from '../../../../../FireBase/Index'

export const UseUpdateForm = (props) => {
    const { userData } = props?.route?.params

    const [fullName, setFullName] = useState(userData?.FullName)
    const [bloodGroup, setBloodGroup] = useState("")
    const [age, setAge] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    // Validate age input to only allow numbers
    const handleAgeChange = (text) => {
        // Only allow numbers
        const numericValue = text.replace(/[^0-9]/g, '');
        setAge(numericValue);
        
        // Clear error message when user starts typing
        if (errorMessage) {
            setErrorMessage("");
        }
    }

    const handleUpdate = async () => {
        // Validate age
        if (age) {
            const ageNum = parseInt(age);
            if (isNaN(ageNum) || ageNum < 18 || ageNum > 60) {
                setErrorMessage("Age must be between 18 and 60");
                return;
            }
        }

        setLoading(true)
        setErrorMessage("");
        try {
            const updateResponse = await UpdateStudentAccount({
                age:age, bloodGroup: bloodGroup, fullName: fullName
            })
            if (updateResponse.success === true) {
                Alert.alert("Updated", "Your profile has been updated successfully", [
                    {
                        text: "OK",
                        onPress: () => {
                            DeviceEventEmitter.emit("profileUpdated");
                            props?.navigation?.goBack();
                        }
                    }
                ]);
            }
            else {
                setErrorMessage("Update Error, please try again")
            }
        } catch (error) {
            setErrorMessage("Network Error")
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    return {
        fullName, setFullName, bloodGroup, setBloodGroup,
        errorMessage, handleUpdate, loading, age, setAge: handleAgeChange
    }
}


