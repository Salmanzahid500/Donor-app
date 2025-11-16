import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import { DonorList, DummyEvent } from '../../../../../Dummy/Index'
import Spacer, { HorizontalSpacer } from '../../../../../Component/Spacer'
import UniversityIcon from "../../../../../Assets/Svg/UniversityIcon"

// Welcome Header Component
export const WelcomeHeader = ({ onLogout }) => {
    return (
        <View style={styles.welcomeHeader}>
            <View style={styles.welcomeContent}>
                <ResponsiveText style={styles.welcomeTitle}>University Portal</ResponsiveText>
                <ResponsiveText style={styles.welcomeSubtitle}>Manage donations and events</ResponsiveText>
            </View>
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={onLogout}
                activeOpacity={0.7}
            >
                <ResponsiveText style={styles.logoutText}>Logout</ResponsiveText>
            </TouchableOpacity>
        </View>
    )
}

// Stats Cards Component (matching student dashboard)
export const StatsCards = () => {
    const metrics = [
        { 
            label: "Total Donors", 
            value: "156", 
            subtitle: "Registered",
            color: Color.ACCENT,
            bgColor: "#FEF2F2"
        },
        { 
            label: "Active Events", 
            value: "3", 
            subtitle: "Running",
            color: Color.WARNING,
            bgColor: "#FFFBEB"
        },
        { 
            label: "Blood Units", 
            value: "89", 
            subtitle: "Collected",
            color: Color.SUCCESS,
            bgColor: "#F0FDF4"
        },
    ]

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <ResponsiveText style={styles.statsTitle}>University Healthcare Dashboard</ResponsiveText>
                <ResponsiveText style={styles.statsSubtitle}>Monitor donation campaigns and impact</ResponsiveText>
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
    )
}

// Active Events Component
export const ActiveEvent = () => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Active Events</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(DummyEvent.length)}</ResponsiveText>
                </View>
            </View>
            
            <View style={styles.eventsContainer}>
                <FlatList
                    data={DummyEvent}
                    keyExtractor={(item, index) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.eventsList}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <View style={styles.eventIcon}>
                                <UniversityIcon size={24} color={Color.PRIMARY} />
                            </View>
                            <View style={styles.eventContent}>
                                <ResponsiveText style={styles.eventName}>{item.eventName}</ResponsiveText>
                                <ResponsiveText style={styles.eventStatus}>Active Now</ResponsiveText>
                            </View>
                            <View style={styles.eventBadge}>
                                <ResponsiveText style={styles.badgeText}>Live</ResponsiveText>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

// Recent Donor List Component
export const RecentDonorList = () => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Recent Donors</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(DonorList.length)}</ResponsiveText>
                </View>
            </View>
            
            <View style={styles.donorsContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <ResponsiveText style={styles.tableHeaderText}>Name</ResponsiveText>
                    <ResponsiveText style={styles.tableHeaderText}>Age</ResponsiveText>
                    <ResponsiveText style={styles.tableHeaderText}>Blood Type</ResponsiveText>
                </View>
                
                <FlatList
                    data={DonorList}
                    keyExtractor={(item, index) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.donorsList}
                    renderItem={({ item }) => (
                        <View style={styles.donorItem}>
                            <View style={styles.donorInfo}>
                                <ResponsiveText numberOfLines={1} style={styles.donorName}>
                                    {item.Name}
                                </ResponsiveText>
                            </View>
                            <View style={styles.donorInfo}>
                                <ResponsiveText numberOfLines={1} style={styles.donorAge}>
                                    {String(item.age)}
                                </ResponsiveText>
                            </View>
                            <View style={styles.donorInfo}>
                                <View style={styles.bloodTypeBadge}>
                                    <ResponsiveText style={styles.bloodTypeText}>
                                        {item.BloodGroup}
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


const styles = StyleSheet.create({    // Welcome Header Styles (matching student dashboard exactly)
    welcomeHeader: {
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
    welcomeContent: {
        flex: 1,
    },    welcomeTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Color.WHITE,
        marginBottom: hp(0.2),
    },
    welcomeSubtitle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        borderRadius: wp(6),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    logoutText: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: "600",
        letterSpacing: 0.5
    },
      // Professional Stats Styles (matching student dashboard)
    statsContainer: {
        marginTop: hp(1),
        paddingHorizontal: wp(3),
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
      // Section Card Styles (matching student dashboard)
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
    },    sectionContent: {
        padding: wp(3),
    },

    // Events Container with proper height
    eventsContainer: {
        height: hp(22), // Fixed height for events
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    eventsList: {
        paddingBottom: hp(1),
    },

    // Donors Container with proper height
    donorsContainer: {
        height: hp(25), // Fixed height for donors (slightly larger for table)
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    donorsList: {
        paddingBottom: hp(1),
    },
    
    // Event Item Styles
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(2),
    },
    eventIcon: {
        width: wp(12),
        height: wp(12),
        backgroundColor: Color.SURFACE,
        borderRadius: wp(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
    },
    eventContent: {
        flex: 1,
    },
    eventName: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.3),
        textTransform: 'capitalize',
    },
    eventStatus: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    eventBadge: {
        backgroundColor: Color.SUCCESS,
        paddingHorizontal: wp(2.5),
        paddingVertical: hp(0.4),
        borderRadius: wp(2),
    },
    badgeText: {
        fontSize: 10,
        color: Color.WHITE,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    
    // Donor List Styles
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
        backgroundColor: Color.SURFACE,
        borderRadius: wp(2),
        marginBottom: hp(1),
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: 'center',
    },
    donorItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(2),
    },
    donorInfo: {
        flex: 1,
        alignItems: 'center',
    },
    donorName: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.TEXT_PRIMARY,
        textAlign: 'center',
    },
    donorAge: {
        fontSize: 14,
        fontWeight: '400',
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
    },
    bloodTypeBadge: {
        backgroundColor: Color.ACCENT,
        paddingHorizontal: wp(2.5),
        paddingVertical: hp(0.4),
        borderRadius: wp(2),
        minWidth: wp(12),
        alignItems: 'center',
    },
    bloodTypeText: {
        fontSize: 12,
        color: Color.WHITE,
        fontWeight: '600',
    },
    
    // Separator
    separator: {
        height: 1,
        backgroundColor: Color.DIVIDER,
        marginVertical: hp(0.5),
    },
})