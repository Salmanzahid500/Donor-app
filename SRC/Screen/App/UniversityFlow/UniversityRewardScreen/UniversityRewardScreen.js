import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { Style } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import { SearchHeader, RewardRequests, TopDonors } from "./Component/Index"

const UniversityRewardScreen = () => {
    const [searchQuery, setSearchQuery] = useState('')
    
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
                    <RewardRequests searchQuery={searchQuery} />
                </View>
                
                <Spacer height={25} />
                
                {/* Top Donors */}
                <View style={Style.sectionContainer}>
                    <TopDonors searchQuery={searchQuery} />
                </View>
                
                <Spacer height={30} />
            </ScrollView>
        </MainContainer>
    )
}

export default UniversityRewardScreen

