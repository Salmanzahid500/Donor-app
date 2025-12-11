import { StyleSheet, Text, View, TouchableOpacity, Modal, Platform } from 'react-native'
import React, { useState } from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import InputText from '../../../../../Component/InputText'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import Spacer from '../../../../../Component/Spacer'
import { Icons } from '../../../../../Assets/Index'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'

export const EventHeader = ({editMode}) => {
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
                <ResponsiveText style={styles.headerTitle}>{editMode ? "Edit Event" : "Create Event"}</ResponsiveText>
                <ResponsiveText style={styles.headerSubtitle}>{editMode ? "Update event details" : "Schedule a new donation campaign"}</ResponsiveText>
            </View>
            <View style={styles.headerIconContainer}>
                <Text style={styles.headerIcon}>{editMode ? "✏️" : "🎯"}</Text>
            </View>
        </View>
    )
}

export const CreateEventForm = ({
    eventTitle, setEventTitle, address, setAddress,
    date, setDate, time, setTime, startTime, setStartTime, endTime, setEndTime,
    description, setDescription,
    pointGain, setPointGain, bloodDonate, setBloodDOnate,capacity,setCapacity
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStartTime, setSelectedStartTime] = useState(new Date());
    const [selectedEndTime, setSelectedEndTime] = useState(new Date());

    const handleDateChange = (event, selected) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selected) {
            setSelectedDate(selected);
            const formattedDate = `${selected.getDate().toString().padStart(2, '0')}/${(selected.getMonth() + 1).toString().padStart(2, '0')}/${selected.getFullYear()}`;
            setDate(formattedDate);
        }
    };

    const handleStartTimeChange = (event, selected) => {
        setShowStartTimePicker(Platform.OS === 'ios');
        if (selected) {
            setSelectedStartTime(selected);
            const hours = selected.getHours();
            const minutes = selected.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const formattedTime = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            setStartTime(formattedTime);
        }
    };

    const handleEndTimeChange = (event, selected) => {
        setShowEndTimePicker(Platform.OS === 'ios');
        if (selected) {
            setSelectedEndTime(selected);
            const hours = selected.getHours();
            const minutes = selected.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            const formattedTime = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
            setEndTime(formattedTime);
        }
    };

    return (
        <View style={styles.formCard}>
            <View style={styles.formHeader}>
                <ResponsiveText style={styles.formTitle}>Event Details</ResponsiveText>
                <ResponsiveText style={styles.formSubtitle}>Fill in the information below</ResponsiveText>
            </View>

            <View style={styles.formContent}>
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Event Title *</ResponsiveText>
                    <InputText
                        placeholder="Enter event title"
                        value={eventTitle}
                        onChangeText={setEventTitle}
                        style={styles.inputField}
                    />
                </View>

                <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Donation Location *</ResponsiveText>
                    <InputText
                        placeholder="Enter donation location"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.inputField}
                    />
                </View>
                <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Date *</ResponsiveText>
                    <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() => setShowDatePicker(true)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.datePickerIcon}>📅</Text>
                        <ResponsiveText style={styles.datePickerText}>
                            {date || 'Select date'}
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

                <Spacer height={hp(2)} />

                <ResponsiveText style={styles.inputLabel}>Event Duration</ResponsiveText>
                <View style={styles.timeRow}>
                    <View style={styles.timeColumn}>
                        <ResponsiveText style={styles.timeSubLabel}>Start Time</ResponsiveText>
                        <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setShowStartTimePicker(true)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.datePickerIcon}>🕐</Text>
                            <ResponsiveText style={styles.datePickerText}>
                                {startTime || 'Start'}
                            </ResponsiveText>
                        </TouchableOpacity>
                        {showStartTimePicker && (
                            <DateTimePicker
                                value={selectedStartTime}
                                mode="time"
                                display="default"
                                onChange={handleStartTimeChange}
                            />
                        )}
                    </View>

                    <View style={styles.timeSeparator}>
                        <ResponsiveText style={styles.timeSeparatorText}>to</ResponsiveText>
                    </View>

                    <View style={styles.timeColumn}>
                        <ResponsiveText style={styles.timeSubLabel}>End Time</ResponsiveText>
                        <TouchableOpacity
                            style={styles.datePickerButton}
                            onPress={() => setShowEndTimePicker(true)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.datePickerIcon}>🕐</Text>
                            <ResponsiveText style={styles.datePickerText}>
                                {endTime || 'End'}
                            </ResponsiveText>
                        </TouchableOpacity>
                        {showEndTimePicker && (
                            <DateTimePicker
                                value={selectedEndTime}
                                mode="time"
                                display="default"
                                onChange={handleEndTimeChange}
                            />
                        )}
                    </View>
                </View>

                <Spacer />
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Blood To Donated</ResponsiveText>
                    <InputText
                        placeholder="Blood"
                        value={bloodDonate}
                        onChangeText={setBloodDOnate}
                        style={styles.inputField}
                    />
                </View>

                <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Event Description</ResponsiveText>
                    <InputText
                        placeholder="Describe the event details..."
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={3}
                        style={[styles.inputField, styles.textAreaField]}
                    />
                </View>

                <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Points</ResponsiveText>
                    <InputText
                        placeholder="e.g 10"
                        value={pointGain}
                        onChangeText={setPointGain}
                        style={styles.inputField}
                    />
                </View>
                 <Spacer height={hp(2)} />

                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Capacity</ResponsiveText>
                    <InputText
                        placeholder="e.g 100"
                        value={capacity}
                        onChangeText={setCapacity}
                        style={styles.inputField}
                    />
                </View>
            </View>
        </View>
    )
}

// Event Preview Component
export const EventPreview = ({
    eventTitle, eventLocation, eventDescription, eventDate, eventTime, eventReward
}) => {
    const hasData = eventTitle && eventLocation && eventDescription && eventDate && eventTime && eventReward

    if (!hasData) {
        return (
            <View style={styles.previewCard}>
                <View style={styles.previewHeader}>
                    <ResponsiveText style={styles.previewTitle}>Event Preview</ResponsiveText>
                    <ResponsiveText style={styles.previewSubtitle}>Fill in the form to see preview</ResponsiveText>
                </View>
                <View style={styles.emptyPreview}>
                    <Text style={styles.emptyIcon}>📋</Text>
                    <ResponsiveText style={styles.emptyText}>No event data to preview yet</ResponsiveText>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.previewCard}>
            <View style={styles.previewHeader}>
                <ResponsiveText style={styles.previewTitle}>Event Preview</ResponsiveText>
                <ResponsiveText style={styles.previewSubtitle}>How your event will appear</ResponsiveText>
            </View>

            <View style={styles.previewContent}>
                <View style={styles.eventCard}>
                    <View style={styles.eventCardHeader}>
                        <View style={styles.eventIconContainer}>
                            <Text style={styles.eventIcon}>🩸</Text>
                        </View>
                        <View style={styles.eventInfo}>
                            <ResponsiveText style={styles.eventTitle}>
                                {eventTitle || 'Event Title'}
                            </ResponsiveText>
                            <ResponsiveText style={styles.eventLocation}>
                                📍 {eventLocation || 'Location'}
                            </ResponsiveText>
                        </View>
                        <View style={styles.statusBadge}>
                            <ResponsiveText style={styles.statusText}>Upcoming</ResponsiveText>
                        </View>
                    </View>

                    <View style={styles.eventDetails}>
                        {eventDate && 
                        <View style={styles.detailRow}>
                            <Text style={styles.detailIcon}>📅</Text>
                            <ResponsiveText style={styles.detailText}>
                                {eventDate|| 'Date not set'}
                            </ResponsiveText>
                        </View>
                        }
                        
                        {eventTime && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>🕐</Text>
                                <ResponsiveText style={styles.detailText}>
                                    {eventTime}
                                </ResponsiveText>
                            </View>
                        )}
                        {eventDescription && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>📝</Text>
                                <ResponsiveText style={styles.detailText}>
                                    {eventDescription}
                                </ResponsiveText>
                            </View>
                        )}
                        {eventReward && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>🎁</Text>
                                <ResponsiveText style={styles.detailText}>
                                    {eventReward}
                                </ResponsiveText>
                            </View>
                        )}
                    </View>
                </View>
            </View>
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
    textAreaField: {
        height: hp(10),
        textAlignVertical: 'top',
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderRadius: wp(2),
        backgroundColor: Color.WHITE,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(3),
        minHeight: hp(6),
    },
    datePickerIcon: {
        fontSize: 20,
        marginRight: wp(2),
    },
    datePickerText: {
        fontSize: 14,
        color: Color.TEXT_PRIMARY,
        flex: 1,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(1),
        width: '80%',
    },
    timeColumn: {
        flex: 1,
        maxWidth: '45%',
    },
    timeSeparator: {
        width: wp(10),
        alignItems: 'center',
        marginTop: hp(2.5),
    },
    timeSeparatorText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    timeSubLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: Color.TEXT_SECONDARY,
        marginBottom: hp(0.5),
    },    // Date Time Container Styles
    dateTimeRow: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: hp(1),
    },
    dateColumn: {
        width: '48%',
        marginBottom: hp(1),
    },
    timeColumn: {
        width: '48%',
        marginLeft: '4%',
        marginBottom: hp(1),
    },
    // Old styles (keeping for backward compatibility)
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        marginBottom: hp(1),
    },
    halfInputGroup: {
        flex: 1,
        marginBottom: hp(1),
    },

    // Preview Card Styles
    previewCard: {
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
    previewHeader: {
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    previewTitle: {
        fontSize: 16,
        color: Color.TEXT_PRIMARY,
        fontWeight: '600',
        marginBottom: hp(0.3),
        letterSpacing: -0.2,
    },
    previewSubtitle: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    previewContent: {
        padding: wp(3),
    },
    emptyPreview: {
        alignItems: 'center',
        paddingVertical: hp(4),
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: hp(1),
        opacity: 0.3,
    },
    emptyText: {
        fontSize: 14,
        color: Color.TEXT_LIGHT,
        fontWeight: '500',
    },

    // Event Card Styles (in preview)
    eventCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: Color.BORDER,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    eventCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    eventIconContainer: {
        backgroundColor: Color.ACCENT,
        padding: wp(2),
        borderRadius: wp(2),
        marginRight: wp(3),
    },
    eventIcon: {
        fontSize: 20,
    },
    eventInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.2),
    },
    eventLocation: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    statusBadge: {
        backgroundColor: Color.WARNING,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
    },
    statusText: {
        color: Color.WHITE,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    eventDetails: {
        padding: wp(3),
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    detailIcon: {
        fontSize: 14,
        marginRight: wp(2),
        width: wp(6),
    },
    detailText: {
        fontSize: 13,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
        flex: 1,
    },
})