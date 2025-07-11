import React from 'react';
import { View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { ProgressBar } from '../atoms/ProgressBar';

interface WidgetProgressLayoutProps {
  analyzingProgress: number;
  creatingProgress: number;
  settingUpProgress: number;
  children: React.ReactNode;
}

export const WidgetProgressLayout: React.FC<WidgetProgressLayoutProps> = ({
  analyzingProgress,
  creatingProgress,
  settingUpProgress,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          {/* App Logo - placeholder for now */}
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Typography variant="h2" style={styles.logoText}>🕌</Typography>
            </View>
          </View>
          
          {/* Main Heading */}
          <Typography variant="h2" style={styles.mainHeading}>
            Your Spiritual Journey Widget
          </Typography>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          {/* Analyzing Progress */}
          <View style={styles.progressItem}>
            <Typography variant="body" style={styles.progressLabel}>
              Analyzing your answers
            </Typography>
            <ProgressBar progress={analyzingProgress} style={styles.progressBar} />
          </View>

          {/* Creating Progress */}
          <View style={styles.progressItem}>
            <Typography variant="body" style={styles.progressLabel}>
              Creating Your Home Screen Widget
            </Typography>
            <ProgressBar progress={creatingProgress} style={styles.progressBar} />
          </View>

          {/* Setting Up Progress */}
          <View style={styles.progressItem}>
            <Typography variant="body" style={styles.progressLabel}>
              Setting Up Your Faith Widget
            </Typography>
            <ProgressBar progress={settingUpProgress} style={styles.progressBar} />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    fontSize: 32,
  },
  mainHeading: {
    textAlign: 'center',
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.md,
  },
  progressSection: {
    marginBottom: theme.spacing.xl,
  },
  progressItem: {
    marginBottom: theme.spacing.lg,
  },
  progressLabel: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    textAlign: 'left',
  },
  progressBar: {
    height: 8,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
  },
}); 