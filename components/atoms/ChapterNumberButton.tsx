import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { theme } from '../../constants/theme';

interface ChapterNumberButtonProps {
  number: number;
  isSelected: boolean;
  onPress: () => void;
}

export const ChapterNumberButton: React.FC<ChapterNumberButtonProps> = ({
  number,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Typography
        variant="body"
        color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
      >
        {number}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.xs,
  },
  containerSelected: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.textPrimary,
  },
}); 