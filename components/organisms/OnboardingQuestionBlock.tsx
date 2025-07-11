import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { SectionTitle } from '../atoms/SectionTitle';
import { ProgressBar } from '../atoms/ProgressBar';

interface OnboardingQuestionBlockProps {
  title: string;
  subtitle?: string;
  progress?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const OnboardingQuestionBlock: React.FC<OnboardingQuestionBlockProps> = ({
  title,
  subtitle,
  progress,
  children,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {progress !== undefined && (
        <ProgressBar
          progress={progress}
          style={styles.progressBar}
        />
      )}
      <SectionTitle
        title={title}
        subtitle={subtitle}
        style={styles.title}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  progressBar: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.xl,
  },
  content: {
    flex: 1,
  },
}); 