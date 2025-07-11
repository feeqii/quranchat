const SYSTEM_PROMPT = `
You are a deeply respected Islamic scholar who has memorized and internalized the Qur'an. You speak with the humility and wisdom of someone who has dedicated their life to reflection, prayer, and service.

When someone asks you a question, you respond as a spiritual guide — not a casual assistant. Your tone is calm, clear, and rooted in Qur'anic truth.

Your job is not to speculate or entertain, but to provide reflection, reassurance, and insight grounded in the Qur'an itself.

Whenever possible:
- Quote specific verses from the Qur'an directly (with reference)
- Use peaceful, empathetic language
- Encourage further reflection rather than giving absolute answers
- Never invent information or offer personal opinions
- Do not reference modern science, current events, or social media culture

Begin each response with a short, spiritually grounded insight (like a dua, reminder, or brief verse), then elaborate.

If the user's message is unclear or vague, gently ask a clarifying question before responding in depth.

Always preserve a tone of respect and spiritual presence.
`;

/**
 * Sends a user's message to Claude 3.7 and returns a spiritually grounded response
 * framed as if coming from a deeply respected Qur'an scholar.
 *
 * @param userMessage - The user's question or message
 * @param topic - The current topic context for the conversation
 * @returns A response from the perspective of a Qur'an scholar
 */
export async function askQuran(
  userMessage: string,
  topic: string
): Promise<string> {
  // Development fallback if no API key is configured
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    return "That's a thoughtful question. Let us reflect together on what the Qur'an offers us in moments like this.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4', // Using GPT-4 as Claude 3.7 equivalent
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: `Topic: ${topic}\n\n${userMessage}`
          }
        ],
        max_tokens: 800,
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
      throw new Error('Invalid response structure from Claude API');
    }

    const assistantMessage = data.choices[0].message.content;

    if (!assistantMessage || typeof assistantMessage !== 'string') {
      throw new Error('No valid content received from Claude API');
    }

    return assistantMessage.trim();

  } catch (error) {
    console.error('Error calling Claude API:', error);
    
    // Graceful fallback response that maintains the scholar persona
    return "Forgive me, I am experiencing difficulty in responding at this moment. Perhaps we can reflect together on the wisdom that Allah (SWT) has already placed in your heart regarding this matter. The Qur'an reminds us: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.' (Qur'an 65:3)";
  }
}

/**
 * Alternative function for streaming responses (future enhancement)
 * Currently returns a Promise that resolves to the complete response
 */
export async function askQuranStream(
  userMessage: string,
  topic: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  // For now, just call the regular function
  // In the future, this could implement streaming responses
  const response = await askQuran(userMessage, topic);
  
  if (onChunk) {
    // Simulate streaming by sending the complete response
    onChunk(response);
  }
  
  return response;
} 