import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color } from '../../../../Theme/Color/Index'
import { hp, wp } from '../../../../Component/ResponsiveComponent'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import InputText from '../../../../Component/InputText'
import Spacer from '../../../../Component/Spacer'
import DropDown from "../../../../Component/Dropdown"
import { UniversityName } from "../../../../Dummy/Index"

export const SignupForm = ({ setDropDownOpen, selectedUniversity, setSelectedUniversity }) => {
    return (
        <View style={styles.Signuptainer}>
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Full Name</ResponsiveText>
                <InputText placeholder={"Enter your full name"} />
            </View>
            
            <Spacer height={hp(3)} />
            
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Email Address</ResponsiveText>
                <InputText placeholder={"Enter your email"} />
            </View>
            
            <Spacer height={hp(3)} />
            
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Student ID</ResponsiveText>
                <InputText placeholder={"Enter your student ID"} />
            </View>
            
            <Spacer height={hp(3)} />
            
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>University</ResponsiveText>                <DropDown
                    setIsOpen={setDropDownOpen}
                    placeholder={"Select your university"}
                    items={UniversityName}
                    value={selectedUniversity}
                    setValue={setSelectedUniversity}
                />
            </View>
            
            <Spacer height={hp(3)} />
            
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Password</ResponsiveText>
                <InputText placeholder={"Create a secure password"} secureTextEntry={true} />
            </View>
            
            <Spacer height={hp(3)} />
            
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Confirm Password</ResponsiveText>
                <InputText placeholder={"Confirm your password"} secureTextEntry={true} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    Signuptainer: {
        justifyContent: "center",
    },
    inputGroup: {
        marginBottom: hp(1),
        width: '100%',
        alignItems: 'flex-start',
    },
    text2: {
        fontSize: 14,
        fontWeight: "600",
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.5),
        letterSpacing: 0.2,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
})