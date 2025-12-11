import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import Spacer, { HorizontalSpacer } from '../../../../../Component/Spacer'
import { Route } from '../../../../../Constant/Route'

// Professional Report Header Component
export const ReportHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <ResponsiveText style={styles.headerTitle}>Healthcare Analytics</ResponsiveText>
                <ResponsiveText style={styles.headerSubtitle}>University donation insights and reports</ResponsiveText>
            </View>
            <View style={styles.headerIconContainer}>
                <Text style={styles.headerIcon}>📊</Text>
            </View>
        </View>
    )
}

// Professional Stats Overview Component
export const StatsOverview = ({ totalEvent, donor }) => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <ResponsiveText style={styles.statsTitle}>Monthly Overview</ResponsiveText>
                <ResponsiveText style={styles.statsSubtitle}>Key performance indicators</ResponsiveText>
            </View>
            <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: "#E8F4FD" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>👥</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: Color.PRIMARY }]}>{donor?.length || 0}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Total Donors</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Active</ResponsiveText>
                </View>
                <View style={[styles.statCard, { backgroundColor: "#F0FDF4" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>🎯</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: Color.PRIMARY }]}>{totalEvent?.length || 0}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Events</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>This month</ResponsiveText>
                </View>
            </View>
        </View>
    )
}

// Healthcare Statistics Component
export const HealthcareStats = ({ stats }) => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <ResponsiveText style={styles.statsTitle}>Healthcare Analysis</ResponsiveText>
                <ResponsiveText style={styles.statsSubtitle}>Comprehensive donation metrics</ResponsiveText>
            </View>
            
            {/* First Row - 3 Cards */}
            <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: "#FEF2F2" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>👥</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: "#EF4444" }]}>{stats.totalDonors}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Total Donors</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Registered</ResponsiveText>
                </View>
                <View style={[styles.statCard, { backgroundColor: "#FFFBEB" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>🎯</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: "#F59E0B" }]}>{stats.activeEvents}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Active Events</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Running</ResponsiveText>
                </View>
                <View style={[styles.statCard, { backgroundColor: "#F0FDF4" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>✅</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: "#10B981" }]}>{stats.completedEvents}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Completed</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Events</ResponsiveText>
                </View>
            </View>

            <Spacer height={hp(1.5)} />

            {/* Second Row - 2 Wider Cards */}
            <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: "#FDF2F8" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>🩸</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: "#EC4899" }]}>{stats.totalBloodUnits}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Blood Units</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Collected</ResponsiveText>
                </View>
                <View style={[styles.statCard, { backgroundColor: "#EFF6FF" }]}>
                    <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>📊</Text>
                    </View>
                    <ResponsiveText style={[styles.statValue, { color: "#3B82F6" }]}>{stats.totalRegistrations}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Total Registrations</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>All Events</ResponsiveText>
                </View>
            </View>
        </View>
    )
}

// Blood Type Distribution Component
export const BloodTypeDistribution = () => {
    const bloodTypes = [
        { type: "A+", count: 34, percentage: 22, color: Color.PRIMARY },
        { type: "O+", count: 45, percentage: 29, color: Color.SUCCESS },
        { type: "B+", count: 28, percentage: 18, color: Color.WARNING },
        { type: "AB+", count: 19, percentage: 12, color: Color.ACCENT },
        { type: "A-", count: 12, percentage: 8, color: Color.INFO },
        { type: "O-", count: 18, percentage: 11, color: Color.ERROR },
    ]

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Blood Type Distribution</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(bloodTypes.length)}</ResponsiveText>
                </View>
            </View>

            <View style={styles.bloodTypeContainer}>
                {bloodTypes.map((item, index) => (
                    <View key={index} style={styles.bloodTypeItem}>
                        <View style={[styles.bloodTypeBadge, { backgroundColor: item.color }]}>
                            <ResponsiveText style={styles.bloodTypeText}>{item.type}</ResponsiveText>
                        </View>
                        <View style={styles.bloodTypeInfo}>
                            <ResponsiveText style={styles.bloodTypeCount}>{String(item.count)} units</ResponsiveText>
                            <ResponsiveText style={styles.bloodTypePercentage}>{String(item.percentage)}%</ResponsiveText>
                        </View>
                        <View style={[styles.progressBar, { backgroundColor: `${item.color}20` }]}>
                            <View style={[
                                styles.progressFill,
                                { backgroundColor: item.color, width: `${item.percentage}%` }
                            ]} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

// Event Management Component
export const EventManagementTable = ({ events, onCloseEvent, onOpenEvent }) => {
    const formatClosedDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        
        let date;
        if (timestamp._seconds) {
            // Firestore Timestamp
            date = new Date(timestamp._seconds * 1000);
        } else if (timestamp.seconds) {
            date = new Date(timestamp.seconds * 1000);
        } else {
            date = new Date(timestamp);
        }
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Event Management</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(events?.length || 0)}</ResponsiveText>
                </View>
            </View>

            <View style={styles.donorsContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, {flex: 2, alignItems: 'flex-start', paddingLeft: wp(1)}]}>
                        <ResponsiveText style={styles.tableHeaderText}>EVENT</ResponsiveText>
                    </View>
                    <View style={[styles.headerCell, {flex: 1.5}]}>
                        <ResponsiveText style={styles.tableHeaderText}>DATE</ResponsiveText>
                    </View>
                    <View style={[styles.headerCell, {flex: 1}]}>
                        <ResponsiveText style={styles.tableHeaderText}>STATUS</ResponsiveText>
                    </View>
                    <View style={[styles.headerCell, {flex: 1}]}>
                        <ResponsiveText style={styles.tableHeaderText}>ACTION</ResponsiveText>
                    </View>
                </View>

                <FlatList
                    data={events}
                    keyExtractor={(item, index) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.donorsList}
                    renderItem={({ item }) => (
                        <View style={styles.donorItem}>
                            {/* Event Name */}
                            <View style={[styles.eventCell, {flex: 2, alignItems: 'flex-start', paddingLeft: wp(1)}]}>
                                <ResponsiveText numberOfLines={1} ellipsizeMode="tail" style={styles.eventName}>
                                    {item?.eventTitle || 'N/A'}
                                </ResponsiveText>
                            </View>

                            {/* Date - Show closed date if closed, otherwise event date */}
                            <View style={[styles.eventCell, {flex: 1.5}]}>
                                <ResponsiveText numberOfLines={1} ellipsizeMode="tail" style={styles.eventDate}>
                                    {item?.status === "Closed" && item?.closedAt 
                                        ? formatClosedDate(item.closedAt)
                                        : item?.date || 'N/A'
                                    }
                                </ResponsiveText>
                            </View>

                            {/* Status */}
                            <View style={[styles.eventCell, {flex: 1}]}>
                                <View style={[
                                    styles.statusBadge,
                                    { backgroundColor: item?.status === "Active" ? Color.SUCCESS : Color.ERROR }
                                ]}>
                                    <ResponsiveText style={styles.statusText}>
                                        {item?.status}
                                    </ResponsiveText>
                                </View>
                            </View>

                            {/* Action Buttons */}
                            <View style={[styles.eventCell, {flex: 1}]}>
                                {item?.status === "Active" ? (
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: Color.RED,
                                            paddingHorizontal: wp(2),
                                            paddingVertical: hp(0.4),
                                            borderRadius: wp(2),
                                        }}
                                        onPress={() => onCloseEvent(item?.id)}
                                        activeOpacity={0.7}
                                    >
                                        <ResponsiveText style={{ fontSize: 10, color: Color.WHITE, fontWeight: "700" }}>
                                            Close
                                        </ResponsiveText>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: Color.SUCCESS,
                                            paddingHorizontal: wp(2),
                                            paddingVertical: hp(0.4),
                                            borderRadius: wp(2),
                                        }}
                                        onPress={() => onOpenEvent(item?.id)}
                                        activeOpacity={0.7}
                                    >
                                        <ResponsiveText style={{ fontSize: 10, color: Color.WHITE, fontWeight: "700" }}>
                                            Open
                                        </ResponsiveText>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

// Enhanced Donors List Component
export const DonorsList = ({donor}) => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Recent Donors</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(donor?.length)}</ResponsiveText>
                </View>
            </View>

            <View style={styles.donorsContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, {flex: 2.5}]}>
                        <ResponsiveText style={styles.tableHeaderText}>Name</ResponsiveText>
                    </View>
                    <View style={[styles.headerCell, {flex: 1.5}]}>
                        <ResponsiveText style={styles.tableHeaderText}>Student ID</ResponsiveText>
                    </View>
                    <View style={[styles.headerCell, {flex: 1}]}>
                        <ResponsiveText style={styles.tableHeaderText}>Age</ResponsiveText>
                    </View>
                    <View style={[styles.headerCell, {flex: 1.2}]}>
                        <ResponsiveText style={styles.tableHeaderText}>Blood</ResponsiveText>
                    </View>
                </View>

                <FlatList
                    data={donor}
                    keyExtractor={(item, index) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.donorsList}
                    renderItem={({ item }) => (
                        <View style={styles.donorItem}>
                            <View style={[styles.donorCell, {flex: 2.5, alignItems: 'flex-start'}]}>
                                <ResponsiveText numberOfLines={1} ellipsizeMode="tail" style={styles.donorName}>
                                    {item?.FullName || 'N/A'}
                                </ResponsiveText>
                            </View>
                            <View style={[styles.donorCell, {flex: 1.5}]}>
                                <ResponsiveText numberOfLines={1} style={styles.donorStudentId}>
                                    {item?.StudentId || 'N/A'}
                                </ResponsiveText>
                            </View>
                            <View style={[styles.donorCell, {flex: 1}]}>
                                <ResponsiveText style={styles.donorAge}>
                                    {item?.age || '-'}
                                </ResponsiveText>
                            </View>
                            <View style={[styles.donorCell, {flex: 1.2}]}>
                                <View style={styles.bloodTypeBadge}>
                                    <ResponsiveText style={styles.bloodTypeText}>
                                        {item?.BloodGroup || 'N/A'}
                                    </ResponsiveText>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

// Quick Actions Component
export const QuickActions = ({ eventPress, rewardPress, verificationPress }) => {

    return (
        <View style={styles.actionsContainer}>
            <ResponsiveText style={styles.actionsTitle}>Quick Actions</ResponsiveText>
            <View style={styles.actionsGrid}>

                <TouchableOpacity
                    style={[styles.actionCard, { borderLeftColor: Color.PRIMARY }]}
                    onPress={eventPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionIcon}>🎯</Text>
                    <View style={styles.actionContent}>
                        <ResponsiveText style={styles.actionTitle}>Create Event</ResponsiveText>
                        <ResponsiveText style={styles.actionSubtitle}>Schedule new donation</ResponsiveText>
                    </View>
                </TouchableOpacity>
               
                <TouchableOpacity
                    style={[styles.actionCard, { borderLeftColor: Color.SECONDARY }]}
                    onPress={verificationPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionIcon}>✓</Text>
                    <View style={styles.actionContent}>
                        <ResponsiveText style={styles.actionTitle}>Manage Verifications</ResponsiveText>
                        <ResponsiveText style={styles.actionSubtitle}>Review student requests</ResponsiveText>
                    </View>
                </TouchableOpacity>
              
                <TouchableOpacity
                    style={[styles.actionCard, { borderLeftColor: Color.DANGER }]}
                    onPress={rewardPress}
                    activeOpacity={0.7}
                >
                    <Text style={styles.actionIcon}>🎁</Text>
                    <View style={styles.actionContent}>
                        <ResponsiveText style={styles.actionTitle}>Add Rewards</ResponsiveText>
                        <ResponsiveText style={styles.actionSubtitle}>Offer donor rewards</ResponsiveText>
                    </View>
                </TouchableOpacity>
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

    // Professional Stats Styles
    statsContainer: {
        paddingHorizontal: wp(4),
    },
    statsHeader: {
        marginBottom: hp(2),
    },
    statsTitle: {
        fontSize: 18,
        color: Color.TEXT_PRIMARY,
        fontWeight: '700',
        marginBottom: hp(0.5),
        letterSpacing: -0.2,
    },
    statsSubtitle: {
        fontSize: 13,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCard: {
        flex: 1,
        marginHorizontal: wp(1),
        borderRadius: wp(3),
        padding: wp(2.5),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Color.BORDER,
        elevation: 1,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    statIconContainer: {
        marginBottom: hp(0.5),
    },
    statIcon: {
        fontSize: 20,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: hp(0.2),
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

    // Section Card Styles
    sectionCard: {
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    sectionTitle: {
        fontSize: 16,
        color: Color.TEXT_PRIMARY,
        fontWeight: '600',
        letterSpacing: -0.2,
    },
    sectionIndicator: {
        backgroundColor: Color.PRIMARY,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
        minWidth: wp(6),
        alignItems: 'center',
    },
    indicatorText: {
        color: Color.WHITE,
        fontSize: 10,
        fontWeight: '700',
    },

    // Blood Type Distribution Styles
    bloodTypeContainer: {
        padding: wp(3),
    },
    bloodTypeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5),
        paddingVertical: hp(0.5),
    },
    bloodTypeBadge: {
        paddingHorizontal: wp(2.5),
        paddingVertical: hp(0.4),
        borderRadius: wp(2),
        minWidth: wp(12),
        alignItems: 'center',
        marginRight: wp(3),
    },
    bloodTypeText: {
        fontSize: 12,
        color: Color.WHITE,
        fontWeight: '700',
    },
    bloodTypeInfo: {
        flex: 1,
        marginRight: wp(2),
    },
    bloodTypeCount: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },
    bloodTypePercentage: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    progressBar: {
        width: wp(20),
        height: hp(0.8),
        borderRadius: wp(2),
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: wp(2),
    },

    // Donors List Styles
    donorsContainer: {
        height: hp(25),
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    tableHeader: {
        flexDirection: 'row',
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(3),
        backgroundColor: Color.SURFACE,
        borderRadius: wp(2),
        marginBottom: hp(1),
        borderBottomWidth: 2,
        borderBottomColor: Color.PRIMARY,
    },
    headerCell: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableHeaderText: {
        fontSize: 11,
        fontWeight: '700',
        color: Color.TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    donorsList: {
        paddingBottom: hp(1),
    },
    donorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(3),
        backgroundColor: Color.WHITE,
    },
    donorCell: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    donorName: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.TEXT_PRIMARY,
        width: '100%',
    },
    donorStudentId: {
        fontSize: 12,
        fontWeight: '400',
        color: Color.TEXT_SECONDARY,
    },
    donorAge: {
        fontSize: 12,
        fontWeight: '500',
        color: Color.TEXT_SECONDARY,
    },
    bloodTypeBadge: {
        backgroundColor: Color.ACCENT,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.5),
        borderRadius: wp(2),
        minWidth: wp(12),
        alignItems: 'center',
    },
    bloodTypeText: {
        fontSize: 12,
        color: Color.WHITE,
        fontWeight: '600',
    },
    eventCell: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventName: {
        fontSize: 13,
        fontWeight: '500',
        color: Color.TEXT_PRIMARY,
        width: '100%',
    },
    eventDate: {
        fontSize: 12,
        fontWeight: '400',
        color: Color.TEXT_SECONDARY,
    },
    statusBadge: {
        backgroundColor: Color.SUCCESS,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.2),
        borderRadius: wp(1),
        minWidth: wp(10),
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        color: Color.WHITE,
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: Color.DIVIDER,
        marginVertical: hp(0.5),
    },

    // Quick Actions Styles
    actionsContainer: {
        paddingHorizontal: wp(4),
    },
    actionsTitle: {
        fontSize: 18,
        color: Color.TEXT_PRIMARY,
        fontWeight: '700',
        marginBottom: hp(2),
        letterSpacing: -0.2,
    },
    actionsGrid: {
        gap: hp(1.5),
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        padding: wp(4),
        borderRadius: wp(3),
        borderLeftWidth: 4,
        elevation: 1,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: Color.BORDER,
    },
    actionIcon: {
        fontSize: 24,
        marginRight: wp(4),
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.2),
    },
    actionSubtitle: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
})