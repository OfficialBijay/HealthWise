import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import HeadingComponent from "../src/components/HeadingComponent";
import { Constants } from "../src/util/Constants";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";

const IngredientDetailsScreen = () => {
  const route = useRoute();
  // Get the userDetails object from the route parameters
  // const { ingDetails } = route.params;
  const ingDetails =
    "Considerations:\nLactose Intolerance:\n\tThe product contains milk solids, which could contain lactose. Therefore, it is not suitable for you due to lactose intolerance.\nNut Allergy:\n\tThe product does not list any nuts in the ingredients, so it appears to be safe in this regard. However, always be cautious about cross-contamination risks.\nDiabetes:\n\tThe product contains sugar (7.8g per 100g, with 5.4g of that being added sugars). This may affect your blood sugar levels. The high carbohydrate content (especially sugars) should be considered in your daily intake to manage your diabetes effectively.\nThe high fat content might also need consideration depending on your overall diet and health plan.\nConclusion:\n\tGiven the presence of milk solids, this product is not suitable for you due to your lactose intolerance. Additionally, the sugar content is relatively high, which could impact your diabetes management. It is advisable to avoid this product and look for alternatives that are lactose-free and have lower sugar content.";

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
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HeadingComponent
        headingText={"Ingredient Details"}
        fontSize={25}
      />
      <View style={styles.innerContainer}>
        <View style={[styles.boxTop]}>
          <ScrollView>
            <Text style={[styles.summaryText]}>{ingDetails}</Text>
          </ScrollView>
        </View>

        <View style={[styles.boxBottom]}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              router.back();
            }}
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
    flex: 1,
    backgroundColor: "#dbf0fd",
    paddingHorizontal: 10,
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
  boxTop: {
    height: "90%",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
    // overflow: "scroll",
    borderWidth: 1,
    borderColor: Constants.THEME_COLOR_DARK,
  },
  boxBottom: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
    // borderWidth: 1,
    // borderColor: "red",
  },
  summaryText: {
    fontSize: 20,
    overflow: "scroll",
  },
  btn: {
    height: 50,
    width: "100%",
    margin: 5,
    backgroundColor: Constants.THEME_COLOR_DARK,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default IngredientDetailsScreen;
