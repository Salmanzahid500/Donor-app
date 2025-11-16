import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

export const UseSignUpScreen = () => {
    const [isDropDownOpen,setIsDropDownOpen] = useState(false)
    const [selectedUniversity,setSelectedUniversity]= useState("")
  return {
    isDropDownOpen,setIsDropDownOpen,selectedUniversity,setSelectedUniversity
  }
}


