import AsyncStorage from '@react-native-async-storage/async-storage';

const REFLECTIONS_KEY = '@verseReflections';

export interface ReflectionData {
  verseId: string;
  reflection: string;
  generatedAt: string;
}

/**
 * Get cached reflection for a verse
 */
export const getCachedReflection = async (verseId: string): Promise<string | null> => {
  try {
    const reflectionsJson = await AsyncStorage.getItem(REFLECTIONS_KEY);
    if (!reflectionsJson) return null;
    
    const reflections: ReflectionData[] = JSON.parse(reflectionsJson);
    const cachedReflection = reflections.find(r => r.verseId === verseId);
    
    return cachedReflection?.reflection || null;
  } catch (error) {
    console.error('Error getting cached reflection:', error);
    return null;
  }
};

/**
 * Cache a reflection for a verse
 */
export const cacheReflection = async (verseId: string, reflection: string): Promise<void> => {
  try {
    const reflectionsJson = await AsyncStorage.getItem(REFLECTIONS_KEY);
    const reflections: ReflectionData[] = reflectionsJson ? JSON.parse(reflectionsJson) : [];
    
    // Remove existing reflection for this verse
    const updatedReflections = reflections.filter(r => r.verseId !== verseId);
    
    // Add new reflection
    const newReflection: ReflectionData = {
      verseId,
      reflection,
      generatedAt: new Date().toISOString()
    };
    
    updatedReflections.push(newReflection);
    
    // Keep only last 50 reflections to avoid storage bloat
    const limitedReflections = updatedReflections
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
      .slice(0, 50);
    
    await AsyncStorage.setItem(REFLECTIONS_KEY, JSON.stringify(limitedReflections));
  } catch (error) {
    console.error('Error caching reflection:', error);
  }
};

/**
 * Generate a reflection for a verse using GPT
 * This is a placeholder - you would integrate with your actual GPT API
 */
export const generateReflection = async (
  verseText: string,
  surahRef: string,
  verseId: string
): Promise<string> => {
  try {
    // Check cache first
    const cachedReflection = await getCachedReflection(verseId);
    if (cachedReflection) {
      return cachedReflection;
    }
    
    // Extract surah name and verse number from reference
    const surahMatch = surahRef.match(/Surah\s+([^0-9]+)\s+(\d+):(\d+)/);
    const surahName = surahMatch?.[1]?.trim() || 'Unknown';
    const verseNumber = surahMatch?.[3] || verseId.split(':')[1];
    
    // TODO: Replace with actual GPT API call
    // For now, we'll use a placeholder that varies based on the verse
    const prompt = `Write a warm, humble reflection on Surah ${surahName}, verse ${verseNumber} for a modern reader.`;
    
    // Placeholder reflection generation (replace with actual GPT API)
    const reflection = await generatePlaceholderReflection(verseText, surahName, verseNumber);
    
    // Cache the reflection
    await cacheReflection(verseId, reflection);
    
    return reflection;
  } catch (error) {
    console.error('Error generating reflection:', error);
    return getFallbackReflection();
  }
};

/**
 * Placeholder reflection generator
 * Replace this with actual GPT API integration
 */
const generatePlaceholderReflection = async (
  verseText: string,
  surahName: string,
  verseNumber: string
): Promise<string> => {
  // This is a placeholder - integrate with your actual GPT API
  // For now, return a contextual reflection based on common themes
  
  const reflections = [
    "This verse reminds us that Allah's mercy is boundless and always within reach. In our daily struggles, we may feel distant from divine guidance, but this passage reassures us that forgiveness and compassion are fundamental to our spiritual journey. Take a moment to reflect on how this divine mercy manifests in your own life and relationships.",
    
    "The wisdom in this verse speaks to the human condition of making mistakes and seeking redemption. It teaches us that our shortcomings don't define us, but rather how we respond to them does. Consider how you can embody this same spirit of forgiveness and understanding in your interactions with others today.",
    
    "This passage offers profound comfort during difficult times. It reminds us that challenges are temporary and that there is always hope for renewal and growth. Reflect on how this verse can guide you through current difficulties and help you maintain faith in Allah's plan for your life.",
    
    "The beauty of this verse lies in its call for self-reflection and spiritual growth. It invites us to examine our hearts and actions with honesty and compassion. Consider how you can apply this wisdom to become a better version of yourself and strengthen your relationship with Allah and your community."
  ];
  
  // Simple hash-based selection for consistency
  const hash = verseText.length + surahName.length + parseInt(verseNumber || '1');
  const selectedReflection = reflections[hash % reflections.length];
  
  return selectedReflection;
};

/**
 * Fallback reflection when generation fails
 */
const getFallbackReflection = (): string => {
  return "Reflect on this verse and how it applies to your life today. Consider its deeper meaning and how it can guide your actions and thoughts.";
}; 