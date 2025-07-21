import React, { useRef } from 'react';
import { Pressable, StyleSheet, ViewStyle, Animated } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from './Typography';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'default' | 'hero'; // Add hero variant for larger buttons
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  style,
  variant = 'default',
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled) return;
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (variant === 'hero') {
      baseStyle.push(styles.heroButton);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={({ pressed }) => [
        ...getButtonStyle(),
        { opacity: pressed ? 0.9 : 1 },
        style
      ]}
    >
      <Animated.View 
        style={[
          styles.buttonContent,
          { transform: [{ scale: scaleValue }] }
        ]}
      >
        <Typography
          variant="body"
          style={styles.label}
        >
          {label}
        </Typography>
      </Animated.View>
    </Pressable>
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
  heroButton: {
    paddingVertical: theme.spacing.xl,
    ...theme.shadows.md,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 24,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: theme.colors.surface,
    textAlign: 'center',
    flexShrink: 0,
    width: '100%',
  },
}); 