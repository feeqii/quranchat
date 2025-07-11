import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';

interface UserAvatarWithBadgeProps {
  initial?: string;
  style?: ViewStyle;
}

export const UserAvatarWithBadge: React.FC<UserAvatarWithBadgeProps> = ({
  initial = 'F',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.avatar}>
        <Typography 
          variant="body" 
          align="center" 
          color={theme.colors.surface}
        >
          {initial.toUpperCase()}
        </Typography>
      </View>
      <View style={styles.badge}>
        <Typography 
          variant="caption" 
          align="center" 
          color={theme.colors.surface}
          style={styles.badgeText}
        >
          New
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 48,
    height: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  badge: {
    position: 'absolute',
    top: -theme.spacing.xs,
    left: -theme.spacing.xs,
    backgroundColor: theme.colors.danger,
    borderRadius: theme.radii.pill,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    minWidth: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  badgeText: {
    fontSize: theme.fontSizes.caption,
    lineHeight: theme.lineHeights.caption,
    fontWeight: '600',
  },
}); 