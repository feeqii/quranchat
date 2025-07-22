import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from './Typography';

interface AppLogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  variant?: 'light' | 'dark' | 'primary';
  showSubtext?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'medium',
  variant = 'primary',
  showSubtext = false,
}) => {
  const getContainerStyles = () => {
    const baseStyles = [styles.container];
    
    // Size variants
    switch (size) {
      case 'small':
        baseStyles.push(styles.containerSmall);
        break;
      case 'large':
        baseStyles.push(styles.containerLarge);
        break;
      case 'hero':
        baseStyles.push(styles.containerHero);
        break;
      default:
        baseStyles.push(styles.containerMedium);
    }
    
    // Color variants
    switch (variant) {
      case 'light':
        baseStyles.push(styles.containerLight);
        break;
      case 'dark':
        baseStyles.push(styles.containerDark);
        break;
      default:
        baseStyles.push(styles.containerPrimary);
    }
    
    return baseStyles;
  };

  const getTextVariant = () => {
    switch (size) {
      case 'small': return 'caption';
      case 'large': return 'title';
      case 'hero': return 'hero';
      default: return 'subtitle';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'light': return theme.colors.textOnDark;
      case 'dark': return theme.colors.textOnDark;
      default: return theme.colors.primary;
    }
  };

  const getSubtextColor = () => {
    switch (variant) {
      case 'light': return theme.colors.textOnDark;
      case 'dark': return theme.colors.textOnDark;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <View style={getContainerStyles()}>
      {/* App Icon/Symbol */}
      <View style={styles.iconContainer}>
        <Typography
          variant={getTextVariant()}
          weight="bold"
          color={getTextColor()}
          align="center"
        >
          ۝
        </Typography>
      </View>
      
      {/* App Name */}
      <Typography
        variant={getTextVariant()}
        weight="bold"
        color={getTextColor()}
        align="center"
        style={styles.appName}
      >
        Quran Chat
      </Typography>
      
      {/* Optional Subtext */}
      {showSubtext && (
        <Typography
          variant="caption"
          color={getSubtextColor()}
          align="center"
          style={styles.subtext}
        >
          Your AI Spiritual Companion
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radii.xl,
    ...theme.shadows.md,
    borderWidth: 1,
  },
  
  // Size variants
  containerSmall: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.md,
  },
  containerMedium: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  containerLarge: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radii.xxl,
  },
  containerHero: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
    borderRadius: theme.radii.xxl,
    ...theme.shadows.lg,
  },
  
  // Color variants
  containerPrimary: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.borderSoft,
  },
  containerLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  containerDark: {
    backgroundColor: 'rgba(28, 43, 45, 0.95)',
    borderColor: 'rgba(28, 43, 45, 0.3)',
  },
  
  // Icon and text
  iconContainer: {
    marginBottom: theme.spacing.xs,
  },
  appName: {
    letterSpacing: 0.5,
  },
  subtext: {
    marginTop: theme.spacing.xs,
    opacity: 0.8,
  },
}); 