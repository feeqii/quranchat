import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  topic: string;
  messages: ChatMessage[];
  createdAt: string;
  isFavorite: boolean;
}

interface HistoryState {
  sessions: ChatSession[];
  saveSession: (topic: string, messages: ChatMessage[]) => void;
  deleteSession: (id: string) => void;
  getSessionById: (id: string) => ChatSession | undefined;
  toggleFavorite: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      // State
      sessions: [],

      // Actions
      saveSession: (topic: string, messages: ChatMessage[]) => {
        // Only save if there are messages
        if (messages.length === 0) return;

        const newSession: ChatSession = {
          id: Date.now().toString(),
          topic,
          messages: [...messages], // Create a copy of messages array
          createdAt: new Date().toISOString(),
          isFavorite: false,
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions], // Add to beginning for most recent first
        }));
      },

      deleteSession: (id: string) => {
        set((state) => ({
          sessions: state.sessions.filter(session => session.id !== id),
        }));
      },

      getSessionById: (id: string) => {
        const { sessions } = get();
        return sessions.find(session => session.id === id);
      },

      toggleFavorite: (id: string) => {
        set((state) => ({
          sessions: state.sessions.map(session =>
            session.id === id
              ? { ...session, isFavorite: !session.isFavorite }
              : session
          ),
        }));
      },

      clearHistory: () => {
        set({ sessions: [] });
      },
    }),
    {
      name: '@chatHistory',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 