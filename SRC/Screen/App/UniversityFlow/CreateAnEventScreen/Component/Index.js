import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import InputText from '../../../../../Component/InputText'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import Spacer from '../../../../../Component/Spacer'

// Professional Event Header Component
export const EventHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <ResponsiveText style={styles.headerTitle}>Create Event</ResponsiveText>
                <ResponsiveText style={styles.headerSubtitle}>Schedule a new donation campaign</ResponsiveText>
            </View>
            <View style={styles.headerIconContainer}>
                <Text style={styles.headerIcon}>🎯</Text>
            </View>
        </View>
    )
}

// Enhanced Create Event Form Component
export const CreateEventForm = ({ formData, setFormData }) => {
    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <View style={styles.formCard}>
            <View style={styles.formHeader}>
                <ResponsiveText style={styles.formTitle}>Event Details</ResponsiveText>
                <ResponsiveText style={styles.formSubtitle}>Fill in the information below</ResponsiveText>
            </View>
            
            <View style={styles.formContent}>
                {/* Event Title */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Event Title *</ResponsiveText>
                    <InputText 
                        placeholder="Enter event title" 
                        value={formData.title}
                        onChangeText={(text) => updateField('title', text)}
                        style={styles.inputField}
                    />
                </View>
                
                <Spacer height={hp(2)} />
                
                {/* Location */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Donation Location *</ResponsiveText>
                    <InputText 
                        placeholder="Enter donation location" 
                        value={formData.location}
                        onChangeText={(text) => updateField('location', text)}
                        style={styles.inputField}
                    />
                </View>
                  <Spacer height={hp(2)} />
                
                {/* Date Field */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Date *</ResponsiveText>
                    <InputText 
                        placeholder="DD/MM/YYYY" 
                        value={formData.date}
                        onChangeText={(text) => updateField('date', text)}
                        style={styles.inputField}
                    />
                </View>
                
                <Spacer height={hp(2)} />
                
                {/* Time Field */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Time</ResponsiveText>
                    <InputText 
                        placeholder="09:00 AM" 
                        value={formData.time}
                        onChangeText={(text) => updateField('time', text)}
                        style={styles.inputField}
                    />
                </View>
                
                <Spacer height={hp(2)} />
                
                {/* Description */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Event Description</ResponsiveText>
                    <InputText 
                        placeholder="Describe the event details..." 
                        value={formData.description}
                        onChangeText={(text) => updateField('description', text)}
                        multiline={true}
                        numberOfLines={3}
                        style={[styles.inputField, styles.textAreaField]}
                    />
                </View>
                
                <Spacer height={hp(2)} />
                
                {/* Available Reward */}
                <View style={styles.inputGroup}>
                    <ResponsiveText style={styles.inputLabel}>Available Rewards</ResponsiveText>
                    <InputText 
                        placeholder="e.g., Health checkup, Blood test, Certificate" 
                        value={formData.reward}
                        onChangeText={(text) => updateField('reward', text)}
                        style={styles.inputField}
                    />
                </View>
            </View>
        </View>
    )
}

// Event Preview Component
export const EventPreview = ({ formData }) => {
    const hasData = formData.title || formData.location || formData.date

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
                                {formData.title || 'Event Title'}
                            </ResponsiveText>
                            <ResponsiveText style={styles.eventLocation}>
                                📍 {formData.location || 'Location'}
                            </ResponsiveText>
                        </View>
                        <View style={styles.statusBadge}>
                            <ResponsiveText style={styles.statusText}>Upcoming</ResponsiveText>
                        </View>
                    </View>
                    
                    <View style={styles.eventDetails}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailIcon}>📅</Text>
                            <ResponsiveText style={styles.detailText}>
                                {formData.date || 'Date not set'}
                            </ResponsiveText>
                        </View>
                        {formData.time && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>🕐</Text>
                                <ResponsiveText style={styles.detailText}>
                                    {formData.time}
                                </ResponsiveText>
                            </View>
                        )}
                        {formData.description && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>📝</Text>
                                <ResponsiveText style={styles.detailText}>
                                    {formData.description}
                                </ResponsiveText>
                            </View>
                        )}
                        {formData.reward && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>🎁</Text>
                                <ResponsiveText style={styles.detailText}>
                                    {formData.reward}
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