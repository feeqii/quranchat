import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { Typography } from '../../components/atoms/Typography';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { AppLogo } from '../../components/atoms/AppLogo';
import { SocialProofBadge } from '../../components/molecules/SocialProofBadge';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

// Import the background and logo images
const verseStoryBg = require('../../assets/images/verse-story-bg.jpg');
const welcomeLogo = require('../../assets/images/welcomescreenlogo.png');

export const OnboardingWelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { logEvent } = useAnalyticsStore();
  useEffect(() => {
    logEvent({ name: 'onboarding_start' });
  }, [logEvent]);

  const handleContinueAsGuest = () => {
    logEvent({ name: 'onboarding_complete_step', step: 0 });
    navigation.navigate('OnboardingStep1' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <ImageBackground 
        source={verseStoryBg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient overlay for better text readability */}
        <LinearGradient
          colors={[
            'rgba(248, 250, 249, 0.95)',
            'rgba(232, 244, 241, 0.90)',
            'rgba(217, 237, 231, 0.85)',
            'rgba(248, 250, 249, 0.98)'
          ]}
          locations={[0, 0.3, 0.7, 1]}
          style={styles.gradientOverlay}
        />
        
        <View style={styles.container}>
          {/* Header area with logo */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Image 
                source={welcomeLogo}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Main content */}
          <View style={styles.contentSection}>
            <View style={styles.titleContainer}>
              <Typography 
                variant="hero" 
                align="center"
                color={theme.colors.textPrimary}
                style={styles.mainTitle}
              >
                {t('welcomeTitle')}
              </Typography>
              
              <Typography 
                variant="subtitle" 
                align="center"
                color={theme.colors.textSecondary}
                style={styles.subtitle}
              >
                {t('welcomeSubtitle')}
              </Typography>
            </View>

            {/* Social proof */}
            <View style={styles.socialProofContainer}>
              <SocialProofBadge />
            </View>
          </View>

          {/* Action section */}
          <View style={styles.actionSection}>
            <PrimaryButton
              label={t('continue')}
              onPress={handleContinueAsGuest}
              variant="hero"
              size="large"
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    zIndex: 2,
  },
  headerSection: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.radii.xl,
    padding: theme.spacing.md, // Reduced padding for better fit
    ...theme.shadows.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  logoImage: {
    width: 140,
    height: 137, // Proportional to 762x748 ratio, larger size
  },
  contentSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  mainTitle: {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    paddingHorizontal: theme.spacing.lg,
    textAlign: 'center',
    lineHeight: 24,
  },
  socialProofContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  actionSection: {
    flex: 0.25,
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.xl,
  },
}); 