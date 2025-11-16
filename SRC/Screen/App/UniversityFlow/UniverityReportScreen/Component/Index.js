import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import { DonorList, DummyEvent, RequestRewards } from '../../../../../Dummy/Index'
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
export const StatsOverview = () => {
    const stats = [
        { 
            label: "Total Donors", 
            value: "156", 
            subtitle: "Active",
            color: Color.PRIMARY,
            bgColor: "#E8F4FD",
            icon: "👥"
        },
        { 
            label: "Blood Units", 
            value: "89", 
            subtitle: "Collected",
            color: Color.ACCENT,
            bgColor: "#FEF2F2",
            icon: "🩸"
        },
        { 
            label: "Events", 
            value: "12", 
            subtitle: "This month",
            color: Color.SUCCESS,
            bgColor: "#F0FDF4",
            icon: "🎯"
        },
    ]

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <ResponsiveText style={styles.statsTitle}>Monthly Overview</ResponsiveText>
                <ResponsiveText style={styles.statsSubtitle}>Key performance indicators</ResponsiveText>
            </View>
            <View style={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <View key={index} style={[styles.statCard, { backgroundColor: stat.bgColor }]}>
                        <View style={styles.statIconContainer}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                        </View>
                        <ResponsiveText style={[styles.statValue, { color: stat.color }]}>{stat.value}</ResponsiveText>
                        <ResponsiveText style={styles.statLabel}>{stat.label}</ResponsiveText>
                        <ResponsiveText style={styles.statSubtitle}>{stat.subtitle}</ResponsiveText>
                    </View>
                ))}
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

// Enhanced Donors List Component
export const DonorsList = () => {
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
                    <ResponsiveText style={styles.tableHeaderText}>Status</ResponsiveText>
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
                                <ResponsiveText style={styles.donorAge}>{String(item.age)}</ResponsiveText>
                            </View>
                            <View style={styles.donorInfo}>
                                <View style={styles.bloodTypeBadge}>
                                    <ResponsiveText style={styles.bloodTypeText}>
                                        {item.BloodGroup}
                                    </ResponsiveText>
                                </View>
                            </View>
                            <View style={styles.donorInfo}>
                                <View style={styles.statusBadge}>
                                    <ResponsiveText style={styles.statusText}>Active</ResponsiveText>
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
export const QuickActions = ({ navigation }) => {
    const actions = [
        {
            title: "Create Event",
            subtitle: "Schedule new donation",
            icon: "🎯",
            color: Color.PRIMARY,
            onPress: () => navigation?.navigate(Route.STACKNAVIGATION, {screen: Route.UNIVERSITYCREATEEVENTSCREEEN})
        },
        {
            title: "Export Data",
            subtitle: "Download reports",
            icon: "📊",
            color: Color.SUCCESS,
            onPress: () => console.log("Export pressed")
        },
        {
            title: "Settings",
            subtitle: "Configure alerts",
            icon: "⚙️",
            color: Color.WARNING,
            onPress: () => console.log("Settings pressed")
        },
    ]

    return (
        <View style={styles.actionsContainer}>
            <ResponsiveText style={styles.actionsTitle}>Quick Actions</ResponsiveText>
            <View style={styles.actionsGrid}>
                {actions.map((action, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.actionCard, { borderLeftColor: action.color }]}
                        onPress={action.onPress}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.actionIcon}>{action.icon}</Text>
                        <View style={styles.actionContent}>
                            <ResponsiveText style={styles.actionTitle}>{action.title}</ResponsiveText>
                            <ResponsiveText style={styles.actionSubtitle}>{action.subtitle}</ResponsiveText>
                        </View>
                    </TouchableOpacity>
                ))}
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
        padding: wp(3),
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
        marginBottom: hp(1),
    },
    statIcon: {
        fontSize: 24,
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
        justifyContent: 'space-between',
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
        backgroundColor: Color.SURFACE,
        borderRadius: wp(2),
        marginBottom: hp(1),
    },
    tableHeaderText: {
        fontSize: 11,
        fontWeight: '600',
        color: Color.TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: 'center',
    },
    donorsList: {
        paddingBottom: hp(1),
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
        fontSize: 13,
        fontWeight: '500',
        color: Color.TEXT_PRIMARY,
        textAlign: 'center',
    },
    donorAge: {
        fontSize: 13,
        fontWeight: '400',
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
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