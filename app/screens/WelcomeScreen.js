import "@fontsource/bruno-ace-sc";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  Image,
  Animated,
  Button,
  Alert,
  Text,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { analyzeAudio, scale, sample } from "react-native-audio-analyzer";
import ReactNativeBlobUtil from "react-native-blob-util";
import { useFonts } from "expo-font";

function WelcomeScreen(props) {
  const [fontsLoaded] = useFonts({
    "Bruno Ace SC": require("../assets/fonts/BrunoAceSC-Regular.ttf"),
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  const MyAppText = ({ children }) => {
    const [fontsLoaded] = useFonts({
      "Bruno Ace SC": require("../assets/fonts/BrunoAceSC-Regular.ttf"),
    });

    if (!fontsLoaded) {
      return null; // or any loading indicator
    }
    return (
      <Text
        style={{
          color: "white",
          fontSize: 14,
          alignItems: "center",
          fontFamily: "Bruno Ace SC",
          fontWeight: "400",
          fontStyle: "normal",
        }}
      >
        {children}
      </Text>
    );
  };

  const MyAppHeaderText = ({ children }) => {
    const [fontsLoaded] = useFonts({
      "Bruno Ace SC": require("../assets/fonts/BrunoAceSC-Regular.ttf"),
    });
    return (
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Bruno Ace SC",
          fontWeight: "400",
          fontStyle: "normal",
          alignItems: "center",
          bottom: 10,
          color: "white",
        }}
      >
        {children}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          style={styles.Image}
          source={require("../assets/damreclogo2023.png")}
        />
      </Animated.View>
      <View style={styles.buttons}>
        <Button color="blue" title="Book a session" />
        <br />
        <Button color="darkblue" title="Get notified on special deals" />
        <br />
        <Button color="blue" title="Contact us" />
        <br />
        <Button color="darkblue" title="About us" />
      </View>
      <StatusBar style="auto" />
      <br />
      <View>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.news}>Special deal on 1-track production</Text>
        </Animated.View>
      </View>
      <Text style={styles.text}>
        <MyAppHeaderText>DAMREC PRODUCTIONS</MyAppHeaderText>
        <br />
        <MyAppText>
          Welcome to our app. Here you can book your studio sessions and get
          notified about special deals and more.
        </MyAppText>
      </Text>
      <View style={styles.loginButton}>Login</View>
      <View style={styles.registerButton}>Register</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: "url('../app/assets/deepspace.jpg')",
    borderColor: "darkblue",
    borderRadius: 5,
    borderWidth: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Bruno Ace SC",
  },
  fadingContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "darkblue",
    top: 0,
    width: 400,
    height: 500,
  },
  news: {
    flexWrap: "wrap",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Bruno Ace SC",
  },
  Image: {
    flex: 1,
    marginBottom: 300,
    width: 200,
    height: 200,
    top: 20,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    maxHeight: 200,
  },
  item: {
    width: 3,
    backgroundColor: "blue",
    marginHorizontal: 2,
  },
  buttons: {
    top: 400,
    flexDirection: "column",
    position: "absolute",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButton: {
    top: 850,
    color: "white",
    width: "100%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "blue",
  },
  registerButton: {
    top: 900,
    color: "black",
    width: "100%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "lightblue",
  },
  text: {
    left: 50,
    right: 50,
    position: "absolute",
    textAlign: "center",
    top: 50,
    fontFamily: "Bruno Ace SC",
  },
});

export default WelcomeScreen;
