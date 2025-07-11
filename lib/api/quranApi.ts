export interface QuranVerse {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: QuranVerse[];
}

export interface QuranApiResponse {
  code: number;
  status: string;
  data: QuranSurah;
}

// Available translations
export const translations = {
  // Arabic Editions
  'quran-uthmani': 'القرآن الكريم - النص العثماني',
  'quran-simple': 'القرآن الكريم - النص المبسط',
  'quran-simple-enhanced': 'القرآن الكريم - النص المبسط المحسن',
  'quran-tajweed': 'القرآن الكريم - مع التجويد',
  
  // English Translations
  'en.sahih': 'Sahih International',
  'en.pickthall': 'Pickthall',
  'en.yusufali': 'Yusuf Ali',
  'en.shakir': 'Shakir',
  'en.mohsin': 'Mohsin Khan',
  'en.hilali': 'Hilali & Khan',
  'en.maududi': 'Maududi',
  'en.arberry': 'Arberry',
  'en.asad': 'Muhammad Asad',
  'en.daryabadi': 'Daryabadi',
  'en.qaribullah': 'Qaribullah & Darwish',
};

/**
 * Fetch a complete Surah with verses
 */
export async function getSurahVerses(
  surahNumber: number, 
  translation: string = 'en.sahih'
): Promise<QuranVerse[]> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/${translation}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: QuranApiResponse = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`API error: ${data.status}`);
    }
    
    return data.data.ayahs;
  } catch (error) {
    console.error('Error fetching Surah verses:', error);
    throw error;
  }
}

/**
 * Fetch a specific verse
 */
export async function getVerse(
  surahNumber: number, 
  verseNumber: number, 
  translation: string = 'en.sahih'
): Promise<QuranVerse> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/ayah/${surahNumber}:${verseNumber}/${translation}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`API error: ${data.status}`);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching verse:', error);
    throw error;
  }
}

/**
 * Fetch multiple verses from a range
 */
export async function getVerseRange(
  surahNumber: number, 
  startVerse: number, 
  endVerse: number, 
  translation: string = 'en.sahih'
): Promise<QuranVerse[]> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/ayahs/${startVerse}-${endVerse}/${translation}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`API error: ${data.status}`);
    }
    
    return data.data.ayahs;
  } catch (error) {
    console.error('Error fetching verse range:', error);
    throw error;
  }
}

/**
 * Get Surah information without verses
 */
export async function getSurahInfo(surahNumber: number): Promise<Omit<QuranSurah, 'ayahs'>> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`API error: ${data.status}`);
    }
    
    const { ayahs, ...surahInfo } = data.data;
    return surahInfo;
  } catch (error) {
    console.error('Error fetching Surah info:', error);
    throw error;
  }
}

/**
 * Search for verses containing specific text
 */
export async function searchVerses(
  query: string, 
  translation: string = 'en.sahih'
): Promise<QuranVerse[]> {
  try {
    const response = await fetch(
      `https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/${translation}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.code !== 200) {
      throw new Error(`API error: ${data.status}`);
    }
    
    return data.data.matches;
  } catch (error) {
    console.error('Error searching verses:', error);
    throw error;
  }
} 