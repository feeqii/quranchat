import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ReflectionHookResult {
  reflectionText: string;
  loading: boolean;
  error: string | null;
  regenerateReflection: () => Promise<void>;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Check both environment variables - OPENAI_API_KEY for production (EAS secrets) 
// and EXPO_PUBLIC_OPENAI_API_KEY for local development
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const REFLECTION_CACHE_PREFIX = '@reflection:';

export const useReflectionGenerator = (
  surahName: string,
  verseNumber: string,
  verseText?: string
): ReflectionHookResult => {
  const [reflectionText, setReflectionText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${REFLECTION_CACHE_PREFIX}${surahName}:${verseNumber}`;

  const generateReflection = async (forceRegenerate = false): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first (unless forcing regeneration)
      if (!forceRegenerate) {
        const cachedReflection = await AsyncStorage.getItem(cacheKey);
        if (cachedReflection) {
          setReflectionText(cachedReflection);
          setLoading(false);
          return;
        }
      }

      // Validate API key
      if (!OPENAI_API_KEY) {
        throw new Error('⚠️ OpenAI API key not available in either OPENAI_API_KEY or EXPO_PUBLIC_OPENAI_API_KEY');
      }

      // Prepare the system prompt
      const systemPrompt = `Write a warm, humble 100–120 word spiritual reflection on this Quran verse. Make it emotionally resonant and centered on personal growth, mercy, and connection to Allah. Use soft, devotional language. Do not repeat the verse. Keep it timeless and non-political.`;

      // Prepare the user prompt
      const userPrompt = `Verse: "${verseText}"
Surah: ${surahName}, Verse ${verseNumber}`;

      // Make API call to OpenAI
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo',
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: userPrompt,
            },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: OpenAIResponse = await response.json();
      const generatedReflection = data.choices[0]?.message?.content?.trim();

      if (!generatedReflection) {
        throw new Error('No reflection generated from OpenAI');
      }

      // Cache the reflection
      await AsyncStorage.setItem(cacheKey, generatedReflection);
      setReflectionText(generatedReflection);

    } catch (err) {
      console.error('Error generating reflection:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate reflection');
      
      // Fallback reflection
      const fallbackReflection = `This verse from Surah ${surahName} offers profound wisdom for our daily lives. Take a moment to reflect on its deeper meaning and consider how you can apply its guidance in your actions and thoughts today. Let this verse be a source of comfort and inspiration as you navigate life's challenges.`;
      
      setReflectionText(fallbackReflection);
    } finally {
      setLoading(false);
    }
  };

  const regenerateReflection = async (): Promise<void> => {
    await generateReflection(true);
  };

  useEffect(() => {
    if (surahName && verseNumber) {
      generateReflection();
    }
  }, [surahName, verseNumber]);

  return {
    reflectionText,
    loading,
    error,
    regenerateReflection,
  };
}; 