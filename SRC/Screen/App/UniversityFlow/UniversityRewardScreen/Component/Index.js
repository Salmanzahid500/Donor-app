import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native'
import React, { useState, useMemo } from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import Spacer, { HorizontalSpacer } from '../../../../../Component/Spacer'
import { RewardDetail } from "./RewardDetail"
import moment from 'moment'
import { approveRedemption } from '../../../../../FireBase/Index'

// Search Header Component
export const SearchHeader = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.searchHeader}>
            <View style={styles.headerContent}>
                <ResponsiveText style={styles.headerTitle}>Student Rewards Portal</ResponsiveText>
                <ResponsiveText style={styles.headerSubtitle}>Manage student rewards and donations</ResponsiveText>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name or student ID..."
                        placeholderTextColor={Color.TEXT_LIGHT}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={() => setSearchQuery('')}
                        >
                            <Text style={styles.clearIcon}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.searchStats}>
                    <ResponsiveText style={styles.searchStatsText}>
                        {searchQuery ? `Filtering results for "${searchQuery}"` : 'Showing all students'}
                    </ResponsiveText>
                </View>
            </View>
        </View>
    )
}

// Reward Requests Component with improved scrolling and modal
export const RewardRequests = ({ searchQuery, rewardRequest, handleApprove, handleReject }) => {
    const [selectedReward, setSelectedReward] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

    console.log("Reward Requests Data:", JSON.stringify(rewardRequest, null, 2))
    const handleViewDetails = (item) => {
        setSelectedReward(item)
        setModalVisible(true)
    }

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Reward Requests</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{rewardRequest.length}</ResponsiveText>
                </View>
            </View>

            <View style={styles.rewardsContainer}>
                {rewardRequest.length > 0 ? (
                    <FlatList
                        data={rewardRequest}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.rewardCard}>
                                    <View style={styles.rewardHeader}>
                                        <View style={styles.studentInfo}>
                                            <View style={styles.avatarContainer}>
                                                <Text style={styles.avatarText}>{item?.student?.FullName.charAt(0).toUpperCase()}</Text>
                                            </View>
                                            <View style={styles.studentDetails}>
                                                <ResponsiveText style={styles.studentName}>{item?.student?.FullName}</ResponsiveText>
                                                <ResponsiveText style={styles.studentId}>Student ID: {item?.student?.StudentId}</ResponsiveText>
                                                <ResponsiveText style={styles.requestDate}>Requested: {moment(item?.createdAt.toDate()).format("DD MMM YYYY")}</ResponsiveText>
                                            </View>
                                        </View>
                                        <View style={[styles.statusBadge, {
                                            backgroundColor: item.status === 'approved' ? Color.SUCCESS : Color.WARNING
                                        }]}>
                                            <ResponsiveText style={styles.statusText}>
                                                {item.status === 'approved' ? 'APPROVED' : 'PENDING'}
                                            </ResponsiveText>
                                        </View>
                                    </View>

                                    <View style={styles.rewardBody}>
                                        <View style={styles.rewardDetails}>
                                            <View style={styles.rewardIconContainer}>
                                                <Text style={styles.rewardIcon}>🎁</Text>
                                            </View>
                                            <View style={styles.rewardInfo}>
                                                <ResponsiveText style={styles.rewardType}>
                                                    {item?.reward?.rewardTitle || item?.rewardTitle || 'Reward Request'}
                                                </ResponsiveText>
                                                <ResponsiveText style={styles.rewardDescription}>
                                                    {item?.reward?.byReward 
                                                        ? `Provided by ${item.reward.byReward}` 
                                                        : item?.byReward
                                                            ? `Provided by ${item.byReward}`
                                                            : 'Reward details not available'}
                                                </ResponsiveText>
                                                <ResponsiveText style={styles.pointsRequired}>
                                                    Required: {item?.pointsNeeded} points
                                                </ResponsiveText>
                                            </View>
                                        </View>

                                        <View style={styles.actionButtons}>
                                            {item.status === 'pending' ? (
                                                <>
                                                    <TouchableOpacity
                                                        style={styles.approveButton}
                                                        onPress={() => handleApprove(item)}
                                                    >
                                                        <ResponsiveText style={styles.approveButtonText}>Approve</ResponsiveText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.rejectButton}
                                                        onPress={() => handleReject(item)}
                                                    >
                                                        <ResponsiveText style={styles.rejectButtonText}>Reject</ResponsiveText>
                                                    </TouchableOpacity>
                                                </>
                                            ) : (
                                                <TouchableOpacity
                                                    style={styles.detailsButton}
                                                    onPress={() => handleViewDetails(item)}
                                                >
                                                    <ResponsiveText style={styles.detailsButtonText}>View Details</ResponsiveText>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="dark"
                        contentContainerStyle={styles.rewardsList}
                        nestedScrollEnabled={true}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <ResponsiveText style={styles.emptyTitle}>No students found</ResponsiveText>
                        <ResponsiveText style={styles.emptyDescription}>
                            {searchQuery ? `No results for "${searchQuery}"` : 'No reward requests available'}
                        </ResponsiveText>
                    </View>
                )}
            </View>            {/* Details Modal */}
            {modalVisible &&
                <RewardDetail
                    modalVisible={modalVisible}
                    selectedReward={selectedReward}
                    setModalVisible={setModalVisible}
                />
            }
        </View>
    )
}
export const EventRequests = ({ searchQuery, EventRequests, handleApprove, handleReject }) => {
    const [selectedReward, setSelectedReward] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [expandedEvents, setExpandedEvents] = useState({})

    console.log(EventRequests)
    const handleViewDetails = (item) => {
        setSelectedReward(item)
        setModalVisible(true)
    }

    const toggleEventExpansion = (eventId) => {
        setExpandedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }))
    }

    // Group requests by event
    const groupedRequests = useMemo(() => {
        const groups = {}
        EventRequests.forEach(request => {
            const eventId = request.eventId
            const eventTitle = request?.event?.eventTitle || 'Unknown Event'
            
            if (!groups[eventId]) {
                groups[eventId] = {
                    eventId,
                    eventTitle,
                    event: request.event,
                    pending: [],
                    approved: []
                }
            }
            
            if (request.status === 'pending') {
                groups[eventId].pending.push(request)
            } else if (request.status === 'approved') {
                groups[eventId].approved.push(request)
            }
        })
        
        return Object.values(groups)
    }, [EventRequests])

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Event Requests</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{EventRequests.length}</ResponsiveText>
                </View>
            </View>

            <View style={styles.rewardsContainer}>
                {groupedRequests.length > 0 ? (
                    <FlatList
                        data={groupedRequests}
                        keyExtractor={(item) => item.eventId.toString()}
                        renderItem={({ item: eventGroup }) => {
                            const isExpanded = expandedEvents[eventGroup.eventId]
                            const totalRequests = eventGroup.pending.length + eventGroup.approved.length

                            return (
                                <View style={styles.eventGroupCard}>
                                    {/* Event Header - Clickable */}
                                    <TouchableOpacity
                                        style={styles.eventGroupHeader}
                                        onPress={() => toggleEventExpansion(eventGroup.eventId)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.eventHeaderLeft}>
                                            <View style={styles.eventIconContainer}>
                                                <Text style={styles.eventHeaderIcon}>📅</Text>
                                            </View>
                                            <View style={styles.eventHeaderInfo}>
                                                <ResponsiveText style={styles.eventTitle}>{eventGroup.eventTitle}</ResponsiveText>
                                                <ResponsiveText style={styles.eventSubtitle}>
                                                    {eventGroup.pending.length} Pending • {eventGroup.approved.length} Approved
                                                </ResponsiveText>
                                            </View>
                                        </View>
                                        <View style={styles.expandIconContainer}>
                                            <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/* Expanded Content */}
                                    {isExpanded && (
                                        <View style={styles.requestsListContainer}>
                                            {/* Pending Requests */}
                                            {eventGroup.pending.length > 0 && (
                                                <>
                                                    <View style={styles.requestTypeHeader}>
                                                        <ResponsiveText style={styles.requestTypeTitle}>Pending Requests ({eventGroup.pending.length})</ResponsiveText>
                                                    </View>
                                                    {eventGroup.pending.map((item) => (
                                                        <View key={item.id} style={styles.requestItem}>
                                                            <View style={styles.requestStudentInfo}>
                                                                <View style={styles.avatarContainerSmall}>
                                                                    <Text style={styles.avatarTextSmall}>{item?.student?.FullName.charAt(0).toUpperCase()}</Text>
                                                                </View>
                                                                <View style={styles.studentDetailsSmall}>
                                                                    <ResponsiveText style={styles.studentNameSmall}>{item?.student?.FullName}</ResponsiveText>
                                                                    <ResponsiveText style={styles.studentIdSmall}>ID: {item?.student?.StudentId}</ResponsiveText>
                                                                </View>
                                                            </View>
                                                            <View style={styles.requestActions}>
                                                                <TouchableOpacity
                                                                    style={styles.approveButtonSmall}
                                                                    onPress={() => handleApprove(item)}
                                                                >
                                                                    <ResponsiveText style={styles.approveButtonTextSmall}>✓</ResponsiveText>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity
                                                                    style={styles.rejectButtonSmall}
                                                                    onPress={() => handleReject(item)}
                                                                >
                                                                    <ResponsiveText style={styles.rejectButtonTextSmall}>✕</ResponsiveText>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    ))}
                                                </>
                                            )}

                                            {/* Approved Requests */}
                                            {eventGroup.approved.length > 0 && (
                                                <>
                                                    <View style={[styles.requestTypeHeader, { marginTop: eventGroup.pending.length > 0 ? hp(2) : 0 }]}>
                                                        <ResponsiveText style={styles.requestTypeTitle}>Approved Requests ({eventGroup.approved.length})</ResponsiveText>
                                                    </View>
                                                    {eventGroup.approved.map((item) => (
                                                        <View key={item.id} style={styles.requestItem}>
                                                            <View style={styles.requestStudentInfo}>
                                                                <View style={styles.avatarContainerSmall}>
                                                                    <Text style={styles.avatarTextSmall}>{item?.student?.FullName.charAt(0).toUpperCase()}</Text>
                                                                </View>
                                                                <View style={styles.studentDetailsSmall}>
                                                                    <ResponsiveText style={styles.studentNameSmall}>{item?.student?.FullName}</ResponsiveText>
                                                                    <ResponsiveText style={styles.studentIdSmall}>ID: {item?.student?.StudentId}</ResponsiveText>
                                                                </View>
                                                            </View>
                                                            <View style={[styles.statusBadgeSmall, { backgroundColor: Color.SUCCESS }]}>
                                                                <ResponsiveText style={styles.statusTextSmall}>✓ Approved</ResponsiveText>
                                                            </View>
                                                        </View>
                                                    ))}
                                                </>
                                            )}
                                        </View>
                                    )}
                                </View>
                            )
                        }}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="dark"
                        contentContainerStyle={styles.rewardsList}
                        nestedScrollEnabled={true}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>🔍</Text>
                        <ResponsiveText style={styles.emptyTitle}>No event requests found</ResponsiveText>
                        <ResponsiveText style={styles.emptyDescription}>
                            {searchQuery ? `No results for "${searchQuery}"` : 'No event registration requests available'}
                        </ResponsiveText>
                    </View>
                )}
            </View>
            {/* Details Modal */}
            {modalVisible &&
                <RewardDetail
                    modalVisible={modalVisible}
                    selectedReward={selectedReward}
                    setModalVisible={setModalVisible}
                />
            }
        </View>
    )
}

// Top Donors Component
export const TopDonors = ({ searchQuery, topDonor }) => {
    console.log(topDonor, "in com[oneny")
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Top Donors</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>
                        {String(topDonor.length)}
                    </ResponsiveText>
                </View>
            </View>

            <View style={styles.donorsContainer}>
                {topDonor.length > 0 ? (
                    <FlatList
                        data={topDonor}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.donorCard}>
                                <View style={styles.donorHeader}>
                                    <View style={styles.rankContainer}>
                                        <ResponsiveText style={styles.rankNumber}>
                                            #{index + 1}
                                        </ResponsiveText>
                                    </View>

                                    <View style={styles.donorInfo}>
                                        <View style={styles.donorAvatarContainer}>
                                            <Text style={styles.donorAvatarText}>
                                                {item.FullName.charAt(0).toUpperCase()}
                                            </Text>
                                            <View style={styles.statusIndicator} />
                                        </View>

                                        <View style={styles.donorDetails}>
                                            <ResponsiveText style={styles.donorName}>
                                                {item.FullName}
                                            </ResponsiveText>
                                            <ResponsiveText style={styles.donorId}>
                                                ID: {item.StudentId}
                                            </ResponsiveText>
                                        </View>
                                    </View>

                                    <View style={styles.donorStats}>
                                        <View style={styles.bloodTypeContainer}>
                                            <ResponsiveText style={styles.bloodTypeText}>
                                                {item.BloodGroup || "N/A"}
                                            </ResponsiveText>
                                        </View>
                                        <ResponsiveText style={styles.ageText}>
                                            Events: {item.event}
                                        </ResponsiveText>
                                    </View>
                                </View>

                                <View style={styles.donorFooter}>
                                    <View style={styles.achievementBadges}>
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeIcon}>🩸</Text>
                                            <ResponsiveText style={styles.badgeText}>
                                                {item.event} Donations
                                            </ResponsiveText>
                                        </View>
                                        <View style={styles.badge}>
                                            <Text style={styles.badgeIcon}>🏆</Text>
                                            <ResponsiveText style={styles.badgeText}>
                                                Top Donor
                                            </ResponsiveText>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        nestedScrollEnabled
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>👥</Text>
                        <ResponsiveText style={styles.emptyTitle}>No donors found</ResponsiveText>
                        <ResponsiveText style={styles.emptyDescription}>
                            {searchQuery ? `No results for "${searchQuery}"` : 'No donors available'}
                        </ResponsiveText>
                    </View>
                )}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    // Search Header Styles
    searchHeader: {
        backgroundColor: Color.PRIMARY,
        borderRadius: wp(4),
        marginHorizontal: wp(3),
        marginVertical: hp(1),
        padding: wp(4),
        elevation: 8,
        shadowColor: Color.PRIMARY,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerContent: {
        marginBottom: hp(2),
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Color.WHITE,
        marginBottom: hp(0.3),
    },
    headerSubtitle: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    searchContainer: {
        marginTop: hp(1),
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: wp(3),
        paddingVertical: hp(1.2),
    },
    searchIcon: {
        fontSize: 16,
        color: Color.WHITE,
        marginRight: wp(2),
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: '500',
    },
    clearButton: {
        padding: wp(1),
    },
    clearIcon: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: '600',
    },
    searchStats: {
        marginTop: hp(1),
        alignItems: 'center',
    },
    searchStatsText: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.8)',
        fontWeight: '400',
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
    sectionContent: {
        height: hp(35),
        padding: wp(3),
    },
    listContent: {
        paddingBottom: hp(1),
    },

    // Reward Card Styles
    rewardCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(2.5),
        borderWidth: 1,
        borderColor: Color.BORDER,
        overflow: 'hidden',
        marginVertical: hp(0.5),
    },
    rewardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
    },
    avatarText: {
        fontSize: 14,
        fontWeight: '700',
        color: Color.WHITE,
    },
    studentDetails: {
        flex: 1,
    },
    studentName: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.2),
    },
    studentId: {
        fontSize: 11,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    statusBadge: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
    },
    statusText: {
        fontSize: 10,
        color: Color.WHITE,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    rewardBody: {
        padding: wp(3),
    },
    rewardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    rewardIconContainer: {
        backgroundColor: Color.SURFACE,
        padding: wp(2),
        borderRadius: wp(2),
        marginRight: wp(3),
    },
    rewardIcon: {
        fontSize: 18,
    },
    rewardInfo: {
        flex: 1,
    },
    rewardType: {
        fontSize: 13,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.2),
    },
    rewardDescription: {
        fontSize: 11,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    approveButton: {
        backgroundColor: Color.SUCCESS,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.8),
        borderRadius: wp(2),
        flex: 1,
        marginRight: wp(1),
    },
    approveButtonText: {
        fontSize: 11,
        color: Color.WHITE,
        fontWeight: '600',
        textAlign: 'center',
    },
    rejectButton: {
        backgroundColor: Color.ERROR,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.8),
        borderRadius: wp(2),
        flex: 1,
        marginLeft: wp(1),
    },
    rejectButtonText: {
        fontSize: 11,
        color: Color.WHITE,
        fontWeight: '600',
        textAlign: 'center',
    },
    viewButton: {
        backgroundColor: Color.INFO,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.8),
        borderRadius: wp(2),
        flex: 1,
    },
    viewButtonText: {
        fontSize: 11,
        color: Color.WHITE,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Donor Card Styles
    donorCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(2.5),
        borderWidth: 1,
        borderColor: Color.BORDER,
        overflow: 'hidden',
        marginVertical: hp(0.5),
    },
    donorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    rankContainer: {
        backgroundColor: Color.ACCENT,
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(3),
    },
    rankNumber: {
        fontSize: 12,
        fontWeight: '700',
        color: Color.WHITE,
    },
    donorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    donorAvatarContainer: {
        position: 'relative',
        marginRight: wp(3),
    },
    donorAvatarText: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: Color.SECONDARY,
        fontSize: 14,
        fontWeight: '700',
        color: Color.WHITE,
        textAlign: 'center',
        lineHeight: wp(10),
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: wp(3),
        height: wp(3),
        borderRadius: wp(1.5),
        backgroundColor: Color.SUCCESS,
        borderWidth: 1,
        borderColor: Color.WHITE,
    },
    donorDetails: {
        flex: 1,
    },
    donorName: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.2),
    },
    donorId: {
        fontSize: 11,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    donorStats: {
        alignItems: 'flex-end',
    },
    bloodTypeContainer: {
        backgroundColor: Color.ACCENT,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.3),
        borderRadius: wp(1),
        marginBottom: hp(0.5),
    },
    bloodTypeText: {
        fontSize: 11,
        fontWeight: '700',
        color: Color.WHITE,
    },
    ageText: {
        fontSize: 10,
        color: Color.TEXT_LIGHT,
        fontWeight: '400',
    },
    donorFooter: {
        padding: wp(3),
    },
    achievementBadges: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.SURFACE_DARK,
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.4),
        borderRadius: wp(1.5),
        flex: 1,
        marginHorizontal: wp(0.5),
    },
    badgeIcon: {
        fontSize: 12,
        marginRight: wp(1),
    },
    badgeText: {
        fontSize: 10,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
    },

    // Empty State Styles
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(5),
    },
    emptyIcon: {
        fontSize: 40,
        marginBottom: hp(2),
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(1),
        textAlign: 'center',
    },
    emptyDescription: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
        lineHeight: 18,
    },    // Common Styles
    separator: {
        height: 1,
        backgroundColor: Color.DIVIDER,
        marginVertical: hp(0.3),
    },    // Improved Container Styles
    rewardsContainer: {
        height: hp(40), // Increased height for better scrolling
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    rewardsList: {
        paddingBottom: hp(2),
    },
    donorsContainer: {
        height: hp(35), // Fixed height for donors with proper scrolling
        paddingHorizontal: wp(3),
        paddingTop: wp(2),
    },
    donorsList: {
        paddingBottom: hp(2),
    },
    requestDate: {
        fontSize: 10,
        color: Color.TEXT_LIGHT,
        fontWeight: '400',
        marginTop: hp(0.2),
    },
    pointsRequired: {
        fontSize: 10,
        color: Color.ACCENT,
        fontWeight: '600',
        marginTop: hp(0.3),
    },
    detailsButton: {
        backgroundColor: Color.INFO,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.8),
        borderRadius: wp(2),
        flex: 1,
    },
    detailsButtonText: {
        fontSize: 11,
        color: Color.WHITE,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Event Group Styles
    eventGroupCard: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(2.5),
        borderWidth: 1,
        borderColor: Color.BORDER,
        overflow: 'hidden',
        marginVertical: hp(0.5),
    },
    eventGroupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(3),
        backgroundColor: Color.SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
    },
    eventHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    eventIconContainer: {
        backgroundColor: Color.PRIMARY + '15',
        padding: wp(2),
        borderRadius: wp(2),
        marginRight: wp(3),
    },
    eventHeaderIcon: {
        fontSize: 18,
    },
    eventHeaderInfo: {
        flex: 1,
    },
    eventTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.3),
    },
    eventSubtitle: {
        fontSize: 11,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    expandIconContainer: {
        padding: wp(1),
    },
    expandIcon: {
        fontSize: 12,
        color: Color.TEXT_SECONDARY,
    },
    requestsListContainer: {
        backgroundColor: Color.WHITE,
        paddingHorizontal: wp(3),
        paddingBottom: hp(1),
    },
    requestTypeHeader: {
        paddingVertical: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: Color.DIVIDER,
        marginBottom: hp(0.5),
    },
    requestTypeTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
    },
    requestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
        backgroundColor: Color.SURFACE + '50',
        borderRadius: wp(2),
        marginVertical: hp(0.3),
    },
    requestStudentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainerSmall: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        backgroundColor: Color.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2),
    },
    avatarTextSmall: {
        fontSize: 12,
        fontWeight: '700',
        color: Color.WHITE,
    },
    studentDetailsSmall: {
        flex: 1,
    },
    studentNameSmall: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.TEXT_PRIMARY,
        marginBottom: hp(0.1),
    },
    studentIdSmall: {
        fontSize: 10,
        color: Color.TEXT_SECONDARY,
        fontWeight: '400',
    },
    requestActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    approveButtonSmall: {
        backgroundColor: Color.SUCCESS,
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.6),
        borderRadius: wp(1.5),
        marginRight: wp(1),
        minWidth: wp(8),
        alignItems: 'center',
    },
    approveButtonTextSmall: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: '700',
    },
    rejectButtonSmall: {
        backgroundColor: Color.ERROR,
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.6),
        borderRadius: wp(1.5),
        minWidth: wp(8),
        alignItems: 'center',
    },
    rejectButtonTextSmall: {
        fontSize: 14,
        color: Color.WHITE,
        fontWeight: '700',
    },
    statusBadgeSmall: {
        paddingHorizontal: wp(2),
        paddingVertical: hp(0.4),
        borderRadius: wp(1),
        alignItems: 'center',
    },
    statusTextSmall: {
        fontSize: 10,
        color: Color.WHITE,
        fontWeight: '600',
    },


})