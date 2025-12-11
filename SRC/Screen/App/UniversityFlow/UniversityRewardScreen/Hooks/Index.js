import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { approveEvent, approveRedemption, getTopDonors, listenToEventRequests, listenToRewardRequests, rejectEvent, rejectRedemption } from "../../../../../FireBase/Index"

export const UseRewardScreen = () => {
    const [topDonorList, setTopDonorList] = useState([])
    const [rewardRequests, setRewardRequests] = useState([]);
    const [eventRequest, setEventRequest] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const loadTopDonors = async () => {
            const res = await getTopDonors();
            console.log(res)
            if (res.success) {
                setTopDonorList(res.donors);
            }
        };
        loadTopDonors();
    }, []);

    useEffect(() => {
        const unsubscribe = listenToRewardRequests((list) => {
            setRewardRequests(list);
        });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const unsubscribe = listenToEventRequests((list) => {
            setEventRequest(list);
        });
        return () => unsubscribe();
    }, []);

    const handleApprove = async (item) => {
        try {
            const res = await approveRedemption({ requestId: item?.id, studentId: item?.studentId, pointsNeeded: item?.pointsNeeded })
            if (res.success === true) {
                Alert.alert("Approved")
            }
            else {
                Alert.alert("Some Error Happen")
            }

        } catch (error) {
            console.log(error)
        }

    }
        const handleEventApprove = async (item) => {
        try {
            console.log(item)
            const res = await approveEvent({ requestId: item?.id, studentId: item?.studentId, points: item?.event?.points })
            if (res.success === true) {
                Alert.alert("Approved")
            }
            else {
                Alert.alert("Some Error Happen")
            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleReject = async (item) => {
        try {
            const res = await rejectRedemption({ requestId: item?.id })
            if (res.success === true) {
                Alert.alert("Rejected")
            }
            else {
                Alert.alert("Some Error Happen")
            }

        } catch (error) {
            console.log(error)
        }

    }
    const handleEventReject = async (item) => {
        try {
            const res = await rejectEvent({ requestId: item?.id })
            if (res.success === true) {
                Alert.alert("Rejected")
            }
            else {
                Alert.alert("Some Error Happen")
            }

        } catch (error) {
            console.log(error)
        }

    }

   const filteredEventRequest =
        searchQuery.trim().length > 0
            ? eventRequest.filter((item) => {
                const name = item?.student?.FullName?.toLowerCase() || '';
                const studentId = item?.student?.StudentId?.toLowerCase() || '';
                const query = searchQuery.toLowerCase();
                return name.includes(query) || studentId.includes(query);
            })
            : eventRequest;
    
    const filteredRewardRequest =
        searchQuery.trim().length > 0
            ? rewardRequests.filter((item) => {
                const name = item?.student?.FullName?.toLowerCase() || '';
                const studentId = item?.student?.StudentId?.toLowerCase() || '';
                const query = searchQuery.toLowerCase();
                return name.includes(query) || studentId.includes(query);
            })
            : rewardRequests;

    // Sort reward requests: pending first, then approved
    const sortedRewardRequest = filteredRewardRequest.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return 0;
    });

    return {
         rewardRequests: sortedRewardRequest, handleApprove, 
        handleReject, searchQuery, setSearchQuery,eventRequest:filteredEventRequest,handleEventApprove,handleEventReject
    }
}


