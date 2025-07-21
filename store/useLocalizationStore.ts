import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLocale, getLocale, initLocalization } from '../localization';
import { detectAndApplyDeviceLanguage, enableRTL, disableRTL } from '../utils/localizationHelpers';
import { useAnalyticsStore } from './useAnalyticsStore';

type LocalizationState = {
  // Current language code
  language: string;
  
  // Whether the current language is RTL
  isRTL: boolean;
  
  // Whether localization has been initialized
  isInitialized: boolean;
  
  // Actions
  setLanguage: (language: string) => Promise<void>;
  initializeLocalization: () => void;
  toggleLanguage: () => Promise<void>;
  detectDeviceLanguage: () => Promise<void>;
  applyRTL: () => Promise<boolean>;
};

export const useLocalizationStore = create<LocalizationState>()(
  persist(
    (set, get) => ({
      // Initial state
      language: 'en',
      isRTL: false,
      isInitialized: false,

      // Initialize localization on app start
      initializeLocalization: () => {
        try {
          // Call the safe initialization from localization module
          initLocalization();
          
          const currentLang = getLocale();
          const currentRTL = currentLang === 'ar';
          
          set({
            language: currentLang,
            isRTL: currentRTL,
            isInitialized: true,
          });
        } catch (error) {
          console.warn('Store initialization error:', error);
          set({
            language: 'en',
            isRTL: false,
            isInitialized: true,
          });
        }
      },

      // Set a specific language
      setLanguage: async (language: string) => {
        try {
          const currentLanguage = get().language;
          
          // Change the language in the localization system
          setLocale(language);
          
          // Log language switch
          if (currentLanguage !== language) {
            const { logEvent } = useAnalyticsStore.getState();
            logEvent({ name: 'language_switch', from: currentLanguage, to: language });
          }
          
          // Update the store state
          set({
            language,
            isRTL: language === 'ar',
          });
          
          console.log(`Language changed to: ${language}`);
        } catch (error) {
          console.error('Error changing language:', error);
          throw error;
        }
      },

      // Toggle between English and Arabic
      toggleLanguage: async () => {
        const { language, setLanguage } = get();
        const newLanguage = language === 'en' ? 'ar' : 'en';
        await setLanguage(newLanguage);
      },

      // Detect and apply device language
      detectDeviceLanguage: async () => {
        await detectAndApplyDeviceLanguage();
      },

      // Apply RTL layout
      applyRTL: async (): Promise<boolean> => {
        const { language } = get();
        
        try {
          let success = false;
          
          if (language === 'ar') {
            // Enable RTL for Arabic
            success = await enableRTL();
          } else {
            // Disable RTL for non-Arabic languages
            success = await disableRTL();
          }
          
          // Update store state if successful (mainly for Android)
          if (success) {
            set({
              isRTL: language === 'ar',
            });
            console.log(`RTL ${language === 'ar' ? 'enabled' : 'disabled'} successfully`);
          }
          
          return success;
        } catch (error) {
          console.error('Error applying RTL:', error);
          return false;
        }
      },
    }),
    {
      name: '@localizationData',
      storage: {
        getItem: async (key: string) => {
          try {
            const value = await AsyncStorage.getItem(key);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.error('Error getting item from storage:', error);
            return null;
          }
        },
        setItem: async (key: string, value: any) => {
          try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
          } catch (error) {
            console.error('Error setting item in storage:', error);
          }
        },
        removeItem: async (key: string) => {
          try {
            await AsyncStorage.removeItem(key);
          } catch (error) {
            console.error('Error removing item from storage:', error);
          }
        },
      },
      // On rehydration, initialize the localization system
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Initialize with persisted language
          setLocale(state.language);
          state.initializeLocalization();
        }
      },
    }
  )
); 