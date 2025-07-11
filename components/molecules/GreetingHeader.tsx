import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { UserAvatarWithBadge } from './UserAvatarWithBadge';

interface GreetingHeaderProps {
  initial?: string;
  onHistoryPress?: () => void;
  style?: ViewStyle;
}

export const GreetingHeader: React.FC<GreetingHeaderProps> = ({
  initial = 'F',
  onHistoryPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <UserAvatarWithBadge initial={initial} />
      
      <Typography 
        variant="h2" 
        color={theme.colors.textPrimary}
        align="center"
      >
        Peace be upon you
      </Typography>
      
      <Typography 
        variant="h1"
        style={styles.bookEmoji}
      >
        📚
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  bookEmoji: {
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
  },
}); 