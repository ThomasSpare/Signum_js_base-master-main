import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  Animated,
  Button,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Audio } from "expo-av";
import { Svg, Path } from "react-native-svg";
import colors from "../config/colors";

import track1 from "../assets/sounds/Burdens.wav";
import track2 from "../assets/sounds/AfterGlow.wav";
import track3 from "../assets/sounds/Big John - Truthful Reggea Man.mp3";
import track4 from "../assets/sounds/Big John.mp3";
import track5 from "../assets/sounds/BURDENS II.wav";
import track6 from "../assets/sounds/Electronic Mix.mp3";
import track7 from "../assets/sounds/John Vianney - A Cry of a Father.mp3";
import track8 from "../assets/sounds/juli-24 -- 4.mp3";
import track9 from "../assets/sounds/Låt-1-2.mp3";
import track10 from "../assets/sounds/Rap Mix.mp3";

const tracks = [
  { name: "Burdens", file: track1 },
  { name: "AfterGlow", file: track2 },
  { name: "Big John - Truthful Reggea Man", file: track3 },
  { name: "Big John", file: track4 },
  { name: "AfroBeat", file: track5 },
  { name: "Electronic Mix", file: track6 },
  { name: "Electronic Mix II", file: track7 },
  { name: "Electronic Mix 2", file: track8 },
  { name: "Electronic Mix 3", file: track9 },
  { name: "Rap Mix", file: track10 },
];

function WelcomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Bruno Ace SC": require("../assets/fonts/BrunoAceSC-Regular.ttf"),
  });
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [spectrumData, setSpectrumData] = useState(new Array(64).fill(0));
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
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      tracks[currentTrackIndex].file
    );
    setSound(sound);
    await sound.playAsync();
    console.log("Audio started playing"); // Confirm audio starts playing
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate(async (status) => {
      console.log("Playback status update:", status); // Log playback status update
      // Wait for 1 second before processing waveform data
      setTimeout(() => {
        if (status && status.waveform && Array.isArray(status.waveform)) {
          let { waveform } = status;
          let spectrum = [];
          for (let i = 0; i < waveform.length; i += 2) {
            spectrum.push(waveform[i] + waveform[i + 1]);
          }
          setSpectrumData(spectrum);
          console.log("Current spectrumData:", spectrum); // Log the current spectrumData
        } else {
          console.log("Waveform data is not available or empty");
        }
      }, 1000); // Delay in milliseconds
    });
  };

  const pathData = spectrumData
    .map((peak, index) => {
      // Calculate the x and y coordinates for each point
      const x = index * 4; // Adjust spacing as needed
      const y = 200 - peak; // Adjust scaling as needed
      return `L${x},${y}`;
    })
    .join("");

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const forwardSound = async () => {
    let nextTrackIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextTrackIndex);
    if (isPlaying) {
      await sound.stopAsync();
      playSound();
    }
  };

  const backwardSound = async () => {
    let prevTrackIndex =
      (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevTrackIndex);
    if (isPlaying) {
      await sound.stopAsync();
      playSound();
    }
  };

  const MyAppText = ({ children }) => {
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
    if (!fontsLoaded) {
      return null; // or any loading indicator
    }
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
      <MaterialCommunityIcons
        style={styles.icons}
        name="instagram"
        size={24}
        color="white"
      />
      <MaterialCommunityIcons
        style={styles.icons}
        name="web"
        size={24}
        color="white"
      />
      <MaterialCommunityIcons
        style={styles.icons}
        name="view-gallery-outline"
        size={24}
        color="white"
      />

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
        <Button
          style={styles.singleBtn}
          color="#000e8f"
          title="Book a session"
          onPress={() => navigation.navigate("Book")}
        />
        <Button
          style={styles.singleBtn}
          color="#2425ff"
          title="Upload your music"
          onPress={() => navigation.navigate("Upload")}
        />
        <Button style={styles.singleBtn} color="#000e8f" title="Contact us" />
        <Button
          style={styles.singleBtn}
          color="#2425ff"
          title="About us"
          onPress={() => navigation.navigate("About")}
        />
      </View>
      <StatusBar style="auto" />
      <br />
      <View style={styles.container}>
        {/* Other components */}
        <View style={styles.waveformContainer}>
          <Svg height="200" width="400">
            <Path
              d={`M0,200 ${pathData}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </Svg>
        </View>
      </View>
      <Text style={styles.text}>
        <MyAppHeaderText>DAMREC PRODUCTIONS</MyAppHeaderText>
        <br />
        <MyAppText>
          Welcome to our app. Here you can book your studio sessions, upload the
          music you've worked on and hear some great music from us.
        </MyAppText>
      </Text>
      <View style={styles.audioPlayer}>
        <Text style={styles.trackName}>{tracks[currentTrackIndex].name}</Text>
        <View style={styles.audioControls}>
          <TouchableOpacity onPress={backwardSound}>
            <MaterialCommunityIcons name="rewind" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={forwardSound}>
            <MaterialCommunityIcons
              name="fast-forward"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sound.setIsMutedAsync(true)}>
            <MaterialCommunityIcons
              name="volume-mute"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: "url('../app/assets/deepspace.jpg')",
    borderColor: colors.secondary,
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
    backgroundColor: colors.secondary,
    bottom: 70,
    width: 400,
    height: 500,
  },
  icons: {
    display: "grid",
    justifyContent: "top",
    position: "relative",
    left: 170,
    bottom: 50,
    margin: 10,
  },
  Image: {
    flex: 1,
    marginBottom: 300,
    width: 200,
    height: 200,
    top: 10,
    resizeMode: "contain",
  },
  news: {
    flexWrap: "wrap",
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Bruno Ace SC",
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
    backgroundColor: colors.primary,
    marginHorizontal: 2,
  },
  buttons: {
    display: "grid",
    top: 400,
    flexDirection: "column",
    position: "absolute",
  },
  loginButton: {
    top: 720,
    color: "white",
    width: "100%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: colors.primary,
  },
  registerButton: {
    top: 770,
    color: "black",
    width: "100%",
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: colors.extra,
  },
  singleBtn: {
    display: "grid",
    position: "relative",
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    left: 50,
    right: 50,
    position: "absolute",
    textAlign: "center",
    top: 50,
    fontFamily: "Bruno Ace SC",
  },
  authContainer: {
    top: 600,
    width: "80%",
    alignItems: "center",
  },
  audioPlayer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  trackName: {
    color: "white",
    fontSize: 16,
    fontFamily: "Bruno Ace SC",
    marginBottom: 10,
  },
  waveformContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
  audioControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    zindex: 999,
  },
  spectrumWrapper: {
    position: "absolute",
    bottom: 100,
    left: 0,
    zIndex: 999,
    borderWidth: 1, // Add border for debugging
    borderColor: "blue", // Add border color for debugging
  },
  spectrum: {
    borderWidth: 1, // Add border for debugging
    borderColor: "red", // Add border color for debugging
  },
});

export default WelcomeScreen;
