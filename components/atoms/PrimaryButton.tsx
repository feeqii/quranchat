import React, { useRef } from 'react';
import { Pressable, StyleSheet, ViewStyle, Animated } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from './Typography';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: 'default' | 'hero' | 'large' | 'success' | 'accent';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  style,
  variant = 'default',
  size = 'medium',
  fullWidth = true,
  loading = false,
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
    
    // Size variants
    switch (size) {
      case 'small':
        baseStyle.push(styles.small);
        break;
      case 'large':
        baseStyle.push(styles.large);
        break;
      default:
        baseStyle.push(styles.medium);
    }
    
    // Color variants
    switch (variant) {
      case 'hero':
      baseStyle.push(styles.heroButton);
        break;
      case 'success':
        baseStyle.push(styles.successButton);
        break;
      case 'accent':
        baseStyle.push(styles.accentButton);
        break;
      default:
        baseStyle.push(styles.defaultButton);
    }
    
    // Width
    if (!fullWidth) {
      baseStyle.push(styles.notFullWidth);
    }
    
    // States
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  };

  const getTextColor = () => {
    if (disabled || loading) {
      return { color: theme.colors.textMuted };
    }
    
    switch (variant) {
      case 'hero':
      case 'success':
      case 'accent':
      default:
        return { color: theme.colors.textOnPrimary };
    }
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
          variant={size === 'small' ? 'caption' : size === 'large' ? 'title' : 'body'}
          weight="medium"
          style={styles.label}
          color={getTextColor().color}
        >
          {loading ? 'Loading...' : label}
        </Typography>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...theme.shadows.sm,
  },
  
  // Size variants
  small: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.md,
  },
  medium: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  large: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
    borderRadius: theme.radii.xl,
  },
  
  // Color variants
  defaultButton: {
    backgroundColor: theme.colors.primary,
  },
  heroButton: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.md,
  },
  successButton: {
    backgroundColor: theme.colors.success,
  },
  accentButton: {
    backgroundColor: theme.colors.accent,
  },
  
  // Width variants
  notFullWidth: {
    width: 'auto',
    minWidth: 120,
  },
  
  // Content and states
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 24,
  },
  disabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.6,
    ...theme.shadows.none,
  },
  label: {
    textAlign: 'center',
    flexShrink: 0,
    width: '100%',
  },
}); 