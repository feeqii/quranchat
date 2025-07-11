import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

interface QuranApiResponse {
  data: {
    text: string;
    numberInSurah: number;
    surah: {
      name: string;
      englishName: string;
      number: number;
    };
  };
}

interface VerseData {
  verseText: string;
  arabicText: string;
  surahRef: string;
  verseId: string;
}

interface VerseOfTheDayCardProps {
  style?: ViewStyle;
}

export const VerseOfTheDayCard: React.FC<VerseOfTheDayCardProps> = ({
  style,
}) => {
  const navigation = useNavigation();
  const [verseData, setVerseData] = useState<VerseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const scaleValue = new Animated.Value(1);

  // Fallback verse data
  const fallbackVerse: VerseData = {
    verseText: "Indeed, with hardship comes ease.",
    arabicText: "وَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    surahRef: "Surah Ash-Sharh 94:6",
    verseId: "94:6"
  };

  // Array of popular verses for random selection
  const popularVerses = [
    "94:6", // Indeed, with hardship comes ease
    "2:286", // Allah does not burden a soul beyond that it can bear
    "13:28", // Hearts find rest in the remembrance of Allah
    "3:159", // And it is by the mercy of Allah that you were lenient with them
    "65:3", // And whoever relies upon Allah - then He is sufficient for him
    "2:216", // But perhaps you hate a thing and it is good for you
    "39:53", // Say, "O My servants who have transgressed against themselves..."
    "25:70", // Except for those who repent, believe and do righteous work
  ];

  const fetchVerseOfTheDay = async () => {
    try {
      setIsLoading(true);
      
      // Select a random verse from popular verses
      const randomVerse = popularVerses[Math.floor(Math.random() * popularVerses.length)];
      
      // Fetch both Arabic and English text from AlQuran.cloud API
      const [arabicResponse, englishResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${randomVerse}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/ayah/${randomVerse}/en.asad`)
      ]);
      
      if (!arabicResponse.ok || !englishResponse.ok) {
        throw new Error('API request failed');
      }
      
      const [arabicData, englishData]: [QuranApiResponse, QuranApiResponse] = await Promise.all([
        arabicResponse.json(),
        englishResponse.json()
      ]);
      
      if (arabicData.data && englishData.data) {
        const formattedVerse: VerseData = {
          verseText: englishData.data.text,
          arabicText: arabicData.data.text,
          surahRef: `Surah ${englishData.data.surah.englishName} ${englishData.data.surah.number}:${englishData.data.numberInSurah}`,
          verseId: `${englishData.data.surah.number}:${englishData.data.numberInSurah}`
        };
        
        setVerseData(formattedVerse);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.log('Failed to fetch verse from API, using fallback:', error);
      setVerseData(fallbackVerse);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerseOfTheDay();
  }, []);

  const handlePress = () => {
    if (!verseData) return;
    
    // Gentle tap animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    try {
      (navigation as any).navigate('VerseStoryScreen', {
        verseText: verseData.verseText,
        arabicText: verseData.arabicText,
        surahRef: verseData.surahRef,
        verseId: verseData.verseId
      });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Unable to open verse story.');
    }
  };

  const displayVerse = verseData || fallbackVerse;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={1}
        disabled={isLoading}
      >
        <LinearGradient
          colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']} // Soft mint to beige gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          {isLoading && (
            <View style={styles.loadingIndicator}>
              <Icon.Loading size={20} color={theme.colors.primary} />
            </View>
          )}
          
          <View style={styles.content}>
            <Typography 
              variant="body" 
              color={theme.colors.textPrimary}
              style={styles.verse}
            >
              {displayVerse.verseText}
            </Typography>
            
            <Typography 
              variant="small" 
              color={theme.colors.textMuted}
              style={styles.reference}
            >
              {displayVerse.surahRef}
            </Typography>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.lg,
    borderRadius: 20, // Generous rounded corners
    overflow: 'hidden',
    ...theme.shadows.lg, // Enhanced shadow for depth
  },
  gradientContainer: {
    minHeight: 200, // Larger, more spacious
    padding: 32, // Generous padding for breathing room
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  verse: {
    fontSize: 18, // Larger, more elegant typography
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'System', // Clean serif-like system font
    fontWeight: '400',
    letterSpacing: 0.3,
    marginBottom: 24,
    color: '#2C3E50', // Rich, readable color
  },
  reference: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#6B7C93',
    letterSpacing: 0.5,
  },
}); 