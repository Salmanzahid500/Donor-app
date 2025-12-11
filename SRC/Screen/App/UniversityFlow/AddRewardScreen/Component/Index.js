import { StyleSheet, Text, View, TouchableOpacity, Modal, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import InputText from '../../../../../Component/InputText'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import Spacer from '../../../../../Component/Spacer'
import { Icons } from '../../../../../Assets/Index'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'

export const RewardHeader = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backButton}
                activeOpacity={0.7}
            >
                <Icons.BackArrowIcon size={24} color={Color.WHITE} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
                <ResponsiveText style={styles.headerTitle}>Add Reward</ResponsiveText>
                <ResponsiveText style={styles.headerSubtitle}>Reward your donors with appreciation gifts</ResponsiveText>

            </View>
            <View style={styles.headerIconContainer}>
                <Text style={styles.headerIcon}>🎁</Text>
            </View>
        </View>
    )
}

export const AddRewardForm = ({
    rewardTitle, setRewardTitle, byReward, setByReward,
    point, setPoint,validDate,setValidDate
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    useEffect(() => {
        if (!validDate) {
            setSelectedDate(new Date())
            return
        }
        const parts = validDate.split('/')
        if (parts.length === 3) {
            const parsed = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
            if (!Number.isNaN(parsed.getTime())) {
                setSelectedDate(parsed)
            }
        }
    }, [validDate])

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const handleDateChange = (event, selected) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selected) {
            setSelectedDate(selected)
            setValidDate(formatDate(selected))
        }
    }
    return (
        <View style={styles.formCard}>
            <View style={styles.formHeader}>
                <ResponsiveText style={styles.formTitle}>Reward Details</ResponsiveText>
                <ResponsiveText style={styles.formSubtitle}>Fill in the information below</ResponsiveText>
            </View>

            <View style={styles.formContent}>
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Reward Title *</ResponsiveText>
                    <InputText
                        placeholder="Enter Reward title"
                        value={rewardTitle}
                        onChangeText={setRewardTitle}
                        style={styles.inputField}
                    />
                </View>

                <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Giver Name</ResponsiveText>
                    <InputText
                        placeholder="Enter giver name or institution"
                        value={byReward}
                        onChangeText={setByReward}
                        style={styles.inputField}
                    />
                </View>
                <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Point Needed</ResponsiveText>
                    <InputText
                        placeholder="e.g 100"
                        value={point}
                        onChangeText={setPoint}
                        style={styles.inputField}
                        keyboardType="numeric"
                    />
                </View>
                <Spacer height={hp(2)} />
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Valid Date *</ResponsiveText>
                    <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() => setShowDatePicker(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.datePickerIcon}>📅</Text>
                        <ResponsiveText style={styles.datePickerText}>
                            {validDate || 'Select expiration date'}
                        </ResponsiveText>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

export const RewardList = ({ rewards = [], onEdit }) => {
    return (
        <View style={styles.listCard}>
            <View style={styles.listHeader}>
                <ResponsiveText style={styles.listTitle}>Existing Rewards</ResponsiveText>
                <View style={styles.listBadge}>
                    <ResponsiveText style={styles.listBadgeText}>{rewards.length}</ResponsiveText>
                </View>
            </View>
            {rewards.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyIcon}>🎯</Text>
                    <ResponsiveText style={styles.emptyTitle}>No rewards yet</ResponsiveText>
                    <ResponsiveText style={styles.emptyDescription}>Create your first reward to see it listed here.</ResponsiveText>
                </View>
            ) : (
                rewards.map((reward) => (
                    <View key={reward.id} style={styles.rewardRow}>
                        <View style={styles.rewardInfo}>
                            <ResponsiveText style={styles.rewardRowTitle}>{reward.rewardTitle}</ResponsiveText>
                            <ResponsiveText style={styles.rewardMeta}>{reward.byReward || '—'} • {reward.pointsNeeded} pts</ResponsiveText>
                            {reward.validDate ? (
                                <ResponsiveText style={styles.rewardMeta}>Valid till {reward.validDate}</ResponsiveText>
                            ) : null}
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={() => onEdit?.(reward)}>
                            <ResponsiveText style={styles.editButtonText}>Edit</ResponsiveText>
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    // Professional Header Styles
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        backgroundColor: Color.PRIMARY,
        borderRadius: wp(4),
        marginHorizontal: wp(4),
        marginTop: hp(1),
        elevation: 8,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    backButton: {
        padding: wp(2),
        marginRight: wp(2),
    },
    headerContent: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.WHITE,
        marginBottom: hp(0.2),
    },
    headerSubtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    headerIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: wp(3),
        borderRadius: wp(6),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    headerIcon: {
        fontSize: 24,
    },

    // Form Card Styles
    formCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: Color.BORDER,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    formHeader: {
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    formTitle: {
        fontSize: 16,
        color: Color.TEXT_PRIMARY,
        fontWeight: '600',
        marginBottom: hp(0.3),
        letterSpacing: -0.2,
    },
    formSubtitle: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    formContent: {
        padding: wp(4),
    },    // Input Styles
    inputGroup: {
        marginBottom: hp(1),
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.5),
        letterSpacing: 0.2,
    },
    inputField: {
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderRadius: wp(2),
        backgroundColor: Color.WHITE,
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.5),
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderRadius: wp(2),
        backgroundColor: Color.WHITE,
    },
    datePickerIcon: {
        marginRight: wp(2),
        fontSize: 18,
    },
    datePickerText: {
        color: Color.TEXT_PRIMARY,
        fontSize: 14,
    },
    listCard: {
        marginTop: hp(3),
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: Color.BORDER,
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1.5),
    },
    listTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },
    listBadge: {
        minWidth: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listBadgeText: {
        color: Color.WHITE,
        fontWeight: '700',
    },
    rewardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.2),
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    rewardInfo: {
        flex: 1,
        marginRight: wp(3),
    },
    rewardRowTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },
    rewardMeta: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        marginTop: hp(0.3),
    },
    editButton: {
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(4),
        borderRadius: wp(2),
        borderWidth: 1,
        borderColor: Color.PRIMARY,
    },
    editButtonText: {
        color: Color.PRIMARY,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: hp(2),
    },
    emptyIcon: {
        fontSize: 24,
        marginBottom: hp(1),
    },
    emptyTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },
    emptyDescription: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
        marginTop: hp(0.5),
    },
  


})