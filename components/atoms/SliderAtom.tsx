import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { theme } from '../../constants/theme';

interface SliderAtomProps {
  value: number;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  onValueChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
  trackHeight?: number;
  thumbSize?: number;
}

export const SliderAtom: React.FC<SliderAtomProps> = ({
  value,
  minimumValue,
  maximumValue,
  step = 1,
  onValueChange,
  onSlidingComplete,
  disabled = false,
  trackHeight = 8,
  thumbSize = 24,
}) => {
  return (
    <View style={styles.container}>
      <Slider
        style={[styles.slider, { height: Math.max(trackHeight, thumbSize) + 20 }]}
        value={value}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
        disabled={disabled}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.primarySoft}
        thumbTintColor={theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    minHeight: 40,
  },
}); 