// App.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ItemList from "../../Screens/ItemsList/ItemList";
import Home from "../../Screens/Home";
// import LoginScreen from "../../Screens/Authentication/Login/LoginScreen";
// import OtpScreen from "../../Screens/Authentication/Login/OtpScreen";
// import ProfileScreen from "../../Screens/Authentication/Login/ProfileScreen";
// import BottomTab from "../Navigation/BottomTab";
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ItemList" component={ItemList} />
        </Stack.Navigator>
    );
};
export default HomeStack;
