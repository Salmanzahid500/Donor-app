import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from "../../../../Component/MainContainer"
import { styles } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { hp, wp } from '../../../../Component/ResponsiveComponent'
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'
import { Header, InfoCard, VerificationStatusBox } from "./Component/Index"
import { UseStudentVerification } from "./Hooks/Index"
import { ResponsiveText } from '../../../../Component/ResponsiveText'

const StudentVerificationScreen = (props) => {
    const {
        enrollmentId, isDropDownOpen, selectedUniversity,
        setEnrollmentId, setIsDropDownOpen, setSelectedUniversity,
        handleSubmit, loading, errorMessage,
        documentUri, documentName, handleDocumentPick, removeDocument
    } = UseStudentVerification(props)


    return (
        <MainContainer>
            <Header
                backPress={() => props?.navigation?.goBack()}
            />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Spacer height={hp(3)} />
                <VerificationStatusBox
                    enrollmentId={enrollmentId}
                    selectedUniversity={selectedUniversity}
                    setEnrollmentId={setEnrollmentId}
                    setIsDropDownOpen={setIsDropDownOpen}
                    setSelectedUniversity={setSelectedUniversity}
                    documentUri={documentUri}
                    documentName={documentName}
                    handleDocumentPick={handleDocumentPick}
                    removeDocument={removeDocument}
                />
                <Spacer height={isDropDownOpen ? hp(35) : hp(3)} />
                <InfoCard />
                <Spacer height={hp(4)} />
                <SimpleButton
                    backgroundColor={Color.PRIMARY}
                    textColor={Color.WHITE}
                    text="Submit Verification Request"
                    onPress={handleSubmit}
                    disabled={!enrollmentId || !selectedUniversity || !documentUri}
                    loading={loading}
                />
                {errorMessage &&
                    <ResponsiveText style={styles.errorMessage}>{errorMessage}</ResponsiveText>
                }
                <Spacer height={hp(3)} />
            </ScrollView>
        </MainContainer>
    )
}

export default StudentVerificationScreen

