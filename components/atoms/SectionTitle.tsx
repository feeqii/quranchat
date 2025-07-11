import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from './Typography';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Typography variant="sectionTitle">{title}</Typography>
      {subtitle && (
        <Typography 
          variant="body" 
          color={theme.colors.textSecondary}
          style={styles.subtitle}
        >
          {subtitle}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
  },
}); 