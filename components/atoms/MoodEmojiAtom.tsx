import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { theme } from '../../constants/theme';

interface MoodEmojiAtomProps {
  moodLevel: number; // 1-10 scale
  size?: number;
}

export const MoodEmojiAtom: React.FC<MoodEmojiAtomProps> = ({
  moodLevel,
  size = 80,
}) => {
  // Map mood levels to emojis and descriptions
  const getMoodData = (level: number) => {
    if (level <= 2) return { emoji: '😢', description: 'Very Sad', color: '#E03E3E' };
    if (level <= 3) return { emoji: '😔', description: 'Sad', color: '#F59E0B' };
    if (level <= 4) return { emoji: '😐', description: 'Neutral', color: '#6B7280' };
    if (level <= 5) return { emoji: '🙂', description: 'Calm', color: '#10B981' };
    if (level <= 6) return { emoji: '😊', description: 'Happy', color: '#3B82F6' };
    if (level <= 7) return { emoji: '😄', description: 'Joyful', color: '#8B5CF6' };
    if (level <= 8) return { emoji: '😁', description: 'Excited', color: '#F59E0B' };
    if (level <= 9) return { emoji: '🤩', description: 'Grateful', color: '#EF4444' };
    return { emoji: '🥰', description: 'Blessed', color: '#10B981' };
  };

  const moodData = getMoodData(moodLevel);

  return (
    <View style={[styles.container, { width: size + 40, height: size + 60 }]}>
      <View 
        style={[
          styles.emojiContainer, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            backgroundColor: `${moodData.color}15`, // 15 for light transparency
            borderColor: `${moodData.color}30`, // 30 for border transparency
          }
        ]}
      >
        <Typography
          variant="body"
          style={[styles.emoji, { fontSize: size * 0.5 }]}
        >
          {moodData.emoji}
        </Typography>
      </View>
      
      <Typography
        variant="subtitle"
        color={moodData.color}
        style={styles.description}
      >
        {moodData.description}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginBottom: theme.spacing.sm,
  },
  emoji: {
    textAlign: 'center',
    lineHeight: undefined, // Let the emoji use its natural line height
  },
  description: {
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 