# 📱 Quran Chat - Spiritual AI Assistant

**Quran Chat** is a peaceful, respectful mobile app built with React Native + Expo, designed as a spiritual AI assistant for the Muslim community. The app provides daily Quranic inspiration, AI-powered conversations, and personalized spiritual guidance.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Expo SDK](https://img.shields.io/badge/Expo-53.0.20-black)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)

---

## 🎯 **Overview**

Quran Chat combines modern AI technology with Islamic spirituality to provide users with:

- **Daily Inspiration**: Personalized verses based on mood and context
- **AI Conversations**: Intelligent discussions about Quranic teachings
- **Spiritual Guidance**: Contextual reflections and prayers
- **Reading Experience**: Complete Quran with multiple translations
- **Personal Journey**: Mood tracking, streaks, and spiritual growth

---

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (macOS) or Android Emulator
- OpenAI API Key

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd quran_chat_2

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your EXPO_PUBLIC_OPENAI_API_KEY

# Start development server
npm start
```

### Running the App
```bash
# iOS Simulator
npm run ios

# Android Emulator  
npm run android

# Web browser
npm run web

# Expo Go (scan QR code)
npm start
```

---

## 📋 **Table of Contents**

- [Architecture Overview](#-architecture-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Development Guide](#-development-guide)
- [Design System](#-design-system)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🏗️ **Architecture Overview**

### **Navigation Flow**
```
App.tsx
└── AppNavigator
    ├── OnboardingStack (if !onboardingCompleted)
    │   ├── OnboardingWelcomeScreen
    │   ├── OnboardingStep1-10
    │   └── OnboardingFinalQuestion1-3
    │
    └── MainAppStack (if onboardingCompleted)
        ├── MainTabNavigator
        │   ├── TodayStackNavigator
        │   ├── ChatHomeScreen
        │   ├── QuranHomeScreen
        │   └── ProfileScreen
        │
        └── Modal Screens
            ├── TopicChatScreen
            ├── VerseStoryScreen
            └── SurahSelectionModal
```

### **State Management**
- **Zustand**: Lightweight, TypeScript-first state management
- **AsyncStorage**: Data persistence
- **Domain-specific stores**: Onboarding, Chat, Profile, Today, Quran

### **Component Architecture**
**Atomic Design Pattern:**
```
Atoms → Molecules → Organisms → Screens
```

---

## ✨ **Features**

### **Core Features**
- **13-Step Onboarding**: Personalized setup flow
- **Daily Journey**: Mood check-ins and contextual reflections
- **AI Chat**: Conversations about Quranic teachings
- **Quran Reader**: Complete Quran with translations
- **Profile Management**: User preferences and subscription

### **AI-Powered Features**
- Daily verse recommendations based on mood
- Contextual spiritual guidance
- AI-generated reflections and prayers
- Intelligent conversation responses

### **User Experience**
- **Streak Tracking**: Daily engagement gamification
- **Mood Analytics**: Emotional state tracking
- **History**: Complete interaction history
- **Bookmarks**: Save favorite verses and conversations

---

## 🛠️ **Tech Stack**

### **Frontend**
- **React Native** `0.79.5` - Mobile framework
- **Expo SDK** `53.0.20` - Development platform
- **TypeScript** `5.8.3` - Type safety
- **React Navigation** `v6` - Navigation

### **State & Data**
- **Zustand** `4.4.7` - State management
- **AsyncStorage** `2.1.2` - Local persistence
- **i18n-js** `4.5.1` - Internationalization

### **UI & Styling**
- **React Native StyleSheet** - Primary styling
- **Expo Google Fonts** - Merriweather typography
- **Lucide React Native** - Icon system
- **React Native SVG** - Vector graphics

### **Services & APIs**
- **OpenAI API** - AI conversations
- **Amplitude** `2.17.3` - Analytics
- **RevenueCat** `9.0.0` - Subscriptions
- **Expo Localization** - Multi-language support

---

## 📁 **Project Structure**

```
quran_chat_2/
├── components/                 # Atomic Design Components
│   ├── atoms/                 # Basic UI elements
│   ├── molecules/             # Grouped elements  
│   └── organisms/             # Complex sections
│
├── screens/                   # App Screens
│   ├── onboarding/           # 13-step onboarding flow
│   ├── main/                 # Post-onboarding screens
│   └── quran/                # Quran reading interface
│
├── navigation/               # Navigation configuration
│   ├── AppNavigator.tsx      # Root navigation
│   ├── MainTabNavigator.tsx  # Bottom tabs
│   └── TodayStackNavigator.tsx
│
├── store/                    # Zustand state management
│   ├── useOnboardingStore.ts # Onboarding state
│   ├── useChatStore.ts       # Chat conversations
│   ├── useTodayStore.ts      # Daily journey
│   ├── useProfileStore.ts    # User profile
│   └── useQuranStore.ts      # Quran reading
│
├── lib/                      # API & utilities
│   └── api/                  # External API integrations
│       ├── askQuran.ts       # AI conversation API
│       ├── quranApi.ts       # Quran data API
│       └── todayJourney.ts   # Daily content generation
│
├── constants/                # Configuration
│   ├── theme.ts              # Design system
│   ├── surahList.ts          # Quran chapters data
│   └── categoryImages.ts     # Category mappings
│
├── localization/             # Internationalization
│   ├── en.json               # English translations
│   ├── ar.json               # Arabic translations
│   └── index.ts              # i18n configuration
│
├── utils/                    # Helper functions
├── hooks/                    # Custom React hooks
└── assets/                   # Images & static files
```

---

## 👨‍💻 **Development Guide**

### **Code Standards**
- **TypeScript**: All files use `.tsx` for components, `.ts` for utilities
- **PascalCase**: File names and component names
- **camelCase**: Variables, functions, and Zustand keys
- **Atomic Design**: Strict component hierarchy

### **Styling Rules**
```typescript
// ✅ Always use theme values
backgroundColor: theme.colors.primary
fontSize: theme.fontSizes.body
padding: theme.spacing.md

// ❌ Never hardcode values
backgroundColor: '#3C8C7E'
fontSize: 16
padding: 16
```

### **Component Guidelines**
```typescript
// Component Structure
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

interface Props {
  title: string;
  onPress: () => void;
}

export const ComponentName: React.FC<Props> = ({ title, onPress }) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
  },
});
```

### **State Management Pattern**
```typescript
// Zustand Store Example
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  data: string | null;
  setData: (data: string) => void;
}

export const useExampleStore = create<StoreState>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set({ data }),
    }),
    {
      name: '@exampleData',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 🎨 **Design System**

### **Color Palette**
```typescript
colors: {
  primary: '#3C8C7E',        // Peaceful teal
  primarySoft: '#D9EDE7',    // Light teal background
  accent: '#C9A76D',         // Warm gold accent
  background: '#F8FAF9',     // Off-white background
  surface: '#FFFFFF',        // Pure white surfaces
  textPrimary: '#1C2B2D',    // Dark text
  textSecondary: '#5B6C70',  // Medium text
  textMuted: '#889396',      // Light text
}
```

### **Typography**
```typescript
fonts: {
  heading: 'Merriweather_700Bold',
  body: 'Merriweather_400Regular',
  mono: 'Courier',
}

fontSizes: {
  h1: 28, h2: 22, h3: 18,
  title: 20, body: 16, caption: 12
}
```

### **Spacing System**
```typescript
spacing: {
  xs: 4, sm: 8, md: 16, 
  lg: 24, xl: 32, xxl: 48
}
```

---

## 🔌 **API Documentation**

### **OpenAI Integration**
```typescript
// Ask Quran API
const response = await askQuran(prompt, conversationHistory);

// Today Journey API  
const content = await generateTodayJourney(mood, contexts, userInput);
```

### **Analytics Events**
```typescript
// Screen Views
logEvent({ name: 'screen_view', screenName: 'ChatHomeScreen' });

// User Actions
logEvent({ name: 'chat_session_started' });
logEvent({ name: 'verse_lookup', surah: 'Al-Baqarah', verse: 1 });
logEvent({ name: 'mood_checkin', mood: 'peaceful', context: 'morning' });
```

### **State Persistence**
All Zustand stores automatically persist to AsyncStorage:
- `@onboardingData` - Onboarding responses
- `@chatData` - Chat conversations
- `@todayData` - Daily journey progress
- `@profileData` - User profile settings

---

## 🚀 **Deployment**

### **Build for Production**
```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

### **Environment Configuration**
```bash
# Production environment variables
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_key
AMPLITUDE_API_KEY=your_amplitude_key
REVENUECAT_API_KEY=your_revenuecat_key
```

### **App Store Deployment**
```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

---

## 🤝 **Contributing**

### **Development Workflow**
1. Create feature branch: `git checkout -b feature/new-feature`
2. Follow code standards and component guidelines
3. Test on iOS and Android simulators
4. Submit pull request with detailed description

### **Code Review Guidelines**
- Ensure TypeScript type safety
- Follow atomic design patterns
- Use theme values for all styling
- Test user flows thoroughly
- Verify analytics tracking

---

## 📞 **Support**

- **Documentation**: `/docs` folder
- **Issues**: GitHub Issues
- **Development**: Follow guidelines in `/docs/DEVELOPMENT.md`
- **Design System**: See `/docs/DESIGN_SYSTEM.md`

---

## 📄 **License**

This project is proprietary software. All rights reserved.

---

**Built with ❤️ for the Muslim community** 