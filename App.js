import "@fontsource/bruno-ace-sc";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import AboutUs from "./app/screens/AboutUs";
import UploadAudio from "./app/screens/UploadAudio";
import BookingSchedule from "./app/screens/Book";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="About" component={AboutUs} />
        <Stack.Screen name="Upload" component={UploadAudio} />
        <Stack.Screen name="Book" component={BookingSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
