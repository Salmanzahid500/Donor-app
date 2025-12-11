import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StudentSignup } from '../../../../FireBase/Index'
import { Route } from '../../../../Constant/Route'

export const UseSignUpScreen = (props) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState("")
  const [fullName, setFullName] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [studentId, setStudentId] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)


  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setErrorMessage("Invalid Email Format");
      return;
    }

    if (!password || !confirmPassword || !fullName || !emailAddress || !studentId || !selectedUniversity) {
      setErrorMessage("All Field Are Required")
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password Doesnot Match")
      return
    }
    setLoading(true)

    try {
      const payload = {
        email: emailAddress,
        password: password,
        fullName: fullName,
        studentId: studentId,
        selectedUniversity: selectedUniversity
      }
      const res = await StudentSignup(payload)
      if (res.success === true) {
        Alert.alert(
          "Success",
          "Account created successfully! Please login to continue.",
          [
            {
              text: "OK",
              onPress: () => props?.navigation?.navigate(Route.LOGINSCREEN)
            }
          ]
        )
      }
      else if (res.message === "Student Name already registered") {
        setErrorMessage("Student Name already registered")
      }
      else {
        setErrorMessage("Student Signup Error")
      }
    } catch (error) {
      setErrorMessage("Network Error")
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return {
    isDropDownOpen, setIsDropDownOpen, selectedUniversity, setSelectedUniversity,
    fullName, setFullName, emailAddress, setEmailAddress, studentId, setStudentId,
    confirmPassword, setConfirmPassword, password, setPassword,
    showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword,
    handleSignup, loading, errorMessage
  }
}


