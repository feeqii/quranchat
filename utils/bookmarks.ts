import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@bookmarkedVerses';

export interface BookmarkData {
  verseId: string;
  verseText: string;
  arabicText?: string;
  surahRef: string;
  bookmarkedAt: string;
}

/**
 * Get all bookmarked verses
 */
export const getBookmarkedVerses = async (): Promise<BookmarkData[]> => {
  try {
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
    if (!bookmarksJson) return [];
    
    const bookmarks: BookmarkData[] = JSON.parse(bookmarksJson);
    return bookmarks.sort((a, b) => new Date(b.bookmarkedAt).getTime() - new Date(a.bookmarkedAt).getTime());
  } catch (error) {
    console.error('Error getting bookmarked verses:', error);
    return [];
  }
};

/**
 * Check if a verse is bookmarked
 */
export const isVerseBookmarked = async (verseId: string): Promise<boolean> => {
  try {
    const bookmarks = await getBookmarkedVerses();
    return bookmarks.some(bookmark => bookmark.verseId === verseId);
  } catch (error) {
    console.error('Error checking if verse is bookmarked:', error);
    return false;
  }
};

/**
 * Add a verse to bookmarks
 */
export const addBookmark = async (bookmarkData: Omit<BookmarkData, 'bookmarkedAt'>): Promise<void> => {
  try {
    const bookmarks = await getBookmarkedVerses();
    
    // Check if already bookmarked
    const isAlreadyBookmarked = bookmarks.some(bookmark => bookmark.verseId === bookmarkData.verseId);
    if (isAlreadyBookmarked) {
      console.log('Verse already bookmarked');
      return;
    }
    
    const newBookmark: BookmarkData = {
      ...bookmarkData,
      bookmarkedAt: new Date().toISOString()
    };
    
    const updatedBookmarks = [...bookmarks, newBookmark];
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    
    console.log('Verse bookmarked successfully');
  } catch (error) {
    console.error('Error adding bookmark:', error);
    throw error;
  }
};

/**
 * Remove a verse from bookmarks
 */
export const removeBookmark = async (verseId: string): Promise<void> => {
  try {
    const bookmarks = await getBookmarkedVerses();
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.verseId !== verseId);
    
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
    console.log('Bookmark removed successfully');
  } catch (error) {
    console.error('Error removing bookmark:', error);
    throw error;
  }
};

/**
 * Toggle bookmark status for a verse
 */
export const toggleBookmark = async (bookmarkData: Omit<BookmarkData, 'bookmarkedAt'>): Promise<boolean> => {
  try {
    const isBookmarked = await isVerseBookmarked(bookmarkData.verseId);
    
    if (isBookmarked) {
      await removeBookmark(bookmarkData.verseId);
      return false;
    } else {
      await addBookmark(bookmarkData);
      return true;
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    throw error;
  }
}; 