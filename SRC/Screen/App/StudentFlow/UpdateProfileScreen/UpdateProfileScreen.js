import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { styles } from "./Style"
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { Header, UpdateForm } from "./Component/Index"
import { SimpleButton } from '../../../../Component/SimpleButton'
import { Color } from '../../../../Theme/Color/Index'
import { Route } from '../../../../Constant/Route'
import { Images } from '../../../../Assets/Index'
import { hp } from '../../../../Component/ResponsiveComponent'
import Spacer from '../../../../Component/Spacer'
import { UseUpdateForm } from "./Hooks/Index"

const UpdateProfileScreen = (props) => {
    const {
        fullName, setFullName, bloodGroup, errorMessage, handleUpdate, loading, setBloodGroup,
        age, setAge
    } = UseUpdateForm(props)


    return (
        <MainContainer style={styles.mainContainer}>
            <View style={styles.container}>
                <Header backPress={() => props?.navigation?.goBack()} />
                {/* Signup Card */}
                <View style={styles.UpdateCard}>

                    <ScrollView
                        style={styles.formScrollView}
                        contentContainerStyle={styles.formScrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <UpdateForm
                            fullName={fullName}
                            setFullName={setFullName}
                            age={age}
                            setAge={setAge}
                            bloodGroup={bloodGroup}
                            setBloodGroup={setBloodGroup}
                        />

                        <Spacer height={hp(4)} />

                        <SimpleButton
                            textColor={Color.WHITE}
                            text={"Update Account"}
                            backgroundColor={Color.PRIMARY}
                            style={styles.signupButton}
                            onPress={handleUpdate}
                            loading={loading}
                        />
                        {errorMessage &&
                            <ResponsiveText style={styles.errorMessage}>{errorMessage}</ResponsiveText>
                        }
                    </ScrollView>
                </View>
            </View>
        </MainContainer>
    )
}

export default UpdateProfileScreen

