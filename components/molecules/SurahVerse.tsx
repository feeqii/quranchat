import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';
import { theme } from '../../constants/theme';
import { HighlightColor } from '../../store/useQuranStore';

interface SurahVerseProps {
  verseNumber: number;
  verseText: string;
  isSelected?: boolean;
  highlightColor?: HighlightColor | null;
  onPress?: () => void;
}

const getHighlightColorValue = (color: HighlightColor): string => {
  const colors = {
    green: '#E8F5E8',
    blue: '#E3F2FD',
    yellow: '#FFF9C4',
    pink: '#FCE4EC',
    purple: '#F3E5F5',
  };
  return colors[color];
};

export const SurahVerse: React.FC<SurahVerseProps> = ({
  verseNumber,
  verseText,
  isSelected = false,
  highlightColor = null,
  onPress,
}) => {
  const containerStyle = [
    styles.container,
    isSelected && styles.selectedContainer,
  ];

  const textStyle = [
    styles.verseText,
    highlightColor && {
      backgroundColor: getHighlightColorValue(highlightColor),
      paddingHorizontal: 2,
      paddingVertical: 1,
    },
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.95}
      >
        <View style={styles.content}>
          <View style={styles.verseHeader}>
            <View style={styles.verseNumber}>
              <Typography 
                variant="small" 
                color={theme.colors.textMuted}
                style={styles.verseNumberText}
              >
                {verseNumber}
              </Typography>
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <Typography 
              variant="body" 
              color={theme.colors.textPrimary}
              style={textStyle}
            >
              {verseText}
            </Typography>
            
            {/* Subtle underline for selected verse */}
            {isSelected && (
              <View style={styles.underline} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        <View style={styles.verseHeader}>
          <View style={styles.verseNumber}>
            <Typography 
              variant="small" 
              color={theme.colors.textMuted}
              style={styles.verseNumberText}
            >
              {verseNumber}
            </Typography>
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Typography 
            variant="body" 
            color={theme.colors.textPrimary}
            style={textStyle}
          >
            {verseText}
          </Typography>
          
          {/* Subtle underline for selected verse */}
          {isSelected && (
            <View style={styles.underline} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingBottom: 16,
  },
  selectedContainer: {
    backgroundColor: '#F8F9FA', // Very subtle background for selection
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  verseHeader: {
    marginBottom: 8,
  },
  verseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verseNumberText: {
    fontSize: 12,
    fontWeight: '500',
  },
  textContainer: {
    position: 'relative',
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2C3E50',
    marginTop: 4,
  },
  underline: {
    height: 1,
    backgroundColor: '#3B82F6', // Subtle blue
    marginTop: 4,
    opacity: 0.6,
  },
}); 