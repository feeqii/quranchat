import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../atoms/Typography';
import { theme } from '../../constants/theme';

interface ReflectionPreviewProps {
  text: string;
  maxLength?: number;
}

export const ReflectionPreview: React.FC<ReflectionPreviewProps> = ({
  text,
  maxLength = 60
}) => {
  const truncatedText = text.length > maxLength 
    ? `${text.substring(0, maxLength)}...` 
    : text;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEF7FF', '#F8FAFF', '#FFFFFF']} // Soft purple gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.iconContainer}>
          <Typography variant="body" style={styles.emoji}>
            💭
          </Typography>
        </View>
        <View style={styles.textContainer}>
          <Typography
            variant="small"
            color="#6B7280"
            style={styles.reflectionText}
          >
            {truncatedText}
          </Typography>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  iconContainer: {
    marginRight: 16,
    marginTop: 2,
  },
  emoji: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  reflectionText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
}); 