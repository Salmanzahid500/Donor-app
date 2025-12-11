import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from "./AuthNavigation/Index";
import StackNavigation from "./StackNavigation/Index"
import BottomNavigation from "./BottomNavigation/Index"
import { Route } from "../Constant/Route";
import UniversityBottomNavigation from "./UniversityBottomNavigation/UniversityBottomNavigation"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";



const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [initialRoute, setInitialRoute] = useState(Route.AUTHNAVIGATION);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const json = await AsyncStorage.getItem("user");

        if (json) {
          const user = JSON.parse(json);
          if(user.uid){
            if (user.role === "Student") {
              setInitialRoute(Route.BOTTOMNAVIGATION);
            } 
            else if (user.role === "University") {
              setInitialRoute(Route.UNIVERSITYBOTTOMNAVIGATION);
            }
          }
        }
      } catch (error) {
        console.warn('Error checking user:', error);
      } finally {
        setIsReady(true);
      }
    };

    checkUser();
  }, []);

  if (!isReady) return null; 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName={initialRoute} >
        <Stack.Screen name={Route.AUTHNAVIGATION} component={AuthNavigation} />
        <Stack.Screen name={Route.STACKNAVIGATION} component={StackNavigation} />
        <Stack.Screen name={Route.BOTTOMNAVIGATION} component={BottomNavigation} />
        <Stack.Screen name={Route.UNIVERSITYBOTTOMNAVIGATION} component={UniversityBottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
