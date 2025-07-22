import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { isRTL, textAlign, textAlignReverse } from '../../utils/rtl';

type TypographyVariant = keyof typeof theme.typography;
type LogicalTextAlign = 'start' | 'end' | 'center' | 'left' | 'right';

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  color?: string;
  align?: LogicalTextAlign;
  rtlAware?: boolean; // Enable automatic RTL text alignment
  weight?: 'regular' | 'medium' | 'bold';
  italic?: boolean;
  underline?: boolean;
  opacity?: number;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  style,
  numberOfLines,
  color = theme.colors.textPrimary,
  align = 'start',
  rtlAware = true,
  weight,
  italic = false,
  underline = false,
  opacity = 1,
}) => {
  
  const getTextAlignment = (alignment: LogicalTextAlign): 'left' | 'center' | 'right' => {
    if (!rtlAware) {
      // If RTL awareness is disabled, use literal alignment
      return alignment === 'start' ? 'left' : alignment === 'end' ? 'right' : alignment as 'left' | 'center' | 'right';
    }

    switch (alignment) {
      case 'start':
        return textAlign(); // Returns 'right' for RTL, 'left' for LTR
      case 'end':
        return textAlignReverse(); // Returns 'left' for RTL, 'right' for LTR
      case 'center':
        return 'center';
      case 'left':
      case 'right':
        return alignment; // Use literal alignment
      default:
        return textAlign(); // Default to logical start
    }
  };

  const getFontFamily = (variant: TypographyVariant): string => {
    switch (variant) {
      case 'hero':
      case 'display':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'title':
      case 'sectionTitle':
        return theme.fonts.heading;
      default:
        return theme.fonts.body;
    }
  };

  const getFontWeight = (variant: TypographyVariant, customWeight?: string): TextStyle['fontWeight'] => {
    if (customWeight) {
      switch (customWeight) {
        case 'medium': return '500';
        case 'bold': return '700';
        default: return '400';
      }
    }
    
    // Use variant-specific weight from theme
    const variantStyles = theme.typography[variant];
    if (typeof variantStyles === 'object' && variantStyles.fontWeight) {
      return variantStyles.fontWeight as TextStyle['fontWeight'];
    }
    
    return '400';
  };

  const getVariantStyles = (variant: TypographyVariant): TextStyle => {
    const variantStyles = theme.typography[variant];
    
    // Handle the case where variant might be a string (fontFamily)
    if (typeof variantStyles === 'string') {
      return {
        color,
        textAlign: getTextAlignment(align),
        fontFamily: variantStyles,
        opacity,
        fontStyle: italic ? 'italic' : 'normal',
        textDecorationLine: underline ? 'underline' : 'none',
      };
    }
    
    const baseStyles = {
      ...variantStyles,
      color,
      textAlign: getTextAlignment(align),
      fontFamily: getFontFamily(variant),
      fontWeight: getFontWeight(variant, weight),
      opacity,
      fontStyle: italic ? ('italic' as const) : ('normal' as const),
      textDecorationLine: underline ? ('underline' as const) : ('none' as const),
    };

    return baseStyles;
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