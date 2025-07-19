import React from 'react';
import { View, StyleSheet } from 'react-native';
import { t } from '../../localization';
import { MoodEmojiAtom } from '../atoms/MoodEmojiAtom';
import { SliderAtom } from '../atoms/SliderAtom';
import { Typography } from '../atoms/Typography';
import { Spacer } from '../atoms/Spacer';
import { theme } from '../../constants/theme';

interface MoodSelectorMoleculeProps {
  moodLevel: number;
  onMoodChange: (level: number) => void;
  onMoodComplete?: (level: number) => void;
  currentMood?: string;
}

export const MoodSelectorMolecule: React.FC<MoodSelectorMoleculeProps> = ({
  moodLevel,
  onMoodChange,
  onMoodComplete,
  currentMood,
}) => {
  return (
    <View style={styles.container}>
      {/* Emoji Display */}
      <View style={styles.emojiSection}>
        <MoodEmojiAtom 
          moodLevel={moodLevel} 
          size={120}
        />
        {currentMood && (
          <>
            <Spacer size="md" />
            <Typography
              variant="h2"
              color={theme.colors.primary}
              style={styles.moodText}
            >
              {currentMood}
            </Typography>
          </>
        )}
      </View>
      
      <Spacer size="xl" />
      
      {/* Slider Section */}
      <View style={styles.sliderSection}>
        <View style={styles.sliderLabels}>
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            style={styles.sliderLabel}
          >
            {t('moods.verySad')}
          </Typography>
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            style={styles.sliderLabel}
          >
            {t('moods.blessed')}
          </Typography>
        </View>
        
        <Spacer size="sm" />
        
        <SliderAtom
          value={moodLevel}
          minimumValue={1}
          maximumValue={10}
          step={1}
          onValueChange={onMoodChange}
          onSlidingComplete={onMoodComplete}
          trackHeight={12}
          thumbSize={28}
        />
        
        <Spacer size="sm" />
        
        {/* Mood Level Indicator */}
        <View style={styles.levelIndicator}>
          <Typography
            variant="caption"
            color={theme.colors.textMuted}
            style={styles.levelText}
          >
            {t('level')} {moodLevel} {t('of')} 10
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  emojiSection: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  moodText: {
    textAlign: 'center',
    fontSize: 24,
  },
  sliderSection: {
    width: '100%',
    paddingHorizontal: theme.spacing.md,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xs,
  },
  sliderLabel: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '500',
  },
  levelIndicator: {
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
  },
}); 