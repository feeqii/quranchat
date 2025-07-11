import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface ProgressBarProps {
  progress: number; // 0-100
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.progress, 
          { width: `${clampedProgress}%` }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 4,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.full,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.full,
  },
}); 