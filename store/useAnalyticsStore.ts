import { create } from 'zustand';
import { Amplitude } from '@amplitude/react-native';

export type AnalyticsEvent =
  // Screen Views
  | { name: 'screen_view'; screenName: string }
  
  // Onboarding Events
  | { name: 'onboarding_start' }
  | { name: 'onboarding_complete_step'; step: number }
  | { name: 'onboarding_finish' }
  
  // Paywall Events
  | { name: 'paywall_view' }
  | { name: 'paywall_subscribe_tap' }
  | { name: 'paywall_purchase_success' }
  | { name: 'paywall_purchase_failure'; error: string }
  | { name: 'paywall_restore_tap' }
  
  // Subscription Events
  | { name: 'subscription_entitlement_granted' }
  | { name: 'subscription_entitlement_restored' }
  | { name: 'subscription_entitlement_expired' }
  
  // Core Feature Events
  | { name: 'verse_lookup'; surah: string; verse: number }
  | { name: 'reflection_generated' }
  | { name: 'mood_checkin'; mood: string; context: string }
  | { name: 'context_selected'; context: string }
  | { name: 'language_switch'; from: string; to: string }
  
  // Chat Events
  | { name: 'chat_message_sent'; messageLength: number }
  | { name: 'chat_session_started' }
  | { name: 'verse_story_opened'; surah: string; verse: number }
  
  // Today Journey Events
  | { name: 'today_journey_started' }
  | { name: 'daily_streak_viewed' }
  | { name: 'verse_of_day_viewed' };

interface AnalyticsState {
  isInitialized: boolean;
  initializationAttempts: number;
  maxRetries: number;
  setInitialized: (initialized: boolean) => void;
  initializeAmplitude: (apiKey: string) => Promise<boolean>;
  logEvent: (event: AnalyticsEvent) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  isInitialized: false,
  initializationAttempts: 0,
  maxRetries: 3,
  
  setInitialized: (initialized: boolean) => set({ isInitialized: initialized }),
  
  initializeAmplitude: async (apiKey: string): Promise<boolean> => {
    const state = get();
    
    if (state.isInitialized) {
      return true; // Already initialized
    }
    
    if (state.initializationAttempts >= state.maxRetries) {
      console.warn('⚠️ Analytics: Max initialization attempts reached, continuing without analytics');
      return false;
    }
    
    try {
      set({ initializationAttempts: state.initializationAttempts + 1 });
      
      console.log(`📊 Analytics: Initialization attempt ${state.initializationAttempts + 1}/${state.maxRetries}`);
      
      // Add a small delay to ensure native modules are ready
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Check if Amplitude instance is available
      const amplitudeInstance = Amplitude.getInstance();
      if (!amplitudeInstance) {
        throw new Error('Amplitude instance not available');
      }
      
      // Initialize with error handling
      await amplitudeInstance.init(apiKey);
      
      console.log('✅ Analytics: Amplitude initialized successfully');
      set({ isInitialized: true });
      return true;
      
    } catch (error) {
      console.warn(`❌ Analytics: Initialization attempt ${state.initializationAttempts + 1} failed:`, error);
      
      // If we haven't exceeded max retries, try again after a delay
      if (state.initializationAttempts < state.maxRetries) {
        console.log(`🔄 Analytics: Retrying in 1 second...`);
        setTimeout(() => {
          get().initializeAmplitude(apiKey);
        }, 1000);
      } else {
        console.warn('⚠️ Analytics: All initialization attempts failed, continuing without analytics');
      }
      
      return false;
    }
  },
  
  logEvent: (event: AnalyticsEvent) => {
    const state = get();
    
    try {
      const { name, ...props } = event;
      
      // Log to console in development for debugging
      if (__DEV__) {
        console.log('📊 Analytics Event:', name, props);
      }
      
      // Only send to Amplitude if properly initialized
      if (state.isInitialized) {
        const amplitudeInstance = Amplitude.getInstance();
        if (amplitudeInstance) {
          amplitudeInstance.logEvent(name, props);
        } else {
          if (__DEV__) {
            console.warn('⚠️ Analytics: Amplitude instance not available for event:', name);
          }
        }
      } else {
        if (__DEV__) {
          console.log('📊 Analytics (not initialized):', name, props);
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Analytics Error:', error);
      }
      // Don't throw - continue silently if analytics fails
    }
  },
})); 