import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { hp, wp } from "../../../../../Component/ResponsiveComponent"
import { Color } from "../../../../../Theme/Color/Index"
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Images } from '../../../../../Assets/Index'
import moment from 'moment'

export const NotificationBanner = ({ userData, onUpdatePress, onVerifyPress }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    
    const missingBloodGroup = !userData?.BloodGroup;
    const missingAge = !userData?.age;
    const notVerified = !userData?.Verified;
    
    // Don't show banner if all conditions are met or if dismissed
    if ((!missingBloodGroup && !missingAge && !notVerified) || isDismissed) {
        return null;
    }
    
    // Priority: Show verification message if not verified
    const getMessage = () => {
        if (notVerified) {
            return 'Your account is not verified. Please submit verification to access all features';
        } else if (missingBloodGroup && missingAge) {
            return 'Please update your blood group and age to complete your profile';
        } else if (missingBloodGroup) {
            return 'Please update your blood group to complete your profile';
        } else {
            return 'Please update your age to complete your profile';
        }
    };
    
    const getTitle = () => {
        if (notVerified) {
            return 'Verification Required';
        }
        return 'Profile Incomplete';
    };
    
    const getBannerStyle = () => {
        if (notVerified) {
            return {
                backgroundColor: '#FFE5E5',
                borderLeftColor: '#FF4444',
            };
        }
        return {
            backgroundColor: '#FFF3CD',
            borderLeftColor: '#FFC107',
        };
    };
    
    const getTextColor = () => {
        if (notVerified) {
            return '#D32F2F';
        }
        return '#856404';
    };
    
    return (
        <View style={[styles.notificationBanner, getBannerStyle()]}>
            <View style={styles.bannerContent}>
                <Text style={styles.bannerIcon}>{notVerified ? '🔒' : '⚠️'}</Text>
                <View style={styles.bannerTextContainer}>
                    <ResponsiveText style={[styles.bannerTitle, { color: getTextColor() }]}>
                        {getTitle()}
                    </ResponsiveText>
                    <ResponsiveText style={[styles.bannerMessage, { color: getTextColor() }]}>
                        {getMessage()}
                    </ResponsiveText>
                </View>
            </View>
            <View style={styles.bannerActions}>
                <TouchableOpacity 
                    style={styles.updateButton} 
                    onPress={notVerified ? onVerifyPress : onUpdatePress}
                    activeOpacity={0.7}
                >
                    <ResponsiveText style={styles.updateButtonText}>
                        {notVerified ? 'Verify Now' : 'Update Now'}
                    </ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.closeButton} 
                    onPress={() => setIsDismissed(true)}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.closeIcon, { color: getTextColor() }]}>✕</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const ProfileHeader = ({ onLogout }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
                <ResponsiveText style={styles.headerTitle}>My Profile</ResponsiveText>
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.7}>
                    <ResponsiveText style={styles.logoutText}>Logout</ResponsiveText>
                </TouchableOpacity>
            </View>

            <View style={styles.profileBadge}>
                <Text style={styles.badgeIcon}>👤</Text>
                <ResponsiveText style={styles.badgeText}>Student Profile</ResponsiveText>
            </View>
            <ResponsiveText style={styles.welcomeText}>
                Welcome back! Manage your profile and track your donation history
            </ResponsiveText>
        </View>
    )
}

export const PersonalInfo = ({ userData }) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Personal Information</ResponsiveText>
                <ResponsiveText style={styles.sectionSubtitle}>Basic Details</ResponsiveText>
            </View>

            <View style={styles.personalCard}>
                <View style={styles.avatarSection}>
                    <Image style={styles.avatar} source={Images.profileImage} />
                    <View style={[styles.statusBadge,{backgroundColor:userData?.Verified?Color.SECONDARY:Color.RED}]}>
                        <ResponsiveText style={styles.statusText}>{userData?.Verified?"Verified":"Not Verified"}</ResponsiveText>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>👤</Text>
                        <View style={styles.infoContent}>
                            <ResponsiveText style={styles.infoLabel}>Full Name</ResponsiveText>
                            <ResponsiveText style={styles.infoValue}>{userData?.FullName}</ResponsiveText>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>🆔</Text>
                        <View style={styles.infoContent}>
                            <ResponsiveText style={styles.infoLabel}>Student ID</ResponsiveText>
                            <ResponsiveText style={styles.infoValue}>{userData?.StudentId}</ResponsiveText>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>📧</Text>
                        <View style={styles.infoContent}>
                            <ResponsiveText style={styles.infoLabel}>Email</ResponsiveText>
                            <ResponsiveText style={styles.infoValue} numberOfLines={1}>{userData?.Email}</ResponsiveText>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoIcon}>🎂</Text>
                        <View style={styles.infoContent}>
                            <ResponsiveText style={styles.infoLabel}>Blood Type</ResponsiveText>
                            <ResponsiveText style={styles.infoValue}>{userData?.BloodGroup || "Not Added"}</ResponsiveText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const HealthStats = ({ userData }) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Health & Donation Stats</ResponsiveText>
                <ResponsiveText style={styles.sectionSubtitle}>Your Impact</ResponsiveText>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>🩸</Text>
                    <ResponsiveText style={styles.statValue}>{userData?.event || 0}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Total Donations</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Times donated</ResponsiveText>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>📅</Text>
                    <ResponsiveText style={styles.statValue}>{userData?.event || 0}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Last Donation</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Times donated</ResponsiveText>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statIcon}>⚡</Text>
                    <ResponsiveText style={styles.statValue}>{userData?.points || 0}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Total Donations</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Days ago</ResponsiveText>
                </View>

            </View>
        </View>
    )
}

export const EventHistory = ({event}) => {
    console.log(event,"event")
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Donation History</ResponsiveText>
                <ResponsiveText style={styles.sectionSubtitle}>Recent Events</ResponsiveText>
            </View>

            <View style={styles.historyCard}>
                <FlatList
                    data={event}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.historySeparator} />}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.historyItem}>
                                <View style={styles.historyIconContainer}>
                                    <Text style={styles.historyIcon}>🏥</Text>
                                </View>
                                <View style={styles.historyContent}>
                                    <ResponsiveText style={styles.historyTitle}>{item.eventName}</ResponsiveText>
                                    <ResponsiveText style={styles.historyDate}>{moment(item?.registeredAt.toDate()).format("DD MMM YYYY")}</ResponsiveText>
                                    <ResponsiveText style={styles.historyStatus}>Completed Successfully</ResponsiveText>
                                </View>
                                <View style={styles.historyBadge}>
                                    <ResponsiveText style={styles.historyBadgeText}>+{item?.pointsEarned} pts</ResponsiveText>
                                </View>
                            </View>
                        )
                    }}
                />
{/* 
                <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.7}>
                    <ResponsiveText style={styles.viewAllText}>View Complete History</ResponsiveText>
                    <Text style={styles.viewAllIcon}>→</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export const QuickActions = ({ EditProfilePress, VerifyStatusPress, CapitabilityPress }) => {

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Quick Actions</ResponsiveText>
                <ResponsiveText style={styles.sectionSubtitle}>Manage Account</ResponsiveText>
            </View>

            <View style={styles.actionsGrid}>

                <TouchableOpacity
                    style={[styles.actionCard, { borderLeftColor: Color.PRIMARY }]}
                    onPress={EditProfilePress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionIcon}>✏️</Text>
                    <View style={styles.actionContent}>
                        <ResponsiveText style={styles.actionTitle}>Edit Profile</ResponsiveText>
                        <ResponsiveText style={styles.actionSubtitle}>Update personal info</ResponsiveText>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionCard, { borderLeftColor: Color.SECONDARY }]}
                    onPress={VerifyStatusPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionIcon}>✓</Text>
                    <View style={styles.actionContent}>
                        <ResponsiveText style={styles.actionTitle}>Verify Status'</ResponsiveText>
                        <ResponsiveText style={styles.actionSubtitle}>Check eligibility</ResponsiveText>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionCard, { borderLeftColor: Color.ACCENT }]}
                    onPress={CapitabilityPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionIcon}>🩸</Text>
                    <View style={styles.actionContent}>
                        <ResponsiveText style={styles.actionTitle}>Compatibility</ResponsiveText>
                        <ResponsiveText style={styles.actionSubtitle}>Blood type chart</ResponsiveText>
                    </View>
                    <Text style={styles.actionArrow}>→</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    notificationBanner: {
        backgroundColor: '#FFF3CD',
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
        borderRadius: wp(2),
        padding: wp(3),
        marginHorizontal: wp(4),
        marginVertical: hp(2),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: hp(1),
    },
    bannerIcon: {
        fontSize: 20,
        marginRight: wp(2),
    },
    bannerTextContainer: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#856404',
        marginBottom: hp(0.3),
    },
    bannerMessage: {
        fontSize: 12,
        color: '#856404',
        lineHeight: 16,
    },
    bannerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: hp(1),
    },
    updateButton: {
        backgroundColor: Color.PRIMARY,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(1.5),
    },
    updateButtonText: {
        color: Color.WHITE,
        fontSize: 12,
        fontWeight: '600',
    },
    closeButton: {
        padding: wp(2),
    },
    closeIcon: {
        fontSize: 18,
        color: '#856404',
        fontWeight: 'bold',
    },
    // Header Styles
    headerContainer: {
        backgroundColor: Color.PRIMARY,
        paddingHorizontal: wp(5),
        paddingTop: hp(2),
        paddingBottom: hp(4),
        borderBottomLeftRadius: wp(6),
        borderBottomRightRadius: wp(6),
        elevation: 8,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(3),
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.WHITE,
        letterSpacing: 0.3,
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.WHITE,
        letterSpacing: 0.5,
    },
    profileBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        borderRadius: wp(5),
        alignSelf: 'center',
        marginBottom: hp(2),
    },
    badgeIcon: {
        fontSize: 18,
        marginRight: wp(2),
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.WHITE,
        letterSpacing: 0.5,
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: 22,
    },

    // Section Styles
    section: {
        marginBottom: hp(2),
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
        paddingBottom: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Color.TEXT_PRIMARY,
        letterSpacing: 0.3,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // Personal Info Styles
    personalCard: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(4),
        padding: wp(4),
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: hp(3),
        position: 'relative',
    },
    avatar: {
        width: wp(24),
        height: wp(24),
        borderRadius: wp(12),
        borderWidth: 4,
        borderColor: Color.PRIMARY,
    },
    statusBadge: {
        position: 'absolute',
        bottom: 0,
        right: wp(32),
        backgroundColor: Color.SECONDARY,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: wp(3),
        borderWidth: 2,
        borderColor: Color.WHITE,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        color: Color.WHITE,
        letterSpacing: 0.5,
    },
    infoSection: {
        gap: hp(2),
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1),
    },
    infoIcon: {
        fontSize: 20,
        marginRight: wp(4),
        width: wp(8),
        textAlign: 'center',
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
        marginBottom: hp(0.3),
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },

    // Stats Styles
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: wp(3),
    },
    statCard: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(4),
        padding: wp(4),
        alignItems: 'center',
        width: wp(40),
        borderWidth: 1,
        borderColor: Color.BORDER,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statIcon: {
        fontSize: 24,
        marginBottom: hp(1),
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.PRIMARY,
        marginBottom: hp(0.5),
    },
    statLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        textAlign: 'center',
        marginBottom: hp(0.3),
    },
    statSubtitle: {
        fontSize: 11,
        fontWeight: '400',
        color: Color.TEXT_LIGHT,
        textAlign: 'center',
    },

    // History Styles
    historyCard: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(4),
        padding: wp(4),
        borderWidth: 1,
        borderColor: Color.BORDER,
        maxHeight: hp(35),
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(2),
    },
    historyIconContainer: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Color.PRIMARY + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4),
    },
    historyIcon: {
        fontSize: 18,
    },
    historyContent: {
        flex: 1,
    },
    historyTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.3),
    },
    historyDate: {
        fontSize: 13,
        fontWeight: '400',
        color: Color.TEXT_SECONDARY,
        marginBottom: hp(0.3),
    },
    historyStatus: {
        fontSize: 12,
        fontWeight: '500',
        color: Color.SECONDARY,
    },
    historyBadge: {
        backgroundColor: Color.SECONDARY,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: wp(2),
    },
    historyBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: Color.WHITE,
        letterSpacing: 0.5,
    },
    historySeparator: {
        height: 1,
        backgroundColor: Color.BORDER,
        marginVertical: hp(0.5),
    },
    viewAllButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2),
        borderTopWidth: 1,
        borderTopColor: Color.BORDER,
        marginTop: hp(2),
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.PRIMARY,
        marginRight: wp(2),
    },
    viewAllIcon: {
        fontSize: 16,
        color: Color.PRIMARY,
    },

    // Actions Styles
    actionsGrid: {
        gap: hp(2),
    },
    actionCard: {
        backgroundColor: Color.SURFACE,
        borderRadius: wp(4),
        padding: wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.BORDER,
        borderLeftWidth: 4,
        elevation: 2,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionIcon: {
        fontSize: 20,
        marginRight: wp(4),
        width: wp(8),
        textAlign: 'center',
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.3),
    },
    actionSubtitle: {
        fontSize: 13,
        fontWeight: '400',
        color: Color.TEXT_SECONDARY,
    },
    actionArrow: {
        fontSize: 18,
        color: Color.TEXT_LIGHT,
    },
})