import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, Alert, Text } from "react-native";
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
import { useAnalyticsStore } from "./store/useAnalyticsStore";

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  
  // Load fonts with error handling for both Expo Go and development builds
  const [fontsLoaded, fontError] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
  });

  const { initialize } = usePurchasesStore();
  const { initializeAmplitude } = useAnalyticsStore();

  // Safe initialization that prevents timing conflicts
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('🚀 Starting app initialization...');
        
        // Wait a bit to ensure native modules are ready
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Initialize Amplitude analytics with robust error handling
        console.log('📊 Initializing Analytics...');
        const analyticsSuccess = await initializeAmplitude('ecf945ffbe155459b50f6ab33aa1eb26');
        if (analyticsSuccess) {
          console.log('✅ Analytics initialized successfully');
        } else {
          console.log('⚠️ Analytics initialization failed, continuing without analytics');
        }
        
        // Initialize RevenueCat
        try {
          console.log('💰 Initializing RevenueCat...');
          await initialize();
          console.log('✅ RevenueCat initialized successfully');
        } catch (revenueError) {
          console.warn('⚠️ RevenueCat initialization failed:', revenueError);
          // Continue without purchases rather than crashing
        }
        
        setIsInitialized(true);
        console.log('🎉 App initialization completed successfully');
        
      } catch (error) {
        console.error('❌ App initialization error:', error);
        setInitError(error instanceof Error ? error.message : 'Unknown initialization error');
      }
    };

    initializeApp();
  }, [initialize, initializeAmplitude]);

  // Handle font loading errors gracefully
  if (fontError) {
    console.warn('Font loading error (probably Expo Go):', fontError);
    // Continue without custom fonts - use system fonts instead
  }

  // Handle initialization errors
  if (initError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <ActivityIndicator size="large" color="#3C8C7E" style={{ marginBottom: 20 }} />
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
          Initializing app services...
        </Text>
        <Text style={{ textAlign: 'center', color: '#999', fontSize: 12 }}>
          {initError}
        </Text>
      </View>
    );
  }

  // Show loading while fonts are loading or app is initializing
  if (!fontsLoaded && !fontError || !isInitialized) {
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
