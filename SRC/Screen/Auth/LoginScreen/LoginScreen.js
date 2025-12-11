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
  const {
    headerButtonPress, setHeaderButtonPress,
    handleUniversityLogin, setUniversityEmail, setUniversityPassword, universityEmail, universityPassword,
    setStudentEmail, studentEmail, setStudentPassword, studentPassword, handleStudentLogin,loading,
    showStudentPassword, setShowStudentPassword, showUniversityPassword, setShowUniversityPassword
  } = UseLogin(props)
  return (
    <MainContainer style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.compactHeader}>
          <Image source={Images.LogoImage} style={styles.compactLogo} />
          <ResponsiveText style={styles.compactTitle}>LifeDrop</ResponsiveText>
        </View>

        <View style={styles.loginCard}>
          <View style={styles.cardHeader}>
            <ResponsiveText style={styles.loginTitle}>Welcome Back</ResponsiveText>
            <ResponsiveText style={styles.loginSubtitle}>Sign in to continue making a difference</ResponsiveText>
          </View>

          <View style={styles.roleSection}>
            <HeaderButton
              headerPress={headerButtonPress}
              setHeaderPress={setHeaderButtonPress}
            />
          </View>

          <Spacer height={hp(2)} />

          {headerButtonPress === "student" ?
            <StudentLoginForm
              SignupPress={() => props?.navigation?.navigate(Route.SIGNUPSCREEN)}
              LoginPress={handleStudentLogin}
              setStudentEmail={setStudentEmail}
              studentEmail={studentEmail}
              setStudentPassword={setStudentPassword}
              studentPassword={studentPassword}
              loading={loading}
              showStudentPassword={showStudentPassword}
              setShowStudentPassword={setShowStudentPassword}
            />
            :
            <UniversityLoginForm
              UniversityEmail={universityEmail}
              setUniversityEmail={setUniversityEmail}
              universityPassword={universityPassword}
              setUniversityPassword={setUniversityPassword}
              UniversityPress={handleUniversityLogin}
              loading={loading}
              showUniversityPassword={showUniversityPassword}
              setShowUniversityPassword={setShowUniversityPassword}
            />
          }
        </View>
        <View style={styles.footer}>
          <ResponsiveText style={styles.footerText}> Join thousands making a difference</ResponsiveText>
        </View>
      </View> 
    </MainContainer>
  )
}

export default LoginScreen

