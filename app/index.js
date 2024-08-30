import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { Constants } from "../src/util/Constants"
import { router } from "expo-router";

export default function SplashScreen() {

  useEffect(() => {
    setTimeout(() => {
        router.push('HomeScreen');
      }, 3000); // 3 seconds delay for the splash screen
  }, []);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require("../../assets/splash-bg.jpg")}
        style={styles.bgImage}
      >
      </ImageBackground> */}
      <View style={styles.headingContainer}>
        <Text style={styles.logo}>Health Wise</Text>
        <Text style={styles.tagLineText}>Scan. Detect. Protect.</Text>
        {/* <Image source={require("../../assets/logo-1-transparent.png")} style={styles.logoImage} /> */}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Constants.THEME_COLOR,
    backgroundColor: Constants.THEME_COLOR_DARK,
    // backgroundColor: "#082040",
    flex: 1
  },
  bgImage: {
    flex: 1,
  },
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    height: 250,
    width: 250
  },
  logo: {
    textAlign: 'center',
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
  tagLineText: {
    color: Constants.THEME_COLOR,
  }
});
