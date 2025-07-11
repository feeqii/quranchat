/**
 * Utility function to generate GPT prompt for verse reflections
 * This provides a centralized way to create consistent, high-quality prompts
 * for generating devotional reflections on Quran verses.
 */

interface VerseReflectionPromptParams {
  surahName: string;
  verseNumber: string | number;
  verseText: string;
}

export const getVerseReflectionPrompt = ({
  surahName,
  verseNumber,
  verseText,
}: VerseReflectionPromptParams) => {
  const systemPrompt = `Write a warm, humble 100–120 word spiritual reflection on this Quran verse. Make it emotionally resonant and centered on personal growth, mercy, and connection to Allah. Use soft, devotional language. Do not repeat the verse. Keep it timeless and non-political.`;

  const userPrompt = `Verse: "${verseText}"
Surah: ${surahName}, Verse ${verseNumber}`;

  return {
    systemPrompt,
    userPrompt,
  };
};

/**
 * Alternative prompt for deeper theological reflection
 * Use this when the user wants a more scholarly approach
 */
export const getDeepReflectionPrompt = ({
  surahName,
  verseNumber,
  verseText,
}: VerseReflectionPromptParams) => {
  const systemPrompt = `Write a thoughtful 120–150 word spiritual reflection on this Quran verse. Focus on the deeper meanings, historical context, and practical applications for modern Muslim life. Use scholarly yet accessible language. Include one specific way to apply this teaching today.`;

  const userPrompt = `Verse: "${verseText}"
Surah: ${surahName}, Verse ${verseNumber}

Please provide a deeper theological reflection on this verse.`;

  return {
    systemPrompt,
    userPrompt,
  };
};

/**
 * Prompt for youth-focused reflection
 * Use this for younger audiences or when addressing modern challenges
 */
export const getYouthReflectionPrompt = ({
  surahName,
  verseNumber,
  verseText,
}: VerseReflectionPromptParams) => {
  const systemPrompt = `Write a relatable 100–120 word spiritual reflection on this Quran verse for young Muslims. Address modern challenges like social media, peer pressure, career anxiety, or identity. Use contemporary language while maintaining respect for the sacred text. Include one practical tip for daily life.`;

  const userPrompt = `Verse: "${verseText}"
Surah: ${surahName}, Verse ${verseNumber}

Please provide a reflection that speaks to young Muslims facing modern challenges.`;

  return {
    systemPrompt,
    userPrompt,
  };
}; 