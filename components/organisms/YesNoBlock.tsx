import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';
import { Icon } from '../atoms/Icon';

interface YesNoBlockProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
  style?: ViewStyle;
  yesLabel?: string;
  noLabel?: string;
  questionVariant?: 'body' | 'subtitle' | 'h3';
}

export const YesNoBlock: React.FC<YesNoBlockProps> = ({
  question,
  onYes,
  onNo,
  style,
  yesLabel = "Yes",
  noLabel = "No", 
  questionVariant = "subtitle",
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Enhanced question with better typography */}
      <View style={styles.questionContainer}>
      <Typography 
          variant={questionVariant}
          weight="medium"
        align="center"
          color={theme.colors.textPrimary}
        style={styles.question}
      >
        {question}
      </Typography>
      </View>
      
      {/* Enhanced button layout with icons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label={yesLabel}
          onPress={onYes}
          variant="default"
          size="large"
          style={styles.yesButton}
        />
        
        <SecondaryButton
          label={noLabel}
          onPress={onNo}
          style={styles.noButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  questionContainer: {
    width: '100%',
    marginBottom: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.md,
  },
  question: {
    lineHeight: 28, // Enhanced line height for readability
    letterSpacing: 0.2,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.lg,
  },
  yesButton: {
    // Enhanced Yes button styling
    ...theme.shadows.sm,
  },
  noButton: {
    // Enhanced No button styling
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
}); 