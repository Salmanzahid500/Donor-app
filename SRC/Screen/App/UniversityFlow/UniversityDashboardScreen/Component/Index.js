import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import Spacer, { HorizontalSpacer } from '../../../../../Component/Spacer'
import UniversityIcon from "../../../../../Assets/Svg/UniversityIcon"

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

export const StatsCards = ({totalDonor=0, activeEvent=0, closedEvent=0}) => {
    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsHeader}>
                <ResponsiveText style={styles.statsTitle}>University Healthcare Dashboard</ResponsiveText>
                <ResponsiveText style={styles.statsSubtitle}>Monitor donation campaigns and impact</ResponsiveText>
            </View>
            <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: "#FEF2F2" }]}>
                    <ResponsiveText style={[styles.statValue, { color: Color.ACCENT }]}>{totalDonor}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Total Donors</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Registered</ResponsiveText>
                </View>
                 <View style={[styles.statCard, { backgroundColor: "#FFFBEB" }]}>
                    <ResponsiveText style={[styles.statValue, { color: Color.WARNING }]}>{activeEvent}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Active Events</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Running</ResponsiveText>
                </View>
                 <View style={[styles.statCard, { backgroundColor: "#F0FDF4" }]}>
                    <ResponsiveText style={[styles.statValue, { color: Color.SUCCESS }]}>{closedEvent}</ResponsiveText>
                    <ResponsiveText style={styles.statLabel}>Completed</ResponsiveText>
                    <ResponsiveText style={styles.statSubtitle}>Events</ResponsiveText>
                </View>
            </View>
        </View>
    )
}

export const ActiveEvent = ({data, onEventPress, onEditPress, onClosePress}) => {
    const [menuVisible, setMenuVisible] = useState(null);
    const [showAll, setShowAll] = useState(false);
    
    // Show only first 5 events unless "Show More" is clicked
    const displayedData = showAll ? data : data.slice(0, 5);
    const hasMore = data.length > 5;

    const EventMenuItem = ({ item, index, totalCount }) => {
        const isLast = index === totalCount - 1;
        
        return (
            <View style={[styles.eventItemWrapper, isLast && styles.eventItemLast]}>
                <TouchableOpacity 
                    style={styles.eventItem}
                    onPress={() => onEventPress && onEventPress(item)}
                    activeOpacity={0.7}
                >
                    <View style={styles.eventIcon}>
                        <UniversityIcon size={24} color={Color.PRIMARY} />
                    </View>
                    <View style={styles.eventContent}>
                        <ResponsiveText style={styles.eventName}>{item.eventTitle}</ResponsiveText>
                        <ResponsiveText style={styles.eventStatus}>Tap for details</ResponsiveText>
                    </View>
                    <View style={styles.eventBadge}>
                        <ResponsiveText style={styles.badgeText}>Live</ResponsiveText>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)}
                        activeOpacity={0.7}
                    >
                        <ResponsiveText style={styles.menuDots}>⋮</ResponsiveText>
                    </TouchableOpacity>
                </TouchableOpacity>

                {menuVisible === item.id && (
                    <>
                        <Pressable 
                            style={styles.dropdownOverlay} 
                            onPress={() => setMenuVisible(null)}
                        />
                        <View style={[styles.dropdownMenu, isLast && styles.dropdownMenuUp]}>
                            <TouchableOpacity
                                style={styles.dropdownOption}
                                onPress={() => {
                                    setMenuVisible(null);
                                    onEditPress && onEditPress(item);
                                }}
                                activeOpacity={0.7}
                            >
                                <ResponsiveText style={styles.dropdownOptionText}>✏️ Edit Event</ResponsiveText>
                            </TouchableOpacity>
                            
                            <View style={styles.dropdownDivider} />
                            
                            <TouchableOpacity
                                style={styles.dropdownOption}
                                onPress={() => {
                                    setMenuVisible(null);
                                    onClosePress && onClosePress(item);
                                }}
                                activeOpacity={0.7}
                            >
                                <ResponsiveText style={[styles.dropdownOptionText, styles.dropdownOptionDanger]}>🔒 Close Event</ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Active Events</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(data.length)}</ResponsiveText>
                </View>
            </View>

            <View style={styles.eventsContainer}>
                {displayedData.map((item, index) => (
                    <View key={index}>
                        {index > 0 && <View style={styles.separator} />}
                        <EventMenuItem item={item} index={index} totalCount={displayedData.length} />
                    </View>
                ))}
                
                {hasMore && !showAll && (
                    <TouchableOpacity 
                        style={styles.showMoreButton}
                        onPress={() => setShowAll(true)}
                        activeOpacity={0.7}
                    >
                        <ResponsiveText style={styles.showMoreText}>
                            Show More ({data.length - 5} more events)
                        </ResponsiveText>
                        <Text style={styles.showMoreIcon}>▼</Text>
                    </TouchableOpacity>
                )}
                
                {hasMore && showAll && (
                    <TouchableOpacity 
                        style={styles.showMoreButton}
                        onPress={() => setShowAll(false)}
                        activeOpacity={0.7}
                    >
                        <ResponsiveText style={styles.showMoreText}>Show Less</ResponsiveText>
                        <Text style={styles.showMoreIcon}>▲</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

// Recent Donor List Component
export const RecentDonorList = ({donors}) => {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Recent Donors</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(donors?.length)}</ResponsiveText>
                </View>
            </View>

            <View style={styles.donorsContainer}>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <View style={[styles.headerCell, {flex: 2.5, alignItems: 'flex-start'}]}>
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
                    data={donors}
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
    }, welcomeTitle: {
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
    }, sectionContent: {
        padding: wp(3),
    },

    // Events Container with automatic height
    eventsContainer: {
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    eventsList: {
        paddingBottom: hp(1),
    },
    showMoreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1.5),
        marginTop: hp(1),
        borderTopWidth: 1,
        borderTopColor: Color.BORDER,
        backgroundColor: Color.BACKGROUND,
        borderRadius: wp(2),
    },
    showMoreText: {
        fontSize: 14,
        color: Color.PRIMARY,
        fontWeight: '600',
        marginRight: wp(1),
    },
    showMoreIcon: {
        fontSize: 12,
        color: Color.PRIMARY,
    },

    // Donors Container with proper height
    donorsContainer: {
        height: hp(25), // Fixed height for donors (slightly larger for table)
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    donorsList: {
        paddingBottom: hp(3),
    },

    // Event Item Styles
    eventItemWrapper: {
        position: 'relative',
        overflow: 'visible',
    },
    eventItemLast: {
        paddingBottom: hp(1.5),
    },
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1.5),
        paddingLeft: wp(2),
        paddingRight: wp(2),
    },
    menuButton: {
        width: wp(10),
        height: hp(4),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(2),
    },
    menuDots: {
        fontSize: 24,
        fontWeight: '700',
        color: Color.TEXT_SECONDARY,
        lineHeight: 24,
    },
    dropdownOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    dropdownMenu: {
        position: 'absolute',
        right: wp(2),
        top: hp(5.5),
        backgroundColor: Color.WHITE,
        borderRadius: wp(2),
        minWidth: wp(40),
        elevation: 8,
        shadowColor: Color.SHADOW,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        borderWidth: 1,
        borderColor: Color.BORDER,
        zIndex: 2,
    },
    dropdownMenuUp: {
        bottom: hp(5.5),
        top: 'auto',
    },
    dropdownOption: {
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
        backgroundColor: Color.WHITE,
    },
    dropdownOptionText: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.TEXT_PRIMARY,
    },
    dropdownOptionDanger: {
        color: Color.ACCENT,
    },
    dropdownDivider: {
        height: 1,
        backgroundColor: Color.DIVIDER,
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

    // Separator
    separator: {
        height: 1,
        backgroundColor: Color.DIVIDER,
        marginVertical: hp(0.5),
    },
})