import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { Style } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { SearchHeader, RewardRequests, TopDonors, EventRequests } from "./Component/Index"
import {UseRewardScreen} from "./Hooks/Index"

const UniversityRewardScreen = () => {
    const {
        rewardRequests,handleApprove,handleReject,
        searchQuery,setSearchQuery,eventRequest,
        handleEventApprove,handleEventReject
    } = UseRewardScreen()
    
    return (
        <MainContainer style={Style.mainContainer}>
            <ScrollView 
                style={Style.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={Style.scrollContent}
            >
                {/* Search Header */}
                <SearchHeader 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery}
                />
                
                <Spacer height={25} />
                
                {/* Student Reward Requests */}
                <View style={Style.sectionContainer}>
                    <RewardRequests 
                    rewardRequest={rewardRequests} 
                    searchQuery={searchQuery} 
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                    />
                </View>
                
                <Spacer height={25} />
                
                {/* Top Donors */}
                <View style={Style.sectionContainer}>
                    <EventRequests 
                    EventRequests={eventRequest} 
                    searchQuery={searchQuery} 
                    handleApprove={handleEventApprove}
                    handleReject={handleEventReject}
                    />
                </View>
                {/* <View style={Style.sectionContainer}>
                    <TopDonors topDonor={topDonorList} searchQuery={searchQuery} />
                </View> */}
                
                <Spacer height={30} />
            </ScrollView>
        </MainContainer>
    )
}

export default UniversityRewardScreen

