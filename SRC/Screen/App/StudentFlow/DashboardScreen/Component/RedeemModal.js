import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { use } from 'react'
import { Color } from "../../../../../Theme/Color/Index"
import { ResponsiveText } from "../../../../../Component/ResponsiveText"
import { hp, wp } from "../../../../../Component/ResponsiveComponent"


export const RedeemModal = ({
    showConfirmModal, handleCancel, selectedItem,
    handleConfirmRedemption,userData
}) => {
    return (
        <Modal
            visible={showConfirmModal}
            transparent={true}
            animationType="fade"
            onRequestClose={handleCancel}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.modalHeader}>
                        <ResponsiveText style={styles.modalTitle}>Confirm Redemption</ResponsiveText>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleCancel}
                        >
                            <ResponsiveText style={styles.closeButtonText}>×</ResponsiveText>
                        </TouchableOpacity>
                    </View>

                    <ResponsiveText style={styles.modalSubtitle}>
                        Are you sure you want to redeem this benefit?
                    </ResponsiveText>

                    {selectedItem && (
                        <View style={styles.itemDetailsContainer}>
                            <View style={styles.itemHeader}>
                                <View style={styles.itemIconContainer}>
                                    <ResponsiveText style={styles.itemIcon}>🎁</ResponsiveText>
                                </View>
                                <View style={styles.itemInfo}>
                                    <ResponsiveText style={styles.itemTitle}>
                                        {selectedItem.rewardTitle}
                                    </ResponsiveText>
                                    <ResponsiveText style={styles.itemDescription}>
                                        Reward from {selectedItem.byReward || 'Partner'}
                                    </ResponsiveText>
                                </View>
                            </View>

                            <View style={styles.costBreakdown}>                                   
                                 <View style={styles.costRow}>
                                <ResponsiveText style={styles.costLabel}>Cost:</ResponsiveText>
                                <ResponsiveText style={styles.costValue}>
                                    {selectedItem.pointsNeeded || 100} points
                                </ResponsiveText>
                            </View>
                                <View style={styles.costRow}>
                                    <ResponsiveText style={styles.costLabel}>Your Points:</ResponsiveText>
                                    <ResponsiveText style={styles.yourPointsValue}>{userData?.user?.points} points</ResponsiveText>
                                </View>
                                <View style={[styles.costRow, styles.remainingRow]}>
                                    <ResponsiveText style={styles.remainingLabel}>Remaining:</ResponsiveText>
                                    <ResponsiveText style={styles.remainingValue}>
                                        {userData?.user?.points - selectedItem.pointsNeeded} points
                                    </ResponsiveText>
                                </View>
                            </View>

                            <View style={styles.confirmationNote}>
                                <ResponsiveText style={styles.noteText}>
                                    After redeeming, you will receive a confirmation code and instructions via email/SMS.
                                </ResponsiveText>
                            </View>
                        </View>
                    )}

                    {/* Action Buttons */}
                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={handleCancel}
                        >
                            <ResponsiveText style={styles.cancelButtonText}>Cancel</ResponsiveText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={()=>handleConfirmRedemption(selectedItem)}
                        >
                            <ResponsiveText style={styles.confirmButtonText}>Confirm Redemption</ResponsiveText>
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
        padding: wp(5),
    },
    modalContainer: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(4),
        padding: wp(6),
        width: '100%',
        maxWidth: wp(85),
        elevation: 10,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        flex: 1,
    },
    closeButton: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        backgroundColor: Color.SURFACE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 18,
        color: Color.TEXT_SECONDARY,
        fontWeight: '600',
    },
    modalSubtitle: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        marginBottom: hp(3),
        lineHeight: 20,
    },
    itemDetailsContainer: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(3),
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    itemHeader: {
        flexDirection: 'row',
        marginBottom: hp(2),
    },
    itemIconContainer: {
        backgroundColor: Color.SURFACE_DARK,
        padding: wp(3),
        borderRadius: wp(3),
        marginRight: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemIcon: {
        fontSize: 24,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.5),
    },
    itemDescription: {
        fontSize: 13,
        color: Color.TEXT_SECONDARY,
        lineHeight: 18,
    },
    costBreakdown: {
        marginBottom: hp(2),
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(0.8),
    },
    remainingRow: {
        paddingTop: hp(0.8),
        borderTopWidth: 1,
        borderTopColor: Color.BORDER,
        marginTop: hp(0.5),
    },
    costLabel: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    costValue: {
        fontSize: 14,
        color: Color.ACCENT,
        fontWeight: '700',
    },
    yourPointsValue: {
        fontSize: 14,
        color: Color.TEXT_PRIMARY,
        fontWeight: '700',
    },
    remainingLabel: {
        fontSize: 14,
        color: Color.TEXT_PRIMARY,
        fontWeight: '600',
    },
    remainingValue: {
        fontSize: 14,
        color: Color.SUCCESS,
        fontWeight: '700',
    },
    confirmationNote: {
        backgroundColor: Color.WARNING + '15',
        padding: wp(3),
        borderRadius: wp(2),
        borderLeftWidth: 3,
        borderLeftColor: Color.WARNING,
    },
    noteText: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        lineHeight: 16,
        fontWeight: '400',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Color.SURFACE,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(6),
        borderRadius: wp(2),
        borderWidth: 1,
        borderColor: Color.BORDER,
        flex: 1,
        marginRight: wp(2),
    },
    cancelButtonText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '600',
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: Color.PRIMARY,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(6),
        borderRadius: wp(2),
        flex: 1,
        marginLeft: wp(2),
        elevation: 3,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    confirmButtonText: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: '700',
        textAlign: 'center',
    },
})