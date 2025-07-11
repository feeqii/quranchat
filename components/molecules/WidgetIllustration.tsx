import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const WidgetIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.phone}>
        {/* Phone screen content */}
        <View style={styles.statusBar} />
        
        {/* App icons grid */}
        <View style={styles.appsGrid}>
          {/* Row 1 */}
          <View style={styles.appRow}>
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
          </View>
          
          {/* Row 2 */}
          <View style={styles.appRow}>
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
          </View>
          
          {/* Row 3 */}
          <View style={styles.appRow}>
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
            <View style={styles.appIcon} />
          </View>
        </View>
        
        {/* Touch indicator */}
        <View style={styles.touchIndicator}>
          <View style={styles.finger} />
        </View>
        
        {/* Bottom indicator */}
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  phone: {
    width: width * 0.6,
    height: width * 0.9,
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radii.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  statusBar: {
    height: 6,
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.radii.sm,
    marginBottom: theme.spacing.lg,
    width: '40%',
    alignSelf: 'center',
  },
  appsGrid: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: theme.spacing.lg,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  appIcon: {
    width: (width * 0.6 - theme.spacing.lg * 2 - theme.spacing.md * 3) / 4,
    height: (width * 0.6 - theme.spacing.lg * 2 - theme.spacing.md * 3) / 4,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    ...theme.shadows.sm,
  },
  touchIndicator: {
    position: 'absolute',
    bottom: theme.spacing['2xl'],
    right: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finger: {
    width: 24,
    height: 30,
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.radii.md,
    opacity: 0.7,
  },
  homeIndicator: {
    height: 4,
    width: '35%',
    backgroundColor: theme.colors.textPrimary,
    borderRadius: theme.radii.sm,
    alignSelf: 'center',
    marginTop: theme.spacing.md,
  },
}); 