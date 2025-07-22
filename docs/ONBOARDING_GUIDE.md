# 🎓 Onboarding Flow Documentation - Quran Chat

**Last Updated**: July 22, 2025  
**Purpose**: Comprehensive guide to every onboarding screen, component usage, state management, and user experience patterns

---

## 📋 **Onboarding Overview**

### **🎯 Purpose**
The onboarding flow collects user preferences to personalize the Quran Chat experience. It consists of **15 screens** that guide users through preference collection, subscription offering, and final setup.

### **📊 Flow Structure**
```
Welcome → Steps 1-10 → Final Questions 1-3 → Complete
    ↓
Paywall (between steps as needed)
```

### **🗃️ State Management**
- **Store**: `useOnboardingStore.ts` (Zustand with AsyncStorage persistence)
- **Persistence Key**: `@onboardingData`
- **Completion Trigger**: `completeOnboarding()` → navigates to main app

---

## 🏁 **Screen-by-Screen Breakdown**

### **🎪 OnboardingWelcomeScreen.tsx**
**Size**: 3.2KB | **Lines**: 116 | **Progress**: N/A

#### **Purpose**
- App introduction and brand presentation
- Social proof to build trust
- Entry point to onboarding flow

#### **Components Used**
```typescript
// Organisms
├── HeroCard (60% screen height with background image)

// Molecules  
├── SocialProofBadge (trust indicators)

// Atoms
├── SectionTitle (hero variant, center-aligned)
├── PrimaryButton (hero variant)
└── Typography (app logo text)
```

#### **Layout Structure**
```typescript
SafeAreaView (primary soft background)
└── HeroCard (verse-story-bg.jpg background)
    ├── App Logo (circular, white surface)
    ├── SectionTitle (welcomeTitle + welcomeSubtitle)
    ├── SocialProofBadge (trust indicators)
    └── PrimaryButton (continue)
```

#### **State Changes**
- **Analytics**: `onboarding_start` event
- **Navigation**: → `OnboardingStep1`
- **Store Updates**: None

#### **Key Features**
- **Responsive logo sizing** (100px/120px based on screen width)
- **Background overlay** (40% opacity)
- **Status bar styling** (dark content on soft background)

---

### **📱 OnboardingStep1.tsx**
**Size**: 1.3KB | **Lines**: 46 | **Progress**: 10%

#### **Purpose**
Collect daily reminder preference (Yes/No)

#### **Components Used**
```typescript
// Organisms
├── OnboardingQuestionBlock (layout wrapper)
└── YesNoBlock (binary choice)

// Layout
└── SafeAreaView (background wrapper)
```

#### **State Changes**
- **Field**: `wantsDailyReminder: boolean`
- **Analytics**: `onboarding_complete_step: 1`
- **Navigation**: → `OnboardingStep2`

#### **Pattern**
- **Question Type**: Binary (Yes/No)
- **Layout**: Standard question block with progress bar
- **Validation**: None (both options advance)

---

### **📱 OnboardingStep2.tsx**
**Size**: 2.5KB | **Lines**: 85 | **Progress**: 20%

#### **Purpose**
Select support type preference (study vs. life struggles)

#### **Components Used**
```typescript
// Organisms
├── OnboardingQuestionBlock (layout wrapper)

// Molecules
├── OptionCard (selectable options)

// Atoms
├── PrimaryButton (continue - disabled until selection)
└── Typography (within components)
```

#### **Layout Structure**
```typescript
OnboardingQuestionBlock
└── Content (space-between layout)
    ├── OptionsContainer (flex: 1)
    │   └── OptionCard[] (mapped from supportOptions)
    └── ButtonContainer 
        └── PrimaryButton (disabled until selection)
```

#### **State Management**
- **Local State**: `selectedOption: string | null`
- **Store Field**: `supportType: string`
- **Validation**: Button disabled until option selected

#### **Options**
1. `justStudyTheQuran`
2. `overcomeLifeStrugglesAndChallenges`

---

### **📱 OnboardingStep3.tsx**
**Size**: 5.6KB | **Lines**: 203 | **Progress**: 30%

#### **Purpose**
Visualize faith growth potential with chart and premium messaging

#### **Components Used**
```typescript
// Organisms
├── OnboardingQuestionBlock (layout wrapper)

// Atoms
├── PrimaryButton (continue)
└── Typography (chart labels and messaging)

// Custom Elements
└── Faith Growth Chart (custom SVG-style visualization)
```

#### **Special Features**
- **Data Visualization**: Custom faith growth chart
- **Chart Points**: 7 months of growth trajectory (20% → 85%)
- **Premium Messaging**: Hints at premium features
- **Visual Elements**: Gradient background, curve points, markers

#### **Chart Data**
```typescript
const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
const values = [20, 35, 30, 50, 60, 75, 85]; // Growth trajectory
```

#### **State Changes**
- **Field**: None (visualization only)
- **Navigation**: → `OnboardingStep4`

---

### **📱 OnboardingStep4.tsx**
**Size**: 2.2KB | **Lines**: 76 | **Progress**: 40%

#### **Purpose**
Collect age group information

#### **Components Used**
```typescript
// Standard single-selection pattern
├── OnboardingQuestionBlock
├── OptionCard[] (age groups)
└── PrimaryButton (disabled until selection)
```

#### **State Changes**
- **Field**: `ageGroup: string`
- **Options**: Age ranges (implementation-specific)

---

### **📱 OnboardingStep5.tsx**
**Size**: 2.2KB | **Lines**: 77 | **Progress**: 50%

#### **Purpose**
Assess Islamic background/knowledge level

#### **Components Used**
```typescript
// Standard single-selection pattern
├── OnboardingQuestionBlock
├── OptionCard[] (knowledge levels)
└── PrimaryButton (disabled until selection)
```

#### **State Changes**
- **Field**: `islamicBackground: string`

---

### **📱 OnboardingStep6.tsx**
**Size**: 2.1KB | **Lines**: 75 | **Progress**: 60%

#### **Purpose**
Prayer frequency assessment

#### **Components Used**
```typescript
// Standard single-selection pattern
├── OnboardingQuestionBlock
├── OptionCard[] (prayer frequencies)
└── PrimaryButton (disabled until selection)
```

---

### **📱 OnboardingStep7.tsx**
**Size**: 2.2KB | **Lines**: 76 | **Progress**: 70%

#### **Purpose**
Life circumstances assessment

#### **Components Used**
```typescript
// Standard single-selection pattern
├── OnboardingQuestionBlock
├── OptionCard[] (life situations)
└── PrimaryButton (disabled until selection)
```

---

### **📱 OnboardingStep8.tsx**
**Size**: 1.8KB | **Lines**: 63 | **Progress**: 80%

#### **Purpose**
Primary interests selection

#### **Components Used**
```typescript
// Standard single-selection pattern
├── OnboardingQuestionBlock
├── OptionCard[] (interest categories)
└── PrimaryButton (disabled until selection)
```

---

### **📱 OnboardingStep9.tsx**
**Size**: 2.4KB | **Lines**: 90 | **Progress**: 90%

#### **Purpose**
Learning preferences assessment

#### **Components Used**
```typescript
// Standard single-selection pattern
├── OnboardingQuestionBlock
├── OptionCard[] (learning styles)
└── PrimaryButton (disabled until selection)
```

---

### **📱 OnboardingStep10.tsx**
**Size**: 3.6KB | **Lines**: 112 | **Progress**: 100%

#### **Purpose**
Final comprehensive assessment with multiple Yes/No questions

#### **Components Used**
```typescript
// Organisms
├── OnboardingQuestionBlock (layout wrapper)
├── YesNoBlock[] (multiple questions in ScrollView)

// Atoms
└── PrimaryButton (finish - disabled until all answered)
```

#### **Unique Pattern - Multi-Question**
```typescript
// Local state for each question
const [isLikelyToFinish, setIsLikelyToFinish] = useState<boolean | null>(null);
const [wantsDailyReminder, setWantsDailyReminder] = useState<boolean | null>(null);
const [wantsInstantAccess, setWantsInstantAccess] = useState<boolean | null>(null);

// Validation: all questions must be answered
const allQuestionsAnswered = 
  isLikelyToFinish !== null && 
  wantsDailyReminder !== null && 
  wantsInstantAccess !== null;
```

#### **Questions**
1. "Do you finish what you start?"
2. "Would you like a daily reminder?"
3. "Do you want instant access to Quranic insights?"

#### **State Changes**
- **Fields**: `isLikelyToFinish`, `wantsDailyReminder`, `wantsInstantAccess`
- **Analytics**: `onboarding_finish`
- **Action**: `completeOnboarding()` → triggers navigation to main app

---

### **📱 OnboardingFinalQuestion1.tsx**
**Size**: 1.7KB | **Lines**: 59 | **Progress**: Widget Setup

#### **Purpose**
Begin widget setup flow with specialized layout

#### **Components Used**
```typescript
// Organisms
├── WidgetProgressLayout (specialized layout)
└── YesNoBlock (widget question)

// Atoms
└── Typography (pre-question text)
```

#### **Layout Pattern**
- **Widget Progress Layout**: Shows analyzing/creating/setting up progress
- **Specialized Styling**: Different from standard onboarding blocks

---

### **📱 OnboardingFinalQuestion2.tsx**
**Size**: 1.7KB | **Lines**: 59 | **Progress**: Widget Setup

#### **Purpose**
Continue widget setup with progress visualization

#### **Components Used**
```typescript
// Same pattern as FinalQuestion1
├── WidgetProgressLayout
├── Typography (pre-question)
└── YesNoBlock
```

---

### **📱 OnboardingFinalQuestion3.tsx**
**Size**: 1.6KB | **Lines**: 57 | **Progress**: Widget Setup Complete

#### **Purpose**
Complete onboarding with instant access preference

#### **Components Used**
```typescript
// Organisms
├── WidgetProgressLayout (100% progress on all bars)
└── YesNoBlock (final question)

// Atoms
└── Typography (italic styling for pre-question)
```

#### **Completion Logic**
```typescript
const handleYes = () => {
  setField('wantsInstantAccess', true);
  completeOnboarding(); // Triggers navigation to main app
};

const handleNo = () => {
  setField('wantsInstantAccess', false);
  completeOnboarding(); // Triggers navigation to main app
};
```

#### **Final State**
- **Field**: `wantsInstantAccess: boolean`
- **Action**: `completeOnboarding()` sets `onboardingCompleted: true`
- **Navigation**: Automatic routing to `MainAppStack`

---

### **💰 PaywallScreen.tsx**
**Size**: 6.9KB | **Lines**: 285 | **Can appear between steps**

#### **Purpose**
Premium subscription offering with RevenueCat integration

#### **Components Used**
```typescript
// Atoms
├── Typography (various variants)
├── PrimaryButton (subscribe)
├── Icon (check marks for features)
└── Spacer (layout spacing)

// Layout
├── ScrollView (content container)
├── Image (premium illustrations)
└── TouchableOpacity (charity link)
```

#### **Key Features**
- **RevenueCat Integration**: `usePurchasesStore` hooks
- **Feature List**: Premium benefits with check icons
- **Charity Component**: UNRWA donation link
- **Analytics**: Purchase tracking events
- **Restore Purchases**: For existing subscribers

#### **Premium Features Listed**
```typescript
const PREMIUM_FEATURES = [
  'unlimitedVerses',
  'dailyReflections', 
  'prioritySupport',
  'darkModeThemes'
];
```

#### **Purchase Flow**
```typescript
const handlePurchase = async () => {
  logEvent({ name: 'paywall_subscribe_tap' });
  await purchaseWeekly();
  logEvent({ name: 'paywall_purchase_success' });
};
```

#### **Auto-Navigation**
```typescript
useEffect(() => {
  if (isEntitled) {
    navigation.replace('MainApp' as never);
  }
}, [isEntitled, navigation]);
```

---

## 🧩 **Component Architecture**

### **🏢 Organisms (Layout Components)**

#### **OnboardingQuestionBlock.tsx**
**Size**: 2.1KB | **Lines**: 56

**Purpose**: Standard layout wrapper for onboarding questions

**Props**:
```typescript
interface OnboardingQuestionBlockProps {
  title: string;           // Main question title
  subtitle?: string;       // Optional subtitle
  progress?: number;       // Progress percentage (0-100)
  children: React.ReactNode; // Question content
  style?: ViewStyle;       // Optional custom styling
}
```

**Layout Structure**:
```typescript
Container (flex: 1, padding: lg)
├── ProgressBar (if progress provided)
├── SectionTitle (title + subtitle)
└── Content (flex: 1) → children
```

**Usage Pattern**:
```typescript
<OnboardingQuestionBlock
  title={t('questionTitle')}
  subtitle={t('questionSubtitle')}
  progress={30}
>
  {/* Question content */}
</OnboardingQuestionBlock>
```

#### **YesNoBlock.tsx**
**Size**: 2.0KB | **Lines**: 60

**Purpose**: Binary choice component for Yes/No questions

**Props**:
```typescript
interface YesNoBlockProps {
  question: string;        // Question text
  onYes: () => void;      // Yes callback
  onNo: () => void;       // No callback
  style?: ViewStyle;      // Optional styling
}
```

**Layout**:
```typescript
Container
├── Typography (question, center-aligned)
└── ButtonContainer
    ├── PrimaryButton ("Yes")
    └── SecondaryButton ("No")
```

#### **WidgetProgressLayout.tsx**
**Used in**: Final Questions 1-3

**Purpose**: Specialized layout for widget setup with progress bars

**Features**:
- **Three Progress Bars**: Analyzing, Creating, Setting Up
- **Progress Animation**: Visual feedback for setup process
- **Different Styling**: Widget-specific design patterns

### **🧬 Molecules (Interactive Components)**

#### **OptionCard.tsx**
**Used in**: Steps 2, 3, 4, 5, 6, 7, 8, 9

**Purpose**: Selectable option cards for single-choice questions

**Features**:
- **Selection State**: Visual feedback for selected/unselected
- **Press Handling**: Callback for option selection
- **Consistent Styling**: Theme-based appearance
- **Accessibility**: Proper touch targets and feedback

### **🔬 Atoms (Basic Elements)**

#### **PrimaryButton.tsx**
**Used in**: All screens

**Variants**:
- **Default**: Standard onboarding button
- **Hero**: Large button for welcome screen
- **Disabled State**: When validation requirements not met

#### **SectionTitle.tsx**
**Used in**: All screens with OnboardingQuestionBlock

**Variants**:
- **Hero**: Large, center-aligned for welcome
- **Standard**: Regular size for question screens

#### **ProgressBar.tsx**
**Used in**: Steps 1-10

**Purpose**: Visual progress indicator (10% increments)

---

## 🗃️ **State Management Deep Dive**

### **useOnboardingStore.ts Structure**

#### **State Fields**
```typescript
type OnboardingState = {
  wantsDailyReminder: boolean | null;    // Step 1
  supportType: string | null;            // Step 2
  heardFrom: string | null;              // Step 3 (collected but not shown)
  ageGroup: string | null;               // Step 4
  islamicBackground: string | null;       // Step 5
  isLikelyToFinish: boolean | null;      // Step 10
  wantsInstantAccess: boolean | null;    // Step 10 & Final Question 3
  onboardingCompleted: boolean;          // Completion flag
};
```

#### **Actions**
```typescript
type OnboardingActions = {
  setField: <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) => void;
  completeOnboarding: () => void;
};
```

#### **Persistence**
- **Storage**: AsyncStorage with JSON serialization
- **Key**: `@onboardingData`
- **Persistence**: All fields persisted automatically

#### **Usage Pattern**
```typescript
// In onboarding screens
const { setField, completeOnboarding } = useOnboardingStore();

// Set individual fields
setField('supportType', selectedOption);

// Complete the entire flow
completeOnboarding(); // Sets onboardingCompleted: true
```

### **Navigation Integration**

#### **AppNavigator.tsx Logic**
```typescript
// State-driven routing
const { onboardingCompleted } = useOnboardingStore();

return onboardingCompleted ? (
  <MainAppStack />
) : (
  <OnboardingStack />
);
```

#### **Completion Flow**
1. **Final screen calls** `completeOnboarding()`
2. **Store updates** `onboardingCompleted: true`
3. **AppNavigator detects** state change
4. **Auto-navigation** to `MainAppStack`
5. **Persistence** ensures user doesn't see onboarding again

---

## 📊 **Analytics Integration**

### **Event Tracking**
```typescript
// Screen entry
logEvent({ name: 'onboarding_start' });

// Step completion
logEvent({ name: 'onboarding_complete_step', step: 5 });

// Final completion
logEvent({ name: 'onboarding_finish' });

// Paywall interactions
logEvent({ name: 'paywall_view' });
logEvent({ name: 'paywall_subscribe_tap' });
logEvent({ name: 'paywall_purchase_success' });
```

### **Privacy Considerations**
- **No PII**: Only anonymous usage data
- **User Preferences**: Stored locally, not sent to analytics
- **Completion Rates**: Track funnel performance
- **Error Tracking**: Purchase failures and technical issues

---

## 🎨 **Design Patterns**

### **Visual Hierarchy**
1. **Progress Bar** (top, progress indication)
2. **Title/Subtitle** (question presentation)
3. **Content Area** (flexible, question-specific)
4. **Action Area** (bottom, navigation buttons)

### **Spacing System**
```typescript
// Consistent spacing using theme
padding: theme.spacing.lg,           // Container padding (24px)
marginBottom: theme.spacing.xl,      // Section spacing (32px)
marginBottom: theme.spacing.md,      // Item spacing (16px)
```

### **Color Usage**
- **Background**: `theme.colors.background` (light gray)
- **Primary Actions**: `theme.colors.primary` (teal)
- **Text Hierarchy**: `textPrimary` → `textSecondary` → `textMuted`
- **Progress**: `theme.colors.primary` (visual progress)

### **Typography Scale**
- **Titles**: `h2` (22px, heading font)
- **Questions**: `body` (16px, body font)
- **Buttons**: Built-in button typography
- **Captions**: `caption` (12px, muted color)

---

## 🔄 **User Experience Patterns**

### **Progressive Disclosure**
- **Simple to Complex**: Start with Yes/No, progress to selections
- **Visual Feedback**: Progress bar shows advancement
- **Validation**: Buttons disabled until valid selection
- **Error Prevention**: Clear options, no invalid states

### **Engagement Techniques**
- **Social Proof**: Welcome screen testimonials
- **Visualization**: Faith growth chart in Step 3
- **Personalization**: Questions build user profile
- **Completion Psychology**: Progress bar encourages completion

### **Accessibility**
- **Touch Targets**: Minimum 44pt button sizes
- **Color Contrast**: High contrast text and backgrounds
- **Screen Reader**: Semantic markup for assistive technology
- **Navigation**: Clear button labels and actions

### **Responsive Design**
- **Screen Sizes**: Adaptive layouts for different devices
- **Font Scaling**: Respects system font size preferences  
- **Safe Areas**: Proper SafeAreaView usage
- **Orientation**: Portrait-optimized design

---

## 🚀 **Development Guidelines**

### **Adding New Onboarding Screens**

#### **1. Create Screen File**
```typescript
// screens/onboarding/OnboardingStepX.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { theme } from '../../constants/theme';
import { t } from '../../localization';

export const OnboardingStepX: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('questionTitle')}
        subtitle={t('questionSubtitle')}
        progress={X * 10} // 10% increments
      >
        {/* Question content */}
      </OnboardingQuestionBlock>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
```

#### **2. Update Store Interface**
```typescript
// Add new field to OnboardingState
type OnboardingState = {
  // ... existing fields
  newField: string | boolean | null;
};
```

#### **3. Add Navigation Route**
```typescript
// Update navigation/AppNavigator.tsx
<Stack.Screen name="OnboardingStepX" component={OnboardingStepX} />
```

#### **4. Add Translation Keys**
```typescript
// localization/en.json
{
  "questionTitle": "Your Question Title",
  "questionSubtitle": "Optional subtitle for context"
}
```

### **Component Selection Guide**

#### **For Yes/No Questions**
```typescript
<YesNoBlock
  question={t('questionText')}
  onYes={handleYes}
  onNo={handleNo}
/>
```

#### **For Single Selection**
```typescript
<OptionCard
  label={option}
  selected={selectedOption === option}
  onPress={() => setSelectedOption(option)}
/>
```

#### **For Multiple Questions**
```typescript
// Use local state + ScrollView pattern
const [question1, setQuestion1] = useState<boolean | null>(null);
const [question2, setQuestion2] = useState<boolean | null>(null);

<ScrollView>
  <YesNoBlock question="..." onYes={...} onNo={...} />
  <YesNoBlock question="..." onYes={...} onNo={...} />
</ScrollView>
```

### **Testing Checklist**

#### **Functionality**
- [ ] State updates correctly stored
- [ ] Navigation flows to next screen
- [ ] Analytics events fire properly
- [ ] Back navigation handled (if applicable)
- [ ] Completion triggers navigation to main app

#### **UI/UX**
- [ ] Progress bar updates correctly
- [ ] Buttons disable/enable based on validation
- [ ] Responsive layout on different screen sizes
- [ ] Accessibility labels and touch targets
- [ ] RTL layout works correctly (for Arabic)

#### **Data Flow**
- [ ] Store persistence works across app restarts
- [ ] Fields clear properly during development
- [ ] Completion state prevents re-showing onboarding
- [ ] Analytics data appears in dashboard

---

## 🎯 **Summary**

The Quran Chat onboarding system is a **comprehensive, 15-screen user preference collection flow** that combines:

### **Technical Excellence**
- **Atomic Design**: Reusable components with clear hierarchy
- **State Management**: Zustand with AsyncStorage persistence
- **Analytics**: Comprehensive event tracking
- **Accessibility**: Screen reader support and responsive design

### **User Experience**
- **Progressive Disclosure**: Simple to complex question progression
- **Visual Feedback**: Progress indication and clear navigation
- **Personalization**: Deep preference collection for tailored experience
- **Engagement**: Social proof, visualization, and completion psychology

### **Maintainability**
- **Consistent Patterns**: Reusable layouts and components
- **Clear Documentation**: Every component and pattern documented
- **Extensible Architecture**: Easy to add new screens and questions
- **Quality Assurance**: Comprehensive testing guidelines

**This onboarding system ensures users provide enough information to create a truly personalized spiritual AI experience while maintaining high engagement and completion rates.** 