import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { t } from '../../localization';
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { MoodSelectorMolecule } from '../../components/molecules/MoodSelectorMolecule';
import { theme } from '../../constants/theme';
import { useTodayStore } from '../../store/useTodayStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { TodayStackParamList } from '../../navigation/TodayStackNavigator';

type MoodCheckinScreenNavigationProp = NativeStackNavigationProp<TodayStackParamList, 'MoodCheckinScreen'>;

// Mood descriptions function - moved outside component to avoid recreation
const getMoodDescription = (level: number): string => {
  if (level <= 2) return t('moods.verySad');
  if (level <= 3) return t('moods.sad');
  if (level <= 4) return t('moods.neutral');
  if (level <= 5) return t('moods.calm');
  if (level <= 6) return t('moods.happy');
  if (level <= 7) return t('moods.joyful');
  if (level <= 8) return t('moods.excited');
  if (level <= 9) return t('moods.grateful');
  return t('moods.blessed');
};

export const MoodCheckinScreen: React.FC = () => {
  const navigation = useNavigation<MoodCheckinScreenNavigationProp>();
  const { moodLevel, moodDescription, setMood } = useTodayStore();
  const { logEvent } = useAnalyticsStore();
  
  // Local state for real-time slider updates
  const [currentMoodLevel, setCurrentMoodLevel] = useState(moodLevel || 5);
  const [currentMoodDescription, setCurrentMoodDescription] = useState(
    moodDescription || getMoodDescription(moodLevel || 5)
  );
  
  // Initialize with existing mood level if available
  useEffect(() => {
    if (moodLevel) {
      setCurrentMoodLevel(moodLevel);
    }
    if (moodDescription) {
      setCurrentMoodDescription(moodDescription);
    }
  }, [moodLevel, moodDescription]);
  
  const handleMoodChange = (level: number) => {
    setCurrentMoodLevel(level);
    setCurrentMoodDescription(getMoodDescription(level));
  };
  
  const handleMoodComplete = (level: number) => {
    // Save to store when user finishes sliding
    const description = getMoodDescription(level);
    setMood(level, description);
  };
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleNext = () => {
    // Ensure mood is saved before navigating
    const description = getMoodDescription(currentMoodLevel);
    setMood(currentMoodLevel, description);
    
    // Log mood selection
    logEvent({ 
      name: 'mood_checkin', 
      mood: description, 
      context: 'daily_checkin' 
    });
    
    // Navigate to context selection screen
    navigation.navigate('ContextSelectionScreen');
  };
  
  const canProceed = currentMoodLevel >= 1 && currentMoodLevel <= 10;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Icon.Back size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        
        <Typography
          variant="title"
          color={theme.colors.textPrimary}
          style={styles.headerTitle}
        >
          {t('howAreYouFeelingToday')}
        </Typography>
        
        <View style={styles.headerSpacer} />
      </View>
      
      <View style={styles.content}>
        <Spacer size="xl" />
        
        {/* Subtitle */}
        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.subtitle}
        >
          {t('dailyGuidanceSubtitle')}
        </Typography>
        
        <Spacer size="2xl" />
        
        {/* Mood Selector */}
        <View style={styles.moodSection}>
          <MoodSelectorMolecule
            moodLevel={currentMoodLevel}
            onMoodChange={handleMoodChange}
            onMoodComplete={handleMoodComplete}
            currentMood={currentMoodDescription}
          />
        </View>
        
        <Spacer size="2xl" />
        
        {/* Reflection Text */}
        <Typography
          variant="caption"
          color={theme.colors.textMuted}
          style={styles.reflectionText}
        >
          {t('yourFeelingsAreValid')}
        </Typography>
        
        <Spacer size="xl" />
      </View>
      
      {/* Next Button */}
      <View style={styles.footer}>
        <PrimaryButton
          label={t('next')}
          onPress={handleNext}
          disabled={!canProceed}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginEnd: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  moodSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  reflectionText: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.7,
    lineHeight: 18,
    paddingHorizontal: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
}); 