import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, RefreshControl, Alert, TextInput } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { Color } from '../../../../Theme/Color/Index'
import { hp, wp } from '../../../../Component/ResponsiveComponent'
import Spacer from '../../../../Component/Spacer'
import { UseVerificationManagement } from './Hooks/Index'
import moment from 'moment'
import BackArrowIcon from '../../../../Assets/Svg/BackArrowIcon'

const VerificationManagementScreen = (props) => {
    const {
        verificationRequests,
        loading,
        refreshing,
        onRefresh,
        handleApprove,
        handleReject,
        selectedFilter,
        setSelectedFilter,
        searchQuery,
        setSearchQuery
    } = UseVerificationManagement()

    const filteredRequests = verificationRequests.filter(req => {
        // Filter by status
        const matchesStatus = selectedFilter === 'all' || req.status === selectedFilter
        
        // Filter by search query (name or enrollment ID)
        const matchesSearch = !searchQuery || 
            req.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.enrollmentId?.toLowerCase().includes(searchQuery.toLowerCase())
        
        return matchesStatus && matchesSearch
    })

    return (
        <MainContainer>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => props?.navigation?.goBack()}
                    activeOpacity={0.7}
                >
                    <BackArrowIcon size={24} color={Color.WHITE} />
                </TouchableOpacity>
                <ResponsiveText style={styles.headerTitle}>Verification Requests</ResponsiveText>
                <View style={styles.headerRight} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or enrollment ID..."
                    placeholderTextColor={Color.TEXT_SECONDARY}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => setSearchQuery('')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterTab, selectedFilter === 'all' && styles.filterTabActive]}
                    onPress={() => setSelectedFilter('all')}
                >
                    <ResponsiveText style={[styles.filterText, selectedFilter === 'all' && styles.filterTextActive]}>
                        All ({verificationRequests.length})
                    </ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterTab, selectedFilter === 'pending' && styles.filterTabActive]}
                    onPress={() => setSelectedFilter('pending')}
                >
                    <ResponsiveText style={[styles.filterText, selectedFilter === 'pending' && styles.filterTextActive]}>
                        Pending ({verificationRequests.filter(r => r.status === 'pending').length})
                    </ResponsiveText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterTab, selectedFilter === 'approved' && styles.filterTabActive]}
                    onPress={() => setSelectedFilter('approved')}
                >
                    <ResponsiveText style={[styles.filterText, selectedFilter === 'approved' && styles.filterTextActive]}>
                        Approved
                    </ResponsiveText>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Spacer height={hp(2)} />

                {filteredRequests.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>📋</Text>
                        <ResponsiveText style={styles.emptyText}>
                            No {selectedFilter !== 'all' ? selectedFilter : ''} verification requests
                        </ResponsiveText>
                    </View>
                ) : (
                    filteredRequests.map((request) => (
                        <VerificationRequestCard
                            key={request.id}
                            request={request}
                            onApprove={() => handleApprove(request)}
                            onReject={() => handleReject(request)}
                        />
                    ))
                )}

                <Spacer height={hp(3)} />
            </ScrollView>
        </MainContainer>
    )
}

const VerificationRequestCard = ({ request, onApprove, onReject }) => {
    const statusColor = {
        pending: Color.ACCENT,
        approved: Color.SECONDARY,
        rejected: Color.RED
    }

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.studentInfo}>
                    <ResponsiveText style={styles.studentName}>{request.studentName}</ResponsiveText>
                    <ResponsiveText style={styles.studentEmail}>{request.studentEmail}</ResponsiveText>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor[request.status] }]}>
                    <ResponsiveText style={styles.statusText}>
                        {request.status.toUpperCase()}
                    </ResponsiveText>
                </View>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                    <ResponsiveText style={styles.infoLabel}>Enrollment ID:</ResponsiveText>
                    <ResponsiveText style={styles.infoValue}>{request.enrollmentId}</ResponsiveText>
                </View>
                <View style={styles.infoRow}>
                    <ResponsiveText style={styles.infoLabel}>University:</ResponsiveText>
                    <ResponsiveText style={styles.infoValue}>{request.university}</ResponsiveText>
                </View>
                <View style={styles.infoRow}>
                    <ResponsiveText style={styles.infoLabel}>Submitted:</ResponsiveText>
                    <ResponsiveText style={styles.infoValue}>
                        {request.submittedAt ? moment(request.submittedAt.toDate()).format('MMM DD, YYYY') : 'N/A'}
                    </ResponsiveText>
                </View>

                {/* Document Preview */}
                {request.documentUri && (
                    <View style={styles.documentSection}>
                        <ResponsiveText style={styles.documentLabel}>Proof of Enrollment:</ResponsiveText>
                        <Image
                            source={{ uri: request.documentUri }}
                            style={styles.documentImage}
                            resizeMode="cover"
                        />
                    </View>
                )}
            </View>

            {/* Action Buttons - Only show for pending requests */}
            {request.status === 'pending' && (
                <View style={styles.cardFooter}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={onReject}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.actionIcon}>✕</Text>
                        <ResponsiveText style={styles.actionButtonText}>Reject</ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={onApprove}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.actionIcon}>✓</Text>
                        <ResponsiveText style={styles.actionButtonText}>Approve</ResponsiveText>
                    </TouchableOpacity>
                </View>
            )}

            {/* Show reason for rejected requests */}
            {request.status === 'rejected' && request.rejectionReason && (
                <View style={styles.rejectionReasonContainer}>
                    <ResponsiveText style={styles.rejectionLabel}>Rejection Reason:</ResponsiveText>
                    <ResponsiveText style={styles.rejectionReason}>{request.rejectionReason}</ResponsiveText>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Color.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    backButton: {
        padding: wp(2),
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.WHITE,
        flex: 1,
        textAlign: 'center',
        marginHorizontal: wp(2),
    },
    headerRight: {
        width: wp(8),
    },
    searchContainer: {
        backgroundColor: Color.WHITE,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
        borderRadius: wp(2),
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.2),
        fontSize: 14,
        color: Color.BLACK,
    },
    clearButton: {
        position: 'absolute',
        right: wp(6),
        padding: wp(2),
    },
    clearIcon: {
        fontSize: 16,
        color: Color.TEXT_SECONDARY,
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: Color.WHITE,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
        elevation: 2,
    },
    filterTab: {
        flex: 1,
        paddingVertical: hp(1),
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    filterTabActive: {
        borderBottomColor: Color.PRIMARY,
    },
    filterText: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    filterTextActive: {
        color: Color.PRIMARY,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        backgroundColor: Color.BACKGROUND,
        paddingHorizontal: wp(4),
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(10),
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: hp(2),
    },
    emptyText: {
        fontSize: 16,
        color: Color.TEXT_SECONDARY,
        textAlign: 'center',
    },
    card: {
        backgroundColor: Color.WHITE,
        borderRadius: wp(3),
        padding: wp(4),
        marginBottom: hp(2),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: hp(2),
        paddingBottom: hp(1.5),
        borderBottomWidth: 1,
        borderBottomColor: Color.BORDER,
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '600',
        color: Color.BLACK,
        marginBottom: hp(0.5),
    },
    studentEmail: {
        fontSize: 13,
        color: Color.TEXT_SECONDARY,
    },
    statusBadge: {
        paddingHorizontal: wp(3),
        paddingVertical: hp(0.5),
        borderRadius: wp(4),
    },
    statusText: {
        fontSize: 11,
        color: Color.WHITE,
        fontWeight: '600',
    },
    cardBody: {
        marginBottom: hp(2),
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(1),
    },
    infoLabel: {
        fontSize: 14,
        color: Color.TEXT_SECONDARY,
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 14,
        color: Color.BLACK,
        fontWeight: '600',
    },
    documentSection: {
        marginTop: hp(2),
    },
    documentLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.BLACK,
        marginBottom: hp(1),
    },
    documentImage: {
        width: '100%',
        height: hp(25),
        borderRadius: wp(2),
        backgroundColor: Color.BACKGROUND,
    },
    cardFooter: {
        flexDirection: 'row',
        gap: wp(3),
        marginTop: hp(2),
        paddingTop: hp(2),
        borderTopWidth: 1,
        borderTopColor: Color.BORDER,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1.5),
        borderRadius: wp(2),
        gap: wp(2),
    },
    approveButton: {
        backgroundColor: Color.SECONDARY,
    },
    rejectButton: {
        backgroundColor: Color.RED,
    },
    actionIcon: {
        fontSize: 18,
        color: Color.WHITE,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: Color.WHITE,
    },
    rejectionReasonContainer: {
        marginTop: hp(2),
        padding: wp(3),
        backgroundColor: `${Color.RED}10`,
        borderRadius: wp(2),
        borderLeftWidth: 3,
        borderLeftColor: Color.RED,
    },
    rejectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: Color.RED,
        marginBottom: hp(0.5),
    },
    rejectionReason: {
        fontSize: 13,
        color: Color.TEXT_SECONDARY,
        fontStyle: 'italic',
    },
})

export default VerificationManagementScreen
