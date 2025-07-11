import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';
import { theme } from '../../constants/theme';

interface SelectableContextChipProps {
  label: string;
  icon: string; // We'll use emoji icons for simplicity
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const SelectableContextChip: React.FC<SelectableContextChipProps> = ({
  label,
  icon,
  isSelected,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
        disabled && styles.chipDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Typography variant="body" style={styles.icon}>{icon}</Typography>
      </View>
      
      <Typography
        variant="caption"
        color={isSelected ? theme.colors.primary : theme.colors.textSecondary}
        style={[styles.label, isSelected && styles.labelSelected]}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    borderWidth: 2,
    borderColor: theme.colors.primarySoft,
    ...theme.shadows.sm,
  },
  chipSelected: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
    ...theme.shadows.md,
  },
  chipDisabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginBottom: theme.spacing.xs,
  },
  icon: {
    fontSize: 24,
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 12,
  },
  labelSelected: {
    fontWeight: '600',
  },
}); 