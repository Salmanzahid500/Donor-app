import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from "./AuthNavigation/Index";
import StackNavigation from "./StackNavigation/Index"
import BottomNavigation from "./BottomNavigation/Index"
import { Route } from "../Constant/Route";
import UniversityBottomNavigation from "./UniversityBottomNavigation/UniversityBottomNavigation"



const Navigation = () => {

    const Stack = createNativeStackNavigator()


    return (
        <NavigationContainer >
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name={Route.AUTHNAVIGATION} component={AuthNavigation} />
                <Stack.Screen name={Route.STACKNAVIGATION} component={StackNavigation} />
                <Stack.Screen name={Route.BOTTOMNAVIGATION} component={BottomNavigation} />
                <Stack.Screen name={Route.UNIVERSITYBOTTOMNAVIGATION} component={UniversityBottomNavigation} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
