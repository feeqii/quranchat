# 📁 Complete Project Structure - Quran Chat

**Last Updated**: July 22, 2025  
**Purpose**: Comprehensive documentation of every folder and file in the Quran Chat project

---

## 🏗️ **Root Directory Overview**

```
quran_chat_2/                          # Main project root
├── 📁 .cursor/                         # Cursor IDE configuration and rules
├── 📁 .expo/                           # Expo development configuration (auto-generated)
├── 📁 .git/                            # Git version control (auto-generated)
├── 📁 assets/                          # Static assets (images, icons, fonts)
├── 📁 components/                      # Reusable UI components (Atomic Design)
├── 📁 constants/                       # Theme, colors, static data
├── 📁 dist/                            # Build output directory (auto-generated)
├── 📁 docs/                            # Project documentation
├── 📁 hooks/                           # Custom React hooks
├── 📁 lib/                             # API integrations and utilities
├── 📁 localization/                    # Internationalization (i18n)
├── 📁 navigation/                      # React Navigation configuration
├── 📁 node_modules/                    # Dependencies (auto-generated)
├── 📁 screens/                         # App screens (onboarding, main, quran)
├── 📁 scripts/                         # Build and utility scripts
├── 📁 store/                           # Zustand state management
├── 📁 utils/                           # Helper functions and utilities
├── 📄 App.tsx                          # Root React component
├── 📄 app.json                         # Expo configuration
├── 📄 babel.config.js                  # Babel configuration
├── 📄 eas.json                         # Expo Application Services config
├── 📄 extractStrings.js                # i18n string extraction utility
├── 📄 metro.config.js                  # Metro bundler configuration
├── 📄 package.json                     # Project dependencies and scripts
├── 📄 package-lock.json                # Dependency lock file
├── 📄 tsconfig.json                    # TypeScript configuration
├── 📄 yarn.lock                        # Yarn dependency lock file
├── 📄 .gitignore                       # Git ignore patterns
├── 📄 README.md                        # Project overview and quick start
├── 📄 CHATGPT_COLLABORATION_BRIEF.md   # ChatGPT guidance document
├── 📄 CHATGPT_PROJECT_BRIEF.txt        # Legacy project brief
├── 📄 RTL-*.md                         # RTL implementation documentation
└── 📄 LOCALIZATION_*.md                # Localization documentation
```

---

## 📱 **App.tsx** - Root Component
**Size**: 3.9KB | **Lines**: 110  
**Purpose**: Application entry point with initialization logic

### **Key Responsibilities**
- **Font Loading**: Merriweather fonts with error handling
- **Service Initialization**: Amplitude analytics and RevenueCat subscriptions
- **Error Boundaries**: Graceful degradation for initialization failures
- **Loading States**: User feedback during app startup
- **Provider Setup**: Gesture handling, safe area, localization

### **Dependencies**
```typescript
// Core React Native
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View, Alert, Text } from "react-native";

// Third-party providers
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Merriweather_400Regular, Merriweather_700Bold } from "@expo-google-fonts/merriweather";

// Internal components
import { AppNavigator } from "./navigation/AppNavigator";
import { LocalizationProvider } from "./localization/LocalizationContext";
```

---

## 📁 **components/** - UI Component Library (Atomic Design)

### **🔬 atoms/** - Basic Building Blocks
**16 Components** | **Smallest reusable UI elements**

| Component | Size | Purpose |
|-----------|------|---------|
| `AnimatedLoader.tsx` | 3.4KB | Loading spinner with smooth animations |
| `ChapterNumberButton.tsx` | 1.1KB | Quran chapter number selector |
| `FloatingActionButton.tsx` | 1.8KB | Primary action button (floating) |
| `Icon.tsx` | 4.9KB | Unified icon system using Lucide |
| `IconButton.tsx` | 781B | Pressable icon with feedback |
| `MoodEmojiAtom.tsx` | 2.5KB | Emoji selector for mood tracking |
| `PrimaryButton.tsx` | 2.5KB | Main action button with variants |
| `ProgressBar.tsx` | 883B | Progress indicator for onboarding |
| `SecondaryButton.tsx` | 1.2KB | Secondary action button |
| `SectionTitle.tsx` | 2.2KB | Section headers with consistent styling |
| `SelectableContextChip.tsx` | 1.9KB | Context selection chips |
| `SliderAtom.tsx` | 1.4KB | Slider input for mood/rating |
| `Spacer.tsx` | 436B | Flexible spacing component |
| `StoryBackground.tsx` | 1.6KB | Background for verse story screen |
| `SurahListItem.tsx` | 2.3KB | Individual Surah list item |
| `Typography.tsx` | 2.5KB | Text component with theme variants |

### **🧬 molecules/** - Component Combinations
**29 Components** | **Complex components built from atoms**

| Component | Purpose |
|-----------|---------|
| `AboutSection.tsx` | App information and version details |
| `AccountSettings.tsx` | User account management |
| `AnswerCard.tsx` | Onboarding answer selection |
| `CategoryCard.tsx` | Chat topic category cards |
| `ChatBubble.tsx` | AI conversation message bubbles |
| `GreetingHeader.tsx` | Personalized welcome headers |
| `HighlightColorPicker.tsx` | Color selection for verse highlighting |
| `HistoryCard.tsx` | Chat history preview cards |
| `JustChatCard.tsx` | Quick chat initiation |
| `MoodSelectorMolecule.tsx` | Mood selection interface |
| `OptionCard.tsx` | Generic option selection card |
| `OptionGroup.tsx` | Grouped option selections |
| `PersonalDetails.tsx` | User profile information |
| `ProfileHeader.tsx` | Profile screen header |
| `PromptInput.tsx` | AI conversation input |
| `ReflectionInput.tsx` | Personal reflection input |
| `ReflectionPreview.tsx` | Generated reflection preview |
| `SocialProofBadge.tsx` | Trust indicators |
| `SubscriptionDetails.tsx` | Premium subscription info |
| `SurahHeader.tsx` | Quran chapter headers |
| `SurahSearchBar.tsx` | Quran chapter search |
| `SurahVerse.tsx` | Individual verse display |
| `TestimonialCard.tsx` | User testimonials |
| `UserAvatarWithBadge.tsx` | Profile avatar with status |
| `VerseActionBar.tsx` | Verse interaction controls |
| `VerseActionSheet.tsx` | Verse action modal |
| `VersePreview.tsx` | Verse preview cards |
| `WidgetIllustration.tsx` | Widget setup illustrations |
| `WidgetsSection.tsx` | Widget configuration |

### **🏢 organisms/** - Complex Layouts
**14 Components** | **High-level component assemblies**

| Component | Purpose |
|-----------|---------|
| `CategoryGridSection.tsx` | Chat categories grid layout |
| `CategoryGroupSection.tsx` | Grouped category sections |
| `ContextSelectionGrid.tsx` | Life context selection grid |
| `DailyStreakCalendarOrganism.tsx` | Calendar with streak tracking |
| `ErrorBoundary.tsx` | Error handling and recovery |
| `HeroCard.tsx` | Main feature showcase cards |
| `OnboardingQuestionBlock.tsx` | Reusable onboarding question layout |
| `SurahList.tsx` | Complete Quran chapter list |
| `VerseActionBottomSheet.tsx` | Verse action modal sheet |
| `VerseList.tsx` | Verse listing with actions |
| `VerseOfTheDayCard.tsx` | Daily verse feature card |
| `WidgetProgressLayout.tsx` | Widget setup progress |
| `WidgetSetupBlock.tsx` | Widget configuration block |
| `YesNoBlock.tsx` | Binary choice question block |

---

## 📱 **screens/** - Application Screens

### **🎓 onboarding/** - User Onboarding Flow
**15 Screens** | **Complete user preference collection**

| Screen | Purpose | State Updates |
|--------|---------|---------------|
| `OnboardingWelcomeScreen.tsx` | Introduction and social proof | None |
| `OnboardingStep1.tsx` | Daily reminder preferences | `reminderTime`, `reminderEnabled` |
| `OnboardingStep2.tsx` | Support type selection | `supportType` |
| `OnboardingStep3.tsx` | Age group selection | `ageGroup` |
| `OnboardingStep4.tsx` | Religious background | `religiousBackground` |
| `OnboardingStep5.tsx` | Islamic knowledge level | `islamicKnowledge` |
| `OnboardingStep6.tsx` | Prayer frequency | `prayerFrequency` |
| `OnboardingStep7.tsx` | Life circumstances | `lifeCircumstances` |
| `OnboardingStep8.tsx` | Primary interests | `primaryInterests` |
| `OnboardingStep9.tsx` | Learning preferences | `learningStyle` |
| `OnboardingStep10.tsx` | Spiritual goals | `spiritualGoals` |
| `OnboardingFinalQuestion1.tsx` | Widget setup part 1 | `widgetPreferences` |
| `OnboardingFinalQuestion2.tsx` | Widget setup part 2 | `widgetConfiguration` |
| `OnboardingFinalQuestion3.tsx` | Completion and navigation | `onboardingCompleted: true` |
| `PaywallScreen.tsx` | Subscription offering | Subscription state |

### **🏠 main/** - Core Application Screens
**11 Screens** | **Post-onboarding functionality**

| Screen | Tab | Purpose |
|--------|-----|---------|
| `TodayHomeScreen.tsx` | Today | Daily spiritual journey hub |
| `MoodCheckinScreen.tsx` | Today | Emotional state tracking |
| `ContextSelectionScreen.tsx` | Today | Life situation selection |
| `ReflectionInputScreen.tsx` | Today | Personal reflection input |
| `ContentGenerationLoadingScreen.tsx` | Today | AI content generation |
| `GeneratedReflectionScreen.tsx` | Today | Personalized content display |
| `ChatHomeScreen.tsx` | Chat | AI conversation categories |
| `TopicChatScreen.tsx` | Chat | Real-time AI conversations |
| `VerseStoryScreen.tsx` | Chat | Immersive verse exploration |
| `HistoryScreen.tsx` | Chat | Conversation history |
| `ProfileScreen.tsx` | Profile | User settings and subscription |

### **📖 quran/** - Quran Reading Experience
**3 Screens** | **Islamic text interaction**

| Screen | Purpose |
|--------|---------|
| `QuranHomeScreen.tsx` | Quran chapter browser and search |
| `SurahSelectionModal.tsx` | Chapter selection modal |
| `TranslationSelectionModal.tsx` | Translation language selection |

---

## 🗃️ **store/** - State Management (Zustand)

**9 Stores** | **Domain-specific state management**

| Store | Size | Purpose | Persistence |
|-------|------|---------|-------------|
| `useAnalyticsStore.ts` | ~2KB | Amplitude event tracking | No |
| `useChatStore.ts` | ~3KB | AI conversations and history | Yes (`@chatData`) |
| `useHistoryStore.ts` | ~2KB | Chat session management | Yes (`@historyData`) |
| `useLocalizationStore.ts` | ~1.5KB | Language and RTL preferences | Yes (`@localization`) |
| `useOnboardingStore.ts` | ~4KB | 13-step onboarding flow | Yes (`@onboardingData`) |
| `useProfileStore.ts` | ~2.5KB | User settings and preferences | Yes (`@profileData`) |
| `usePurchasesStore.ts` | ~3KB | RevenueCat subscription state | Yes (`@purchases`) |
| `useQuranStore.ts` | ~2KB | Surah selection and bookmarks | Yes (`@quranData`) |
| `useTodayStore.ts` | ~4KB | Daily journey and streak tracking | Yes (`@todayData`) |

### **Store Pattern Example**
```typescript
// Standard Zustand store with persistence
export const useExampleStore = create<State>()(
  persist(
    (set, get) => ({
      // State
      data: null,
      loading: false,
      
      // Actions
      setData: (data) => set({ data }),
      
      // Async operations
      fetchData: async () => {
        set({ loading: true });
        try {
          const result = await apiCall();
          set({ data: result, loading: false });
        } catch (error) {
          console.error('Store error:', error);
          set({ loading: false });
        }
      },
    }),
    {
      name: '@storeKey',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

---

## 🧭 **navigation/** - Navigation Architecture

**3 Files** | **React Navigation v6 configuration**

| File | Purpose |
|------|---------|
| `AppNavigator.tsx` | Root navigation with state-driven routing |
| `MainTabNavigator.tsx` | Bottom tab navigation for main app |
| `TodayStackNavigator.tsx` | Stack navigation for Today tab flow |

### **Navigation Structure**
```typescript
AppNavigator
├── OnboardingStack (if !onboardingCompleted)
│   └── All onboarding screens + PaywallScreen
└── MainAppStack (if onboardingCompleted)
    ├── MainTabNavigator
    │   ├── TodayStackNavigator
    │   ├── Chat Tab
    │   ├── Quran Tab
    │   └── Profile Tab
    └── Modal Screens
        ├── TopicChatScreen
        ├── VerseStoryScreen
        └── Various selection modals
```

---

## 🔌 **lib/** - API Integration Layer

### **📁 api/** - External Service Integrations

| File | Purpose | Service |
|------|---------|---------|
| `askQuran.ts` | AI conversation API | OpenAI GPT-3.5-turbo |
| `quranApi.ts` | Quran text and metadata | Static JSON data |
| `todayJourney.ts` | Daily content generation | OpenAI + local processing |
| `todayJourney.test.ts` | Unit tests for journey API | Jest testing |

### **API Pattern Example**
```typescript
// Standard API function with error handling
export const apiFunction = async (params: Params): Promise<Result> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(params),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
```

---

## 🎨 **constants/** - Design System & Static Data

| File | Purpose |
|------|---------|
| `theme.ts` | Complete design system (colors, fonts, spacing, radii) |
| `categoryImages.ts` | Chat category image mappings |
| `surahList.ts` | Complete Quran chapter metadata (114 chapters) |

### **theme.ts Structure**
```typescript
export const theme = {
  colors: {
    // Primary palette
    primary: '#3C8C7E',
    primarySoft: '#D9EDE7',
    accent: '#C9A76D',
    
    // Neutrals
    background: '#F8FAF9',
    surface: '#FFFFFF',
    textPrimary: '#1C2B2D',
    textSecondary: '#5B6C70',
    textMuted: '#889396',
    
    // Status colors
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
  fonts: {
    heading: 'Merriweather_700Bold',
    body: 'Merriweather_400Regular',
    mono: 'System', // fallback
  },
  fontSizes: {
    h1: 28, h2: 22, h3: 18,
    title: 20, body: 16, caption: 12,
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
  },
  radii: {
    sm: 4, md: 8, lg: 16, xl: 24, full: 9999,
  },
};
```

---

## 🌍 **localization/** - Internationalization

**4 Files** | **English/Arabic with RTL support**

| File | Purpose |
|------|---------|
| `en.json` | English translations (primary language) |
| `ar.json` | Arabic translations with RTL considerations |
| `index.ts` | i18n-js setup with expo-localization |
| `LocalizationContext.tsx` | React context for language switching |

### **Translation Pattern**
```typescript
// en.json structure
{
  "welcomeTitle": "Welcome to Quran Chat",
  "continueButton": "Continue",
  "categories": {
    "gratitude": "Gratitude",
    "patience": "Patience"
  }
}

// Usage in components
import { t } from '../localization';
<Typography variant="h2">{t('welcomeTitle')}</Typography>
```

---

## 🛠️ **utils/** - Helper Functions

| File | Purpose |
|------|---------|
| `bookmarks.ts` | Verse bookmarking utilities |
| `formatChatSession.ts` | Chat history formatting |
| `getVerseReflectionPrompt.ts` | AI prompt generation |
| `gpt.ts` | OpenAI API utilities |
| `localizationHelpers.ts` | i18n utility functions |
| `rtl.ts` | Right-to-left layout helpers |

---

## 🎯 **hooks/** - Custom React Hooks

| File | Purpose |
|------|---------|
| `useReflectionGenerator.ts` | Daily reflection content generation |

---

## 📁 **assets/** - Static Resources

### **🎨 images/** - App Images
- `verse-story-bg.jpg` - Background for verse story screen

### **📂 category/** - Category Icons
- `creation.png` - Creation/nature category
- `forgiveness.png` - Forgiveness category  
- `gratitude.png` - Gratitude category
- `patience.png` - Patience category
- `purpose.png` - Life purpose category
- `relationships.png` - Relationships category
- `worship.png` - Worship category

### **📱 App Icons**
- `icon.png` - Main app icon
- `adaptive-icon.png` - Android adaptive icon
- `splash.png` - Launch screen
- `favicon.png` - Web favicon

---

## 📄 **Configuration Files**

### **React Native & Expo**
- **`app.json`** - Expo configuration (app name, version, icons, etc.)
- **`eas.json`** - Expo Application Services build configuration
- **`metro.config.js`** - Metro bundler configuration
- **`babel.config.js`** - Babel transpilation settings

### **TypeScript & Dependencies**
- **`tsconfig.json`** - TypeScript compilation settings
- **`package.json`** - Project metadata and dependencies
- **`package-lock.json`** - Exact dependency versions (npm)
- **`yarn.lock`** - Exact dependency versions (yarn)

### **Development Tools**
- **`.gitignore`** - Git ignore patterns
- **`extractStrings.js`** - i18n string extraction utility

---

## 📚 **docs/** - Project Documentation

**5 Files** | **Comprehensive project documentation**

| File | Purpose |
|------|---------|
| `DEVELOPMENT.md` | Complete development guide and standards |
| `DESIGN_SYSTEM.md` | Visual design principles and patterns |
| `API.md` | API integrations and data flow documentation |
| `DEPLOYMENT.md` | Build and release process guide |
| `PROJECT_STRUCTURE.md` | This file - complete project structure |

---

## 📝 **scripts/** - Build & Utility Scripts

| File | Purpose |
|------|---------|
| `rtl-analysis-report.md` | RTL implementation analysis |
| `rtl-codemod-usage.md` | RTL codemod documentation |
| `rtl-codemod.js` | Automated RTL conversion script |
| `rtl-implementation-summary.md` | RTL implementation summary |

---

## 📋 **Legacy & Reference Documents**

| File | Purpose |
|------|---------|
| `CHATGPT_PROJECT_BRIEF.txt` | Original project brief (legacy) |
| `CHATGPT_COLLABORATION_BRIEF.md` | Current ChatGPT guidance document |
| `RTL-Status-Report.md` | RTL implementation status |
| `RTL-Implementation-Progress-Brief.md` | RTL progress tracking |
| `RTL-Codemod-Results.md` | RTL conversion results |
| `LOCALIZATION_IMPLEMENTATION_BRIEF_FOR_CHATGPT.md` | i18n guidance |
| `LOCALIZATION_IMPLEMENTATION_SUMMARY.md` | i18n implementation summary |

---

## 🎯 **Key Patterns & Conventions**

### **File Naming**
- **Components**: `PascalCase.tsx` (e.g., `OnboardingStep1.tsx`)
- **Hooks**: `camelCase.ts` (e.g., `useOnboardingStore.ts`)
- **Utilities**: `camelCase.ts` (e.g., `formatChatSession.ts`)
- **Constants**: `camelCase.ts` (e.g., `theme.ts`)

### **Import Patterns**
```typescript
// React imports first
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Third-party imports
import { create } from 'zustand';

// Internal imports (relative paths)
import { theme } from '../constants/theme';
import { Typography } from '../components/atoms/Typography';
```

### **Component Structure**
```typescript
// 1. Imports
// 2. Interfaces/Types
// 3. Component definition
// 4. Styles using StyleSheet.create()
// 5. Always use theme values, never hardcode
```

### **State Management**
- **Zustand stores** for all app-wide state
- **AsyncStorage persistence** for important data
- **Domain-specific stores** (not one giant store)
- **Clear action naming** and error handling

---

## 🔧 **Build & Development Flow**

### **Development Commands**
```bash
# Start development server
npm start
# or
expo start

# Run on iOS
npm run ios

# Run on Android  
npm run android

# Build production
eas build --platform all
```

### **Key Dependencies**
- **React Native**: 0.79.5
- **Expo SDK**: 53.0.20
- **TypeScript**: 5.8.3
- **Zustand**: 4.4.7 (state management)
- **React Navigation**: v6 (navigation)
- **OpenAI**: API integration for AI features
- **Amplitude**: 2.17.3 (analytics)
- **RevenueCat**: 9.0.0 (subscriptions)

---

## 📊 **Project Statistics**

### **Code Metrics**
- **📱 React Components**: 93 TSX files
- **⚙️ TypeScript Files**: 24 TS files  
- **🗃️ Total Code Files**: 117 files
- **📋 Configuration Files**: 8 JSON files
- **📖 Documentation**: 14 Markdown files

### **Component Breakdown**
- **🔬 Atoms**: 16 components (basic UI elements)
- **🧬 Molecules**: 29 components (combined UI elements)
- **🏢 Organisms**: 14 components (complex layouts)
- **📱 Screens**: 29 screens (onboarding + main + quran)
- **🗃️ Stores**: 9 Zustand stores (state management)

### **Architecture Highlights**
- **🎨 Atomic Design**: Strict component hierarchy for scalability
- **🔄 State Management**: Zustand with AsyncStorage persistence
- **🌍 Internationalization**: Full English/Arabic RTL support
- **🤖 AI Integration**: OpenAI GPT-3.5-turbo with spiritual guidance
- **📊 Analytics**: Amplitude integration with privacy focus
- **💰 Monetization**: RevenueCat subscription management
- **🧭 Navigation**: React Navigation v6 with state-driven routing

### **Production Readiness**
- **✅ TypeScript**: 100% type coverage
- **✅ Error Handling**: Comprehensive error boundaries and graceful degradation
- **✅ Performance**: Optimized for mobile with proper state management
- **✅ Testing**: Unit tests for critical API functions
- **✅ Documentation**: Complete developer and deployment guides
- **✅ Internationalization**: Multi-language support with RTL
- **✅ Analytics**: Production monitoring and event tracking
- **✅ CI/CD**: EAS build and deployment configuration

---

**This structure represents a production-ready React Native app with comprehensive spiritual AI features, following atomic design principles, and maintaining clean separation of concerns across all domains.** 