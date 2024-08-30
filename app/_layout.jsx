import { Slot, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import HomeScreen from "./HomeScreen";
import IngredientDetailsScreen from "./IngredientDetailsScreen";
import ProfileScreen from "./ProfileScreen";
import SplashScreen from "./index";

export default function Layout() {
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    // Indicate that the layout is ready once the component mounts
    setIsLayoutReady(true);
  }, []);

  return (
      <SafeAreaProvider>
        {isLayoutReady ? (
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
            <Stack.Screen name="IngredientDetailsScreen" options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
          </Stack>
        ) : (
          // Optionally, display a loading spinner here
          <LoadingIndicator />
        )}
      </SafeAreaProvider>
  );
}

function LoadingIndicator() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
