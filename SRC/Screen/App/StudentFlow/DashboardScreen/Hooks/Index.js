import { useState } from "react"

export const UseDashboard = () => {
  const [headerButtonPress, setHeaderButtonPress] = useState("request") 
  return { headerButtonPress, setHeaderButtonPress }
}
