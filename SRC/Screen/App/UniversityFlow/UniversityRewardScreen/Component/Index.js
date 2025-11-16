import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useState, useMemo } from 'react'
import { ResponsiveText } from '../../../../../Component/ResponsiveText'
import { Color } from '../../../../../Theme/Color/Index'
import { hp, wp } from '../../../../../Component/ResponsiveComponent'
import { DonorList, DummyEvent, RequestRewards } from '../../../../../Dummy/Index'
import Spacer, { HorizontalSpacer } from '../../../../../Component/Spacer'

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
                        placeholder="Search by student name..."
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
export const RewardRequests = ({ searchQuery }) => {
    const [selectedReward, setSelectedReward] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    
    // Filter data based on search query
    const filteredRewards = useMemo(() => {
        if (!searchQuery.trim()) return RequestRewards
        return RequestRewards.filter(item => 
            item.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const handleViewDetails = (item) => {
        setSelectedReward(item)
        setModalVisible(true)
    }

    const handleApprove = (item) => {
        // Add approve logic here
        console.log('Approving reward for:', item.Name)
    }

    const handleReject = (item) => {
        // Add reject logic here
        console.log('Rejecting reward for:', item.Name)
    }

    const renderRewardItem = ({ item }) => (
        <View style={styles.rewardCard}>
            <View style={styles.rewardHeader}>
                <View style={styles.studentInfo}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{item.Name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={styles.studentDetails}>
                        <ResponsiveText style={styles.studentName}>{item.Name}</ResponsiveText>
                        <ResponsiveText style={styles.studentId}>Student ID: {String(item.id)}</ResponsiveText>
                        <ResponsiveText style={styles.requestDate}>Requested: Nov 13, 2025</ResponsiveText>
                    </View>
                </View>
                <View style={[styles.statusBadge, { 
                    backgroundColor: item.Active === 'Taken' ? Color.SUCCESS : Color.WARNING 
                }]}>
                    <ResponsiveText style={styles.statusText}>
                        {item.Active === 'Taken' ? 'APPROVED' : 'PENDING'}
                    </ResponsiveText>
                </View>
            </View>
            
            <View style={styles.rewardBody}>
                <View style={styles.rewardDetails}>
                    <View style={styles.rewardIconContainer}>
                        <Text style={styles.rewardIcon}>🎁</Text>
                    </View>
                    <View style={styles.rewardInfo}>
                        <ResponsiveText style={styles.rewardType}>{item.RewardType}</ResponsiveText>
                        <ResponsiveText style={styles.rewardDescription}>
                            Healthcare benefit reward request
                        </ResponsiveText>
                        <ResponsiveText style={styles.pointsRequired}>
                            Required: 100 points
                        </ResponsiveText>
                    </View>
                </View>
                
                <View style={styles.actionButtons}>
                    {item.Active === 'Not Taken' ? (
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

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Reward Requests</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(filteredRewards.length)}</ResponsiveText>
                </View>
            </View>
            
            <View style={styles.rewardsContainer}>
                {filteredRewards.length > 0 ? (
                    <FlatList
                        data={filteredRewards}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderRewardItem}
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
                                {selectedReward ? 'Reward Request Details' : 'Details'}
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
                                                <ResponsiveText style={styles.modalValue}>{selectedReward.Name}</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Student ID:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>ID-{String(selectedReward.id).padStart(6, '0')}</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Email:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>{selectedReward.Name.toLowerCase().replace(' ', '.')}@university.edu</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Phone:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>+1 (555) 123-4567</ResponsiveText>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Reward Information Card */}
                                    <View style={styles.modalCard}>
                                        <ResponsiveText style={styles.modalSectionTitle}>🎁 Reward Information</ResponsiveText>
                                        <View style={styles.modalInfoGrid}>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Reward Type:</ResponsiveText>
                                                <ResponsiveText style={[styles.modalValue, {color: Color.PRIMARY, fontWeight: '700'}]}>
                                                    {selectedReward.RewardType}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Points Required:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>100 points</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Current Status:</ResponsiveText>
                                                <View style={[styles.statusBadge, {
                                                    backgroundColor: selectedReward.Active === 'Taken' ? Color.SUCCESS : Color.WARNING
                                                }]}>
                                                    <ResponsiveText style={styles.statusText}>
                                                        {selectedReward.Active === 'Taken' ? '✓ Approved' : '⏳ Pending Review'}
                                                    </ResponsiveText>
                                                </View>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Request Date:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>November 13, 2025</ResponsiveText>
                                            </View>
                                            {selectedReward.Active === 'Taken' && (
                                                <View style={styles.modalRow}>
                                                    <ResponsiveText style={styles.modalLabel}>Approved Date:</ResponsiveText>
                                                    <ResponsiveText style={[styles.modalValue, {color: Color.SUCCESS, fontWeight: '600'}]}>
                                                        November 14, 2025
                                                    </ResponsiveText>
                                                </View>
                                            )}
                                        </View>
                                    </View>

                                    {/* Donation History Card */}
                                    <View style={styles.modalCard}>
                                        <ResponsiveText style={styles.modalSectionTitle}>🩸 Donation History</ResponsiveText>
                                        <View style={styles.modalInfoGrid}>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Total Donations:</ResponsiveText>
                                                <ResponsiveText style={[styles.modalValue, {color: Color.ACCENT, fontWeight: '700'}]}>8 times</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Total Points Earned:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>240 points</ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Available Points:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>
                                                    {selectedReward.Active === 'Taken' ? '140 points' : '240 points'}
                                                </ResponsiveText>
                                            </View>
                                            <View style={styles.modalRow}>
                                                <ResponsiveText style={styles.modalLabel}>Last Donation:</ResponsiveText>
                                                <ResponsiveText style={styles.modalValue}>October 28, 2025</ResponsiveText>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Reward Description Card */}
                                    <View style={styles.modalCard}>
                                        <ResponsiveText style={styles.modalSectionTitle}>📋 Description</ResponsiveText>
                                        <ResponsiveText style={styles.modalDescription}>
                                            This reward request is for healthcare benefits including medical services and health checkups. 
                                            The student has demonstrated exceptional commitment to the blood donation program and has 
                                            accumulated sufficient points through regular donations and community involvement. 
                                            {'\n\n'}
                                            The reward includes access to:
                                            {'\n'}• Free general health checkup
                                            {'\n'}• Blood test package
                                            {'\n'}• Medical consultation
                                            {'\n'}• Priority appointment scheduling
                                            {'\n\n'}
                                            All services are valid for 6 months from approval date.
                                        </ResponsiveText>
                                    </View>
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
        </View>
    )
}

// Top Donors Component
export const TopDonors = ({ searchQuery }) => {
    // Filter data based on search query
    const filteredDonors = useMemo(() => {
        if (!searchQuery.trim()) return DonorList
        return DonorList.filter(item => 
            item.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [searchQuery])

    const renderDonorItem = ({ item, index }) => (
        <View style={styles.donorCard}>
            <View style={styles.donorHeader}>
                <View style={styles.rankContainer}>
                    <ResponsiveText style={styles.rankNumber}>#{String(index + 1)}</ResponsiveText>
                </View>
                <View style={styles.donorInfo}>
                    <View style={styles.donorAvatarContainer}>
                        <Text style={styles.donorAvatarText}>{item.Name.charAt(0).toUpperCase()}</Text>
                        <View style={styles.statusIndicator} />
                    </View>
                    <View style={styles.donorDetails}>
                        <ResponsiveText style={styles.donorName}>{item.Name}</ResponsiveText>
                        <ResponsiveText style={styles.donorId}>ID: {String(item.id)}</ResponsiveText>
                    </View>
                </View>
                <View style={styles.donorStats}>
                    <View style={styles.bloodTypeContainer}>
                        <ResponsiveText style={styles.bloodTypeText}>{item.BloodGroup}</ResponsiveText>
                    </View>
                    <ResponsiveText style={styles.ageText}>Age: {String(item.age)}</ResponsiveText>
                </View>
            </View>
            
            <View style={styles.donorFooter}>
                <View style={styles.achievementBadges}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeIcon}>🩸</Text>
                        <ResponsiveText style={styles.badgeText}>12 Donations</ResponsiveText>
                    </View>
                    <View style={styles.badge}>
                        <Text style={styles.badgeIcon}>🏆</Text>
                        <ResponsiveText style={styles.badgeText}>Top Donor</ResponsiveText>
                    </View>
                </View>
            </View>
        </View>
    )

    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <ResponsiveText style={styles.sectionTitle}>Top Donors</ResponsiveText>
                <View style={styles.sectionIndicator}>
                    <ResponsiveText style={styles.indicatorText}>{String(filteredDonors.length)}</ResponsiveText>
                </View>
            </View>
              <View style={styles.donorsContainer}>
                {filteredDonors.length > 0 ? (
                    <FlatList
                        data={filteredDonors}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderDonorItem}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        showsVerticalScrollIndicator={true}
                        indicatorStyle="dark"
                        contentContainerStyle={styles.donorsList}
                        nestedScrollEnabled={true}
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

    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },    modalContainer: {
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
        flex: 1,
    },
    modalScrollContent: {
        padding: wp(4),
        paddingBottom: hp(2),
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