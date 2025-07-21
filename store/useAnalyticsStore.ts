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
  logEvent: (event: AnalyticsEvent) => void;
  isInitialized: boolean;
  setInitialized: (initialized: boolean) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  isInitialized: false,
  
  setInitialized: (initialized: boolean) => set({ isInitialized: initialized }),
  
  logEvent: (event: AnalyticsEvent) => {
    try {
      const { name, ...props } = event;
      
      // Log to console in development for debugging
      if (__DEV__) {
        console.log('📊 Analytics Event:', name, props);
      }
      
      // Send to Amplitude
      Amplitude.getInstance().logEvent(name, props);
    } catch (error) {
      if (__DEV__) {
        console.error('❌ Analytics Error:', error);
      }
    }
  },
})); 