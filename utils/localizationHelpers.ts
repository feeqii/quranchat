import { t, getLocale, setLocale, isRTL, formatDate, formatTime, formatNumber } from '../localization';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import * as Localization from 'expo-localization';
import { Alert, Platform, I18nManager } from 'react-native';

// Helper to get RTL-aware text alignment
export const getTextAlign = (): 'left' | 'right' | 'center' => {
  return isRTL() ? 'right' : 'left';
};

// Helper to get RTL-aware flex direction for rows
export const getRowDirection = (): 'row' | 'row-reverse' => {
  return isRTL() ? 'row-reverse' : 'row';
};

// Helper to get RTL-aware margin/padding
export const getMarginStart = (value: number): { marginLeft?: number; marginRight?: number } => {
  return isRTL() ? { marginRight: value } : { marginLeft: value };
};

export const getMarginEnd = (value: number): { marginLeft?: number; marginRight?: number } => {
  return isRTL() ? { marginLeft: value } : { marginRight: value };
};

export const getPaddingStart = (value: number): { paddingLeft?: number; paddingRight?: number } => {
  return isRTL() ? { paddingRight: value } : { paddingLeft: value };
};

export const getPaddingEnd = (value: number): { paddingLeft?: number; paddingRight?: number } => {
  return isRTL() ? { paddingLeft: value } : { paddingRight: value };
};

// Helper to format dates for display
export const formatDisplayDate = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat(getLocale(), {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return formatDate(date);
  }
};

// Helper to format short dates
export const formatShortDate = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat(getLocale(), {
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return formatDate(date);
  }
};

// Helper to format times for display
export const formatDisplayTime = (date: Date): string => {
  try {
    return new Intl.DateTimeFormat(getLocale(), {
      hour: 'numeric',
      minute: '2-digit',
      hour12: !isRTL(), // Use 24-hour format for Arabic
    }).format(date);
  } catch (error) {
    return formatTime(date);
  }
};

// Helper to format numbers with proper locale
export const formatDisplayNumber = (num: number): string => {
  return formatNumber(num);
};

// Helper to format percentage
export const formatPercentage = (num: number): string => {
  try {
    return new Intl.NumberFormat(getLocale(), { 
      style: 'percent', 
      minimumFractionDigits: 0 
    }).format(num);
  } catch (error) {
    return formatNumber(num);
  }
};

// Helper to get RTL-aware styles
export const getRTLStyles = (ltrStyles: ViewStyle | TextStyle): ViewStyle | TextStyle => {
  if (!isRTL()) return ltrStyles;

  const rtlStyles: ViewStyle | TextStyle = { ...ltrStyles };

  // Convert flex direction
  if (ltrStyles.flexDirection === 'row') {
    rtlStyles.flexDirection = 'row-reverse';
  }

  // Convert text alignment
  if ('textAlign' in ltrStyles) {
    const textStyle = rtlStyles as TextStyle;
    if (ltrStyles.textAlign === 'left') {
      textStyle.textAlign = 'right';
    } else if (ltrStyles.textAlign === 'right') {
      textStyle.textAlign = 'left';
    }
  }

  // Convert margins
  if (ltrStyles.marginLeft !== undefined) {
    rtlStyles.marginRight = ltrStyles.marginLeft;
    rtlStyles.marginLeft = ltrStyles.marginRight;
  }

  if (ltrStyles.marginRight !== undefined) {
    rtlStyles.marginLeft = ltrStyles.marginRight;
    rtlStyles.marginRight = ltrStyles.marginLeft;
  }

  // Convert padding
  if (ltrStyles.paddingLeft !== undefined) {
    rtlStyles.paddingRight = ltrStyles.paddingLeft;
    rtlStyles.paddingLeft = ltrStyles.paddingRight;
  }

  if (ltrStyles.paddingRight !== undefined) {
    rtlStyles.paddingLeft = ltrStyles.paddingRight;
    rtlStyles.paddingRight = ltrStyles.paddingLeft;
  }

  return rtlStyles;
};

// Helper to create RTL-aware stylesheet
export const createRTLStyleSheet = <T extends { [key: string]: ViewStyle | TextStyle }>(
  styles: T
): T => {
  const rtlStyles: { [key: string]: ViewStyle | TextStyle } = {};

  Object.keys(styles).forEach((key) => {
    rtlStyles[key] = getRTLStyles(styles[key]);
  });

  return rtlStyles as T;
};

// Safe device language detection with user confirmation
export const detectAndApplyDeviceLanguage = async (): Promise<void> => {
  try {
    console.log('Starting device language detection...');
    
    // Safely get device locales
    const locales = Localization.getLocales();
    const deviceLanguageCode = locales[0]?.languageCode;
    
    console.log('Device locales:', locales);
    console.log('Detected device language:', deviceLanguageCode);
    
    const currentAppLanguage = getLocale();
    console.log('Current app language:', currentAppLanguage);
    
    // Only prompt if device is Arabic and app is currently English
    if (deviceLanguageCode === 'ar' && currentAppLanguage === 'en') {
      console.log('Device is Arabic, app is English - showing prompt');
      
      Alert.alert(
        'Language Detection', // Title
        'Your device language is Arabic. Would you like to switch the app to Arabic?', // Message
        [
          {
            text: 'No, Keep English',
            style: 'cancel',
            onPress: () => {
              console.log('User chose to keep English');
            }
          },
          {
            text: 'Yes, Switch to Arabic',
            style: 'default',
            onPress: async () => {
              try {
                console.log('User chose to switch to Arabic');
                setLocale('ar');
                console.log('Successfully switched to Arabic');
                
                // Additional alert to inform about RTL
                Alert.alert(
                  'Language Changed',
                  'App language changed to Arabic. You may need to restart the app for full RTL layout support.',
                  [{ text: 'OK' }]
                );
              } catch (error) {
                console.error('Failed to switch to Arabic:', error);
                Alert.alert(
                  'Error',
                  'Failed to switch language. Please try again.',
                  [{ text: 'OK' }]
                );
              }
            }
          }
        ],
        { cancelable: true }
      );
    } else if (deviceLanguageCode === 'en' && currentAppLanguage === 'ar') {
      // Prompt to switch back to English if device is English but app is Arabic
      console.log('Device is English, app is Arabic - showing prompt');
      
      Alert.alert(
        'Language Detection',
        'Your device language is English. Would you like to switch the app to English?',
        [
          {
            text: 'No, Keep Arabic',
            style: 'cancel',
            onPress: () => {
              console.log('User chose to keep Arabic');
            }
          },
          {
            text: 'Yes, Switch to English',
            style: 'default',
            onPress: async () => {
              try {
                console.log('User chose to switch to English');
                setLocale('en');
                console.log('Successfully switched to English');
              } catch (error) {
                console.error('Failed to switch to English:', error);
              }
            }
          }
        ],
        { cancelable: true }
      );
    } else {
      console.log('No language change needed - device and app languages match or not supported');
    }
    
  } catch (error) {
    console.warn('Error detecting device language:', error);
    // Fail silently - don't show error to user for this feature
  }
}; 

// Platform-safe RTL enabling
export const enableRTL = async (): Promise<boolean> => {
  try {
    console.log('Enabling RTL layout...');
    console.log('Platform:', Platform.OS);
    
    if (Platform.OS === 'android') {
      // For Android: Enable RTL immediately without restart
      console.log('Android detected - applying RTL immediately');
      I18nManager.forceRTL(true);
      console.log('RTL enabled successfully on Android');
      return true; // Successfully applied
      
    } else if (Platform.OS === 'ios') {
      // For iOS: Show clear alert instructing manual restart
      console.log('iOS detected - showing restart instruction');
      
      Alert.alert(
        'Restart Required', // Title
        'To apply RTL (Right-to-Left) layout on iOS, please close and restart the app manually. The language change has been saved and will take effect after restart.', // Message
        [
          {
            text: 'OK',
            style: 'default',
            onPress: () => {
              console.log('User acknowledged iOS restart requirement');
            }
          }
        ],
        { cancelable: false }
      );
      
      return false; // Requires manual restart
    } else {
      // For other platforms (web, etc.)
      console.log('Unknown platform - attempting RTL enable');
      I18nManager.forceRTL(true);
      return true;
    }
    
  } catch (error) {
    console.error('Error enabling RTL:', error);
    
    Alert.alert(
      'Error',
      'Failed to apply RTL layout. Please try again or restart the app manually.',
      [{ text: 'OK' }]
    );
    
    return false;
  }
};

// Disable RTL (for switching back to LTR languages)
export const disableRTL = async (): Promise<boolean> => {
  try {
    console.log('Disabling RTL layout...');
    
    if (Platform.OS === 'android') {
      I18nManager.forceRTL(false);
      console.log('RTL disabled successfully on Android');
      return true;
      
    } else if (Platform.OS === 'ios') {
      Alert.alert(
        'Restart Required',
        'To apply LTR (Left-to-Right) layout on iOS, please close and restart the app manually.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return false;
    } else {
      I18nManager.forceRTL(false);
      return true;
    }
    
  } catch (error) {
    console.error('Error disabling RTL:', error);
    return false;
  }
}; 