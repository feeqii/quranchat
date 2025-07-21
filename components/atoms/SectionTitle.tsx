import React from 'react';
import { View, StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from './Typography';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  variant?: 'default' | 'hero'; // Add hero variant for welcome screen
  align?: 'left' | 'center' | 'right';
  responsive?: boolean; // Enable responsive typography
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  style,
  variant = 'default',
  align = 'left',
  responsive = false,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  
  // Responsive typography logic
  const getTitleVariant = () => {
    if (!responsive) return 'sectionTitle';
    
    if (variant === 'hero') {
      return screenWidth < 360 ? 'h2' : 'h1';
    }
    return 'sectionTitle';
  };

  const getContainerStyle = () => {
    return [
      styles.container,
      variant === 'hero' && styles.heroContainer,
      align === 'center' && styles.centerAlign,
      align === 'right' && styles.rightAlign,
    ].filter(Boolean);
  };

  return (
    <View style={[...getContainerStyle(), style]}>
      <Typography 
        variant={getTitleVariant() as any}
        align={align === 'left' ? 'start' : align}
        style={variant === 'hero' ? styles.heroTitle : undefined}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="body" 
          style={[
            styles.subtitle, 
            variant === 'hero' && styles.heroSubtitle,
            { textAlign: align }
          ]}
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
  heroContainer: {
    marginBottom: theme.spacing.xl,
  },
  centerAlign: {
    alignItems: 'center',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  heroTitle: {
    textAlign: 'center',
  },
  heroSubtitle: {
    marginTop: theme.spacing.md,
    lineHeight: theme.fontSizes.body * 1.5,
    textAlign: 'center',
  },
}); 