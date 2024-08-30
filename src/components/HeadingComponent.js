import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Constants } from "../util/Constants";

const HeadingComponent = ({ headingText, fontSize }) => {
  return (
    <View style={styles.heading}>
      {/* <Icon
        name="arrowIcon"
        size={30}
        color="black"
        style={styles.arrowIcon}
        onPress={() => navigation.goBack()} // This automatically goes back to the previous screen
      /> */}
      <Text style={[styles.headingText, { fontSize }]}>{headingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 15,
    height: "8%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  arrowIcon: {
    position: "absolute",
    left: 10,
  },
  headingText: {
    color: Constants.THEME_COLOR_DARK,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default HeadingComponent;
