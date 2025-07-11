import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../../constants/theme';
import { Icon } from './Icon';

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: 'share' | 'bookmark' | 'settings' | 'add';
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = 'share',
  size = 56,
  style,
  disabled = false,
}) => {
  const renderIcon = () => {
    const iconSize = size * 0.4;
    const iconColor = theme.colors.surface;
    
    switch (icon) {
      case 'share':
        return <Icon.Share size={iconSize} color={iconColor} />;
      case 'bookmark':
        return <Icon.Bookmarks size={iconSize} color={iconColor} />;
      case 'settings':
        return <Icon.Settings size={iconSize} color={iconColor} />;
      case 'add':
        return <Icon.Add size={iconSize} color={iconColor} />;
      default:
        return <Icon.Share size={iconSize} color={iconColor} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: disabled ? theme.colors.textMuted : theme.colors.primary,
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    right: theme.spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 999,
  },
}); 