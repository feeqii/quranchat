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
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  style,
  numberOfLines,
  color = theme.colors.textPrimary,
  align = 'start',
  rtlAware = true,
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

  const getVariantStyles = (variant: TypographyVariant): TextStyle => {
    const variantStyles = theme.typography[variant];
    
    // Handle the case where variant might be a string (fontFamily)
    if (typeof variantStyles === 'string') {
      return {
        color,
        textAlign: getTextAlignment(align),
        fontFamily: variantStyles,
      };
    }
    
    const baseStyles = {
      ...variantStyles,
      color,
      textAlign: getTextAlignment(align),
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