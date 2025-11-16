import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from "../../../../Component/MainContainer"
import { styles } from "./Style"
import { Images } from '../../../../Assets/Index'
import Spacer from '../../../../Component/Spacer'
import { hp, wp } from '../../../../Component/ResponsiveComponent'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import InputText from '../../../../Component/InputText'
import DropDown from '../../../../Component/Dropdown'
import { UniversityName } from '../../../../Dummy/Index'
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'

const StudentVerificationScreen = (props) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [selectedUniversity, setSelectedUniversity] = useState("")
    const [enrollmentId, setEnrollmentId] = useState("")

    const handleSubmit = () => {
        // Add validation logic here if needed
        props?.navigation?.goBack()
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => props?.navigation?.goBack()}
                activeOpacity={0.7}
            >
                <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Student Verification</Text>
            <View style={styles.headerRight} />
        </View>
    )

    const renderVerificationCard = () => (
        <View style={styles.verificationCard}>
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <Text style={styles.verificationIcon}>✓</Text>
                </View>
                <Text style={styles.cardTitle}>Verify Your Student Status</Text>
                <Text style={styles.cardSubtitle}>
                    Please provide your enrollment details to verify your student status
                </Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Enrollment ID</Text>
                    <InputText 
                        placeholder="Enter your enrollment ID"
                        value={enrollmentId}
                        onChangeText={setEnrollmentId}
                        style={styles.input}
                    />
                </View>                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Select University</Text>
                    <DropDown
                        setIsOpen={setIsDropDownOpen}
                        placeholder="Choose your university"
                        items={UniversityName}
                        value={selectedUniversity}
                        setValue={setSelectedUniversity}
                    />
                </View>
            </View>
        </View>
    )

    const renderInfoCard = () => (
        <View style={styles.infoCard}>
            <View style={styles.infoHeader}>
                <Text style={styles.infoIconText}>ℹ</Text>
                <Text style={styles.infoTitle}>Verification Process</Text>
            </View>
            <Text style={styles.infoText}>
                Your student verification helps us ensure that blood donation events are properly organized and managed within your university community.
            </Text>
        </View>
    )

    return (
        <MainContainer>
            {renderHeader()}
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Spacer height={hp(3)} />
                
                {renderVerificationCard()}
                
                <Spacer height={hp(3)} />
                
                {renderInfoCard()}
                
                <Spacer height={hp(4)} />
                  <SimpleButton
                    backgroundColor={Color.PRIMARY}
                    textColor={Color.WHITE}
                    text="Verify Student Status"
                    onPress={handleSubmit}
                    disabled={!enrollmentId || !selectedUniversity}
                />
                
                <Spacer height={hp(3)} />
            </ScrollView>
        </MainContainer>
    )
}

export default StudentVerificationScreen

