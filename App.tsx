import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";
import { AppNavigator } from "./navigation/AppNavigator";
import { LocalizationProvider } from "./localization/LocalizationContext";
import { usePurchasesStore } from "./store/usePurchasesStore";
import { Amplitude } from '@amplitude/react-native';

export default function App() {
  // Load fonts with error handling for both Expo Go and development builds
  const [fontsLoaded, fontError] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
  });

  const { initialize } = usePurchasesStore();

  useEffect(() => {
    // Initialize Amplitude analytics
    Amplitude.getInstance().init('ecf945ffbe155459b50f6ab33aa1eb26');
    
    // Initialize RevenueCat early
    initialize();
  }, [initialize]);

  // Handle font loading errors gracefully
  if (fontError) {
    console.warn('Font loading error (probably Expo Go):', fontError);
    // Continue without custom fonts - use system fonts instead
  }

  // Only show loading if fonts are actually loading (not if there's an error)
  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3C8C7E" />
      </View>
    );
  }

  return (
    <LocalizationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </LocalizationProvider>
  );
}
