import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen imports
import { TodayHomeScreen } from '../screens/main/TodayHomeScreen';
import { MoodCheckinScreen } from '../screens/main/MoodCheckinScreen';
import { ContextSelectionScreen } from '../screens/main/ContextSelectionScreen';
import { ReflectionInputScreen } from '../screens/main/ReflectionInputScreen';
import { ContentGenerationLoadingScreen } from '../screens/main/ContentGenerationLoadingScreen';
import { GeneratedReflectionScreen } from '../screens/main/GeneratedReflectionScreen';

// Type definitions for navigation
export type TodayStackParamList = {
  TodayHomeScreen: undefined;
  MoodCheckinScreen: undefined;
  ContextSelectionScreen: undefined;
  ReflectionInputScreen: undefined;
  TextInputScreen: undefined;
  ContentGenerationLoadingScreen: undefined;
  GeneratedContentScreen: undefined;
  GeneratedReflectionScreen: undefined;
};

const TodayStack = createNativeStackNavigator<TodayStackParamList>();

export const TodayStackNavigator: React.FC = () => {
  return (
    <TodayStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <TodayStack.Screen
        name="TodayHomeScreen"
        component={TodayHomeScreen}
      />
      <TodayStack.Screen
        name="MoodCheckinScreen"
        component={MoodCheckinScreen}
      />
      <TodayStack.Screen
        name="ContextSelectionScreen"
        component={ContextSelectionScreen}
      />
      <TodayStack.Screen
        name="ReflectionInputScreen"
        component={ReflectionInputScreen}
      />
      <TodayStack.Screen
        name="ContentGenerationLoadingScreen"
        component={ContentGenerationLoadingScreen}
      />
      <TodayStack.Screen
        name="GeneratedReflectionScreen"
        component={GeneratedReflectionScreen}
      />
      {/* Additional screens will be added here as we build them */}
    </TodayStack.Navigator>
  );
}; 