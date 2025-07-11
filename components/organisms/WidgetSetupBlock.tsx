import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface WidgetSetupBlockProps {
  style?: ViewStyle;
}

export const WidgetSetupBlock: React.FC<WidgetSetupBlockProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.instructionContainer}>
        <Text style={styles.title}>Add Widget to Home Screen</Text>
        <Text style={styles.description}>
          Get daily Quranic inspiration right on your home screen:
        </Text>
        <View style={styles.steps}>
          <Text style={styles.step}>1. Long press on your home screen</Text>
          <Text style={styles.step}>2. Tap "Add Widget"</Text>
          <Text style={styles.step}>3. Search for "Quran Chat"</Text>
          <Text style={styles.step}>4. Choose and place the widget</Text>
        </View>
      </View>
      {/* Placeholder for widget preview image */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Widget Preview</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  instructionContainer: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSizes.h3,
    fontFamily: theme.fonts.heading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  steps: {
    gap: theme.spacing.sm,
  },
  step: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fonts.body,
    color: theme.colors.primary,
  },
}); 