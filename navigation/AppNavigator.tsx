import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useOnboardingStore } from '../store/useOnboardingStore';

// Screen imports
import { OnboardingWelcomeScreen } from '../screens/onboarding/OnboardingWelcomeScreen';
import { OnboardingStep1 } from '../screens/onboarding/OnboardingStep1';
import { OnboardingStep2 } from '../screens/onboarding/OnboardingStep2';
import { OnboardingStep3 } from '../screens/onboarding/OnboardingStep3';
import { OnboardingStep4 } from '../screens/onboarding/OnboardingStep4';
import { OnboardingStep5 } from '../screens/onboarding/OnboardingStep5';
import { OnboardingStep6 } from '../screens/onboarding/OnboardingStep6';
import { OnboardingStep7 } from '../screens/onboarding/OnboardingStep7';
import { OnboardingStep8 } from '../screens/onboarding/OnboardingStep8';
import { OnboardingStep9 } from '../screens/onboarding/OnboardingStep9';
import { OnboardingStep10 } from '../screens/onboarding/OnboardingStep10';
import { OnboardingFinalQuestion1 } from '../screens/onboarding/OnboardingFinalQuestion1';
import { OnboardingFinalQuestion2 } from '../screens/onboarding/OnboardingFinalQuestion2';
import { OnboardingFinalQuestion3 } from '../screens/onboarding/OnboardingFinalQuestion3';
import { MainTabNavigator } from './MainTabNavigator';
import { VerseStoryScreen } from '../screens/main/VerseStoryScreen';
import { TopicChatScreen } from '../screens/main/TopicChatScreen';
import { HistoryScreen } from '../screens/main/HistoryScreen';
import { SurahSelectionModal } from '../screens/quran/SurahSelectionModal';
import { TranslationSelectionModal } from '../screens/quran/TranslationSelectionModal';

// Type definitions for navigation
export type OnboardingStackParamList = {
  OnboardingWelcomeScreen: undefined;
  OnboardingStep1: undefined;
  OnboardingStep2: undefined;
  OnboardingStep3: undefined;
  OnboardingStep4: undefined;
  OnboardingStep5: undefined;
  OnboardingStep6: undefined;
  OnboardingStep7: undefined;
  OnboardingStep8: undefined;
  OnboardingStep9: undefined;
  OnboardingStep10: undefined;
  OnboardingFinalQuestion1: undefined;
  OnboardingFinalQuestion2: undefined;
  OnboardingFinalQuestion3: undefined;
  AuthScreen: undefined; // Placeholder for auth
};

export type MainAppStackParamList = {
  MainTabNavigator: undefined;
  TopicChatScreen: { sessionId?: string };
  VerseStoryScreen: undefined;
  HistoryScreen: undefined;
  SurahSelectionModal: undefined;
  TranslationSelectionModal: undefined;
};

export type OnboardingNavigationProp = NativeStackNavigationProp<OnboardingStackParamList>;
export type MainAppNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

// Stack navigators
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainAppStack = createNativeStackNavigator<MainAppStackParamList>();
const RootStack = createNativeStackNavigator();

// Onboarding Stack Component
const OnboardingStackNavigator: React.FC = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <OnboardingStack.Screen
        name="OnboardingWelcomeScreen"
        component={OnboardingWelcomeScreen}
      />
      <OnboardingStack.Screen
        name="OnboardingStep1"
        component={OnboardingStep1}
      />
      <OnboardingStack.Screen
        name="OnboardingStep2"
        component={OnboardingStep2}
      />
      <OnboardingStack.Screen
        name="OnboardingStep3"
        component={OnboardingStep3}
      />
      <OnboardingStack.Screen
        name="OnboardingStep4"
        component={OnboardingStep4}
      />
      <OnboardingStack.Screen
        name="OnboardingStep5"
        component={OnboardingStep5}
      />
      <OnboardingStack.Screen
        name="OnboardingStep6"
        component={OnboardingStep6}
      />
      <OnboardingStack.Screen
        name="OnboardingStep7"
        component={OnboardingStep7}
      />
      <OnboardingStack.Screen
        name="OnboardingStep8"
        component={OnboardingStep8}
      />
      <OnboardingStack.Screen
        name="OnboardingStep9"
        component={OnboardingStep9}
      />
      {/* <OnboardingStack.Screen
        name="OnboardingStep10"
        component={OnboardingStep10}
      /> */}
      <OnboardingStack.Screen
        name="OnboardingFinalQuestion1"
        component={OnboardingFinalQuestion1}
      />
      <OnboardingStack.Screen
        name="OnboardingFinalQuestion2"
        component={OnboardingFinalQuestion2}
      />
      <OnboardingStack.Screen
        name="OnboardingFinalQuestion3"
        component={OnboardingFinalQuestion3}
      />
      {/* Additional onboarding screens will be added here */}
    </OnboardingStack.Navigator>
  );
};

// Main App Stack Component
const MainAppStackNavigator: React.FC = () => {
  return (
    <MainAppStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <MainAppStack.Screen
        name="MainTabNavigator"
        component={MainTabNavigator}
      />
      <MainAppStack.Screen
        name="TopicChatScreen"
        component={TopicChatScreen}
        options={{
          gestureEnabled: false, // Disable swipe back to ensure handleBack() is always called
        }}
      />
      <MainAppStack.Screen
        name="VerseStoryScreen"
        component={VerseStoryScreen}
        options={{ presentation: 'modal' }}
      />
      <MainAppStack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
      />
      <MainAppStack.Screen
        name="SurahSelectionModal"
        component={SurahSelectionModal}
        options={{ 
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <MainAppStack.Screen
        name="TranslationSelectionModal"
        component={TranslationSelectionModal}
        options={{ 
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </MainAppStack.Navigator>
  );
};

// Root Navigator
const RootNavigator: React.FC = () => {
  const { onboardingCompleted } = useOnboardingStore();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {onboardingCompleted ? (
        <RootStack.Screen
          name="MainApp"
          component={MainAppStackNavigator}
        />
      ) : (
        <RootStack.Screen
          name="Onboarding"
          component={OnboardingStackNavigator}
        />
      )}
    </RootStack.Navigator>
  );
};

// Main App Navigator Component
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}; 