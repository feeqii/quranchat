# 🚀 Deployment Guide - Quran Chat

This guide covers building, testing, and deploying the Quran Chat app to production environments and app stores.

---

## 📋 **Prerequisites**

### **Required Accounts**
- **Apple Developer Account** ($99/year)
- **Google Play Console** ($25 one-time)
- **Expo Account** (Free)
- **EAS Build Credits** (Paid - for managed builds)

### **Environment Setup**
```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Verify project setup
eas build:configure
```

---

## 🏗️ **Build Process**

### **EAS Build Configuration**
```json
// eas.json
{
  "cli": {
    "version": ">= 2.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### **Environment Variables**

#### **Development**
```bash
# .env.development
EXPO_PUBLIC_OPENAI_API_KEY=sk-dev-...
AMPLITUDE_API_KEY=dev-amplitude-key
REVENUECAT_PUBLIC_KEY=appl_dev_key
```

#### **Production**
```bash
# .env.production
EXPO_PUBLIC_OPENAI_API_KEY=sk-prod-...
AMPLITUDE_API_KEY=prod-amplitude-key
REVENUECAT_PUBLIC_KEY=appl_prod_key
```

---

## 📱 **iOS Deployment**

### **App Store Connect Setup**

#### **App Information**
```yaml
App Name: Quran Chat
Bundle ID: com.quranchat.app
Primary Language: English
Category: Lifestyle > Religion & Spirituality
Content Rating: 4+ (No Objectionable Content)
```

#### **App Store Description**
```text
Discover daily spiritual guidance through AI-powered conversations about the Quran. 

Quran Chat provides:
• Daily personalized verses based on your mood and context
• Intelligent conversations about Islamic teachings and spirituality
• Complete Quran with multiple translations
• Mood tracking and spiritual growth insights
• Beautiful, peaceful interface designed for reflection

Experience the wisdom of the Quran in a modern, accessible way. Perfect for Muslims seeking daily inspiration, spiritual guidance, and deeper understanding of Islamic teachings.

Features:
- AI-powered spiritual guidance
- Daily verse recommendations
- Mood-based content personalization
- Complete Quran browser
- Multiple language support (English/Arabic)
- Streak tracking for consistent engagement
- Beautiful, minimalist design

Download Quran Chat today and begin your journey of spiritual growth and daily reflection.
```

#### **Keywords**
```text
Quran, Islam, Muslim, Islamic, spiritual, prayer, guidance, verses, Allah, faith, religion, daily, meditation, reflection, wisdom
```

### **Build for iOS**
```bash
# Build for App Store
eas build --platform ios --profile production

# Build for TestFlight
eas build --platform ios --profile preview

# Build for development
eas build --platform ios --profile development --local
```

### **App Store Submission**
```bash
# Submit to App Store
eas submit --platform ios --profile production

# Or manually upload via Transporter/Xcode
```

---

## 🤖 **Android Deployment**

### **Google Play Console Setup**

#### **App Details**
```yaml
App Name: Quran Chat
Package Name: com.quranchat.app
Default Language: English (US)
Category: Lifestyle
Content Rating: Everyone
Target Audience: General Audience
```

#### **Store Listing**
```text
Short Description:
AI-powered spiritual guidance through Quran conversations and daily inspiration.

Full Description:
Experience the timeless wisdom of the Quran through modern AI technology. Quran Chat offers personalized spiritual guidance, daily verses tailored to your mood, and intelligent conversations about Islamic teachings.

Key Features:
• Personalized Daily Guidance: Receive verses and reflections based on your current emotional state and life context
• AI Spiritual Conversations: Engage in meaningful discussions about Islam, spirituality, and life guidance
• Complete Quran Access: Browse all 114 chapters with multiple translations
• Mood & Context Tracking: Track your spiritual journey with daily check-ins
• Multi-language Support: Available in English and Arabic with RTL support
• Beautiful Design: Peaceful, minimalist interface designed for contemplation

Perfect for Muslims of all backgrounds seeking:
- Daily spiritual inspiration and motivation
- Deeper understanding of Quranic teachings
- Personalized guidance for life challenges
- Consistent spiritual practice and growth
- Modern access to classical Islamic wisdom

Whether you're beginning your Islamic journey or deepening existing faith, Quran Chat provides respectful, authentic spiritual guidance powered by advanced AI technology.

Download now and discover daily peace, wisdom, and spiritual growth through the beautiful teachings of the Quran.
```

### **Build for Android**
```bash
# Build AAB for Play Store
eas build --platform android --profile production

# Build APK for testing
eas build --platform android --profile preview --local
```

### **Play Store Submission**
```bash
# Submit to Google Play
eas submit --platform android --profile production
```

---

## 🔧 **Build Optimization**

### **Asset Optimization**
```bash
# Optimize images before build
npx expo optimize

# Compress images manually
find assets/ -name "*.png" -exec pngquant --ext .png --force 256 {} \;
```

### **Bundle Analysis**
```bash
# Analyze bundle size
npx @expo/bundle-analyzer

# Check for duplicate dependencies
npx expo install --fix
```

### **Performance Configuration**
```json
// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable tree shaking
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Optimize image assets
config.resolver.assetExts.push('jpg', 'jpeg', 'png', 'webp', 'gif', 'svg');

module.exports = config;
```

---

## 🧪 **Testing Before Deployment**

### **Pre-build Checklist**
```bash
# 1. Update version numbers
# app.json: "version": "1.0.1"

# 2. Test on multiple devices
npx expo start --ios
npx expo start --android

# 3. Test production environment
NODE_ENV=production npx expo start

# 4. Run type checking
npx tsc --noEmit

# 5. Verify all assets load
# Check all images and fonts are accessible

# 6. Test offline functionality
# Ensure app handles network errors gracefully

# 7. Test analytics integration
# Verify events are firing correctly
```

### **Automated Testing**
```bash
# Run unit tests
npm test

# E2E testing with Detox (if configured)
npx detox test

# Performance testing
npx expo start --no-dev --minify
```

---

## 📊 **Analytics & Monitoring**

### **Production Analytics Setup**

#### **Amplitude Production Configuration**
```typescript
// Production analytics initialization
const PRODUCTION_AMPLITUDE_KEY = 'prod_amplitude_key_here';

if (!__DEV__) {
  await Amplitude.getInstance().init(PRODUCTION_AMPLITUDE_KEY);
  
  // Set production settings
  Amplitude.getInstance().setOptOut(false);
  Amplitude.getInstance().enableLogging(false);
}
```

#### **Critical Events to Monitor**
```typescript
// App performance events
logEvent({ name: 'app_start', loadTime: startupTime });
logEvent({ name: 'app_crash', error: crashDetails });

// Business metrics
logEvent({ name: 'subscription_conversion' });
logEvent({ name: 'daily_active_user' });
logEvent({ name: 'retention_day_7' });

// Feature usage
logEvent({ name: 'ai_conversation_success' });
logEvent({ name: 'verse_engagement_time', seconds: engagementTime });
```

### **Error Monitoring**
```typescript
// Sentry integration (optional)
import * as Sentry from 'sentry-expo';

if (!__DEV__) {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
  });
}

// Global error boundary
export class GlobalErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (!__DEV__) {
      Sentry.captureException(error, {
        contexts: { react: errorInfo }
      });
    }
  }
}
```

---

## 🔐 **Security Configuration**

### **Production Security Checklist**
```typescript
// 1. Remove debug code
if (__DEV__) {
  // Debug code only
}

// 2. Secure API keys
const OPENAI_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
if (!OPENAI_KEY) {
  throw new Error('Missing required API key');
}

// 3. Enable certificate pinning (if needed)
// 4. Obfuscate sensitive code
// 5. Enable ProGuard for Android
```

### **Data Privacy Compliance**
```typescript
// GDPR/CCPA compliance
export const PrivacyManager = {
  // Allow users to opt out of analytics
  setAnalyticsOptOut: (optOut: boolean) => {
    AsyncStorage.setItem('@analytics_opt_out', String(optOut));
    Amplitude.getInstance().setOptOut(optOut);
  },
  
  // Clear user data on request
  clearUserData: async () => {
    await AsyncStorage.clear();
    await Amplitude.getInstance().clearUserProperties();
  },
  
  // Export user data
  exportUserData: async () => {
    // Return all user data for GDPR requests
    const data = await AsyncStorage.getAllKeys();
    return data;
  },
};
```

---

## 🚀 **Release Process**

### **Version Management**
```bash
# Semantic versioning
# Major.Minor.Patch (1.0.0)

# Update version in app.json
{
  "expo": {
    "version": "1.0.1",
    "ios": {
      "buildNumber": "2"
    },
    "android": {
      "versionCode": 2
    }
  }
}
```

### **Release Notes Template**
```markdown
# Version 1.0.1

## 🆕 New Features
- Enhanced AI conversation quality
- Improved verse recommendations

## 🐛 Bug Fixes
- Fixed app crashes on older devices
- Resolved subscription restoration issues

## 🎨 Improvements
- Faster app startup time
- Better Arabic text rendering
- Improved accessibility support

## 📱 Compatibility
- iOS 12.0+
- Android 6.0+ (API level 23)
```

### **Staged Deployment**
```bash
# 1. Internal Testing
eas build --profile preview

# 2. TestFlight/Internal Testing
eas submit --platform ios --profile preview

# 3. Staged Rollout (20% → 50% → 100%)
# Configure in App Store Connect/Play Console

# 4. Monitor crash reports and analytics
# 5. Full release if metrics look good
```

---

## 📈 **Post-Deployment Monitoring**

### **Key Metrics to Track**
```typescript
interface ProductionMetrics {
  // Technical metrics
  crashRate: number;          // < 0.1%
  appStartTime: number;       // < 3 seconds
  apiResponseTime: number;    // < 2 seconds
  
  // Business metrics
  dailyActiveUsers: number;
  retentionDay1: number;      // > 40%
  retentionDay7: number;      // > 20%
  subscriptionConversion: number; // > 5%
  
  // User experience
  sessionDuration: number;    // > 3 minutes
  verseLookups: number;       // Daily engagement
  chatInteractions: number;   // AI usage
}
```

### **Monitoring Dashboard**
```typescript
// Key alerts to set up
const CRITICAL_ALERTS = {
  crashRate: 0.1,           // Alert if > 0.1%
  apiErrorRate: 0.05,       // Alert if > 5%
  subscriptionDrop: 0.2,    // Alert if 20% drop
  userRetention: 0.15,      // Alert if < 15% day-7
};
```

---

## 🔄 **CI/CD Pipeline (Optional)**

### **GitHub Actions Example**
```yaml
# .github/workflows/build.yml
name: EAS Build
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
          
      - run: npm install
      
      - run: npm test
      
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
          
      - run: eas build --platform all --non-interactive
        if: github.ref == 'refs/heads/main'
```

---

## 🆘 **Troubleshooting**

### **Common Build Issues**

#### **iOS Code Signing**
```bash
# Clear certificates
eas credentials --platform ios --clear

# Regenerate certificates
eas credentials --platform ios
```

#### **Android Keystore**
```bash
# Check keystore
eas credentials --platform android

# Generate new keystore
eas credentials --platform android --clear
```

#### **Build Failures**
```bash
# Clear EAS cache
eas build --clear-cache

# Check build logs
eas build:list
eas build:view [build-id]
```

### **App Store Rejections**

#### **Common Rejection Reasons**
1. **Missing privacy policy** - Add to app.json and App Store Connect
2. **Incomplete app information** - Fill all required metadata
3. **Crashes during review** - Test thoroughly on older devices
4. **Content guidelines** - Ensure religious content is respectful

#### **Appeal Process**
1. Address the specific issues mentioned
2. Test fixes thoroughly
3. Resubmit with detailed release notes
4. Consider contacting App Store Review team if needed

---

## 📋 **Production Checklist**

### **Pre-Launch**
- [ ] All features tested on multiple devices
- [ ] Analytics tracking verified
- [ ] Subscription flow tested end-to-end
- [ ] Privacy policy and terms of service added
- [ ] App Store metadata complete
- [ ] Screenshots and videos prepared
- [ ] Version numbers updated
- [ ] Environment variables configured

### **Launch Day**
- [ ] Monitor crash reports
- [ ] Check analytics dashboard
- [ ] Monitor subscription metrics
- [ ] Respond to user reviews
- [ ] Track key performance indicators
- [ ] Have rollback plan ready

### **Post-Launch**
- [ ] Weekly performance reviews
- [ ] User feedback analysis
- [ ] Plan next version features
- [ ] Monitor competitor landscape
- [ ] Optimize based on user behavior

---

This deployment guide ensures a smooth, reliable release process for Quran Chat while maintaining high quality standards and user experience. 