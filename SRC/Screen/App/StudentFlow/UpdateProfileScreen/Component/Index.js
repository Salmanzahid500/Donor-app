import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import InputText from '../../../../../Component/InputText'
import Spacer from '../../../../../Component/Spacer'
// import DropDown from "../../../../Component/Dropdown"
import { UniversityName } from "../../../../../Dummy/Index"
import DropDown from '../../../../../Component/Dropdown'
import { Icons } from '../../../../../Assets/Index'

export const Header = ({ backPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={backPress}
                activeOpacity={0.7}
            >
                <Icons.BackArrowIcon size={24} color={Color.WHITE} />
            </TouchableOpacity>
            <ResponsiveText style={styles.headerTitle}>Update Account</ResponsiveText>
            <View style={styles.headerRight} />
        </View>
    )
}

export const UpdateForm = ({
    fullName, setFullName,age ,setAge,
    bloodGroup, setBloodGroup,
}) => {
    const bloodGroupOptions = [
        { label: 'A+', value: 'A+' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B-', value: 'B-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
    ];

    return (
        <View style={styles.Signuptainer}>
            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Full Name</ResponsiveText>
                <InputText
                    placeholder={"Enter your full name"}
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            <Spacer height={hp(3)} />

            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Blood Group</ResponsiveText>
                <DropDown
                    items={bloodGroupOptions}
                    value={bloodGroup}
                    setValue={setBloodGroup}
                    placeholder="Select your blood group"
                    zIndex={3000}
                />
            </View>
              <Spacer height={hp(3)} />

            <View style={styles.inputGroup}>
                <ResponsiveText style={styles.text2}>Age (18-60)</ResponsiveText>
                <InputText
                    placeholder={"Enter Age"}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    maxLength={2}
                />
            </View>
           
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    backButton: {
        padding: wp(2),
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.WHITE,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: wp(2),
    },
    Signuptainer: {
        justifyContent: "center",
    },
    inputGroup: {
        marginBottom: hp(1),
        // width: '100%',
        // alignItems: 'flex-start',
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