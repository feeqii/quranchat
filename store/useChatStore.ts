import { create } from 'zustand';
import { QuranVerse } from '../lib/api/quranApi';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  currentTopic: string | null;
  messages: ChatMessage[];
  contextVerses: QuranVerse[] | null;
}

interface ChatActions {
  setTopic: (topic: string) => void;
  setTopicWithVerses: (topic: string, verses: QuranVerse[]) => void;
  clearTopic: () => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  loadMessages: (messages: ChatMessage[]) => void;
}

type ChatStore = ChatState & ChatActions;

const createChatStore = () => create<ChatStore>((set) => ({
  // State
  currentTopic: null,
  messages: [],
  contextVerses: null,
  
  // Actions
  setTopic: (topic: string) => set({ currentTopic: topic, contextVerses: null }),
  setTopicWithVerses: (topic: string, verses: QuranVerse[]) => set({ 
    currentTopic: topic, 
    contextVerses: verses 
  }),
  clearTopic: () => set({ currentTopic: null, contextVerses: null }),
  addMessage: (msg: ChatMessage) => set((state) => ({
    messages: [...state.messages, msg]
  })),
  clearMessages: () => set({ messages: [] }),
  loadMessages: (messages: ChatMessage[]) => set({ messages: [...messages] }),
}));

export const useChatStore = createChatStore(); 