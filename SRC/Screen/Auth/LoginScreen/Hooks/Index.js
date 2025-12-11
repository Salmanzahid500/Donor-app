import { useState } from "react"
import { StudentLogin, UniversityLogin } from "../../../../FireBase/Index"
import { Alert } from "react-native"
import { Route } from "../../../../Constant/Route"

export const UseLogin = (props) => {
  const [headerButtonPress, setHeaderButtonPress] = useState("student")
  const [universityEmail, setUniversityEmail] = useState("")
  const [universityPassword, setUniversityPassword] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showStudentPassword, setShowStudentPassword] = useState(false)
  const [showUniversityPassword, setShowUniversityPassword] = useState(false)

  const handleUniversityLogin = async () => {
    setLoading(true)
    try {
      const payload = {
        email: universityEmail,
        password: universityPassword
      }
      const response = await UniversityLogin(payload)
      console.log(response)
      if (response.success === false) {
        Alert.alert("Invalid Email or Password")
        return
      }
      if (response.success === true) {
        props?.navigation?.navigate(Route.UNIVERSITYBOTTOMNAVIGATION, { screen: Route.UNIVERSITYDASHBOARDSCREEN })
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const handleStudentLogin = async () => {
    setLoading(true)
    try {
      const payload = {
        email: studentEmail,
        password: studentPassword
      }
      const response = await StudentLogin(payload)
      console.log(response)
      if (response.success === false) {
        Alert.alert("Invalid Email or Password")
        return
      }
      if (response.success === true) {
        props?.navigation?.navigate(Route.BOTTOMNAVIGATION, { screen: Route.PROFILESCREEN })
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
      setLoading(false)
    } finally{
      setLoading(false)
    }
  }
  return {
    headerButtonPress, setHeaderButtonPress,
    universityEmail, setUniversityEmail, universityPassword, setUniversityPassword, handleUniversityLogin,
    studentEmail, setStudentEmail, studentPassword, setStudentPassword, handleStudentLogin,loading,
    showStudentPassword, setShowStudentPassword, showUniversityPassword, setShowUniversityPassword
  }
}
