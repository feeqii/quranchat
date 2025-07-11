import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar, 
  Share, 
  Alert,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { useChatStore } from '../../store/useChatStore';

// Components
import { Typography } from '../../components/atoms/Typography';
import { Icon } from '../../components/atoms/Icon';
import { Spacer } from '../../components/atoms/Spacer';

// Utils
import { toggleBookmark, isVerseBookmarked } from '../../utils/bookmarks';
import { generateReflection } from '../../utils/gpt';

interface VerseStoryScreenProps {
  verseText?: string;
  arabicText?: string;
  surahRef?: string;
  verseId?: string;
}

export const VerseStoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const { setTopic, clearMessages, addMessage } = useChatStore();
  
  // State management
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [reflection, setReflection] = useState<string>('');
  const [isLoadingReflection, setIsLoadingReflection] = useState(true);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  // Get data from route params or use defaults
  const params = route.params as VerseStoryScreenProps;
  const verseText = params?.verseText || "Say: 'O you servants of Mine who have transgressed against your own selves! Despair not of God's mercy: behold, God forgives all sins - for, verily, He alone is much-forgiving, a dispenser of grace!'";
  const arabicText = params?.arabicText || "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ";
  const surahRef = params?.surahRef || "Surah Az-Zumar 39:53";
  const verseId = params?.verseId || "39:53";

  // Load bookmark status and reflection on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load bookmark status
        const bookmarkStatus = await isVerseBookmarked(verseId);
        setIsBookmarked(bookmarkStatus);

        // Load reflection
        setIsLoadingReflection(true);
        const generatedReflection = await generateReflection(verseText, surahRef, verseId);
        setReflection(generatedReflection);
      } catch (error) {
        console.error('Error loading verse data:', error);
        setReflection('Reflect on this verse and how it applies to your life today.');
      } finally {
        setIsLoadingReflection(false);
      }
    };

    loadData();
  }, [verseId, verseText, surahRef]);

  const handleClose = () => {
    navigation.goBack();
  };

  const handleListen = () => {
    Alert.alert("Coming soon", "Audio playback will be added in a future update.");
  };

  const handleAsk = () => {
    const prefill = `Can you help me understand this verse?\n\n"${verseText}"`;

    // 1. Set new topic (surahName)
    setTopic(surahName);

    // 2. Clear any prior messages
    clearMessages();

    // 3. Seed the chat with user's first message
    addMessage({ role: 'user', content: prefill });

    // 4. Navigate to TopicChatScreen and close the modal properly
    // First close the modal, then navigate with a small delay
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate('TopicChatScreen' as never);
    }, 100);
  };

  const handleSwipeLeft = () => {
    // Removed ReflectionStoryScreen navigation - redundant with Ask feature
    // Users can use the Ask button to explore the verse further
  };

  const handleScreenTap = (event: any) => {
    // Removed tap navigation - screen can now scroll freely
    // Users can use the Ask button for deeper exploration
  };

  const handleBookmark = async () => {
    if (bookmarkLoading) return;
    
    try {
      setBookmarkLoading(true);
      
      const bookmarkData = {
        verseId,
        verseText,
        arabicText,
        surahRef
      };
      
      const newBookmarkStatus = await toggleBookmark(bookmarkData);
      setIsBookmarked(newBookmarkStatus);
      
      // Show feedback
      const message = newBookmarkStatus ? 'Verse bookmarked!' : 'Bookmark removed';
      Alert.alert('Success', message);
      
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      Alert.alert('Error', 'Unable to update bookmark. Please try again.');
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      // Clean up verse text - remove trailing quotes and extra formatting
      const cleanVerseText = verseText.replace(/^["']|["']$/g, '').trim();
      
      const formattedContent = `🕌 Quran Chat – Verse of the Day 📖

"${cleanVerseText}"

— ${surahRef}`;

      await Share.share({
        message: formattedContent,
        title: `Verse from ${surahRef}`,
      });
    } catch (error) {
      console.error('Error sharing verse:', error);
      Alert.alert('Error', 'Unable to share this verse.');
    }
  };

  // Extract surah name for display
  const surahName = surahRef.replace(/Surah\s+/, '').replace(/\s+\d+:\d+$/, '');

  return (
    <LinearGradient
      colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']} // Same gradient as Verse of the Day card
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Top Progress Bar */}
        <View style={styles.topSection}>
          <View style={styles.progressBar} />
          <Spacer size="sm" />
          <Typography 
            variant="caption" 
            color="#6B7C93"
            style={styles.progressText}
            align="center"
          >
            📖 YOUR VERSE • 1 MIN
          </Typography>
          
          {/* Close Button */}
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Icon.Close size={24} color="#6B7C93" />
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <View style={styles.contentArea}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.verseSection}>
            {/* Arabic Text */}
            {arabicText && (
              <>
                <Typography 
                  variant="h2" 
                  color="#2C3E50"
                  style={styles.arabicText}
                  align="center"
                >
                  {arabicText}
                </Typography>
                <Spacer size="lg" />
              </>
            )}

            {/* English Translation */}
            <Typography 
              variant="h3" 
              color="#2C3E50"
              style={styles.verseText}
              align="center"
            >
              {verseText.replace(/^["']|["']$/g, '').trim()}
            </Typography>

            <Spacer size="md" />

            {/* Reference with Bookmark */}
            <View style={styles.referenceContainer}>
              <Typography 
                variant="body" 
                color="#6B7C93"
                style={styles.reference}
                align="center"
              >
                {surahRef}
              </Typography>
              <TouchableOpacity 
                onPress={handleBookmark} 
                style={styles.bookmarkButton}
                disabled={bookmarkLoading}
              >
                {bookmarkLoading ? (
                  <ActivityIndicator size="small" color="#6B7C93" />
                ) : (
                  <Icon.Star 
                    size={20} 
                    color="#6B7C93" 
                    fill={isBookmarked ? "#6B7C93" : 'transparent'}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Spacer size="xl" />

            {/* Reflection Section */}
            <View style={styles.reflectionContainer}>
              {isLoadingReflection ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#6B7C93" />
                  <Spacer size="sm" />
                  <Typography 
                    variant="caption" 
                    color="#6B7C93"
                    style={styles.loadingText}
                    align="center"
                  >
                    Generating reflection...
                  </Typography>
                </View>
              ) : (
                <Typography 
                  variant="body" 
                  color="#2C3E50"
                  style={styles.reflection}
                  align="center"
                >
                  {reflection}
                </Typography>
              )}
            </View>

            <Spacer size="xl" />
          </View>
        </ScrollView>
        </View>

        {/* Bottom Action Bar */}
        <View style={styles.bottomToolbar}>
          <TouchableOpacity onPress={handleListen} style={styles.actionButton}>
            <Icon.BookOpen size={24} color="#6B7C93" />
            <Typography variant="caption" color="#6B7C93" style={styles.actionLabel}>
              Listen
            </Typography>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleAsk} style={styles.actionButton}>
            <Icon.MessageCircle size={24} color="#6B7C93" />
            <Typography variant="caption" color="#6B7C93" style={styles.actionLabel}>
              Ask
            </Typography>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Icon.Share size={24} color="#6B7C93" />
            <Typography variant="caption" color="#6B7C93" style={styles.actionLabel}>
              Share
            </Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    position: 'relative',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#6B7C93',
    borderRadius: theme.radii.pill,
    opacity: 0.6,
  },
  progressText: {
    fontWeight: '600',
    letterSpacing: 1.2,
    opacity: 0.7,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.xl,
    padding: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  contentArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 40, // Generous padding like Verse of the Day card
    paddingBottom: 120, // Space for footer
  },
  verseSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing['2xl'],
  },
  arabicText: {
    fontSize: 26,
    lineHeight: 42,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 1.2,
    fontFamily: 'System',
    color: '#2C3E50',
  },
  verseText: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.3,
    color: '#2C3E50',
    paddingHorizontal: 20,
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reference: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.4,
    color: '#6B7C93',
  },
  bookmarkButton: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
    borderRadius: theme.radii.sm,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  reflectionContainer: {
    maxWidth: '95%',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 20,
    padding: 24,
    marginTop: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  loadingText: {
    opacity: 0.7,
    fontStyle: 'italic',
  },
  reflection: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    textAlign: 'center',
    color: '#2C3E50',
    letterSpacing: 0.2,
  },
  bottomToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -4 },
  },
  actionButton: {
    alignItems: 'center',
    padding: theme.spacing.md,
    minWidth: 80,
    borderRadius: theme.radii.md,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  actionLabel: {
    marginTop: theme.spacing.xs,
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    color: '#6B7C93',
  },

}); 