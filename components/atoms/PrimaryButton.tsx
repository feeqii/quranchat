import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...theme.shadows.sm,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: theme.colors.surface,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    lineHeight: theme.lineHeights.body,
    textAlign: 'center',
  },
}); 