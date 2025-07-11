import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  selected,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  selected: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: theme.colors.primary,
    ...theme.shadows.md,
  },
  label: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    lineHeight: theme.lineHeights.body,
  },
  selectedLabel: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.heading,
  },
}); 