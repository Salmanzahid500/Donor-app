import { Alert } from "react-native";
import { RegisterEvent } from "../../../../../FireBase/Index";
import { useState } from "react";


export const UseEventSignUpScreen = (props) => {
    const event = props?.route.params.data || {};
    console.log(event)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading,setLoading] = useState(false)

    const handleRegistration = async () => {
        setLoading(true)
        try {
            const res = await RegisterEvent({ eventId: event?.id,points:event?.points });

            if (res.success === true) {
                Alert.alert("Registration Completed!", "Your registration has been submitted successfully.", [
                    {
                        text: "OK",
                        onPress: () => props?.navigation?.goBack()
                    }
                ]);
                setErrorMessage("")
            }
            else if (res.message === "Already Registered") {
                setErrorMessage("You have already registered for this event")
            }
            else if (res.message === "Not Verified") {
                setErrorMessage("You are not verified yet, Complete your verification first")
            }
            else if (res.message === "Update your Age") {
                setErrorMessage("Update your Age please")
            }
            else if (res.message === "Age is less then 18") {
                setErrorMessage("You are not eligible for this event")
            }
            else {
                setErrorMessage("Error", res.message || "Something went wrong")
            }

        } catch (error) {
            setErrorMessage("Error", "Unexpected error")
            setLoading(false)
        } finally{
            setLoading(false)
        }
    };

    return {
        event,handleRegistration,errorMessage,loading,
        isRegistered: event?.isRegistered || false
    }
}


