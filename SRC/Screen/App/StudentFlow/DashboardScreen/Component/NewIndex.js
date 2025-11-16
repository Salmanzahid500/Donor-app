import { StyleSheet, TouchableOpacity, View, Text, Image, Modal } from "react-native";
import { Color } from "../../../../../Theme/Color/Index"
import { ResponsiveText } from "../../../../../Component/ResponsiveText"
import { hp, wp } from "../../../../../Component/ResponsiveComponent"
import { DummyRequest, RedeemOption } from "../../../../../Dummy/Index";
import { Images } from "../../../../../Assets/Index";
import Spacer from "../../../../../Component/Spacer";
import React, { useState } from 'react';

export const WelcomeHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.userSection}>
                <View style={styles.avatarContainer}>
                    <Image source={Images.profileImage} style={styles.avatarImage} />
                    <View style={styles.statusIndicator} />
                </View>                <View style={styles.userInfo}>
                    <ResponsiveText style={styles.greetingText}>Good Morning</ResponsiveText>
                    <ResponsiveText style={styles.userNameText}>Salman Rafiq</ResponsiveText>
                    <ResponsiveText style={styles.userRoleText}>Graduate Student • Active Donor</ResponsiveText>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.notificationBtn}>
                    <Text style={styles.notificationIcon}>🔔</Text>
                    <View style={styles.notificationBadge}>
                        <Text style={styles.badgeText}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const StatsCards = () => {
    const metrics = [
        { 
            label: "Donations", 
            value: "12", 
            subtitle: "+2 this month",
            color: Color.ACCENT,
            bgColor: "#FEF2F2"
        },
        { 
            label: "Points", 
            value: "240", 
            subtitle: "Available",
            color: Color.WARNING,
            bgColor: "#FFFBEB"
        },
        { 
            label: "Impact", 
            value: "36", 
            subtitle: "Lives helped",
            color: Color.SUCCESS,
            bgColor: "#F0FDF4"
        },
    ];

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <ResponsiveText style={styles.statsTitle}>Your Impact Dashboard</ResponsiveText>
                <ResponsiveText style={styles.statsSubtitle}>Track your contribution to healthcare</ResponsiveText>
            </View>
            <View style={styles.statsGrid}>
                {metrics.map((metric, index) => (
                    <View key={index} style={[styles.statCard, { backgroundColor: metric.bgColor }]}>
                        <ResponsiveText style={[styles.statValue, { color: metric.color }]}>{metric.value}</ResponsiveText>
                        <ResponsiveText style={styles.statLabel}>{metric.label}</ResponsiveText>
                        <ResponsiveText style={styles.statSubtitle}>{metric.subtitle}</ResponsiveText>
                    </View>
                ))}
            </View>
        </View>
    );
};

export const HeaderButton = ({ headerPress, setHeaderPress }) => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                onPress={() => setHeaderPress('request')}
                activeOpacity={0.7}
                style={[
                    styles.tabButton,
                    headerPress === 'request' && styles.activeTab
                ]}
            >
                <View style={styles.tabContent}>
                    <View style={[styles.tabIcon, { backgroundColor: headerPress === 'request' ? Color.WHITE : Color.SURFACE_DARK }]}>
                        <Text style={[styles.iconText, { color: headerPress === 'request' ? Color.PRIMARY : Color.TEXT_SECONDARY }]}>🩸</Text>
                    </View>
                    <ResponsiveText style={[styles.tabText, { color: headerPress === 'request' ? Color.WHITE : Color.TEXT_PRIMARY }]}>
                        Blood Requests
                    </ResponsiveText>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setHeaderPress('redeem')}
                activeOpacity={0.7}
                style={[
                    styles.tabButton,
                    headerPress === 'redeem' && styles.activeTab
                ]}
            >                <View style={styles.tabContent}>
                    <View style={[styles.tabIcon, { backgroundColor: headerPress === 'redeem' ? Color.WHITE : Color.SURFACE_DARK }]}>
                        <Text style={[styles.iconText, { color: headerPress === 'redeem' ? Color.PRIMARY : Color.TEXT_SECONDARY }]}>🎁</Text>
                    </View>
                    <ResponsiveText style={[styles.tabText, { color: headerPress === 'redeem' ? Color.WHITE : Color.TEXT_PRIMARY }]}>
                        Rewards
                    </ResponsiveText>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export const BloodRequest = ({onpress}) => {
    const renderRequestItem = ({ item }) => (
        <View style={styles.requestCard}>
            <View style={styles.cardHeader}>
                <View style={styles.urgencySection}>
                    <View style={styles.urgencyBadge}>
                        <ResponsiveText style={styles.urgencyText}>URGENT</ResponsiveText>
                    </View>
                    <ResponsiveText style={styles.timeText}>2 hours ago</ResponsiveText>
                </View>
                <View style={styles.bloodTypeContainer}>
                    <ResponsiveText style={styles.bloodTypeText}>O+</ResponsiveText>
                    <ResponsiveText style={styles.bloodTypeLabel}>Blood Type</ResponsiveText>
                </View>
            </View>
            
            <View style={styles.cardBody}>
                <View style={styles.hospitalSection}>
                    <View style={styles.hospitalHeader}>
                        <View style={styles.hospitalIconContainer}>
                            <Text style={styles.hospitalIcon}>🏥</Text>
                        </View>
                        <View style={styles.hospitalInfo}>
                            <ResponsiveText style={styles.hospitalName}>{item.universityName}</ResponsiveText>
                            <ResponsiveText style={styles.departmentName}>Emergency Department</ResponsiveText>
                        </View>
                        <View style={styles.verifiedIcon}>
                            <Text style={styles.verifiedText}>✓</Text>
                        </View>
                    </View>
                    
                    <View style={styles.detailsList}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailIcon}>📅</Text>
                            <ResponsiveText style={styles.detailText}>Date: {item.eventDate}</ResponsiveText>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailIcon}>🕐</Text>
                            <ResponsiveText style={styles.detailText}>Time: 9:00 AM - 5:00 PM</ResponsiveText>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailIcon}>📍</Text>
                            <ResponsiveText style={styles.detailText}>Location: Medical Center Campus</ResponsiveText>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={styles.cardFooter}>
                <View style={styles.rewardSection}>
                    <View style={styles.rewardItem}>
                        <Text style={styles.rewardIcon}>⭐</Text>
                        <ResponsiveText style={styles.rewardText}>+20 Points</ResponsiveText>
                    </View>
                    <View style={styles.rewardItem}>
                        <Text style={styles.rewardIcon}>🏆</Text>
                        <ResponsiveText style={styles.rewardText}>Certificate</ResponsiveText>
                    </View>
                </View>
                <TouchableOpacity onPress={onpress} style={styles.signupButton}>
                    <ResponsiveText style={styles.signupButtonText}>Register Now</ResponsiveText>
                </TouchableOpacity>
            </View>
        </View>
    );    return (
        <View style={styles.listContainer}>
            {DummyRequest.map((item, index) => (
                <View key={item.id.toString()}>
                    {renderRequestItem({ item })}
                    {index < DummyRequest.length - 1 && <Spacer height={hp(1.5)} />}
                </View>
            ))}
        </View>
    );
};

export const Redeem = () => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRedeemPress = (item) => {
        setSelectedItem(item);
        setShowConfirmModal(true);
    };

    const handleConfirmRedemption = () => {
        setShowConfirmModal(false);
        setSelectedItem(null);
        // Add your redemption logic here
        alert('Redemption successful! You will receive a confirmation code via email/SMS.');
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
        setSelectedItem(null);
    };

    const renderRedeemItem = ({ item }) => (<View style={styles.rewardCard}>            <View style={styles.rewardCardHeader}>
                <View style={styles.popularitySection}>
                    <View style={styles.iconAndBadgeRow}>
                        <View style={styles.rewardIconContainer}>
                            <Text style={styles.rewardCardIcon}>🎁</Text>
                        </View>
                        <View style={styles.popularBadge}>
                            <ResponsiveText style={styles.popularText}>POPULAR</ResponsiveText>
                        </View>
                    </View>
                </View>                <View style={styles.pointsContainer}>
                    <ResponsiveText style={styles.pointsValue}>{String(item.cost || '50')}</ResponsiveText>
                    <ResponsiveText style={styles.pointsLabel}>points</ResponsiveText>
                </View>
            </View>
            
            <View style={styles.rewardCardBody}>
                <ResponsiveText style={styles.rewardTitle}>{item.redeemItem}</ResponsiveText>
                <ResponsiveText style={styles.rewardProvider}>From {item.universityName}</ResponsiveText>
                
                <View style={styles.featuresList}>
                    <View style={styles.featureItem}>
                        <Text style={styles.checkIcon}>✓</Text>
                        <ResponsiveText style={styles.featureText}>Digital certificate included</ResponsiveText>
                    </View>
                    <View style={styles.featureItem}>
                        <Text style={styles.checkIcon}>✓</Text>
                        <ResponsiveText style={styles.featureText}>Valid until Dec 31, 2025</ResponsiveText>
                    </View>
                </View>
            </View>
            
            <View style={styles.rewardCardFooter}>
                <View style={styles.rewardFooterInfo}>
                    <View style={styles.stockInfo}>
                        <Text style={styles.stockIcon}>📦</Text>
                        <ResponsiveText style={styles.stockText}>12 left</ResponsiveText>
                    </View>
                    <View style={styles.ratingInfo}>
                        <Text style={styles.starIcon}>⭐</Text>
                        <ResponsiveText style={styles.ratingText}>4.8 (24 reviews)</ResponsiveText>
                    </View>
                </View>                <TouchableOpacity 
                    style={styles.redeemButton}
                    onPress={() => handleRedeemPress(item)}
                >
                    <ResponsiveText style={styles.redeemButtonText}>Redeem Now</ResponsiveText>
                </TouchableOpacity>
            </View>
        </View>
    );    return (
        <View style={styles.listContainer}>
            {RedeemOption.map((item, index) => (
                <View key={item.id.toString()}>
                    {renderRedeemItem({ item })}
                    {index < RedeemOption.length - 1 && <Spacer height={hp(1.5)} />}
                </View>
            ))}
            
            {/* Confirmation Modal */}
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
                                <Text style={styles.closeButtonText}>×</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <ResponsiveText style={styles.modalSubtitle}>
                            Are you sure you want to redeem this benefit?
                        </ResponsiveText>
                        
                        {selectedItem && (
                            <View style={styles.itemDetailsContainer}>
                                <View style={styles.itemHeader}>
                                    <View style={styles.itemIconContainer}>
                                        <Text style={styles.itemIcon}>🎁</Text>
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <ResponsiveText style={styles.itemTitle}>
                                            {selectedItem.redeemItem}
                                        </ResponsiveText>
                                        <ResponsiveText style={styles.itemDescription}>
                                            Complete physical examination including vital signs, blood pressure, and consultation
                                        </ResponsiveText>
                                    </View>
                                </View>
                                
                                <View style={styles.costBreakdown}>                                    <View style={styles.costRow}>
                                        <ResponsiveText style={styles.costLabel}>Cost:</ResponsiveText>
                                        <ResponsiveText style={styles.costValue}>
                                            {String(selectedItem.cost || '100')} points
                                        </ResponsiveText>
                                    </View>
                                    <View style={styles.costRow}>
                                        <ResponsiveText style={styles.costLabel}>Your Points:</ResponsiveText>
                                        <ResponsiveText style={styles.yourPointsValue}>240 points</ResponsiveText>
                                    </View>                                    <View style={[styles.costRow, styles.remainingRow]}>
                                        <ResponsiveText style={styles.remainingLabel}>Remaining:</ResponsiveText>
                                        <ResponsiveText style={styles.remainingValue}>
                                            {String(240 - (selectedItem.cost || 100))} points
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
                                onPress={handleConfirmRedemption}
                            >
                                <ResponsiveText style={styles.confirmButtonText}>Confirm Redemption</ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    // List Container for replacing FlatList
    listContainer: {
        flex: 1,
    },
      // Professional Header Styles
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        backgroundColor: Color.PRIMARY,
        borderRadius: wp(4),
        marginHorizontal: wp(3),
        marginVertical: hp(1),
        elevation: 8,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: wp(3),
    },    avatarImage: {
        width: wp(13),
        height: wp(13),
        borderRadius: wp(6.5),
        borderWidth: 2,
        borderColor: Color.WHITE,
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp(3.5),
        height: wp(3.5),
        borderRadius: wp(1.75),
        backgroundColor: Color.SUCCESS,
        borderWidth: 2,
        borderColor: Color.WHITE,
    },
    userInfo: {
        flex: 1,
    },    greetingText: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '400',
    },
    userNameText: {
        fontSize: 18,
        fontWeight: '700',
        color: Color.WHITE,
        marginVertical: hp(0.2),
    },
    userRoleText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },    notificationBtn: {
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: wp(2.5),
        borderRadius: wp(6),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    notificationIcon: {
        fontSize: 18,
        color: Color.WHITE,
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: Color.ACCENT,
        minWidth: wp(4.5),
        height: wp(4.5),
        borderRadius: wp(2.25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: Color.WHITE,
        fontSize: 9,
        fontWeight: '700',
    },

    // Professional Stats Styles
    statsContainer: {
        marginTop: hp(1),
    },
    statsHeader: {
        marginBottom: hp(2),
    },
    statsTitle: {
        fontSize: 16,
        color: Color.TEXT_PRIMARY,
        fontWeight: '600',
        marginBottom: hp(0.3),
    },
    statsSubtitle: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        marginHorizontal: wp(1),
        borderRadius: wp(3),
        padding: wp(3),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.BORDER,
        backgroundColor: Color.WHITE,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: hp(0.3),
    },
    statLabel: {
        fontSize: 12,
        color: Color.TEXT_PRIMARY,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: hp(0.2),
    },
    statSubtitle: {
        fontSize: 10,
        color: Color.TEXT_LIGHT,
        fontWeight: '400',
        textAlign: 'center',
    },

    // Professional Tab Styles
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Color.SURFACE,
        borderRadius: wp(2),
        padding: wp(1),
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    tabButton: {
        flex: 1,
        paddingVertical: hp(1.2),
        borderRadius: wp(1.5),
    },
    activeTab: {
        backgroundColor: Color.PRIMARY,
    },
    tabContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        width: wp(7),
        height: wp(7),
        borderRadius: wp(3.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2),
    },
    iconText: {
        fontSize: 14,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
    },

    // Professional Request Card Styles
    requestCard: {
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    urgencySection: {
        flex: 1,
    },
    urgencyBadge: {
        backgroundColor: Color.ERROR,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
        alignSelf: 'flex-start',
        marginBottom: hp(0.5),
    },
    urgencyText: {
        color: Color.WHITE,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    timeText: {
        fontSize: 11,
        color: Color.TEXT_LIGHT,
        fontWeight: '400',
    },
    bloodTypeContainer: {
        alignItems: 'center',
        backgroundColor: Color.ACCENT,
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(2.5),
        borderRadius: wp(2),
    },
    bloodTypeText: {
        color: Color.WHITE,
        fontSize: 16,
        fontWeight: '800',
    },
    bloodTypeLabel: {
        color: Color.WHITE,
        fontSize: 9,
        fontWeight: '500',
        opacity: 0.9,
    },
    cardBody: {
        padding: wp(3),
    },
    hospitalSection: {
        marginBottom: hp(1),
    },
    hospitalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.2),
    },
    hospitalIconContainer: {
        backgroundColor: Color.SURFACE,
        padding: wp(2),
        borderRadius: wp(2),
        marginRight: wp(3),
    },
    hospitalIcon: {
        fontSize: 18,
    },
    hospitalInfo: {
        flex: 1,
    },
    hospitalName: {
        fontSize: 15,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.2),
    },
    departmentName: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    verifiedIcon: {
        backgroundColor: Color.SUCCESS,
        width: wp(6),
        height: wp(6),
        borderRadius: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifiedText: {
        color: Color.WHITE,
        fontSize: 12,
        fontWeight: '700',
    },    detailsList: {
        paddingVertical: hp(0.3),
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.7),
    },
    detailIcon: {
        fontSize: 13,
        width: wp(5),
        textAlign: 'center',
        marginRight: wp(2),
    },
    detailText: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(3),
        borderTopWidth: 1,
        borderTopColor: Color.DIVIDER,
        backgroundColor: Color.SURFACE,
    },    rewardSection: {
        flexDirection: 'row',
        paddingRight: wp(2),
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: wp(3),
    },
    rewardIcon: {
        fontSize: 12,
        marginRight: wp(1),
    },
    rewardText: {
        fontSize: 11,
        color: Color.TEXT_SECONDARY,
        fontWeight: '600',
    },
    signupButton: {
        backgroundColor: Color.PRIMARY,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
    },
    signupButtonText: {
        color: Color.WHITE,
        fontSize: 12,
        fontWeight: '700',
    },

    // Professional Reward Card Styles
    rewardCard: {
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
    rewardCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,    },
    
    // Popular Section (similar to urgency section)
    popularitySection: {
        alignItems: 'flex-start',
        flex: 1,
    },
    popularBadge: {
        backgroundColor: Color.SUCCESS,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
        alignSelf: 'flex-start',
        marginBottom: hp(1),
    },
    popularText: {
        color: Color.WHITE,        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    rewardCardIcon: {
        fontSize: 20,
    },
    // Popular Section (horizontal layout)
    popularitySection: {
        alignItems: 'flex-start',
        flex: 1,
    },
    iconAndBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rewardIconContainer: {
        backgroundColor: Color.SURFACE_DARK,
        padding: wp(2.5),
        borderRadius: wp(2),
        marginRight: wp(2),
    },
    popularBadge: {
        backgroundColor: Color.SUCCESS,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
    },
    popularText: {
        color: Color.WHITE,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    pointsContainer: {
        alignItems: 'flex-end',
    },    pointsValue: {
        fontSize: 18,
        fontWeight: '800',
        color: Color.PRIMARY,
    },
    pointsLabel: {
        fontSize: 10,
        color: Color.TEXT_LIGHT,
        fontWeight: '500',
    },
    rewardCardBody: {
        padding: wp(3),
    },
    rewardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.5),
    },
    rewardProvider: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
        marginBottom: hp(1.2),
    },    featuresList: {
        paddingVertical: hp(0.2),
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5),
    },
    checkIcon: {
        fontSize: 11,
        color: Color.SUCCESS,
        width: wp(4),
        marginRight: wp(2),
    },
    featureText: {
        fontSize: 11,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    rewardCardFooter: {
        padding: wp(3),
        borderTopWidth: 1,
        borderTopColor: Color.DIVIDER,
        backgroundColor: Color.SURFACE,
    },
    rewardFooterInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1.2),
    },
    stockInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stockIcon: {
        fontSize: 11,
        marginRight: wp(1),
    },
    stockText: {
        fontSize: 11,
        color: Color.TEXT_LIGHT,
        fontWeight: '500',
    },
    ratingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        fontSize: 11,
        marginRight: wp(0.5),
    },
    ratingText: {
        fontSize: 11,
        color: Color.TEXT_LIGHT,
        fontWeight: '500',    },
    redeemButton: {
        backgroundColor: Color.PRIMARY,
        paddingVertical: hp(1.2),
        borderRadius: wp(5),
        alignItems: 'center',    },
    redeemButtonText: {
        color: Color.WHITE,
        fontSize: 13,
        fontWeight: '700',
    },
    
    // Modal Styles
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
    },    confirmButton: {
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
});
