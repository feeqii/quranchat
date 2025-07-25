# 🌍 Quran Chat Localization & RTL Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Translation Key Mapping](#translation-key-mapping)
4. [RTL Support](#rtl-support)
5. [Implementation Guidelines](#implementation-guidelines)
6. [Screen-by-Screen Breakdown](#screen-by-screen-breakdown)
7. [Testing & QA](#testing--qa)
8. [Debugging Guide](#debugging-guide)
9. [Best Practices](#best-practices)

---

## 🎯 Overview

The Quran Chat app supports **bilingual localization** (English & Arabic) with comprehensive **RTL (Right-to-Left) layout support**. This documentation serves as the single source of truth for all localization-related implementations, debugging, and maintenance.

### Supported Languages
- **English (en)**: LTR layout, Latin script
- **Arabic (ar)**: RTL layout, Arabic script with proper text direction

### Key Features
- ✅ Dynamic language switching without app restart
- ✅ Automatic device language detection
- ✅ RTL/LTR layout switching
- ✅ Interpolated translations with parameters
- ✅ Contextual grouping (categories, moods, settings)
- ✅ Date/number formatting with locale awareness
- ✅ Fallback system to prevent missing translations

---

## 🏗️ Architecture

### File Structure
```
/localization/
├── index.ts              # Core localization logic & exports
├── en.json              # English translations (454 keys)
├── ar.json              # Arabic translations (454 keys)
└── LocalizationContext.tsx # React context for runtime switching

/utils/
└── rtl.ts               # RTL layout utility functions

/store/
└── useLocalizationStore.ts # Zustand store for language state
```

### Core Functions

#### `localization/index.ts`
```typescript
export function initLocalization(): void
export function setLocale(lang: string): void  
export function getLocale(): string
export function t(key: string, opts?: object): string
export function isRTL(): boolean
export function formatDate(date: Date): string
export function formatTime(date: Date): string
export function formatNumber(num: number): string
```

#### `utils/rtl.ts`
```typescript
export const isRTL = (): boolean
export const forceRTL = (rtl: boolean): void
export const textAlign = (): 'left' | 'right'
export const textAlignReverse = (): 'left' | 'right'
export const flexDirection = (): 'row' | 'row-reverse'
export const alignItems = (start: boolean): 'flex-start' | 'flex-end'
export const transform = (translateX: number)
export const marginHorizontal = (left: number, right: number)
export const paddingHorizontal = (left: number, right: number)
export const position = (left?: number, right?: number)
export const iconDirection = (iconName: string): string
```

---

## 🗝️ Translation Key Mapping

### Key Statistics
- **Total Translation Keys**: 454
- **Root Level Keys**: 390
- **Nested Categories**: 64
  - `categories.*`: 31 keys
  - `contextOptions.*`: 21 keys
  - `moods.*`: 9 keys
  - `language.*`: 2 keys
  - `settings.*`: 1 key

### Key Naming Conventions
- **camelCase**: All keys use camelCase format
- **Descriptive**: Keys describe content, not location (`continueButton` vs `button1`)
- **Hierarchical**: Logical grouping with single-level nesting only
- **Interpolation**: Parameter support using `{{paramName}}` syntax

### Translation Key Categories

#### 🎯 Core UI Elements
```typescript
// Navigation & Actions
"continue": "Continue" | "متابعة"
"next": "Next" | "التالي"
"cancel": "Cancel" | "إلغاء"
"yes": "Yes" | "نعم"
"no": "No" | "لا"
"start": "Start" | "ابدأ"
"finish": "Finish" | "انتهاء"

// Common Labels
"loading": "Loading..." | "جاري التحميل..."
"error": "Error" | "خطأ"
"success": "Success" | "نجح"
"completed": "Completed" | "مكتمل"
```

#### 📱 App Identity
```typescript
"appName": "Quran Chat" | "محادثة القرآن"
"welcomeTitle": "Your faith, always visible" | "إيمانك، دائماً مرئي"
"welcomeSubtitle": "Keep your faith at your fingertips by adding the widget to your home screen" | "احتفظ بإيمانك في متناول يدك عبر إضافة الأداة إلى شاشتك الرئيسية"
```

#### 🎭 Mood System
```typescript
"moods": {
  "verySad": "Very Sad" | "حزين جداً",
  "sad": "Sad" | "حزين",
  "neutral": "Neutral" | "محايد",
  "calm": "Calm" | "هادئ",
  "happy": "Happy" | "سعيد",
  "joyful": "Joyful" | "مبتهج",
  "excited": "Excited" | "متحمس",
  "grateful": "Grateful" | "ممتن",
  "blessed": "Blessed" | "مبارك"
}
```

#### 🏷️ Categories
```typescript
"categories": {
  "creation": "Creation" | "الخلق",
  "relationships": "Relationships" | "العلاقات",
  "purpose": "Purpose" | "الهدف",
  "patience": "Patience" | "الصبر",
  "forgiveness": "Forgiveness" | "المغفرة",
  "gratitude": "Gratitude" | "الامتنان",
  "prayer": "Prayer" | "الصلاة",
  "faith": "Faith" | "الإيمان",
  "guidance": "Guidance" | "الهداية",
  "peace": "Peace" | "السلام"
  // ... 21 more categories
}
```

#### 🎯 Context Options
```typescript
"contextOptions": {
  "morningPrayers": "Morning Prayers" | "صلاة الفجر",
  "workStress": "Work Stress" | "ضغط العمل",
  "familyTime": "Family Time" | "وقت العائلة",
  "spiritualReflection": "Spiritual Reflection" | "التأمل الروحي",
  "seekingGuidance": "Seeking Guidance" | "البحث عن الهداية"
  // ... 16 more context options
}
```

#### 💳 Paywall & Subscriptions
```typescript
"paywall_hero_title": "Begin Your Sacred Journey" | "ابدأ رحلتك المقدسة"
"paywall_hero_subtitle": "Join thousands finding peace and guidance through AI-powered Quranic wisdom" | "انضم إلى آلاف المسلمين الذين يجدون السلام والهداية من خلال الحكمة القرآنية المدعومة بالذكاء الاصطناعي"
"paywall_charity_highlight": "50% of profits go to humanitarian causes" | "50% من الأرباح تذهب للأعمال الخيرية الإنسانية"
```

#### 📖 Quran Features
```typescript
"quran": "Quran" | "القرآن"
"selectSurah": "Select Surah" | "اختر السورة"
"selectTranslation": "Select Translation" | "اختر الترجمة"
"searchByNameOrNumber": "Search by name or number..." | "ابحث بالاسم أو الرقم..."
"verseBookmarked": "Verse bookmarked!" | "تم وضع إشارة مرجعية للآية!"
```

#### 🤖 AI & Chat Features
```typescript
"askAboutThisVerse": "Ask about this verse" | "اسأل عن هذه الآية"
"peaceBeUponYouHowMayIAssistYouInYourSpiritualJourneyToday": "Peace be upon you. How may I assist you in your spiritual journey today?" | "السلام عليكم. كيف يمكنني مساعدتك في رحلتك الروحية اليوم؟"
"generateMyReflection": "Generate My Reflection" | "اولد تأملي"
```

### Interpolated Translations
Keys supporting dynamic parameters:

```typescript
// Date interpolation
"dateReflection": "{{date}} Reflection 🌙" | "تأمل {{date}} 🌙"

// Count interpolation  
"itemsSelected": "{{count}} selected" | "تم اختيار {{count}}"

// Mood interpolation
"basedOnFeelingReady": "Based on feeling {{mood}}, your personalized reflection and spiritual guidance are ready." | "بناءً على الشعور بـ {{mood}}، تأملك المخصص والتوجيه الروحي جاهزان."

// Progress interpolation
"progressThroughReflection": "You're {{progress}}% through today's reflection. Let's finish creating your personalized spiritual content." | "لقد أنجزت {{progress}}% من تأمل اليوم. لننتهي من إنشاء محتواك الروحي المخصص."

// Verse sharing
"quranChatVerseShare": "🕌 {{surahName}} {{surahNumber}}:{{verseNumber}}\n\n\"{{verseText}}\"\n\n— Quran Chat" | "🕌 {{surahName}} {{surahNumber}}:{{verseNumber}}\n\n\"{{verseText}}\"\n\n— محادثة القرآن"
```

---

## 🔄 RTL Support

### Layout Direction Management

#### Core RTL Detection
```typescript
// utils/rtl.ts
export const isRTL = (): boolean => {
  try {
    return getLocale() === 'ar' || I18nManager.isRTL;
  } catch (error) {
    return I18nManager.isRTL;
  }
};
```

#### Automatic RTL Switching
```typescript
// LocalizationContext.tsx
const changeLocale = (newLocale: 'en' | 'ar') => {
  setLocale(newLocale);
  setCurrentLocale(newLocale);
  
  // Auto-apply RTL layout
  const shouldUseRTL = newLocale === 'ar';
  I18nManager.forceRTL(shouldUseRTL);
};
```

### RTL Layout Utilities

#### Text Alignment
```typescript
// Standard alignment (start/end aware)
textAlign(): 'left' | 'right'  // Returns 'right' for Arabic

// Reverse alignment (when you want opposite)
textAlignReverse(): 'left' | 'right'  // Returns 'left' for Arabic
```

#### Flex Direction
```typescript
flexDirection(): 'row' | 'row-reverse'  // Returns 'row-reverse' for Arabic
alignItems(start: boolean): 'flex-start' | 'flex-end'
```

#### Spacing & Positioning
```typescript
// Horizontal margins (automatically swapped for RTL)
marginHorizontal(left: number, right: number = left)

// Horizontal padding (automatically swapped for RTL)  
paddingHorizontal(left: number, right: number = left)

// Position values (automatically swapped for RTL)
position(left?: number, right?: number)
```

#### Icon Direction
```typescript
// Automatically flips directional icons for RTL
iconDirection(iconName: string): string
// 'arrowLeft' becomes 'arrowRight' in RTL
```

#### Transform Utilities
```typescript
// X-axis translations (automatically inverted for RTL)
transform(translateX: number) 
// translateX(10) becomes translateX(-10) in RTL
```

### RTL Implementation Examples

#### Text Components
```typescript
// components/atoms/Typography.tsx
<Text style={{ textAlign: textAlign() }}>
  {t('welcomeTitle')}
</Text>
```

#### Flex Layouts
```typescript
// Horizontal arrangements
<View style={{ 
  flexDirection: flexDirection(),
  alignItems: alignItems(true)  // align to start
}}>
  <Icon />
  <Text>{t('label')}</Text>
</View>
```

#### Custom Spacing
```typescript
// Automatically RTL-aware margins
<View style={[
  styles.container,
  marginHorizontal(16, 8) // 16px left, 8px right (swapped in RTL)
]}>
```

---

## 🛠️ Implementation Guidelines

### 1. Import Pattern
Always import localization at the top of files:

```typescript
import { t } from '../../localization';
// For RTL utilities:
import { textAlign, flexDirection, marginHorizontal } from '../../utils/rtl';
```

### 2. Text Rendering
Replace all hardcoded strings:

```typescript
// ❌ Bad
<Typography>Welcome to Quran Chat</Typography>

// ✅ Good  
<Typography>{t('welcomeTitle')}</Typography>
```

### 3. Button Labels
Use translation keys for all interactive elements:

```typescript
// ❌ Bad
<PrimaryButton title="Continue" onPress={handleNext} />

// ✅ Good
<PrimaryButton title={t('continue')} onPress={handleNext} />
```

### 4. Interpolated Content
Handle dynamic content properly:

```typescript
// ✅ Good - with parameters
<Typography>
  {t('itemsSelected', { count: selectedItems.length })}
</Typography>

// ✅ Good - mood-based messaging
<Typography>
  {t('basedOnFeelingReady', { mood: moodDescription })}
</Typography>
```

### 5. RTL Layout Implementation
Apply RTL utilities for layout-sensitive components:

```typescript
// ✅ Good - RTL-aware styling
const styles = StyleSheet.create({
  container: {
    flexDirection: flexDirection(), // row/row-reverse
    alignItems: alignItems(true),   // flex-start/flex-end
  },
  text: {
    textAlign: textAlign(),         // left/right
  },
  spacing: {
    ...marginHorizontal(16, 8),     // swapped in RTL
  }
});
```

### 6. Error Handling
Always provide fallbacks:

```typescript
// ✅ Good - with fallback
const title = t('screenTitle') || 'Default Title';

// ✅ Good - interpolation with fallback
const message = t('greetingUser', { name: userName }) || `Hello, ${userName}!`;
```

---

## 📱 Screen-by-Screen Breakdown

### Onboarding Flow

#### `OnboardingWelcomeScreen.tsx`
**Translation Keys Used:**
- `welcomeTitle`: Main hero text
- `welcomeSubtitle`: Descriptive subtitle  
- `continue`: Primary action button

**RTL Considerations:**
- Logo remains centered (no RTL impact)
- Text alignment uses `textAlign()`
- Button layout uses default center alignment

#### `OnboardingStep1.tsx` 
**Translation Keys Used:**
- `dailyGuidanceTitle`: Question title
- `dailyGuidanceSubtitle`: Question context
- `dailyGuidanceQuestion`: Main question text
- `yes` / `no`: Action button labels

**RTL Considerations:**
- Yes/No buttons maintain order but text aligns per `textAlign()`
- Question block layouts use `alignItems()`

#### `OnboardingStep2.tsx`
**Translation Keys Used:**
- `justStudyTheQuran`: Option 1
- `overcomeLifeStrugglesAndChallenges`: Option 2

**RTL Considerations:**
- Option cards use `flexDirection()` for icon+text layout
- Card selection styling respects RTL

#### `OnboardingStep3.tsx` (Widget Preview)
**Translation Keys Used:**
- `faithBecomesADailyHabitWithYourWidget`: Title
- `visualizeHowConsistencyShapesYourSpiritualPath`: Subtitle
- `premiumUserWillUnlockPersonalizedFeatures`: Feature description
- `continue`: Action button

**RTL Considerations:**
- Widget mock-up graphics remain LTR oriented
- Text overlays use `textAlign()` and `position()`

#### `OnboardingStep4.tsx` through `OnboardingStep10.tsx`
**Pattern Analysis:**
- All use similar question/answer patterns
- Consistent `continue` / `next` button usage
- Age groups, Islamic background, and preference selections
- RTL layouts handled by shared `OnboardingQuestionBlock` organism

#### `OnboardingFoundersNote.tsx`
**Translation Keys Used:**
- `foundersNoteTitle`: Screen title
- `foundersNoteGreeting`: Opening greeting
- `foundersNoteMission`: Mission statement
- `foundersNotePersonal`: Personal story
- `foundersNoteCharity`: Charity commitment
- `foundersNoteCharityCommitment`: Specific % commitment
- `foundersNoteClosing`: Closing message
- `foundersNoteCTA`: Call to action
- `foundersNoteSignature`: Signature line

**RTL Considerations:**
- Long-form text content uses `textAlign()`
- Charity highlight card uses `flexDirection()` for icon+text
- Scroll view respects RTL reading direction

#### `OnboardingWhyNotFree.tsx`
**Translation Keys Used:**
- `whyNotFreeTitle`: Main title
- `whyNotFreeSubtitle`: Subtitle
- `whyNotFreeTransparency`: Transparency statement
- `whyNotFreeCostBreakdown`: Section header
- `whyNotFreeDevelopmentTitle` / `whyNotFreeDevelopmentDesc`: Cost item
- `whyNotFreeAPITitle` / `whyNotFreeAPIDesc`: Cost item
- `whyNotFreeMarketingTitle` / `whyNotFreeMarketingDesc`: Cost item
- `whyNotFreeInfrastructureTitle` / `whyNotFreeInfrastructureDesc`: Cost item
- `whyNotFreeAppleTitle` / `whyNotFreeAppleDesc`: Cost item
- `whyNotFreeValueBeyond`: Section header
- `whyNotFreeCharityValue`: Value proposition
- `whyNotFreeSustainabilityValue`: Value proposition
- `whyNotFreeGrowthValue`: Value proposition
- `whyNotFreeFairPricing`: Section header
- `whyNotFreePricingExplanation`: Pricing justification
- `whyNotFreeClosing`: Closing statement
- `whyNotFreeContinue`: Continue button
- `scrollToReadMore`: Scroll instruction

**RTL Considerations:**
- List items use `flexDirection()` for bullet+text layout
- Cost breakdown cards respect RTL alignment
- Scroll indicators and instructions account for reading direction

#### `PaywallScreen.tsx`
**Translation Keys Used:**
- `paywall_hero_title`: Main hero text
- `paywall_hero_subtitle`: Hero subtitle
- `paywall_weekly_plan`: Plan name
- `paywall_most_popular`: Popular badge
- `paywall_week`: Time unit
- `paywall_price_subtext`: Pricing details
- `paywall_charity_highlight`: Charity message
- `paywall_features_title`: Features section title
- `unlimitedConversations` / `unlimitedConversationsDesc`: Feature item
- `dailyReflections` / `dailyReflectionsDesc`: Feature item
- `premiumInsights` / `premiumInsightsDesc`: Feature item
- `charityImpact` / `charityImpactDesc`: Feature item
- `paywall_social_proof`: Testimonial text
- `paywall_social_proof_caption`: Social proof caption
- `paywall_guarantee`: Guarantee text
- `paywall_cta_button`: Main CTA button
- `paywall_restore_purchases`: Restore link
- `paywall_terms_text`: Legal terms
- `loading`: Loading state

**RTL Considerations:**
- Feature list items use `flexDirection()` for icon+text
- Price display maintains LTR format but aligns with `textAlign()`
- Social proof cards respect RTL layout
- CTA buttons remain centered

### Main App Screens

#### `TodayHomeScreen.tsx`
**Translation Keys Used:**
- `dateReflection`: Date-specific reflection title with interpolation
- `mood`: Mood section label
- `lifeAreas`: Life areas section label
- `yourReflection`: Reflection section label  
- `aiGuidance`: AI guidance section label
- `completed`: Completion status
- `noReflectionRecorded`: Empty state message
- `trySelectingDifferentDate`: Help text
- `todaysJourneyComplete`: Success title
- `basedOnFeelingReady`: Dynamic message with mood interpolation
- `personalizedReflectionReady`: Generic ready message
- `viewResults`: Action button
- `continueYourJourney`: Continue button
- `progressThroughReflection`: Progress message with percentage
- `continue`: Continue button
- `beginTodaysJourney`: Start button
- `takeTimeToReflect`: Start description
- `start`: Start action
- `todaysJourney`: Header title
- `reflectingOnYourGrowth`: Loading message
- `progressToday`: Progress label
- `today`: Current day label

**RTL Considerations:**
- Calendar view uses custom RTL handling
- Progress indicators respect RTL direction
- Card layouts use `flexDirection()` and `alignItems()`
- Date formatting uses `formatDate()` helper

#### `MoodCheckinScreen.tsx`
**Translation Keys Used:**
- `howAreYouFeelingToday`: Screen title
- `dailyGuidanceSubtitle`: Subtitle context
- `yourFeelingsAreValid`: Encouragement text
- `next`: Continue button
- `moods.*`: All mood descriptions (verySad through blessed)

**RTL Considerations:**
- Mood slider component respects RTL
- Emoji positions remain standard
- Text alignment uses `textAlign()`

#### `ContextSelectionScreen.tsx`
**Translation Keys Used:**
- `chooseOneOrMore`: Instructions
- `itemsSelected`: Selection count with interpolation
- `yourExperiencesShapeYourSpiritualJourney`: Encouragement
- `next`: Continue button
- `pleaseSelectAtLeastOneContextToContinue`: Validation message
- `contextOptions.*`: All context categories

**RTL Considerations:**
- Grid layout uses `flexDirection()` for rows
- Context chips use RTL-aware styling
- Selection indicators position with `alignItems()`

#### `ReflectionInputScreen.tsx`
**Translation Keys Used:**
- `shareYourHeartPrompt`: Input prompt
- `theMoreYouShare`: Encouragement text
- `shareYourThoughts`: Placeholder text
- `typeYourThoughtsHere`: Input placeholder
- `pleaseWriteAtLeast10CharactersToContinue`: Validation message
- `generateMyReflection`: Action button

**RTL Considerations:**
- Text input supports RTL text entry
- Character counter respects RTL
- Input styling uses `textAlign()`

#### `GeneratedReflectionScreen.tsx`
**Translation Keys Used:**
- `yourReflection`: Section title
- `idLikeToDiscussThisReflectionFurther`: Chat prefill with interpolation
- `error`: Error state
- `unableToStartChatDiscussion`: Error message

**RTL Considerations:**
- Reflection text displays with `textAlign()`
- Action buttons maintain standard layout
- Generated content preserves RTL readability

#### `ChatHomeScreen.tsx`
**Translation Keys Used:**
- `chat`: Screen title
- `categories.*`: Category buttons (prayer, dua, tawakkul, etc.)

**RTL Considerations:**
- Category grid uses `flexDirection()` for layout
- Category icons remain standard orientation
- Header layout uses `flexDirection()` for title+history button

#### `TopicChatScreen.tsx`
**Translation Keys Used:**
- `askAnythingAboutIslamSpiritualityOrLifeGuidance`: Input placeholder
- `peaceBeUponYouHowMayIAssistYouInYourSpiritualJourneyToday`: Initial greeting
- `iApologizeButImHavingDifficultyRespondingAtThisMoment`: Error fallback
- `conversationCopiedToClipboard`: Copy success
- `unableToCopyThisConversation`: Copy error

**RTL Considerations:**
- Chat bubbles use `alignItems()` for user/AI alignment
- Message text respects `textAlign()`
- Input field supports RTL text entry
- Timestamp positioning uses `position()` utilities

#### `VerseStoryScreen.tsx`
**Translation Keys Used:**
- `reflectOnThisVerseAndHowItAppliesToYourLifeToday`: Default reflection
- `canYouHelpMeUnderstandThisVerse`: Chat prefill
- `comingSoon`: Audio feature message
- `audioPlaybackWillBeAddedInAFutureUpdate`: Audio details
- `verseBookmarked`: Bookmark success
- `bookmarkRemoved`: Bookmark removed
- `success`: Success title
- `error`: Error title
- `unableToUpdateBookmarkPleaseTryAgain`: Bookmark error
- `quranChatSpiritualGuidance`: Share title
- `verseFrom`: Share reference with interpolation
- `unableToShareThisVerse`: Share error

**RTL Considerations:**
- Verse text displays with `textAlign()`
- Arabic text maintains RTL regardless of app language
- Action bar uses `flexDirection()` for button layout
- Modal close button positions with `position()`

#### `QuranHomeScreen.tsx`
**Translation Keys Used:**
- `sahihInternational`: Default translation name
- `error`: Error title
- `failedToLoadVersesPleaseTryAgain`: Load error
- `failedToSetUpChatPleaseTryAgain`: Chat setup error
- `canYouHelpMeUnderstandThisVerse`: Chat prefill
- `failedToShareVersePleaseTryAgain`: Share error
- `loadingWithSurah`: Loading message with interpolation
- `quranChatVerseShare`: Share format with multiple interpolations

**RTL Considerations:**
- Surah list respects RTL layout
- Verse numbers maintain LTR format
- Arabic text always displays RTL
- Translation picker uses RTL-aware modal

#### `ProfileScreen.tsx`
**Translation Keys Used:**
- Uses `LocalizationContext` for language switching
- Various profile section labels (managed by component molecules)

**RTL Considerations:**
- Profile sections use `flexDirection()` for layout
- Language switcher respects current RTL state
- Settings panels use RTL-aware styling

#### `HistoryScreen.tsx`
**Translation Keys Used:**
- `chatHistory`: Screen title
- `startAConversationToBuildYourSpiritualArchive`: Empty state
- `starConversationsToSeeThemHere`: Empty state for favorites

**RTL Considerations:**
- History list items use `flexDirection()` for layout
- Conversation previews respect `textAlign()`
- Star/favorite icons position with `alignItems()`

### Quran Tab Screens

#### `SurahSelectionModal.tsx`
**Translation Keys Used:**
- `selectSurah`: Modal title

**RTL Considerations:**
- Modal header respects RTL
- Surah list layout uses RTL-aware styling
- Search input supports RTL text

#### `TranslationSelectionModal.tsx`
**Translation Keys Used:**
- `selectTranslation`: Modal title
- Translation names (sahihInternational, mohsinKhan, etc.)

**RTL Considerations:**
- Translation options use `flexDirection()` for layout
- Selected indicator positions with `alignItems()`

### Component-Level Usage

#### Atoms
- `PrimaryButton`: Uses `t()` for label prop
- `SecondaryButton`: Uses `t()` for label prop
- `Typography`: Renders `t()` results with RTL-aware alignment

#### Molecules  
- `MoodSelectorMolecule`: Uses `t('moods.*')` for descriptions
- `ContextSelectionGrid`: Uses `t('contextOptions.*')` for labels
- `JustChatCard`: Uses `t()` for card content
- `ChatBubble`: Handles RTL alignment for message bubbles
- `PromptInput`: Uses `t()` for placeholder text

#### Organisms
- `OnboardingQuestionBlock`: Uses `t()` for titles/subtitles
- `YesNoBlock`: Uses `t()` for yes/no labels
- `VerseOfTheDayCard`: Uses `t()` for verse-related text
- `CategoryGridSection`: Uses `t('categories.*')` for labels

---

## 🧪 Testing & QA

### Manual Testing Checklist

#### Language Switching
- [ ] App detects device language correctly on first launch
- [ ] Manual language switch works without app restart
- [ ] All text updates immediately after language change
- [ ] No missing translations (check console for warnings)
- [ ] Interpolated strings render correctly in both languages

#### RTL Layout Testing
- [ ] Text alignment switches correctly (Arabic = right, English = left)
- [ ] Flex layouts reverse properly in RTL
- [ ] Icons flip direction where appropriate
- [ ] Margins and padding swap correctly
- [ ] Modal positioning respects RTL
- [ ] Input fields handle RTL text entry
- [ ] Scroll views work in RTL
- [ ] Navigation gestures work in RTL

#### Screen-by-Screen Validation
For each screen, verify:
- [ ] All text displays in selected language
- [ ] Layout looks correct in both LTR and RTL
- [ ] Interactive elements remain accessible
- [ ] Text doesn't overflow or clip
- [ ] Date/number formatting matches locale
- [ ] Error messages display in correct language

#### Edge Cases
- [ ] Long Arabic text wraps properly
- [ ] Mixed content (Arabic Quran + English UI) displays correctly  
- [ ] Offline functionality maintains language preference
- [ ] App restart preserves language selection
- [ ] Device language change affects app appropriately

### Automated Testing

#### Unit Tests
```typescript
// Example test patterns
describe('Localization', () => {
  test('t() returns correct translation for English', () => {
    setLocale('en');
    expect(t('welcomeTitle')).toBe('Your faith, always visible');
  });
  
  test('t() returns correct translation for Arabic', () => {
    setLocale('ar');
    expect(t('welcomeTitle')).toBe('إيمانك، دائماً مرئي');
  });
  
  test('t() handles interpolation correctly', () => {
    setLocale('en');
    expect(t('itemsSelected', { count: 3 })).toBe('3 selected');
  });
});

describe('RTL Utils', () => {
  test('textAlign returns right for Arabic', () => {
    setLocale('ar');
    expect(textAlign()).toBe('right');
  });
  
  test('flexDirection returns row-reverse for Arabic', () => {
    setLocale('ar');
    expect(flexDirection()).toBe('row-reverse');
  });
});
```

#### Integration Tests
- Test language switching across navigation flows
- Verify persistent storage of language preference
- Test RTL layouts across different screen sizes
- Validate interpolated content in both languages

---

## 🐛 Debugging Guide

### Common Issues & Solutions

#### Missing Translations
**Symptoms:**
- Console warnings: `Missing translation for key: "keyName"`
- UI shows translation key instead of text

**Solutions:**
1. Add missing key to both `en.json` and `ar.json`
2. Verify key spelling matches exactly
3. Check for typos in nested keys (e.g., `categories.gratitude`)
4. Restart Metro bundler after JSON changes

#### RTL Layout Problems
**Symptoms:**
- Elements positioned incorrectly in Arabic
- Text alignment looks wrong
- Margins/padding appear reversed

**Solutions:**
1. Use RTL utilities instead of hardcoded values:
   ```typescript
   // ❌ Bad
   style={{ marginLeft: 16 }}
   
   // ✅ Good
   style={marginHorizontal(16, 0)}
   ```

2. Apply `textAlign()` for text components:
   ```typescript
   // ✅ Good
   style={{ textAlign: textAlign() }}
   ```

3. Use `flexDirection()` for layouts:
   ```typescript
   // ✅ Good
   style={{ flexDirection: flexDirection() }}
   ```

#### Interpolation Failures
**Symptoms:**
- `{{paramName}}` appears in UI
- Dynamic content not rendering

**Solutions:**
1. Verify parameter object structure:
   ```typescript
   // ✅ Correct
   t('itemsSelected', { count: items.length })
   
   // ❌ Wrong
   t('itemsSelected', items.length)
   ```

2. Check parameter names match JSON:
   ```json
   // en.json
   "greeting": "Hello, {{name}}!"
   ```
   ```typescript
   // Component
   t('greeting', { name: userName }) // ✅ Correct
   t('greeting', { user: userName }) // ❌ Wrong parameter name
   ```

#### Language Persistence Issues
**Symptoms:**
- App reverts to English on restart
- Language choice not saved

**Solutions:**
1. Verify AsyncStorage persistence in `useLocalizationStore`
2. Check `initLocalization()` is called in App.tsx
3. Ensure `LocalizationProvider` wraps app properly

#### RTL Text Input Problems
**Symptoms:**
- Text appears LTR in Arabic mode
- Cursor positioned incorrectly

**Solutions:**
1. Force text direction for inputs:
   ```typescript
   <TextInput
     style={{
       textAlign: textAlign(),
       writingDirection: isRTL() ? 'rtl' : 'ltr'
     }}
   />
   ```

### Debug Tools

#### Translation Key Finder
Use this snippet to find all `t()` calls in a file:
```bash
grep -n "t(" screens/main/TodayHomeScreen.tsx
```

#### RTL Layout Inspector
Add this to components for RTL debugging:
```typescript
if (__DEV__) {
  console.log('RTL Status:', {
    locale: getLocale(),
    isRTL: isRTL(),
    textAlign: textAlign(),
    flexDirection: flexDirection()
  });
}
```

#### Translation Coverage Checker
```typescript
// Add to development utils
const checkTranslationCoverage = () => {
  const englishKeys = Object.keys(en);
  const arabicKeys = Object.keys(ar);
  
  const missingInArabic = englishKeys.filter(key => !arabicKeys.includes(key));
  const missingInEnglish = arabicKeys.filter(key => !englishKeys.includes(key));
  
  console.log('Missing Arabic translations:', missingInArabic);
  console.log('Missing English translations:', missingInEnglish);
};
```

---

## 💡 Best Practices

### 1. Translation Key Management
- **Use descriptive keys**: `continueButton` not `btn1`
- **Group related keys**: Use nested objects for categories
- **Avoid location-based naming**: `welcomeTitle` not `screen1Title`
- **Keep keys consistent**: Use same tense and format across similar keys

### 2. RTL Layout Design
- **Design RTL-first**: Consider Arabic layout during initial design
- **Use semantic directions**: "start/end" instead of "left/right"
- **Test early and often**: Switch to Arabic during development
- **Respect text direction**: Don't force LTR for Arabic content

### 3. Content Strategy
- **Plan for text expansion**: Arabic text is often 20-30% longer
- **Consider cultural context**: Adapt messaging for Muslim audience
- **Use appropriate formality**: Arabic translations should match app tone
- **Handle mixed content**: Quran verses stay Arabic, UI adapts to language

### 4. Development Workflow
- **Add translations early**: Don't wait until feature completion
- **Update both languages**: Never leave translations incomplete
- **Test in both languages**: Include RTL in every feature test
- **Use translation keys consistently**: Same key for same concept

### 5. Performance Considerations
- **Lazy load translations**: Only load active language
- **Cache formatting results**: Store formatted dates/numbers
- **Optimize re-renders**: Use React.memo for translation-heavy components
- **Monitor bundle size**: Keep translation files reasonable

### 6. Accessibility
- **Test with screen readers**: Both RTL and LTR modes
- **Provide semantic labels**: Use descriptive accessibility labels
- **Consider font scaling**: Test with larger text sizes
- **Validate color contrast**: Ensure readability in both languages

---

## 🔄 Maintenance & Updates

### Adding New Translation Keys

1. **Add to English first** (`localization/en.json`):
   ```json
   {
     "newFeatureTitle": "New Feature"
   }
   ```

2. **Add Arabic translation** (`localization/ar.json`):
   ```json
   {
     "newFeatureTitle": "ميزة جديدة"
   }
   ```

3. **Use in component**:
   ```typescript
   <Typography>{t('newFeatureTitle')}</Typography>
   ```

4. **Test both languages** to ensure proper rendering

### Updating Existing Translations

1. **Update both language files** simultaneously
2. **Test all usages** of the updated key
3. **Check for interpolation** parameter changes
4. **Verify RTL layout** still works with new text length

### Adding New Screens

1. **Follow existing patterns** for `t()` usage
2. **Apply RTL utilities** from the start
3. **Test in Arabic** during development
4. **Document new keys** in this guide

### Translation Review Process

1. **Native speaker review** for Arabic translations
2. **Cultural appropriateness** check
3. **Technical accuracy** for Islamic terms
4. **Consistency check** across similar contexts
5. **RTL layout validation** by native Arabic readers

---

This documentation serves as the complete reference for all localization and RTL support in Quran Chat. Keep it updated as new features are added and refer to it for debugging any localization issues. 