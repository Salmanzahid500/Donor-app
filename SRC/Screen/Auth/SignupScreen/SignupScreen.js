import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MainContainer } from '../../../Component/MainContainer'
import { styles } from "./Style"
import { ResponsiveText } from '../../../Component/ResponsiveText'
import Spacer from '../../../Component/Spacer'
import { SignupForm } from "./Component/Index"
import { UseSignUpScreen } from "./Hooks/Index"
import { SimpleButton } from '../../../Component/SimpleButton'
import { Color } from '../../../Theme/Color/Index'
import { Route } from '../../../Constant/Route'
import { Images } from '../../../Assets/Index'
import { hp } from '../../../Component/ResponsiveComponent'

const SignupScreen = (props) => {
    const { isDropDownOpen, setIsDropDownOpen, selectedUniversity, setSelectedUniversity } = UseSignUpScreen()
    
    return (
        <MainContainer style={styles.mainContainer}>
            <View style={styles.container}>
                {/* Compact Header */}
                <View style={styles.compactHeader}>
                    <Image source={Images.LogoImage} style={styles.compactLogo} />
                    <ResponsiveText style={styles.compactTitle}>Join LifeDrop</ResponsiveText>
                    <ResponsiveText style={styles.compactSubtitle}>Start your journey of saving lives</ResponsiveText>
                </View>
                
                {/* Signup Card */}
                <View style={styles.signupCard}>
                    <View style={styles.cardHeader}>
                        <ResponsiveText style={styles.signupTitle}>Create Your Account</ResponsiveText>
                        <ResponsiveText style={styles.signupSubtitle}>Join thousands of life-savers in our community</ResponsiveText>
                    </View>                    <ScrollView 
                        style={styles.formScrollView}
                        contentContainerStyle={styles.formScrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <SignupForm
                            selectedUniversity={selectedUniversity}
                            setDropDownOpen={setIsDropDownOpen}
                            setSelectedUniversity={setSelectedUniversity}
                        />
                        
                        <Spacer height={hp(4)} />
                        
                        <SimpleButton
                            textColor={Color.WHITE}
                            text={"Create Account"}
                            backgroundColor={Color.PRIMARY}
                            style={styles.signupButton}
                            onPress={()=>props?.navigation?.navigate(Route.LOGINSCREEN)}
                        />
                        
                        <View style={styles.loginSection}>
                            <ResponsiveText style={styles.loginText}>Already have an account? </ResponsiveText>
                            <TouchableOpacity onPress={() => props?.navigation?.navigate(Route.LOGINSCREEN)}>
                                <ResponsiveText style={styles.loginLink}>Sign In</ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                
                {/* Footer */}
                <View style={styles.footer}>
                    <ResponsiveText style={styles.footerText}>
                        By creating an account, you agree to our Terms of Service
                    </ResponsiveText>
                </View>
            </View>
        </MainContainer>
    )
}

export default SignupScreen

