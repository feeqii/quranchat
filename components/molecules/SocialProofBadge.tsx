import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';

interface SocialProofBadgeProps {
  rating?: string;
  downloads?: string;
  style?: any;
}

export const SocialProofBadge: React.FC<SocialProofBadgeProps> = ({
  rating = "4.9",
  downloads = "10M+",
  style,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const isSmallScreen = screenWidth < 360;

  return (
    <View style={[
      styles.container,
      isSmallScreen && styles.containerSmall,
      style
    ]}>
      <View style={styles.badge}>
        <Typography variant="small" style={styles.starIcon}>⭐</Typography>
        <Typography 
          variant="small" 
          style={styles.ratingText}
        >
          {rating} rating | {downloads} downloads
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  containerSmall: {
    // Allow stacking on small screens if needed
    flexDirection: 'column',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    ...theme.shadows.sm,
  },
  starIcon: {
    color: theme.colors.warning,
    marginRight: theme.spacing.xs,
  },
  ratingText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
}); 