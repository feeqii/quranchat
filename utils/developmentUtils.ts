import Constants from 'expo-constants';

/**
 * Detect if the app is running in Expo Go
 * Expo Go has limited native module support
 */
export const isExpoGo = (): boolean => {
  return Constants.appOwnership === 'expo';
};

/**
 * Detect if we're in development mode
 */
export const isDevelopment = (): boolean => {
  return __DEV__;
};

/**
 * Check if native modules are available
 * Some modules don't work in Expo Go
 */
export const areNativeModulesAvailable = (): boolean => {
  // Temporarily force enable for testing (comment out for Expo Go)
  // return true;
  
  // Native modules are available when NOT in Expo Go
  // Expo Go has appOwnership === 'expo'
  // Development builds and standalone have different ownership values
  return Constants.appOwnership !== 'expo';
};

/**
 * Safe console logging for development
 */
export const devLog = (message: string, ...args: any[]): void => {
  if (isDevelopment()) {
    console.log(`🔧 [DEV] ${message}`, ...args);
  }
};

/**
 * Mock analytics events for Expo Go
 */
export const createMockAnalytics = () => ({
  logEvent: (event: any) => {
    devLog('📊 Mock Analytics Event:', event);
  },
  initializeAmplitude: async (apiKey: string) => {
    devLog('📊 Mock Amplitude initialized with key:', apiKey);
    return true;
  },
});

/**
 * Mock purchases for Expo Go
 */
export const createMockPurchases = () => ({
  initialize: async () => {
    devLog('💰 Mock RevenueCat initialized');
  },
  purchaseWeekly: async () => {
    devLog('💰 Mock weekly purchase');
  },
  restorePurchases: async () => {
    devLog('💰 Mock restore purchases');
  },
  isEntitled: true, // For testing, assume user has access
  loading: false,
  error: null,
}); 