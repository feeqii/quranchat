import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface TestimonialCardProps {
  name: string;
  text: string;
  rating?: number;
  avatar?: string;
  style?: ViewStyle;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  rating = 5,
  avatar,
  style,
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Text
        key={index}
        style={[
          styles.star,
          index < rating ? styles.starFilled : styles.starEmpty,
        ]}
      >
        ★
      </Text>
    ));
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {avatar && (
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        )}
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.stars}>{renderStars()}</View>
        </View>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.pill,
    marginEnd: theme.spacing.md,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.heading,
    color: theme.colors.textPrimary,
    lineHeight: theme.lineHeights.body,
    marginBottom: theme.spacing.xs,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: theme.fontSizes.body,
    marginEnd: 2,
  },
  starFilled: {
    color: theme.colors.accent,
  },
  starEmpty: {
    color: theme.colors.textMuted,
  },
  text: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.lineHeights.body,
  },
}); 