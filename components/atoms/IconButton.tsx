import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface IconButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.sm,
    borderRadius: theme.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 