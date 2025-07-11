import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type ProfileState = {
  // Personal Details
  username: string | null;
  email: string | null;
  ageRange: string | null;
  denomination: string | null;
  customField: string | null;
  
  // Profile Image
  profileImageUri: string | null;
  
  // Subscription
  subscriptionTier: 'free' | 'premium';
  
  // Settings
  personalizeConversations: boolean;
  reminderSettings: {
    enabled: boolean;
    time: string;
    frequency: 'daily' | 'weekly';
  };
  
  // Streak Data (from existing stores)
  currentStreak: number;
  longestStreak: number;
  
  // Onboarding sync flag
  isOnboardingDataSynced: boolean;
};

type OnboardingData = {
  ageGroup: string | null;
  islamicBackground: string | null;
  wantsDailyReminder: boolean | null;
  supportType: string | null;
};

type ProfileActions = {
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setAgeRange: (range: string) => void;
  setDenomination: (denomination: string) => void;
  setCustomField: (field: string) => void;
  setProfileImage: (uri: string) => void;
  setSubscriptionTier: (tier: 'free' | 'premium') => void;
  setPersonalizeConversations: (enabled: boolean) => void;
  setReminderSettings: (settings: ProfileState['reminderSettings']) => void;
  updateStreakData: (current: number, longest: number) => void;
  syncOnboardingData: (onboardingData: OnboardingData) => void;
  clearProfile: () => void;
};

type ProfileStore = ProfileState & ProfileActions;

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      // State
      username: null,
      email: null,
      ageRange: null,
      denomination: null,
      customField: null,
      profileImageUri: null,
      subscriptionTier: 'free',
      personalizeConversations: true,
      reminderSettings: {
        enabled: true,
        time: '09:00',
        frequency: 'daily',
      },
      currentStreak: 0,
      longestStreak: 0,
      isOnboardingDataSynced: false,
      
      // Actions
      setUsername: (username) => set({ username }),
      setEmail: (email) => set({ email }),
      setAgeRange: (range) => set({ ageRange: range }),
      setDenomination: (denomination) => set({ denomination }),
      setCustomField: (field) => set({ customField: field }),
      setProfileImage: (uri) => set({ profileImageUri: uri }),
      setSubscriptionTier: (tier) => set({ subscriptionTier: tier }),
      setPersonalizeConversations: (enabled) => set({ personalizeConversations: enabled }),
      setReminderSettings: (settings) => set({ reminderSettings: settings }),
      updateStreakData: (current, longest) => set({ currentStreak: current, longestStreak: longest }),
      
      // Sync onboarding data to profile
      syncOnboardingData: (onboardingData) => {
        const currentState = get();
        
        set({
          // Only update if not already set (preserve user edits)
          ageRange: currentState.ageRange || onboardingData.ageGroup,
          denomination: currentState.denomination || onboardingData.islamicBackground,
          reminderSettings: {
            ...currentState.reminderSettings,
            enabled: onboardingData.wantsDailyReminder ?? currentState.reminderSettings.enabled,
          },
          isOnboardingDataSynced: true,
        });
      },
      
      clearProfile: () => set({
        username: null,
        email: null,
        ageRange: null,
        denomination: null,
        customField: null,
        profileImageUri: null,
        subscriptionTier: 'free',
        personalizeConversations: true,
        reminderSettings: {
          enabled: true,
          time: '09:00',
          frequency: 'daily',
        },
        currentStreak: 0,
        longestStreak: 0,
        isOnboardingDataSynced: false,
      }),
    }),
    {
      name: '@profileData',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 