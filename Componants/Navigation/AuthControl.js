// App.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../Screens/Authentication/Login/LoginScreen";
import OtpScreen from "../../Screens/Authentication/Login/OtpScreen";
import ProfileScreen from "../../Screens/Authentication/Login/ProfileScreen";
import BottomTab from "../Navigation/BottomTab";
const Stack = createStackNavigator();

const AuthControl = () => {
  return (
      <Stack.Navigator initialRouteName="Login"
          screenOptions={{
            headerShown:false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Home" component={BottomTab} />
      </Stack.Navigator>
  );
};
export default AuthControl;
