import { ScrollView, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { styles } from "./Style"
import { ResponsiveText } from '../../../../Component/ResponsiveText'
import Spacer from '../../../../Component/Spacer'
import { ProfileHeader, PersonalInfo, HealthStats, EventHistory, QuickActions } from "./Component/Index"
import { SimpleButton } from '../../../../Component/SimpleButton'
import { wp, hp } from '../../../../Component/ResponsiveComponent'
import { Color } from '../../../../Theme/Color/Index'
import { Route } from '../../../../Constant/Route'

const ProfileScreen = (props) => {
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                        props?.navigation?.reset({
                            index: 0,
                            routes: [{ name: Route.AUTHNAVIGATION }],
                        })
                    }
                }
            ]
        )
    }

    return (
        <MainContainer style={styles.mainContainer}>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Professional Header */}
                <ProfileHeader onLogout={handleLogout} />
                
                {/* Personal Information Card */}
                <View style={styles.contentCard}>
                    <PersonalInfo />
                    
                    <Spacer height={hp(3)} />
                    
                    {/* Health Statistics */}
                    <HealthStats />
                    
                    <Spacer height={hp(3)} />
                    
                    {/* Event History */}
                    <EventHistory />
                    
                    <Spacer height={hp(3)} />
                    
                    {/* Quick Actions */}
                    <QuickActions navigation={props?.navigation} />
                </View>
            </ScrollView>
        </MainContainer>
    )
}

export default ProfileScreen

