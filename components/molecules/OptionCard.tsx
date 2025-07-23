import React, { useRef } from 'react';
import { Pressable, StyleSheet, ViewStyle, Animated, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  selected,
  onPress,
  style,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        { transform: [{ scale: scaleValue }] },
        styles.shadowContainer,
        selected && styles.selectedShadow,
        style
      ]}
    >
      {selected ? (
        <LinearGradient
          colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']} // Same as VerseOfTheDayCard - soft mint to beige
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.container, styles.selected]}
          >
            <View style={styles.contentContainer}>
              <Text style={[styles.label, styles.selectedText]}>
                {label}
              </Text>
            </View>
          </Pressable>
        </LinearGradient>
      ) : (
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.container, styles.unselected]}
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.label, styles.unselectedText]}>
        {label}
      </Text>
          </View>
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.05,
    elevation: 2,
    marginBottom: theme.spacing.lg,
  },
  selectedShadow: {
    shadowOpacity: 0.15,
    elevation: 6,
  },
  gradientContainer: {
    borderRadius: theme.radii.xl,
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.xl,
    borderWidth: 1.5,
    minHeight: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselected: {
    borderColor: theme.colors.borderSoft,
  },
  selected: {
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent', // Let gradient show through
  },
  contentContainer: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    letterSpacing: 0.3,
    textAlign: 'center',
    lineHeight: theme.lineHeights.body,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  unselectedText: {
    color: theme.colors.textPrimary,
    fontWeight: '400',
  },
}); 