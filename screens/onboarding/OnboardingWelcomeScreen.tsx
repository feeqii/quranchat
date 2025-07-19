import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { SectionTitle } from '../../components/atoms/SectionTitle';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { SecondaryButton } from '../../components/atoms/SecondaryButton';
import { t } from '../../localization';

export const OnboardingWelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleContinueAsGuest = () => {
    // Navigate to OnboardingStep1
    navigation.navigate('OnboardingStep1' as never);
  };

  const handleSignUpOrLogin = () => {
    // Navigate to AuthScreen (placeholder for now)
    navigation.navigate('AuthScreen' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primarySoft} />
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>{t('appName')}</Text>
          </View>
        </View>

        {/* Title Section */}
        <View style={styles.titleContainer}>
          <SectionTitle
            title={t('welcomeTitle')}
            subtitle={t('welcomeSubtitle')}
          />
        </View>

        {/* Social Proof Badge */}
        <View style={styles.socialProofContainer}>
          <View style={styles.socialProofBadge}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.socialProofText}>
              {t('socialProofText')}
            </Text>
          </View>
        </View>

        {/* Spacer to push buttons to bottom */}
        <View style={styles.spacer} />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={t('continueWithoutAccount')}
            onPress={handleContinueAsGuest}
            style={styles.primaryButton}
          />
          <SecondaryButton
            label={t('signUpOrLogin')}
            onPress={handleSignUpOrLogin}
            style={styles.secondaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primarySoft,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: theme.fontSizes.h3,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  socialProofContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  socialProofBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.full,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  starIcon: {
    fontSize: theme.fontSizes.body,
    marginEnd: theme.spacing.sm,
  },
  socialProofText: {
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  primaryButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    marginBottom: 0,
  },
}); 