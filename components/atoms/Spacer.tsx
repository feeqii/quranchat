import React from 'react';
import { View } from 'react-native';
import { theme } from '../../constants/theme';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '2xl';
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({ size = 'md', horizontal = false }) => {
  const spacing = theme.spacing[size];
  
  return <View style={horizontal ? { width: spacing } : { height: spacing }} />;
}; 