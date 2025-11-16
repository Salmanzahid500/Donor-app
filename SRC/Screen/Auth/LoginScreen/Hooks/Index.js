import { useState } from "react"

export const UseLogin = () => {
  const [headerButtonPress, setHeaderButtonPress] = useState("student") 
  return { headerButtonPress, setHeaderButtonPress }
}
