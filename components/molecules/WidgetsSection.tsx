import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

export const WidgetsSection: React.FC = () => {
  const handleDiscoverWidgets = () => {
    Alert.alert('Coming Soon', 'Widget discovery will be available soon');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.widgetCard} onPress={handleDiscoverWidgets}>
        <LinearGradient
          colors={['#F8FAFC', '#F1F5F9', '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.widgetCardGradient}
        >
          <View style={styles.iconContainer}>
            <Icon.Widget size={28} color={theme.colors.primary} />
          </View>
          
          <View style={styles.textContainer}>
            <Typography variant="h3" color={theme.colors.textPrimary} style={styles.title}>
              Discover Widgets
            </Typography>
            <Typography variant="body" color={theme.colors.textMuted} style={styles.subtitle}>
              Add Quran Chat to your home screen for daily inspiration
            </Typography>
          </View>
          
          <Icon.ChevronRight size={20} color={theme.colors.textMuted} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  widgetCard: {
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  widgetCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.small,
    lineHeight: 18,
  },
}); 