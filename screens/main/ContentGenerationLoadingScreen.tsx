import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { AnimatedLoader } from '../../components/atoms/AnimatedLoader';
import { theme } from '../../constants/theme';
import { useTodayStore } from '../../store/useTodayStore';
import { TodayStackParamList } from '../../navigation/TodayStackNavigator';
import { generateReflection, fetchRelevantVerse } from '../../lib/api/todayJourney';

type ContentGenerationLoadingScreenNavigationProp = NativeStackNavigationProp<TodayStackParamList, 'ContentGenerationLoadingScreen'>;

export const ContentGenerationLoadingScreen: React.FC = () => {
  const navigation = useNavigation<ContentGenerationLoadingScreenNavigationProp>();
  const { 
    moodDescription, 
    selectedContexts, 
    userReflection,
    setIsGeneratingContent,
    setGeneratedReflection,
    setSelectedVerse
  } = useTodayStore();
  
  useEffect(() => {
    // Set loading state to true when component mounts
    setIsGeneratingContent(true);
    
    // Generate content using the API functions
    const generateContent = async () => {
      try {
        const mood = moodDescription || 'neutral';
        const contexts = selectedContexts;
        const userInput = userReflection;
        
        // Generate reflection and fetch verse in parallel
        const [reflection, verse] = await Promise.all([
          generateReflection(mood, contexts, userInput),
          fetchRelevantVerse(mood, contexts)
        ]);
        
        // Store the generated content
        setGeneratedReflection(reflection);
        setSelectedVerse(verse);
        
        // Reset loading state
        setIsGeneratingContent(false);
        
        // Navigate to generated reflection screen
        navigation.navigate('GeneratedReflectionScreen');
        
      } catch (error) {
        console.error('Error generating content:', error);
        
        // Reset loading state even on error
        setIsGeneratingContent(false);
        
        // Navigate anyway with fallback content (functions handle fallbacks internally)
        navigation.navigate('GeneratedReflectionScreen');
      }
    };
    
    // Add a minimum loading time for better UX (even if API is fast)
    const minLoadingTime = 3000; // 3 seconds minimum
    const startTime = Date.now();
    
    generateContent().then(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      if (remainingTime > 0) {
        setTimeout(() => {
          // Content is already generated and stored, just navigate
          if (!navigation.isFocused()) return; // Prevent navigation if user has left screen
        }, remainingTime);
      }
    });
    
    // Cleanup function
    return () => {
      setIsGeneratingContent(false);
    };
  }, [navigation, setIsGeneratingContent, moodDescription, selectedContexts, userReflection, setGeneratedReflection, setSelectedVerse]);
  
  const affirmations = [
    "Reflecting on your insights...",
    "Seeking guidance from the Quran...",
    "Tailoring today's message for you...",
    "Finding verses that speak to your heart...",
    "Preparing your personalized reflection..."
  ];
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Typography
            variant="title"
            color={theme.colors.textPrimary}
            style={styles.title}
          >
            Crafting Your Reflection...
          </Typography>
          
          <Spacer size="md" />
          
          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={styles.subtitle}
          >
            Please wait while we generate your personalized spiritual guidance.
          </Typography>
        </View>
        
        <Spacer size="xxl" />
        
        {/* Loading Animation Section */}
        <View style={styles.loaderSection}>
          <AnimatedLoader 
            size={80}
            color={theme.colors.primary}
            affirmations={affirmations}
          />
        </View>
        
        <Spacer size="xxl" />
        
        {/* Footer Section with encouragement */}
        <View style={styles.footerSection}>
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            style={styles.encouragementText}
          >
            "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth." (Quran 6:73)
          </Typography>
          
          <Spacer size="lg" />
          
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            style={styles.footerText}
          >
            Taking a moment to find the perfect guidance for your journey...
          </Typography>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  headerSection: {
    paddingTop: theme.spacing.xxl,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  loaderSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerSection: {
    paddingBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  encouragementText: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.7,
    lineHeight: 18,
    paddingHorizontal: theme.spacing.sm,
  },
  footerText: {
    textAlign: 'center',
    opacity: 0.6,
    fontSize: 12,
  },
}); 