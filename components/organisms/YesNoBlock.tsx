import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { SecondaryButton } from '../atoms/SecondaryButton';

interface YesNoBlockProps {
  question: string;
  onYes: () => void;
  onNo: () => void;
  style?: ViewStyle;
}

export const YesNoBlock: React.FC<YesNoBlockProps> = ({
  question,
  onYes,
  onNo,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Typography 
        variant="body" 
        align="center"
        style={styles.question}
      >
        {question}
      </Typography>
      
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Yes"
          onPress={onYes}
          style={styles.button}
        />
        <SecondaryButton
          label="No"
          onPress={onNo}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  question: {
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: theme.spacing.md,
  },
}); 