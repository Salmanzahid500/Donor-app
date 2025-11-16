import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MainContainer } from "../../../Component/MainContainer"
import { styles } from "./Style"
import { Images } from "../../../Assets/Index"
import { ResponsiveText } from "../../../Component/ResponsiveText"
import Spacer from "../../../Component/Spacer"
import { HeaderButton, StudentLoginForm, UniversityLoginForm } from "./Component/Index"
import { UseLogin } from "./Hooks/Index"
import { hp } from '../../../Component/ResponsiveComponent'
import { Route } from '../../../Constant/Route'

const LoginScreen = (props) => {
  const { headerButtonPress, setHeaderButtonPress } = UseLogin()
  return (
    <MainContainer style={styles.mainContainer}>
      <View style={styles.container}>
        {/* Compact Header */}
        <View style={styles.compactHeader}>
          <Image source={Images.LogoImage} style={styles.compactLogo} />
          <ResponsiveText style={styles.compactTitle}>LifeDrop</ResponsiveText>
        </View>
        
        {/* Login Card */}
        <View style={styles.loginCard}>
          <View style={styles.cardHeader}>
            <ResponsiveText style={styles.loginTitle}>Welcome Back</ResponsiveText>
            <ResponsiveText style={styles.loginSubtitle}>Sign in to continue making a difference</ResponsiveText>
          </View>
          
          {/* Role Selection */}
          <View style={styles.roleSection}>
            <HeaderButton
              headerPress={headerButtonPress}
              setHeaderPress={setHeaderButtonPress}
            />
          </View>
          
          <Spacer height={hp(2)} />
          
          {/* Login Forms */}
          {headerButtonPress === "student" ?
            <StudentLoginForm
              SignupPress={() => props?.navigation?.navigate(Route.SIGNUPSCREEN)}
              LoginPress={()=>props?.navigation?.navigate(Route.BOTTOMNAVIGATION,{screen:Route.PROFILESCREEN})}
            />
            :
            <UniversityLoginForm 
            UniversityPress={()=>props?.navigation?.navigate(Route.UNIVERSITYBOTTOMNAVIGATION,{screen:Route.UNIVERSITYDASHBOARDSCREEN})}
            />
          }
        </View>
          {/* Footer */}
        <View style={styles.footer}>
          <ResponsiveText style={styles.footerText}>
            Join thousands making a difference
          </ResponsiveText>
        </View>
      </View>
    </MainContainer>
  )
}

export default LoginScreen

