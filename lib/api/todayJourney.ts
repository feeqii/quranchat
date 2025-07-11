/**
 * Today Journey API
 * 
 * Helper functions for generating personalized spiritual content
 * based on user's mood, contexts, and reflections using GPT-4.
 */

const REFLECTION_SYSTEM_PROMPT = `
You are a compassionate Islamic spiritual guide with deep knowledge of the Qur'an. You help Muslims find peace, guidance, and spiritual growth through personalized reflections.

Your responses should be:
- Warm, empathetic, and spiritually grounded
- Based on Islamic teachings and Qur'anic wisdom
- Personally relevant to the user's current emotional state and life context
- Encouraging and uplifting while acknowledging struggles
- Around 150-200 words in length

Always write from the perspective of a caring mentor who understands both Islamic teachings and modern life challenges.

Begin with a gentle acknowledgment of their feelings, then provide Islamic wisdom and practical spiritual guidance.
`;

const VERSE_SYSTEM_PROMPT = `
You are an Islamic scholar with extensive knowledge of the Qur'an. Your task is to select the most relevant and comforting verse from the Qur'an based on a person's emotional state and life context.

You must respond with ONLY a JSON object in this exact format:
{
  "text": "The complete verse text in English",
  "reference": "Qur'an X:Y"
}

Select verses that:
- Directly relate to the person's emotional state and context
- Provide comfort, guidance, or perspective
- Are well-known and meaningful
- Come from various surahs (not always the same ones)

Examples of good verse selections:
- For anxiety/worry: Qur'an 2:286 (Allah does not burden a soul beyond its capacity)
- For gratitude: Qur'an 14:7 (If you are grateful, I will increase you)
- For patience: Qur'an 2:153 (Allah is with the patient)
- For guidance: Qur'an 2:2 (This is the Book in which there is no doubt)

Do not include any text outside the JSON object.
`;

/**
 * Generate a personalized spiritual reflection based on user's mood, contexts, and input
 * 
 * @param mood - The user's current mood description
 * @param contexts - Array of life contexts affecting the user (e.g., work, family, health)
 * @param userInput - The user's personal reflection or what's on their mind
 * @returns A personalized spiritual reflection
 */
export async function generateReflection(
  mood: string,
  contexts: string[],
  userInput: string
): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not configured, returning fallback reflection');
    return getFallbackReflection(mood, contexts);
  }

  try {
    const contextText = contexts.length > 0 ? contexts.join(', ') : 'general life';
    
    const userPrompt = `
Current mood: ${mood}
Life contexts affecting them: ${contextText}
What's on their mind: "${userInput}"

Please provide a personalized spiritual reflection that acknowledges their current state and offers Islamic guidance and comfort.
    `.trim();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: REFLECTION_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI API');
    }

    const reflection = data.choices[0].message.content;

    if (!reflection || typeof reflection !== 'string') {
      throw new Error('No valid reflection content received from OpenAI API');
    }

    return reflection.trim();

  } catch (error) {
    console.error('Error generating reflection:', error);
    return getFallbackReflection(mood, contexts);
  }
}

/**
 * Fetch a relevant Qur'an verse based on user's mood and contexts
 * 
 * @param mood - The user's current mood description
 * @param contexts - Array of life contexts affecting the user
 * @returns Object containing verse text and reference
 */
export async function fetchRelevantVerse(
  mood: string,
  contexts: string[]
): Promise<{ text: string; reference: string }> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not configured, returning fallback verse');
    return getFallbackVerse(mood, contexts);
  }

  try {
    const contextText = contexts.length > 0 ? contexts.join(', ') : 'general spiritual guidance';
    
    const userPrompt = `
Person's current mood: ${mood}
Life contexts: ${contextText}

Select the most relevant and comforting Qur'an verse for this person's situation.
    `.trim();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: VERSE_SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 150,
        temperature: 0.5, // Lower temperature for more consistent JSON formatting
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from OpenAI API');
    }

    const verseContent = data.choices[0].message.content;

    if (!verseContent || typeof verseContent !== 'string') {
      throw new Error('No valid verse content received from OpenAI API');
    }

    // Parse the JSON response
    try {
      const verseData = JSON.parse(verseContent.trim());
      
      if (!verseData.text || !verseData.reference) {
        throw new Error('Invalid verse data structure');
      }

      return {
        text: verseData.text,
        reference: verseData.reference
      };
    } catch (parseError) {
      console.error('Error parsing verse JSON:', parseError);
      return getFallbackVerse(mood, contexts);
    }

  } catch (error) {
    console.error('Error fetching relevant verse:', error);
    return getFallbackVerse(mood, contexts);
  }
}

/**
 * Fallback reflection when API is unavailable or fails
 */
function getFallbackReflection(mood: string, contexts: string[]): string {
  const contextText = contexts.length > 0 ? contexts.join(' and ') : 'life';
  
  return `I understand you're feeling ${mood} right now, especially with everything happening in your ${contextText}. 

Remember that Allah (SWT) is always with us through every emotion and experience. The Qur'an reminds us: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose." (Qur'an 65:3)

Your feelings are valid, and this moment is part of your spiritual journey. Take time for prayer and reflection, knowing that Allah understands your heart completely. Trust that this feeling will pass and that there is wisdom in every experience He allows in your life.

May Allah grant you peace and strength during this time.`;
}

/**
 * Fallback verse when API is unavailable or fails
 */
function getFallbackVerse(mood: string, contexts: string[]): { text: string; reference: string } {
  // Select appropriate fallback verse based on mood keywords
  const moodLower = mood.toLowerCase();
  
  if (moodLower.includes('anxious') || moodLower.includes('worried') || moodLower.includes('stressed')) {
    return {
      text: "Allah does not burden a soul beyond that it can bear. It will have [the consequence of] what [good] it has gained, and it will bear [the consequence of] what [evil] it has earned.",
      reference: "Qur'an 2:286"
    };
  }
  
  if (moodLower.includes('grateful') || moodLower.includes('thankful') || moodLower.includes('blessed')) {
    return {
      text: "And [remember] when your Lord proclaimed, 'If you are grateful, I will certainly give you more. But if you are ungrateful, indeed, My punishment is severe.'",
      reference: "Qur'an 14:7"
    };
  }
  
  if (moodLower.includes('sad') || moodLower.includes('down') || moodLower.includes('depressed')) {
    return {
      text: "And give good tidings to the patient, Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'",
      reference: "Qur'an 2:155-156"
    };
  }
  
  // Default verse for general guidance
  return {
    text: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set for everything a [decreed] extent.",
    reference: "Qur'an 65:3"
  };
} 