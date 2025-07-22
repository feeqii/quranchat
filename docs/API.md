# 🔌 API Documentation - Quran Chat

This document covers all API integrations, data flows, and external services used in the Quran Chat application.

---

## 📋 **Overview**

Quran Chat integrates with several external services and maintains internal API patterns for consistent data handling:

### **External Services**
- **OpenAI API**: AI conversations and content generation
- **Amplitude**: Analytics and user behavior tracking
- **RevenueCat**: Subscription management and payments

### **Internal APIs**
- **Quran Data**: Local Quran text and metadata
- **Today Journey**: Daily content generation system
- **Chat System**: Conversation management

---

## 🤖 **OpenAI Integration**

### **Configuration**
```typescript
// Environment setup
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const OPENAI_BASE_URL = 'https://api.openai.com/v1';
```

### **Chat Completions API**

#### **Ask Quran Function**
```typescript
// lib/api/askQuran.ts
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const askQuran = async (
  prompt: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> => {
  const messages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: prompt }
  ];

  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};
```

#### **System Prompt**
```typescript
const SYSTEM_PROMPT = `You are a knowledgeable, respectful Islamic spiritual guide and Quran scholar. Your role is to:

1. Provide thoughtful, authentic Islamic guidance based on Quranic teachings
2. Answer questions about Islam, spirituality, and life guidance
3. Reference relevant Quranic verses when appropriate
4. Maintain a peaceful, respectful, and scholarly tone
5. Acknowledge when questions are outside your expertise

Guidelines:
- Always be respectful of different Islamic schools of thought
- Provide balanced, moderate perspectives
- Encourage consultation with local religious authorities for complex issues
- Focus on spiritual growth and practical wisdom
- Keep responses concise but meaningful (2-3 paragraphs maximum)

Remember: You are supporting someone's spiritual journey. Be compassionate, wise, and encouraging.`;
```

### **Today Journey Content Generation**

#### **Generate Personalized Content**
```typescript
// lib/api/todayJourney.ts
interface TodayJourneyParams {
  mood: string;
  contexts: string[];
  userInput: string;
  ageGroup?: string;
  islamicBackground?: string;
}

export const generateTodayJourney = async (
  params: TodayJourneyParams
): Promise<TodayJourneyResponse> => {
  const prompt = buildTodayJourneyPrompt(params);
  
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: TODAY_JOURNEY_SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.8,
      response_format: { type: 'json_object' },
    }),
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};
```

#### **Response Format**
```typescript
interface TodayJourneyResponse {
  selectedVerse: {
    arabic: string;
    translation: string;
    surah: string;
    verse: number;
    context: string;
  };
  reflection: {
    title: string;
    content: string;
    personalMessage: string;
  };
  prayer: {
    title: string;
    content: string;
  };
  actionableSteps: string[];
}
```

### **Error Handling**
```typescript
export class OpenAIError extends Error {
  constructor(
    message: string, 
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

// Usage in API calls
try {
  const response = await askQuran(prompt);
  return response;
} catch (error) {
  if (error instanceof OpenAIError) {
    // Handle OpenAI-specific errors
    console.error('OpenAI Error:', error.message, error.status);
  } else {
    // Handle network or other errors
    console.error('General Error:', error.message);
  }
  throw error;
}
```

---

## 📊 **Amplitude Analytics**

### **Initialization**
```typescript
// store/useAnalyticsStore.ts
import { Amplitude } from '@amplitude/react-native';

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  isInitialized: false,
  
  initializeAmplitude: async (apiKey: string): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      await Amplitude.getInstance().init(apiKey);
      set({ isInitialized: true });
      return true;
    } catch (error) {
      console.warn('Analytics initialization failed:', error);
      return false;
    }
  },
}));
```

### **Event Tracking**

#### **Event Types**
```typescript
export type AnalyticsEvent =
  // Screen Views
  | { name: 'screen_view'; screenName: string }
  
  // Onboarding Flow
  | { name: 'onboarding_start' }
  | { name: 'onboarding_complete_step'; step: number }
  | { name: 'onboarding_finish' }
  
  // Chat Interactions
  | { name: 'chat_session_started' }
  | { name: 'chat_message_sent'; messageLength: number }
  | { name: 'verse_story_opened'; surah: string; verse: number }
  
  // Today Journey
  | { name: 'today_journey_started' }
  | { name: 'mood_checkin'; mood: string; context: string }
  | { name: 'context_selected'; context: string }
  | { name: 'reflection_generated' }
  | { name: 'daily_streak_viewed' }
  
  // Quran Reading
  | { name: 'verse_lookup'; surah: string; verse: number }
  | { name: 'verse_of_day_viewed' }
  
  // Subscription Events
  | { name: 'paywall_view' }
  | { name: 'paywall_subscribe_tap' }
  | { name: 'paywall_purchase_success' }
  | { name: 'paywall_purchase_failure'; error: string }
  | { name: 'subscription_entitlement_granted' }
  
  // Language & Localization
  | { name: 'language_switch'; from: string; to: string };
```

#### **Tracking Implementation**
```typescript
const logEvent = (event: AnalyticsEvent) => {
  try {
    const { name, ...properties } = event;
    
    // Development logging
    if (__DEV__) {
      console.log(`📊 Analytics: ${name}`, properties);
    }
    
    // Send to Amplitude
    if (get().isInitialized) {
      Amplitude.getInstance().logEvent(name, properties);
    }
  } catch (error) {
    if (__DEV__) {
      console.error('Analytics error:', error);
    }
  }
};
```

### **User Properties**
```typescript
// Set user properties for segmentation
const setUserProperties = (properties: Record<string, any>) => {
  if (get().isInitialized) {
    Amplitude.getInstance().setUserProperties(properties);
  }
};

// Example usage
setUserProperties({
  age_group: '25-34',
  islamic_background: 'Sunni',
  onboarding_completed: true,
  subscription_status: 'premium',
});
```

---

## 💰 **RevenueCat Integration**

### **Initialization**
```typescript
// store/usePurchasesStore.ts
import Purchases from 'react-native-purchases';

export const usePurchasesStore = create<PurchasesState>((set, get) => ({
  initialize: async () => {
    try {
      // Configure with API key
      await Purchases.configure({ 
        apiKey: 'appl_oUhTbIgXkHgruNDqkfdAgmlZVbI' 
      });
      
      // Fetch offerings
      const offerings = await Purchases.getOfferings();
      const offering = offerings.current || Object.values(offerings.all)[0];
      
      // Get weekly package
      const weeklyPackage = offering?.availablePackages.find(p => 
        p.identifier === '$rc_weekly' || 
        p.product.identifier === 'quranchat_weekly_sub'
      );
      
      set({ offering, weeklyPackage });
      
      // Check entitlement
      const customerInfo = await Purchases.getCustomerInfo();
      const isEntitled = !!customerInfo.entitlements.active['weekly_access'];
      
      set({ isEntitled });
    } catch (error) {
      console.error('RevenueCat initialization error:', error);
    }
  },
}));
```

### **Purchase Flow**
```typescript
const purchaseWeekly = async () => {
  try {
    set({ loading: true, error: null });
    
    const pkg = get().weeklyPackage;
    if (!pkg) throw new Error('No weekly package available');
    
    // Analytics - track purchase attempt
    logEvent({ name: 'paywall_subscribe_tap' });
    
    // Make purchase
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    const isEntitled = !!customerInfo.entitlements.active['weekly_access'];
    
    if (isEntitled) {
      // Analytics - track success
      logEvent({ name: 'paywall_purchase_success' });
      logEvent({ name: 'subscription_entitlement_granted' });
    }
    
    set({ isEntitled, loading: false });
  } catch (error) {
    // Analytics - track failure
    logEvent({ 
      name: 'paywall_purchase_failure', 
      error: error.message 
    });
    
    set({ 
      loading: false, 
      error: error.message 
    });
  }
};
```

### **Entitlement Checking**
```typescript
const checkEntitlement = async (): Promise<boolean> => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    return !!customerInfo.entitlements.active['weekly_access'];
  } catch (error) {
    console.error('Entitlement check failed:', error);
    return false;
  }
};
```

---

## 📖 **Quran Data API**

### **Surah Data Structure**
```typescript
interface Surah {
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
}

// constants/surahList.ts
export const surahList: Surah[] = [
  {
    number: 1,
    name: 'الفاتحة',
    arabicName: 'الفاتحة',
    englishName: 'Al-Fatihah',
    revelationType: 'Meccan',
    numberOfAyahs: 7,
  },
  // ... all 114 surahs
];
```

### **Verse Data**
```typescript
interface Verse {
  surahNumber: number;
  verseNumber: number;
  arabicText: string;
  translation: string;
  transliteration?: string;
}

// API function to get verses
export const getVerses = async (
  surahNumber: number,
  translation: string = 'english'
): Promise<Verse[]> => {
  // This would typically call an external Quran API
  // For now, using local data or a service like quran.com API
  
  const response = await fetch(
    `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?translations=${translation}`
  );
  
  const data = await response.json();
  return data.verses.map(formatVerse);
};
```

### **Random Verse Selection**
```typescript
export const getRandomVerse = (): Promise<Verse> => {
  const randomSurah = Math.floor(Math.random() * 114) + 1;
  const surah = surahList.find(s => s.number === randomSurah);
  const randomVerse = Math.floor(Math.random() * surah.numberOfAyahs) + 1;
  
  return getVerse(randomSurah, randomVerse);
};

export const getVerseOfTheDay = (): Promise<Verse> => {
  // Use a seed based on current date for consistency
  const today = new Date().toDateString();
  const seed = hashCode(today); // Simple hash function
  const surahIndex = Math.abs(seed) % 114;
  
  const surah = surahList[surahIndex];
  const verseIndex = Math.abs(seed >> 8) % surah.numberOfAyahs;
  
  return getVerse(surah.number, verseIndex + 1);
};
```

---

## 🔄 **Data Flow Patterns**

### **Store Integration**
```typescript
// Example: Chat store with API integration
export const useChatStore = create<ChatState>((set, get) => ({
  conversations: {},
  currentTopic: null,
  
  sendMessage: async (message: string) => {
    const { currentTopic, conversations } = get();
    if (!currentTopic) return;
    
    // Add user message
    const conversation = conversations[currentTopic] || [];
    const updatedConversation = [
      ...conversation,
      { role: 'user', content: message, timestamp: Date.now() }
    ];
    
    set({
      conversations: {
        ...conversations,
        [currentTopic]: updatedConversation
      }
    });
    
    try {
      // Get AI response
      const response = await askQuran(message, conversation);
      
      // Add AI response
      const finalConversation = [
        ...updatedConversation,
        { role: 'assistant', content: response, timestamp: Date.now() }
      ];
      
      set({
        conversations: {
          ...conversations,
          [currentTopic]: finalConversation
        }
      });
      
      // Analytics
      logEvent({ 
        name: 'chat_message_sent', 
        messageLength: message.length 
      });
      
    } catch (error) {
      console.error('Chat error:', error);
      // Handle error state
    }
  },
}));
```

### **Error Boundaries**
```typescript
// API error handling wrapper
export const withErrorHandling = <T extends any[], R>(
  apiFunction: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      // Log error for debugging
      console.error('API Error:', error);
      
      // Track error in analytics
      if (error instanceof OpenAIError) {
        logEvent({
          name: 'api_error',
          service: 'openai',
          error: error.message,
          status: error.status
        });
      }
      
      // Re-throw for component handling
      throw error;
    }
  };
};

// Usage
export const askQuranWithErrorHandling = withErrorHandling(askQuran);
```

---

## 🔒 **Security & Privacy**

### **API Key Management**
```typescript
// Environment variables (never commit these)
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
AMPLITUDE_API_KEY=...
REVENUECAT_PUBLIC_KEY=appl_...

// Runtime checks
if (!process.env.EXPO_PUBLIC_OPENAI_API_KEY) {
  throw new Error('OpenAI API key not configured');
}
```

### **Data Privacy**
```typescript
// No PII in analytics
const logEvent = (event: AnalyticsEvent) => {
  // ✅ Good: Anonymous usage data
  logEvent({ name: 'screen_view', screenName: 'ChatHome' });
  
  // ❌ Bad: Personal information
  // logEvent({ name: 'user_action', email: user.email });
};

// Data minimization
const sanitizeUserInput = (input: string): string => {
  // Remove potential PII patterns
  return input
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]') // SSN
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]'); // Email
};
```

### **Rate Limiting**
```typescript
class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private timeWindow: number;

  constructor(maxRequests: number, timeWindowMs: number) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  async acquire(): Promise<boolean> {
    const now = Date.now();
    
    // Remove old requests outside time window
    this.requests = this.requests.filter(
      time => now - time < this.timeWindow
    );
    
    if (this.requests.length >= this.maxRequests) {
      return false; // Rate limit exceeded
    }
    
    this.requests.push(now);
    return true;
  }
}

// Usage
const openAILimiter = new RateLimiter(10, 60000); // 10 requests per minute

export const askQuranWithRateLimit = async (
  prompt: string,
  history: ChatMessage[] = []
): Promise<string> => {
  const canProceed = await openAILimiter.acquire();
  
  if (!canProceed) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  return askQuran(prompt, history);
};
```

---

## 🧪 **Testing API Integration**

### **Mock API Responses**
```typescript
// __mocks__/askQuran.ts
export const askQuran = jest.fn().mockImplementation(
  async (prompt: string) => {
    if (prompt.includes('test')) {
      return 'This is a test response from the AI.';
    }
    return 'Default AI response for testing.';
  }
);

// Test file
describe('Chat Integration', () => {
  it('sends message and receives response', async () => {
    const { sendMessage } = useChatStore.getState();
    
    await sendMessage('test message');
    
    const conversations = useChatStore.getState().conversations;
    expect(conversations['testTopic']).toHaveLength(2); // User + AI
  });
});
```

### **API Health Checks**
```typescript
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    // Simple health check
    const response = await fetch(`${OPENAI_BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};
```

---

## 📈 **Performance Optimization**

### **Request Caching**
```typescript
class APICache {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private ttl: number;

  constructor(ttlMs: number = 300000) { // 5 minutes default
    this.ttl = ttlMs;
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
}

const verseCache = new APICache();

export const getVerseWithCache = async (
  surah: number, 
  verse: number
): Promise<Verse> => {
  const cacheKey = `verse_${surah}_${verse}`;
  
  let cachedVerse = verseCache.get(cacheKey);
  if (cachedVerse) return cachedVerse;
  
  const verseData = await getVerse(surah, verse);
  verseCache.set(cacheKey, verseData);
  
  return verseData;
};
```

### **Request Deduplication**
```typescript
class RequestDeduplicator {
  private pending = new Map<string, Promise<any>>();

  async dedupe<T>(key: string, request: () => Promise<T>): Promise<T> {
    if (this.pending.has(key)) {
      return this.pending.get(key)!;
    }

    const promise = request().finally(() => {
      this.pending.delete(key);
    });

    this.pending.set(key, promise);
    return promise;
  }
}

const deduplicator = new RequestDeduplicator();

export const askQuranDeduped = (prompt: string, history: ChatMessage[] = []) => {
  const key = `chat_${prompt.slice(0, 50)}`; // Use first 50 chars as key
  return deduplicator.dedupe(key, () => askQuran(prompt, history));
};
```

---

This API documentation provides a comprehensive overview of all external integrations and internal API patterns used in Quran Chat. The focus on error handling, security, and performance ensures robust and reliable API interactions throughout the application. 