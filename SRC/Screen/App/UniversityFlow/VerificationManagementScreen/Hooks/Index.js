import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { listenToVerificationRequests, approveVerification, rejectVerification } from '../../../../../FireBase/Index'

export const UseVerificationManagement = () => {
    const [verificationRequests, setVerificationRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const unsubscribe = listenToVerificationRequests((requests) => {
            setVerificationRequests(requests)
            setLoading(false)
            setRefreshing(false)
        })

        return () => unsubscribe()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
    }

    const handleApprove = (request) => {
        Alert.alert(
            'Approve Verification',
            `Are you sure you want to approve ${request.studentName}'s verification request?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Approve',
                    onPress: async () => {
                        const result = await approveVerification({
                            requestId: request.id,
                            studentId: request.studentId
                        })
                        if (result.success) {
                            Alert.alert('Success', 'Student verification approved successfully')
                        } else {
                            Alert.alert('Error', result.message || 'Failed to approve verification')
                        }
                    }
                }
            ]
        )
    }

    const handleReject = (request) => {
        Alert.prompt(
            'Reject Verification',
            `Please provide a reason for rejecting ${request.studentName}'s verification request:`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reject',
                    style: 'destructive',
                    onPress: async (reason) => {
                        const result = await rejectVerification({
                            requestId: request.id,
                            reason: reason || 'Does not meet verification criteria'
                        })
                        if (result.success) {
                            Alert.alert('Success', 'Verification request rejected')
                        } else {
                            Alert.alert('Error', result.message || 'Failed to reject verification')
                        }
                    }
                }
            ],
            'plain-text',
            '',
            'default'
        )
    }

    return {
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
    }
}
