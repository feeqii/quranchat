import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { theme } from '../../constants/theme';

type TypographyVariant = keyof typeof theme.typography;
type TextAlign = 'left' | 'center' | 'right';

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  color?: string;
  align?: TextAlign;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  style,
  numberOfLines,
  color = theme.colors.textPrimary,
  align = 'left',
}) => {
  const getVariantStyles = (variant: TypographyVariant): TextStyle => {
    const variantStyles = theme.typography[variant];
    
    // Handle the case where variant might be a string (fontFamily)
    if (typeof variantStyles === 'string') {
      return {
        color,
        textAlign: align,
        fontFamily: variantStyles,
      };
    }
    
    const baseStyles = {
      ...variantStyles,
      color,
      textAlign: align,
    };

    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'title':
      case 'sectionTitle':
        return {
          ...baseStyles,
          fontFamily: theme.fonts.heading,
        };
      case 'subtitle':
      case 'body':
      case 'small':
      case 'caption':
      default:
        return {
          ...baseStyles,
          fontFamily: theme.fonts.body,
        };
    }
  };

  return (
    <Text
      style={[getVariantStyles(variant), style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}; 