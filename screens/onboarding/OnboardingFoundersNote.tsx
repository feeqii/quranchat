import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { Typography } from '../../components/atoms/Typography';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

export const OnboardingFoundersNote: React.FC = () => {
  const navigation = useNavigation();
  const { logEvent } = useAnalyticsStore();

  useEffect(() => {
    logEvent({ name: 'screen_view', screenName: 'OnboardingFoundersNote' });
    logEvent({ name: 'onboarding_founders_note_viewed' });
  }, [logEvent]);

  const handleContinue = () => {
    logEvent({ name: 'onboarding_founders_note_continue' });
    navigation.navigate('OnboardingWhyNotFree' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[
          'rgba(248, 250, 249, 0.95)',
          'rgba(232, 244, 241, 0.90)',
          'rgba(217, 237, 231, 0.85)',
          'rgba(248, 250, 249, 0.98)'
        ]}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.gradientContainer}
      >
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Icon.Heart size={32} color={theme.colors.primary} />
            </View>
            <Typography variant="h2" align="center" style={styles.title}>
              {t('foundersNoteTitle')}
            </Typography>
          </View>

          {/* Mission Content */}
          <View style={styles.contentSection}>
            <Typography variant="body" style={styles.greeting}>
              {t('foundersNoteGreeting')}
            </Typography>

            <Typography variant="body" style={styles.paragraph}>
              {t('foundersNoteMission')}
            </Typography>

            <Typography variant="body" style={styles.paragraph}>
              {t('foundersNotePersonal')}
            </Typography>

            <Typography variant="body" style={styles.paragraph}>
              {t('foundersNoteCharity')}
            </Typography>

            {/* Charity Highlight */}
            <View style={styles.charityHighlight}>
              <View style={styles.charityIconContainer}>
                <Typography variant="h3" style={styles.charityIcon}>🤲</Typography>
              </View>
              <Typography variant="body" style={styles.charityText}>
                {t('foundersNoteCharityCommitment')}
              </Typography>
            </View>

            <Typography variant="body" style={styles.paragraph}>
              {t('foundersNoteClosing')}
            </Typography>

            {/* Call to Action */}
            <View style={styles.ctaSection}>
              <Typography variant="subtitle" style={styles.ctaText}>
                {t('foundersNoteCTA')}
              </Typography>
              
              {/* Learn More Links */}
              <View style={styles.linksContainer}>
                <Typography variant="caption" style={styles.linkText}>
                  {t('foundersNoteLearnMore')}
                </Typography>
                <Typography variant="caption" style={styles.placeholderText}>
                  • Our Mission Statement
                </Typography>
                <Typography variant="caption" style={styles.placeholderText}>
                  • Charity Partners & Impact
                </Typography>
                <Typography variant="caption" style={styles.placeholderText}>
                  • Community Guidelines
                </Typography>
              </View>
            </View>

            {/* Signature */}
            <View style={styles.signatureSection}>
              <Typography variant="body" style={styles.signature}>
                {t('foundersNoteSignature')}
              </Typography>
              <Typography variant="caption" style={styles.title}>
                {t('foundersNoteTitle2')}
              </Typography>
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={t('continue')}
            onPress={handleContinue}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  title: {
    color: theme.colors.textPrimary,
  },
  contentSection: {
    flex: 1,
  },
  greeting: {
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
  },
  paragraph: {
    marginBottom: theme.spacing.lg,
    lineHeight: 26,
    color: theme.colors.textPrimary,
  },
  charityHighlight: {
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginVertical: theme.spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  charityIconContainer: {
    marginBottom: theme.spacing.md,
  },
  charityIcon: {
    fontSize: 48,
  },
  charityText: {
    textAlign: 'center',
    fontWeight: '600',
    color: theme.colors.primary,
    lineHeight: 24,
  },
  ctaSection: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  ctaText: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  linksContainer: {
    alignItems: 'center',
  },
  linkText: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  placeholderText: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
  signatureSection: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    paddingTop: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSoft,
  },
  signature: {
    fontStyle: 'italic',
    marginBottom: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
}); 