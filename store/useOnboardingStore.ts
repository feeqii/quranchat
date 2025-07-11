import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type OnboardingState = {
  wantsDailyReminder: boolean | null;
  supportType: string | null;
  heardFrom: string | null;
  ageGroup: string | null;
  islamicBackground: string | null;
  isLikelyToFinish: boolean | null;
  wantsInstantAccess: boolean | null;
  onboardingCompleted: boolean;
};

type OnboardingActions = {
  setField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  completeOnboarding: () => void;
};

type OnboardingStore = OnboardingState & OnboardingActions;

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      // State
      wantsDailyReminder: null,
      supportType: null,
      heardFrom: null,
      ageGroup: null,
      islamicBackground: null,
      isLikelyToFinish: null,
      wantsInstantAccess: null,
      onboardingCompleted: false,
      
      // Actions
      setField: (key, value) => set({ [key]: value }),
      completeOnboarding: () => set({ onboardingCompleted: true }),
    }),
    {
      name: '@onboardingData',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 