import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { I18nManager } from 'react-native';
import { initLocalization, setLocale, getLocale, t as translateFunction } from './index';

interface LocalizationContextType {
  locale: 'en' | 'ar';
  t: (key: string, options?: Record<string, any>) => string;
  changeLocale: (newLocale: 'en' | 'ar') => void;
}

export const LocalizationContext = createContext<LocalizationContextType>({
  locale: 'en',
  t: (key: string) => key,
  changeLocale: () => {},
});

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [locale, setCurrentLocale] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    // Initialize localization on mount
    initLocalization();
    const initialLocale = getLocale() as 'en' | 'ar';
    setCurrentLocale(initialLocale);
    
    // Set RTL based on initial locale
    I18nManager.forceRTL(initialLocale === 'ar');
  }, []);

  const changeLocale = (newLocale: 'en' | 'ar') => {
    // Update i18n locale
    setLocale(newLocale);
    
    // Update local state to trigger re-renders
    setCurrentLocale(newLocale);
    
    // Update RTL layout direction
    const shouldUseRTL = newLocale === 'ar';
    I18nManager.forceRTL(shouldUseRTL);
    
    // Note: In a production app, you might want to restart the app for RTL changes
    // For now, we'll rely on components to re-render based on the context change
  };

  const contextValue: LocalizationContextType = {
    locale,
    t: translateFunction,
    changeLocale,
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};
