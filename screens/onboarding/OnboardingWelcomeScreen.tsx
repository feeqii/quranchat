import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { SectionTitle } from '../../components/atoms/SectionTitle';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { SocialProofBadge } from '../../components/molecules/SocialProofBadge';
import { HeroCard } from '../../components/organisms/HeroCard';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

// Import the background image
const verseStoryBg = require('../../assets/images/verse-story-bg.jpg');

export const OnboardingWelcomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { logEvent } = useAnalyticsStore();
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    logEvent({ name: 'onboarding_start' });
  }, [logEvent]);

  const handleContinueAsGuest = () => {
    logEvent({ name: 'onboarding_complete_step', step: 0 });
    navigation.navigate('OnboardingStep1' as never);
  };

  // Responsive logo size
  const isSmallScreen = screenWidth < 360;
  const logoSize = isSmallScreen ? 100 : 120;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primarySoft} />
      
      <View style={styles.container}>
        <HeroCard 
          heightPercentage={0.6}
          backgroundImage={verseStoryBg}
          overlay={true}
          overlayOpacity={0.4}
        >
          {/* Card Content */}
          <View style={styles.cardContent}>
            {/* App Logo */}
            <View style={[
              styles.logoContainer,
              { width: logoSize, height: logoSize }
            ]}>
              <Text style={styles.logoText}>{t('appName')}</Text>
            </View>

            {/* Hero Title and Subtitle */}
            <SectionTitle
              title={t('welcomeTitle')}
              subtitle={t('welcomeSubtitle')}
              variant="hero"
              align="center"
              responsive={true}
            />

            {/* Social Proof Badge */}
            <SocialProofBadge />
          </View>

          {/* Continue Button */}
          <PrimaryButton
            label={t('continue')}
            onPress={handleContinueAsGuest}
            variant="hero"
          />
        </HeroCard>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
    ...theme.shadows.sm,
  },
  logoText: {
    fontSize: theme.fontSizes.h3,
    fontFamily: theme.fonts.heading,
    color: theme.colors.primary,
    textAlign: 'center',
  },
}); 