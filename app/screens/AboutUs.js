import "@fontsource/bruno-ace-sc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";

import colors from "../config/colors";

const images = [
  {
    uri: "https://res.cloudinary.com/djunroohl/image/upload/v1702581174/profile_pics/rzj7qrchnbtpv6smwx0n.jpg",
  },
  {
    uri: "https://res.cloudinary.com/djunroohl/image/upload/v1723413962/IMG_3602_jteutm.jpg",
  },
  {
    uri: "https://res.cloudinary.com/djunroohl/image/upload/v1723414115/svensexa_damrec_hky8xj.jpg",
  },
];

function AboutUs() {
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.uri }} style={styles.carouselImage} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          We have beeen in the music industry since 2017. Our studio is equipped
          for electronic music production suitable for many types of genres.
          <br />
          <br />
          Besides excellent sound treated recording space our studio has
          beautiful surroundings in the countryside of Bankeryd. We can help you
          with all parts of Recording, Mixing, Production (songs from scratch)
          and Mastering.
          <br />
          <br />
          Besides sound we are also skiled in web development and Logo/ Brand
          design for your needs.
        </Text>
        <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
      </ScrollView>
      <StatusBar style="auto" />
      <View style={styles.icons}>
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
        <MaterialCommunityIcons
          style={styles.icons}
          name="facebook"
          size={24}
          color="white"
        />
        <MaterialCommunityIcons
          style={styles.icons}
          name="twitter"
          size={24}
          color="white"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage:
      "url('https://webgradients.com/public/webgradients_png/022%20Morpheus%20Den.png')",
    borderColor: colors.secondary,
    borderRadius: 5,
    borderWidth: 5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Bruno Ace SC",
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  icons: {
    margin: 10,
    marginBottom: 10,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 40,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontFamily: "Bruno Ace SC",
    textAlign: "justify",
  },
});

export default AboutUs;
