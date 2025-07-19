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

  // Expanded array of meaningful verses for date-based selection
  const meaningfulVerses = [
    "94:6", // Indeed, with hardship comes ease
    "2:286", // Allah does not burden a soul beyond that it can bear
    "13:28", // Hearts find rest in the remembrance of Allah
    "3:159", // And it is by the mercy of Allah that you were lenient with them
    "65:3", // And whoever relies upon Allah - then He is sufficient for him
    "2:216", // But perhaps you hate a thing and it is good for you
    "39:53", // Say, "O My servants who have transgressed against themselves..."
    "25:70", // Except for those who repent, believe and do righteous work
    // Adding 40+ more verses for much greater variety
    "2:155", // And give good tidings to the patient
    "14:7", // If you are grateful, I will certainly give you more
    "3:185", // Every soul will taste death
    "4:147", // What would Allah do with your punishment if you are grateful
    "17:110", // Say: Call upon Allah or call upon the Most Merciful
    "18:46", // Wealth and children are adornment of worldly life
    "24:35", // Allah is the light of the heavens and the earth
    "29:69", // Those who strive for Us - We will surely guide them
    "31:6", // And of the people is he who buys the amusement of speech
    "41:30", // Those who have said, "Our Lord is Allah" and then remained on a right course
    "42:36", // So whatever thing you have been given - it is but [for] enjoyment of worldly life
    "55:13", // So which of the favors of your Lord would you deny?
    "67:2", // [He] who created death and life to test you as to which of you is best in deed
    "2:148", // For each [religious following] is a direction toward which it faces
    "2:186", // And when My servants ask you concerning Me - indeed I am near
    "3:26", // Say, "O Allah, Owner of Sovereignty"
    "3:160", // If Allah should aid you, no one can overcome you
    "7:56", // And cause not corruption upon the earth after its reformation
    "9:51", // Say, "Never will we be struck except by what Allah has decreed for us"
    "10:62", // Unquestionably, [for] the allies of Allah there will be no fear concerning them
    "11:88", // He said, "I only intend reform as much as I am able"
    "16:97", // Whoever does righteousness, whether male or female, while he is a believer
    "17:7", // If you do good, you do good for yourselves
    "20:2", // We have not sent down to you the Qur'an that you be distressed
    "23:118", // And say, "My Lord, forgive and have mercy"
    "25:63", // And the servants of the Most Merciful are those who walk upon the earth easily
    "28:77", // But seek, through that which Allah has given you, the home of the Hereafter
    "30:21", // And of His signs is that He created for you from yourselves mates
    "33:41", // O you who have believed, remember Allah with much remembrance
    "35:32", // Then We caused to inherit the Book those We have chosen of Our servants
    "40:60", // And your Lord says, "Call upon Me; I will respond to you"
    "49:13", // O mankind, indeed We have created you from male and female
    "51:56", // And I did not create the jinn and mankind except to worship Me
    "62:10", // And when the prayer has been concluded, disperse within the land
    "64:11", // No disaster strikes except by permission of Allah
    "76:9", // [Saying], "We feed you only for the countenance of Allah"
    "87:14", // He has certainly succeeded who purifies himself
    "103:1", // By time, Indeed, mankind is in loss
    "112:1", // Say, "He is Allah, [who is] One"
  ];

  // Get verse based on current date for consistency throughout the day
  const getVerseOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
    // Use day of year to select verse, cycling through the entire array
    return meaningfulVerses[dayOfYear % meaningfulVerses.length];
  };

  const fetchVerseOfTheDay = async () => {
    try {
      setIsLoading(true);
      
      // Get today's verse (consistent throughout the day)
      const todaysVerse = getVerseOfTheDay();
      
      // Fetch both Arabic and English text from AlQuran.cloud API
      const [arabicResponse, englishResponse] = await Promise.all([
        fetch(`https://api.alquran.cloud/v1/ayah/${todaysVerse}/ar.alafasy`),
        fetch(`https://api.alquran.cloud/v1/ayah/${todaysVerse}/en.asad`)
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