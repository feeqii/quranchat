import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type ReflectionHistoryEntry = {
  date: string; // Date string (YYYY-MM-DD format)
  moodLevel: number;
  moodDescription: string;
  selectedContexts: string[];
  userInput: string | null;
  userReflection: string;
  generatedReflection: string | null;
  selectedVerse: { text: string; reference: string } | null;
  completedAt: string; // Timestamp when completed
};

type TodayState = {
  // Mood tracking
  moodLevel: number | null;
  moodDescription: string | null;

  // Context tracking
  selectedContexts: string[];

  // User text input
  userInput: string | null;
  userReflection: string;

  // Daily streak tracking
  streakDays: number[]; // Array containing days of streak completion

  // Generated content
  generatedVerse: string | null;
  generatedDevotion: string | null;
  generatedPrayer: string | null;
  generatedReflection: string | null;
  selectedVerse: { text: string; reference: string } | null;

  // Journey completion status
  journeyCompleted: boolean;
  lastCompletedDate: string | null;

  // Loading states
  isGeneratingContent: boolean;

  // Reflection history and calendar interaction
  reflectionHistory: Record<string, ReflectionHistoryEntry>;
  selectedDate: string | null; // Currently selected date on calendar (null = today)
};

type TodayActions = {
  setMood: (level: number, description: string) => void;
  setContexts: (contexts: string[]) => void;
  addContext: (context: string) => void;
  removeContext: (context: string) => void;
  clearContexts: () => void;
  setUserInput: (input: string) => void;
  setUserReflection: (reflection: string) => void;
  setStreakDay: (day: number) => void;
  setGeneratedContent: (verse: string, devotion: string, prayer: string) => void;
  setGeneratedReflection: (reflection: string) => void;
  setSelectedVerse: (verse: { text: string; reference: string }) => void;
  clearGeneratedContent: () => void;
  setIsGeneratingContent: (isGenerating: boolean) => void;
  completeJourney: () => void;
  clearTodayData: () => void;
  resetForNewDay: () => void;
  
  // History and calendar actions
  setSelectedDate: (date: string | null) => void;
  getReflectionForDate: (date: string) => ReflectionHistoryEntry | null;
  saveReflectionToHistory: () => void;
};

type TodayStore = TodayState & TodayActions;

export const useTodayStore = create<TodayStore>()(
  persist(
    (set, get) => ({
      // State
      moodLevel: null,
      moodDescription: null,
      selectedContexts: [],
      userInput: null,
      userReflection: '',
      streakDays: [],
      generatedVerse: null,
      generatedDevotion: null,
      generatedPrayer: null,
      generatedReflection: null,
      selectedVerse: null,
      journeyCompleted: false,
      lastCompletedDate: null,
      isGeneratingContent: false,
      
      // History and calendar state
      reflectionHistory: {},
      selectedDate: null,
      
      // Actions
      setMood: (level, description) => set({ moodLevel: level, moodDescription: description }),
      
      setContexts: (contexts) => set({ selectedContexts: contexts }),
      
      addContext: (context) => {
        const { selectedContexts } = get();
        if (!selectedContexts.includes(context)) {
          set({ selectedContexts: [...selectedContexts, context] });
        }
      },
      
      removeContext: (context) => {
        const { selectedContexts } = get();
        set({ selectedContexts: selectedContexts.filter(c => c !== context) });
      },
      
      clearContexts: () => set({ selectedContexts: [] }),
      
      setUserInput: (input) => set({ userInput: input }),
      
      setUserReflection: (reflection) => set({ userReflection: reflection }),
      
      setStreakDay: (day) => {
        const { streakDays } = get();
        if (!streakDays.includes(day)) {
          set({ streakDays: [...streakDays, day] });
        }
      },
      
      setGeneratedContent: (verse, devotion, prayer) => set({ 
        generatedVerse: verse, 
        generatedDevotion: devotion, 
        generatedPrayer: prayer 
      }),
      
      setGeneratedReflection: (reflection) => set({ generatedReflection: reflection }),
      
      setSelectedVerse: (verse) => set({ selectedVerse: verse }),
      
      clearGeneratedContent: () => set({ 
        generatedReflection: null,
        selectedVerse: null 
      }),
      
      setIsGeneratingContent: (isGenerating) => set({ isGeneratingContent: isGenerating }),
      
      completeJourney: () => {
        const today = new Date().toDateString();
        const todayNumber = new Date().getDate();
        
        set({ 
          journeyCompleted: true, 
          lastCompletedDate: today,
        });
        
        // Add today to streak if not already added
        const { streakDays } = get();
        if (!streakDays.includes(todayNumber)) {
          set({ streakDays: [...streakDays, todayNumber] });
        }
        
        // Save to reflection history
        const { saveReflectionToHistory } = get();
        saveReflectionToHistory();
      },
      
      clearTodayData: () => set({ 
        moodLevel: null,
        moodDescription: null,
        selectedContexts: [],
        userInput: null,
        userReflection: '',
        generatedVerse: null,
        generatedDevotion: null,
        generatedPrayer: null,
        generatedReflection: null,
        selectedVerse: null,
        journeyCompleted: false,
        isGeneratingContent: false,
      }),
      
      resetForNewDay: () => {
        const today = new Date().toDateString();
        const { lastCompletedDate } = get();
        
        if (lastCompletedDate !== today) {
          set({
            moodLevel: null,
            moodDescription: null,
            selectedContexts: [],
            userInput: null,
            userReflection: '',
            generatedVerse: null,
            generatedDevotion: null,
            generatedPrayer: null,
            generatedReflection: null,
            selectedVerse: null,
            journeyCompleted: false,
            lastCompletedDate: null,
            isGeneratingContent: false,
            selectedDate: null, // Reset to today
          });
        }
      },
      
      // History and calendar actions
      setSelectedDate: (date) => set({ selectedDate: date }),
      
      getReflectionForDate: (date) => {
        const { reflectionHistory } = get();
        return reflectionHistory[date] || null;
      },
      
      saveReflectionToHistory: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Only save if journey is completed and has content
        if (state.journeyCompleted && state.moodLevel !== null) {
          const entry: ReflectionHistoryEntry = {
            date: today,
            moodLevel: state.moodLevel,
            moodDescription: state.moodDescription || '',
            selectedContexts: [...state.selectedContexts],
            userInput: state.userInput,
            userReflection: state.userReflection,
            generatedReflection: state.generatedReflection,
            selectedVerse: state.selectedVerse,
            completedAt: new Date().toISOString(),
          };
          
          set({ 
            reflectionHistory: { 
              ...state.reflectionHistory, 
              [today]: entry 
            } 
          });
        }
      },
    }),
    {
      name: '@todayData',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 