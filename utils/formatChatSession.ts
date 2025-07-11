interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function formatChatSession(topic: string, messages: ChatMessage[]): string {
  const header = `🕌 Quran Chat — Conversation on "${topic}"`;
  const separator = '';
  
  const formattedMessages = messages.map(msg => {
    const prefix = msg.role === 'user' ? 'You:' : 'Scholar:';
    return `${prefix} ${msg.content.trim()}`;
  });

  return [header, separator, ...formattedMessages].join('\n\n');
}

export function formatChatSessionForClipboard(topic: string, messages: ChatMessage[]): string {
  return formatChatSession(topic, messages);
} 