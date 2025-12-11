import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import moment from 'moment'


export const RewardDetail = ({
    modalVisible, setModalVisible, selectedReward
}) => {
    console.log(selectedReward)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <ResponsiveText style={styles.modalTitle}>
                            Details
                        </ResponsiveText>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeIcon}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.modalContent}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.modalScrollContent}
                    >
                        {selectedReward && (
                            <>
                                {/* Student Information Card */}
                                <View style={styles.modalCard}>
                                    <ResponsiveText style={styles.modalSectionTitle}>👤 Student Information</ResponsiveText>
                                    <View style={styles.modalInfoGrid}>
                                        <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Full Name:</ResponsiveText>
                                            <ResponsiveText style={styles.modalValue}>{selectedReward?.student?.FullName}</ResponsiveText>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Student ID:</ResponsiveText>
                                            <ResponsiveText style={styles.modalValue}>{selectedReward?.student?.StudentId}</ResponsiveText>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Email:</ResponsiveText>
                                            <ResponsiveText style={styles.modalValue}>{selectedReward.student?.Email}</ResponsiveText>
                                        </View>
                                        {/* <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Phone:</ResponsiveText>
                                            <ResponsiveText style={styles.modalValue}>+1 (555) 123-4567</ResponsiveText>
                                        </View> */}
                                    </View>
                                </View>

                                {/* Reward Information Card */}
                                {selectedReward?.RewardType &&
                                    <View style={styles.modalCard}>
                                        <ResponsiveText style={styles.modalSectionTitle}>🎁 Reward Information</ResponsiveText>
                                        <View style={styles.modalInfoGrid}>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Reward Type:</ResponsiveText>
                                                <ResponsiveText style={[styles.modalValue, { color: Color.PRIMARY, fontWeight: '700' }]}>
                                                    {selectedReward.RewardType}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Points Required:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>{selectedReward?.pointsNeeded} points</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Current Status:</ResponsiveText>
                                                <View style={[styles.statusBadge, {
                                                    backgroundColor: selectedReward?.status === 'approved' ? Color.SUCCESS : Color.WARNING
                                                }]}>
                                                    <ResponsiveText style={styles.statusText}>
                                                        {selectedReward.status === 'approved' ? '✓ Approved' : '⏳ Pending Review'}
                                                    </ResponsiveText>
                                                </View>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Request Date:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>{moment(selectedReward?.createdAt.toDate()).format("DD MMM YYYY")}</ResponsiveText>
                                            </View>
                                            {selectedReward?.status === 'approved' && (
                                                <View style={styles.modalRow}>
                                                    <ResponsiveText style={styles.modalLabel}>Approved Date:</ResponsiveText>
                                                    <ResponsiveText style={[styles.modalValue, { color: Color.SUCCESS, fontWeight: '600' }]}>
                                                        {moment(selectedReward?.approvedAt.toDate()).format("DD MMM YYYY")}
                                                    </ResponsiveText>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                }


                                {/* Donation History Card */}
                                <View style={styles.modalCard}>
                                    <ResponsiveText style={styles.modalSectionTitle}>🩸 Donation History</ResponsiveText>
                                    <View style={styles.modalInfoGrid}>
                                        <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Total Donations:</ResponsiveText>
                                            <ResponsiveText style={[styles.modalValue, { color: Color.ACCENT, fontWeight: '700' }]}>{selectedReward?.student?.event || 0} times</ResponsiveText>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Total Points Earned:</ResponsiveText>
                                            <ResponsiveText style={styles.modalValue}>{selectedReward?.student?.availablePoint || 0} points</ResponsiveText>
                                        </View>
                                        <View style={styles.modalRow}>
                                            <ResponsiveText style={styles.modalLabel}>Available Points:</ResponsiveText>
                                            <ResponsiveText style={styles.modalValue}>
                                                {selectedReward?.student?.points || 0}
                                            </ResponsiveText>
                                        </View>
                                        {selectedReward?.createdAt && (
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Request Date:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>
                                                    {moment(selectedReward.createdAt.toDate()).format("MMMM DD, YYYY")}
                                                </ResponsiveText>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {/* Reward Description Card */}
                                {selectedReward?.RewardType ?
                                    <View style={styles.modalCard}>
                                        <ResponsiveText style={styles.modalSectionTitle}>📋 Description</ResponsiveText>
                                        <ResponsiveText style={styles.modalDescription}>
                                            This reward request is for {selectedReward.RewardType}.
                                            {'\n\n'}
                                            The student has demonstrated exceptional commitment to the blood donation program and has
                                            accumulated {selectedReward?.pointsNeeded || 0} points needed for this reward.
                                            {'\n\n'}
                                            Request Status: {selectedReward?.status === 'approved' ? '✅ Approved' : '⏳ Pending Review'}
                                        </ResponsiveText>
                                    </View>
                                    :
                                    selectedReward?.event && (
                                    <View style={styles.modalCard}>
                                        <ResponsiveText style={styles.modalSectionTitle}>📋 Event Details</ResponsiveText>
                                        <View style={styles.modalInfoGrid}>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Event Name:</ResponsiveText>
                                                <ResponsiveText style={[styles.modalValue, { fontWeight: '700' }]}>
                                                    {selectedReward.event?.eventTitle || 'N/A'}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Event Date:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>
                                                    {selectedReward.event?.date || 'N/A'}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Event Time:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>
                                                    {selectedReward.event?.time || 'N/A'}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Location:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>
                                                    {selectedReward.event?.address || 'N/A'}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Points Reward:</ResponsiveText>
                                                <ResponsiveText style={[styles.modalValue, { color: Color.SUCCESS, fontWeight: '700' }]}>
                                                    {selectedReward.event?.points || 0} points
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Capacity:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>
                                                    {selectedReward.event?.capacity || 'N/A'} donors
                                                </ResponsiveText>
                                            </View>
                                        </View>
                                        {selectedReward.event?.description && (
                                            <>
                                                <ResponsiveText style={[styles.modalSectionTitle, { marginTop: hp(2) }]}>📝 Description</ResponsiveText>
                                                <ResponsiveText style={styles.modalDescription}>
                                                    {selectedReward.event.description}
                                                </ResponsiveText>
                                            </>
                                        )}
                                    </View>
                                    )
                                }

                            </>
                        )}
                    </ScrollView>

                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <ResponsiveText style={styles.modalCloseText}>Close</ResponsiveText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(4),
        width: wp(92),
        maxHeight: hp(85),
        elevation: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(4),
        backgroundColor: Color.PRIMARY,
        borderTopLeftRadius: wp(4),
        borderTopRightRadius: wp(4),
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Color.WHITE,
    },
    closeButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.WHITE,
    },
    modalContent: {
        // flex: 1,
    },
    modalScrollContent: {
        // padding: wp(4),
        // paddingBottom: hp(2),
    },
    modalCard: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    modalSection: {
        marginBottom: hp(2.5),
    },
    modalSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Color.PRIMARY,
        marginBottom: hp(1.5),
        paddingBottom: hp(0.5),
        borderBottomWidth: 2,
        borderBottomColor: Color.PRIMARY,
    },
    modalInfoGrid: {
        gap: hp(1),
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(2),
        backgroundColor: Color.WHITE,
        borderRadius: wp(2),
        marginBottom: hp(0.5),
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
        flex: 1.2,
    },
    modalValue: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.TEXT_PRIMARY,
        flex: 1.5,
        textAlign: 'right',
    },
    statusBadge: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: wp(2),
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: Color.WHITE,
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        lineHeight: 22,
        textAlign: 'justify',
        backgroundColor: Color.WHITE,
        padding: wp(3),
        borderRadius: wp(2),
        borderLeftWidth: 3,
        borderLeftColor: Color.PRIMARY,
    },
    modalFooter: {
        padding: wp(4),
        borderTopWidth: 1,
        borderTopColor: Color.DIVIDER,
    },
    modalCloseButton: {
        backgroundColor: Color.PRIMARY,
        paddingVertical: hp(1.5),
        borderRadius: wp(3),
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.WHITE,
    },
})