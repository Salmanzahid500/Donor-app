import { ScrollView, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../../Component/MainContainer'
import { styles } from "./Style"
import Spacer from '../../../../Component/Spacer'
import { ProfileHeader, PersonalInfo, HealthStats, EventHistory, QuickActions, NotificationBanner } from "./Component/Index"
import { wp, hp } from '../../../../Component/ResponsiveComponent'
import {UseProfile} from "./Hooks/Index"
import { Route } from '../../../../Constant/Route'

const ProfileScreen = (props) => {
    const {handleLogout,userData,event} = UseProfile(props)
    console.log(userData,"userdata")
    
    const handleUpdateProfile = () => {
        props?.navigation?.navigate(Route.STACKNAVIGATION, {
            screen: Route.UPDATEPROFILESCREEN, 
            params: {userData: userData}
        });
    };
    
    const handleVerifyAccount = () => {
        props?.navigation?.navigate(Route.STACKNAVIGATION, {
            screen: Route.STUDENTVERIFICATIONSCREEN
        });
    };
    
    return (
        <MainContainer style={styles.mainContainer}>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <ProfileHeader onLogout={handleLogout} />
                
                {/* Notification Banner for missing blood group, age, or verification */}
                <NotificationBanner 
                    userData={userData} 
                    onUpdatePress={handleUpdateProfile}
                    onVerifyPress={handleVerifyAccount}
                />
                
                <View style={styles.contentCard}>
                    <PersonalInfo userData={userData} />
                    
                    <Spacer height={hp(3)} />
                    
                    <HealthStats userData={userData} />
                    
                    <Spacer height={hp(3)} />
                    
                    <EventHistory
                    event={event}
                    />
                    
                    <Spacer height={hp(3)} />
                    
                    <QuickActions 
                    VerifyStatusPress={()=>props?.navigation?.navigate(Route.STACKNAVIGATION, { screen: Route.STUDENTVERIFICATIONSCREEN })}
                    CapitabilityPress={()=>props?.navigation?.navigate(Route.STACKNAVIGATION, { screen: Route.COMPATIBILITYSCREEN })}
                    EditProfilePress={()=>props?.navigation?.navigate(Route.STACKNAVIGATION,{screen:Route.UPDATEPROFILESCREEN,params:{userData:userData}})}
                    />
                </View>
            </ScrollView>
        </MainContainer>
    )
}

export default ProfileScreen

