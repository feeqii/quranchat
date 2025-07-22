# 👨‍💻 Development Guide

This guide covers everything you need to know to develop and contribute to the Quran Chat app.

---

## 🛠️ **Setup & Environment**

### **Prerequisites**
```bash
# Required software
Node.js >= 18.0.0
npm >= 8.0.0
Expo CLI >= 6.0.0
```

### **IDE Configuration**
**VS Code Extensions:**
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Expo Tools
- React Native Tools
- Prettier - Code formatter

### **Environment Variables**
Create a `.env` file in the project root:
```bash
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
```

---

## 📋 **Code Standards**

### **File Naming Conventions**
```
✅ Correct:
- OnboardingStep1.tsx
- useOnboardingStore.ts
- theme.ts
- categoryImages.ts

❌ Incorrect:
- onboardingStep1.jsx
- OnboardingStore.js
- Theme.js
- category-images.ts
```

### **Import Order**
```typescript
// 1. React and React Native
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-party libraries
import { useNavigation } from '@react-navigation/native';

// 3. Internal imports (constants, stores, utils)
import { theme } from '../constants/theme';
import { useOnboardingStore } from '../store/useOnboardingStore';

// 4. Component imports
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { Typography } from '../components/atoms/Typography';

// 5. Type imports (if not inline)
import type { ComponentProps } from './types';
```

### **Component Structure**
```typescript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

// 1. Props interface
interface Props {
  title: string;
  subtitle?: string;
  onPress: () => void;
  disabled?: boolean;
}

// 2. Component implementation
export const ComponentName: React.FC<Props> = ({ 
  title, 
  subtitle,
  onPress, 
  disabled = false 
}) => {
  // 3. Hooks and state
  const [isLoading, setIsLoading] = useState(false);
  
  // 4. Event handlers
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };
  
  // 5. Render
  return (
    <View style={styles.container}>
      {/* Component JSX */}
    </View>
  );
};

// 6. Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
});
```

---

## 🏗️ **Architecture Patterns**

### **Atomic Design Implementation**

#### **Atoms (Basic UI Elements)**
```typescript
// components/atoms/PrimaryButton.tsx
export const PrimaryButton: React.FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Typography variant="button">{label}</Typography>
    </TouchableOpacity>
  );
};
```

#### **Molecules (Grouped Elements)**
```typescript
// components/molecules/OptionCard.tsx
export const OptionCard: React.FC<Props> = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, selected && styles.selected]}>
      <Typography variant="body">{title}</Typography>
      {selected && <Icon.Check />}
    </TouchableOpacity>
  );
};
```

#### **Organisms (Complex Sections)**
```typescript
// components/organisms/OnboardingQuestionBlock.tsx
export const OnboardingQuestionBlock: React.FC<Props> = ({ 
  title, subtitle, progress, children 
}) => {
  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <SectionTitle title={title} subtitle={subtitle} />
      {children}
    </View>
  );
};
```

#### **Screens (Full Layouts)**
```typescript
// screens/onboarding/OnboardingStep1.tsx
export const OnboardingStep1: React.FC = () => {
  const { setField } = useOnboardingStore();
  
  return (
    <OnboardingQuestionBlock title="Question" progress={10}>
      <YesNoBlock onYes={handleYes} onNo={handleNo} />
    </OnboardingQuestionBlock>
  );
};
```

---

## 📦 **State Management**

### **Zustand Store Pattern**
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Define types
interface StoreState {
  // State properties
  data: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setData: (data: string) => void;
  clearData: () => void;
  fetchData: () => Promise<void>;
}

// 2. Create store with persistence
export const useExampleStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      data: null,
      isLoading: false,
      error: null,
      
      // Actions
      setData: (data: string) => set({ data, error: null }),
      
      clearData: () => set({ data: null, error: null }),
      
      fetchData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiCall();
          set({ data: response.data, isLoading: false });
        } catch (error) {
          set({ 
            error: error.message, 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: '@exampleData',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist specific fields
      partialize: (state) => ({ 
        data: state.data 
      }),
    }
  )
);
```

### **Store Usage in Components**
```typescript
export const ExampleComponent: React.FC = () => {
  const { data, isLoading, error, fetchData } = useExampleStore();
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <DataDisplay data={data} />;
};
```

---

## 🎨 **Styling Guidelines**

### **Theme Usage**
```typescript
// ✅ Always use theme values
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    marginVertical: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fontSizes.h2,
    fontFamily: theme.fonts.heading,
    color: theme.colors.textPrimary,
    lineHeight: theme.lineHeights.h2,
  },
});

// ❌ Never hardcode values
const badStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
});
```

### **Responsive Design**
```typescript
import { useWindowDimensions } from 'react-native';

export const ResponsiveComponent: React.FC = () => {
  const { width: screenWidth } = useWindowDimensions();
  
  const isSmallScreen = screenWidth < 360;
  const logoSize = isSmallScreen ? 100 : 120;
  
  return (
    <View style={[
      styles.container,
      { width: screenWidth * 0.9 }
    ]}>
      <Image 
        source={logo} 
        style={{ width: logoSize, height: logoSize }} 
      />
    </View>
  );
};
```

---

## 🧪 **Navigation Patterns**

### **Screen Navigation**
```typescript
import { useNavigation } from '@react-navigation/native';

export const ExampleScreen: React.FC = () => {
  const navigation = useNavigation();
  
  const handleNext = () => {
    // Navigate to named screen
    navigation.navigate('OnboardingStep2' as never);
  };
  
  const handleBack = () => {
    // Go back in stack
    navigation.goBack();
  };
  
  const handleModal = () => {
    // Open modal screen
    navigation.navigate('SurahSelectionModal' as never);
  };
};
```

### **State-Driven Navigation**
```typescript
// In AppNavigator.tsx
export const AppNavigator: React.FC = () => {
  const { onboardingCompleted } = useOnboardingStore();
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {onboardingCompleted ? (
          <Stack.Screen name="MainApp" component={MainAppStack} />
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

---

## 🔌 **API Integration**

### **OpenAI Integration Pattern**
```typescript
// lib/api/askQuran.ts
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const askQuran = async (
  prompt: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> => {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: 'user', content: prompt }
    ];
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to get AI response');
  }
};
```

### **Error Handling Pattern**
```typescript
export const useApiCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const makeApiCall = async (apiFunction: () => Promise<any>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction();
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  };
  
  return { isLoading, error, makeApiCall };
};
```

---

## 📊 **Analytics Implementation**

### **Event Tracking**
```typescript
// Using analytics store
const { logEvent } = useAnalyticsStore();

// Screen view tracking
useEffect(() => {
  logEvent({ name: 'screen_view', screenName: 'OnboardingStep1' });
}, [logEvent]);

// User action tracking
const handleButtonPress = () => {
  logEvent({ name: 'onboarding_complete_step', step: 1 });
  // Handle button press
};

// Custom events with context
const handleMoodSelection = (mood: string) => {
  logEvent({ 
    name: 'mood_checkin', 
    mood, 
    context: 'daily_journey' 
  });
};
```

### **Analytics Event Types**
```typescript
export type AnalyticsEvent =
  // Screen tracking
  | { name: 'screen_view'; screenName: string }
  
  // Onboarding
  | { name: 'onboarding_start' }
  | { name: 'onboarding_complete_step'; step: number }
  | { name: 'onboarding_finish' }
  
  // User interactions
  | { name: 'chat_session_started' }
  | { name: 'verse_lookup'; surah: string; verse: number }
  | { name: 'mood_checkin'; mood: string; context: string };
```

---

## 🌍 **Internationalization**

### **Adding New Translations**
```typescript
// 1. Add to en.json
{
  "newFeatureTitle": "New Feature",
  "newFeatureDescription": "This is a new feature description"
}

// 2. Add to ar.json  
{
  "newFeatureTitle": "ميزة جديدة",
  "newFeatureDescription": "هذا وصف لميزة جديدة"
}

// 3. Use in component
const title = t('newFeatureTitle');
const description = t('newFeatureDescription');
```

### **RTL Support**
```typescript
import { getLocale, isRTL } from '../localization';

const styles = StyleSheet.create({
  container: {
    flexDirection: isRTL() ? 'row-reverse' : 'row',
    textAlign: isRTL() ? 'right' : 'left',
  },
});
```

---

## 🧪 **Testing Guidelines**

### **Component Testing**
```typescript
// __tests__/PrimaryButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PrimaryButton } from '../components/atoms/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PrimaryButton label="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <PrimaryButton label="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### **Store Testing**
```typescript
// __tests__/useOnboardingStore.test.ts
import { useOnboardingStore } from '../store/useOnboardingStore';

describe('useOnboardingStore', () => {
  beforeEach(() => {
    useOnboardingStore.getState().resetOnboarding();
  });
  
  it('sets field correctly', () => {
    const { setField } = useOnboardingStore.getState();
    
    setField('ageGroup', '25-34');
    
    const { ageGroup } = useOnboardingStore.getState();
    expect(ageGroup).toBe('25-34');
  });
});
```

---

## 🚀 **Performance Guidelines**

### **Optimization Patterns**
```typescript
// 1. Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// 2. Memoize callbacks
const handlePress = useCallback(() => {
  onPress(id);
}, [onPress, id]);

// 3. Optimize FlatList rendering
const renderItem = useCallback(({ item }) => (
  <ListItem item={item} />
), []);

// 4. Use React.memo for pure components
export const ListItem = React.memo<Props>(({ item }) => {
  return <View>{item.title}</View>;
});
```

### **Image Optimization**
```typescript
// Use appropriate image formats and sizes
const CATEGORY_IMAGES = {
  creation: require('../assets/category/creation.png'), // Optimized PNG
  patience: require('../assets/category/patience.webp'), // WebP for better compression
};

// Lazy load images
const [imageLoaded, setImageLoaded] = useState(false);

<Image
  source={categoryImage}
  onLoad={() => setImageLoaded(true)}
  style={[
    styles.image,
    { opacity: imageLoaded ? 1 : 0 }
  ]}
/>
```

---

## 🔧 **Debugging Tools**

### **Development Utilities**
```typescript
// Debug store state
if (__DEV__) {
  console.log('Store state:', useOnboardingStore.getState());
}

// Network debugging
if (__DEV__) {
  console.log('API Request:', { url, method, data });
}

// Performance monitoring
const startTime = Date.now();
await expensiveOperation();
if (__DEV__) {
  console.log('Operation took:', Date.now() - startTime, 'ms');
}
```

### **Expo Dev Tools**
```bash
# Enable remote debugging
- Press 'j' in Expo CLI to open debugger
- Use React Native Debugger for enhanced debugging
- Enable Performance Monitor for FPS tracking
```

---

## 📋 **Pre-commit Checklist**

Before committing code, ensure:

- [ ] TypeScript compiles without errors
- [ ] All imports use correct paths
- [ ] Theme values used for all styling
- [ ] Components follow atomic design pattern
- [ ] Analytics events are properly tracked
- [ ] New features have proper error handling
- [ ] Internationalization keys are added
- [ ] Code is properly formatted (Prettier)
- [ ] No console.log statements in production code
- [ ] Tests pass (if applicable)

---

## 🆘 **Common Issues & Solutions**

### **Metro Bundler Issues**
```bash
# Clear cache and restart
npx expo start --clear

# Reset Metro cache
npx expo install --fix
```

### **TypeScript Errors**
```bash
# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"

# Check tsconfig.json paths
```

### **Navigation Issues**
```typescript
// Always use 'as never' for navigation
navigation.navigate('ScreenName' as never);

// Check if screen is registered in AppNavigator.tsx
```

### **State Persistence Issues**
```typescript
// Clear AsyncStorage for testing
import AsyncStorage from '@react-native-async-storage/async-storage';

if (__DEV__) {
  AsyncStorage.clear();
}
```

---

This development guide should be your go-to reference for maintaining code quality and consistency across the Quran Chat project. 