import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import en from './en.json';
import ar from './ar.json';

// 1. Configure i18n
const i18n = new I18n();
i18n.enableFallback = true;
i18n.translations = { en, ar };

// Set default to English
i18n.defaultLocale = 'en';
i18n.locale = 'en';

// 2. Initialize based on device locale
export function initLocalization() {
  try {
    const locales = Localization.getLocales();
    const deviceLang = locales[0]?.languageCode;
    
    // Only set to Arabic if device is explicitly set to Arabic
    // Otherwise, default to English
    if (deviceLang === 'ar') {
      setLocale('ar');
    } else {
      setLocale('en');
    }
  } catch (error) {
    console.log('Language detection failed, defaulting to English');
    // Always fallback to English if detection fails
    setLocale('en');
  }
}

// 3. Set and get locale
export function setLocale(lang: string) {
  i18n.locale = lang;
}

export function getLocale(): string {
  try {
    return i18n.locale || 'en';
  } catch (error) {
    return 'en';
  }
}

// 4. Translation helper
export function t(key: string, opts?: object): string {
  return i18n.t(key, opts);
}

// 5. RTL helper
export function isRTL(): boolean {
  return getLocale() === 'ar';
}

// 6. Format helpers using Intl
export function formatDate(date: Date): string {
  try {
    return new Intl.DateTimeFormat(getLocale(), { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  } catch (error) {
    return date.toLocaleDateString();
  }
}

export function formatTime(date: Date): string {
  try {
    return new Intl.DateTimeFormat(getLocale(), { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: !isRTL()
    }).format(date);
  } catch (error) {
    return date.toLocaleTimeString();
  }
}

export function formatNumber(num: number): string {
  try {
    return new Intl.NumberFormat(getLocale()).format(num);
  } catch (error) {
    return num.toString();
  }
}