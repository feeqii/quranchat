import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSurahVerses, QuranVerse } from '../lib/api/quranApi';

export type HighlightColor = 'green' | 'blue' | 'yellow' | 'pink' | 'purple';

export interface VerseHighlight {
  surahNumber: number;
  verseNumber: number;
  color: HighlightColor;
  timestamp: number;
}

export interface VerseSelection {
  surahNumber: number;
  verseNumber: number;
  isSelected: boolean;
  timestamp: number;
}

interface QuranState {
  currentSurah: number | null;
  currentTranslation: string;
  verses: QuranVerse[];
  isLoading: boolean;
  
  // Highlighting and selection state
  highlights: Record<string, VerseHighlight>; // key: "surah:verse"
  selectedVerse: VerseSelection | null;
  
  // Actions
  setSurah: (surahNumber: number) => void;
  setTranslation: (translationId: string) => void;
  fetchVerses: () => Promise<void>;
  resetSurah: () => void;
  setLoading: (loading: boolean) => void;
  setVerses: (verses: QuranVerse[]) => void;
  
  // Highlight and selection actions
  highlightVerse: (surahNumber: number, verseNumber: number, color: HighlightColor) => void;
  removeHighlight: (surahNumber: number, verseNumber: number) => void;
  selectVerse: (surahNumber: number, verseNumber: number) => void;
  clearSelection: () => void;
  getVerseKey: (surahNumber: number, verseNumber: number) => string;
}

export const useQuranStore = create<QuranState>()(
  persist(
    (set, get) => ({
      currentSurah: 1, // Default to Al-Fatiha
      currentTranslation: 'en.sahih',
      verses: [],
      isLoading: false,
      highlights: {},
      selectedVerse: null,
      
      setSurah: (surahNumber: number) => {
        set({ currentSurah: surahNumber });
      },
      
      setTranslation: (translationId: string) => {
        set({ currentTranslation: translationId });
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      setVerses: (verses: QuranVerse[]) => {
        set({ verses });
      },
      
      getVerseKey: (surahNumber: number, verseNumber: number) => {
        return `${surahNumber}:${verseNumber}`;
      },
      
      highlightVerse: (surahNumber: number, verseNumber: number, color: HighlightColor) => {
        const { getVerseKey } = get();
        const key = getVerseKey(surahNumber, verseNumber);
        const highlight: VerseHighlight = {
          surahNumber,
          verseNumber,
          color,
          timestamp: Date.now(),
        };
        set((state) => ({
          highlights: { ...state.highlights, [key]: highlight }
        }));
      },
      
      removeHighlight: (surahNumber: number, verseNumber: number) => {
        const { getVerseKey } = get();
        const key = getVerseKey(surahNumber, verseNumber);
        set((state) => {
          const newHighlights = { ...state.highlights };
          delete newHighlights[key];
          return { highlights: newHighlights };
        });
      },
      
      selectVerse: (surahNumber: number, verseNumber: number) => {
        const selection: VerseSelection = {
          surahNumber,
          verseNumber,
          isSelected: true,
          timestamp: Date.now(),
        };
        set({ selectedVerse: selection });
      },
      
      clearSelection: () => {
        set({ selectedVerse: null });
      },
      
      fetchVerses: async () => {
        const { currentSurah, currentTranslation } = get();
        
        if (!currentSurah) {
          return;
        }
        
        try {
          set({ isLoading: true });
          const surahVerses = await getSurahVerses(currentSurah, currentTranslation);
          set({ verses: surahVerses });
        } catch (error) {
          console.error('Error fetching verses:', error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      resetSurah: () => {
        set({ 
          currentSurah: null, 
          verses: [],
          isLoading: false 
        });
      },
    }),
    {
      name: 'quran-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist essential state
      partialize: (state) => ({
        currentSurah: state.currentSurah,
        currentTranslation: state.currentTranslation,
        highlights: state.highlights, // Persist highlights
      }),
    }
  )
); 