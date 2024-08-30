import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
  Image,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Constants } from "../src/util/Constants";
import HeadingComponent from "../src/components/HeadingComponent";
import { router } from "expo-router";

const ProfileScreen = () => {
  const route = useRoute();
  // Get the userDetails object from the route parameters
  // const { userDetails } = route.params;
  const userDetails = {
    firstName: "Bijay",
    lastName: "Pandey",
    email: "bijay@gmail.com",
    gender: "MALE",
  };

  const logout = async () => {
    // Prompt the user for confirmation
    Alert.alert(
      "Confirm",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              console.log("Trying logging out......");
              // write logout logic
              router.push("HomeScreen");
              console.log("Logged out successfully......");
            } catch (error) {
              // Handle error if AsyncStorage clearing fails
              Alert.alert("Error", "Failed to logout. Please try again.");
              console.error("Logout failed:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Navigate back to the previous screen
        router.back();
        // Return true to prevent the default behavior (exiting the app)
        return true;
      }
    );

    return () => backHandler.remove();
  },[]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeadingComponent
        headingText={"Profile"}
        fontSize={25}
      />
      <View style={styles.imageAndName}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/male-3d.png")}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {userDetails.firstName + " " + userDetails.lastName}
          </Text>
        </View>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{userDetails.email}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.medicalHistoryContainer}>
          <View style={styles.listItem}>
            <Text style={styles.itemHeading}>Ailment</Text>
            <Text style={styles.items}>Diabetes</Text>
            <TouchableOpacity style={[styles.accentBtn]} onPress={() => {}}>
              <Text style={styles.btnText}>Add/Remove</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.itemHeading}>Allergy</Text>
            <Text style={styles.items}>Nut Allergy, Lactose intolerant</Text>
            <TouchableOpacity style={[styles.accentBtn]} onPress={() => {}}>
              <Text style={styles.btnText}>Add/Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: Constants.THEME_COLOR }]}
            onPress={() => {}}
          >
            <Text style={styles.btnText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: Constants.THEME_COLOR_DARK },
            ]}
            onPress={() => router.push("HomeScreen")}
          >
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dbf0fd",
    flex: 1,
  },
  imageAndName: {
    height: "30%",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  profileImageContainer: {
    height: "60%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  profileImage: {
    position: "relative",
    height: 120,
    width: 120,
    // borderRadius: 60,
    overflow: "hidden",
    // elevation: 5,
    // borderColor: "red",
    // borderWidth: 1,
  },
  image: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: 60,
  },
  verifiedIcon: {
    position: "absolute",
    bottom: 6,
    right: 6,
  },
  nameContainer: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  emailContainer: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  email: {
    fontSize: 15,
    fontWeight: "bold",
  },
  detailsContainer: {
    height: "60%",
    width: "100%",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // borderColor: "red",
    // borderWidth: 1,
  },
  medicalHistoryContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "scroll",
    elevation: 2,
    // borderColor: "red",
    // borderWidth: 1,
  },
  listItem: {
    height: "50%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 5,
    borderBottomColor: "#ccc",
    // borderColor: "red",
    // borderWidth: 1,
  },
  itemHeading: {
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // borderColor: "red",
    // borderWidth: 1,
  },
  btnContainer: {
    width: "100%",
    // borderColor: "red",
    // borderWidth: 1,
  },
  btn: {
    height: 50,
    width: "100%",
    margin: 5,
    backgroundColor: Constants.THEME_COLOR_DARK,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
  },
  accentBtn: {
    height: 40,
    width: "100%",
    margin: 5,
    backgroundColor: "#94c5eb",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    // borderWidth: 1,
    // borderColor: Constants.THEME_COLOR_DARK,
    // borderStyle: "dashed"
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileScreen;
