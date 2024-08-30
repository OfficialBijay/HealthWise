import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Alert,
} from "react-native";
import { Constants } from "../src/util/Constants";
import HeadingComponent from "../src/components/HeadingComponent";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { getGreetingMessage } from "../src/util/UtilityFunction";
import { router } from "expo-router";

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [parsedText, setParsedText] = useState(null);
  const [scanBtnText, setScanBtnText] = useState("Scan Ingredients");

  const resetAllVars = () => {
    setImageUri(null);
    setScanBtnText("Scan Ingredients");
  };

  const openCamera = async () => {
    console.log("opening camera....");

    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Original Image : ", result.assets[0].uri);
      const resizedImage = await resizeImage(result.assets[0].uri);
      console.log("Resized Image : ", resizedImage);
      setImageUri(resizedImage);
      setScanBtnText("Cancel");
    }
  };

  const resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }], // Adjust width as needed
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );

    console.log(manipResult);
    return manipResult.uri;
  };

  const uploadImage = async () => {
    try {
      let formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg", // or your mime type
        name: "test.jpg",
      });

      formData.append("language", "eng");
      formData.append("isOverlayRequired", "false");
      formData.append("iscreatesearchablepdf", "false");
      formData.append("issearchablepdfhidetextlayer", "false");

      // Replace 'K8791xxxxxx8957' with your actual API key
      let response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: {
          apikey: "K87913845388957",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      let json = await response.json();
      console.log("OCR API response:", json);
      // setParsedText(json.ParsedResults[0].ParsedText);
      const ingDetails = json.ParsedResults[0].ParsedText;
      router.push({pathname: "IngredientDetailsScreen", params: {ingDetails: ingDetails}})
    } catch (error) {
      console.error("OCR API request failed:", error);
    }
  };

  useEffect(() => {
    // Handle back button press on the home screen
    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeadingComponent
        headingText={"Health Wise"}
        fontSize={25}
      />
      <View style={styles.innerContainer}>
        <View style={[styles.profileAndGreetingBar, styles.box, styles.boxTop]}>
          <View style={styles.nameAndGreeting}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>Hi Bijay . . .</Text>
              <Image
                source={require("../assets/waving-hand-3d.gif")}
                style={styles.iconImage}
              />
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>
                Wish you a very {getGreetingMessage()}
              </Text>
            </View>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/male-3d.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={[styles.box, styles.boxMiddle]}>
          {!imageUri ? (
            <Text style={styles.overlayText}>
              Please take a picture to proceed
            </Text>
          ) : null}
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Image
              source={require("../assets/search_image.jpg")}
              style={styles.image}
            />
          )}
        </View>
        <View style={[styles.boxBottom]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={imageUri ? resetAllVars : openCamera}
          >
            <Text style={styles.btnText}>{scanBtnText}</Text>
          </TouchableOpacity>
          {imageUri && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "green" }]}
              onPress={uploadImage}
            >
              <Text style={styles.btnText}>Upload Image</Text>
            </TouchableOpacity>
          )}
          {!imageUri && (
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#FF6600" }]}
              onPress={() => router.push("ProfileScreen")}
            >
              <Text style={styles.btnText}>Update Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbf0fd",
    paddingHorizontal: 30,
    paddingBottom: 30,
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: 'red'
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1,
    // borderColor: 'red'
  },
  box: {
    // height: "30%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
    overflow: "hidden",
    // borderWidth: 1,
    // borderColor: "red",
  },
  boxTop: {
    height: "18%",
  },
  boxMiddle: {
    position: "relative",
    height: "50%",
  },
  boxBottom: {
    height: "20%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    elevation: 0,
    // borderWidth: 1,
    // borderColor: "red",
  },
  profileAndGreetingBar: {
    flexDirection: "row",
    height: "15%",
    padding: 10,
  },
  nameAndGreeting: {
    height: "100%",
    width: "70%",
    flexDirection: "column",
  },
  nameContainer: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  greetingContainer: {
    height: "50%",
    width: "100%",
  },
  greeting: {
    fontSize: 15,
  },
  profileImageContainer: {
    // backgroundColor: "white",
    height: "100%",
    width: "30%",
    borderRadius: 10,
    overflow: "hidden",
    // elevation: 10, // Shadow depth (Android only)
  },
  iconImage: {
    height: 40,
    width: 40,
    marginLeft: 5,
  },
  overlayText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    bottom: "5%",
    zIndex: 2,
  },
  btn: {
    height: 50,
    width: "100%",
    margin: 5,
    backgroundColor: Constants.THEME_COLOR_DARK,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // or 'contain', 'stretch', 'center', etc.
  },
});

export default HomeScreen;
