import React, { useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  Image, 
  Linking, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { t } from '../../localization';
import { theme } from '../../constants/theme';
import { Typography } from '../../components/atoms/Typography';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { Spacer } from '../../components/atoms/Spacer';
import { usePurchasesStore } from '../../store/usePurchasesStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { useNavigation } from '@react-navigation/native';
import { isExpoGo, devLog } from '../../utils/developmentUtils';

const PREMIUM_FEATURES = [
  'unlimitedVerses',
  'dailyReflections',
  'prioritySupport',
  'darkModeThemes'
];

export const PaywallScreen: React.FC = () => {
  const navigation = useNavigation();
  const { 
    initialize, 
    weeklyPackage, 
    isEntitled, 
    loading,
    error,
    purchaseWeekly, 
    restorePurchases 
  } = usePurchasesStore();
  const { logEvent } = useAnalyticsStore();

  useEffect(() => {
    if (isExpoGo()) {
      devLog('💰 Paywall: Expo Go detected - skipping RevenueCat initialization');
      logEvent({ name: 'paywall_view' });
      return;
    }
    
    initialize();
    logEvent({ name: 'paywall_view' });
  }, [initialize, logEvent]);

  useEffect(() => {
    if (isExpoGo()) {
      // In Expo Go, assume user has access for testing
      devLog('💰 Paywall: Expo Go detected - auto-granting access for testing');
      setTimeout(() => {
        navigation.replace('MainApp' as never);
      }, 2000); // Small delay to see the paywall screen
      return;
    }
    
    if (isEntitled) {
      // Navigate to main app if user is entitled
      navigation.replace('MainApp' as never);
    }
  }, [isEntitled, navigation]);

  const handleCharityLink = () => {
    Linking.openURL('https://www.unrwa.org/');
  };

  const handlePurchase = async () => {
    try {
      logEvent({ name: 'paywall_subscribe_tap' });
      await purchaseWeekly();
      logEvent({ name: 'paywall_purchase_success' });
    } catch (error) {
      logEvent({ name: 'paywall_purchase_failure', error: error?.toString() || 'Unknown error' });
    }
  };

  const handleRestore = async () => {
    try {
      logEvent({ name: 'paywall_restore_tap' });
      await restorePurchases();
    } catch (error) {
      console.error('Restore failed:', error);
    }
  };

  const renderFeatureRow = (featureKey: string) => (
    <View key={featureKey} style={styles.featureRow}>
      <Icon.Check size={24} color={theme.colors.primary} />
      <Typography 
        variant="body" 
        color={theme.colors.textPrimary}
        style={styles.featureText}
      >
        {t(featureKey)}
      </Typography>
    </View>
  );

  if (isEntitled) {
    return null; // Will navigate away
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Development Banner for Expo Go */}
      {isExpoGo() && (
        <View style={styles.devBanner}>
          <Typography variant="caption" color={theme.colors.surface} align="center">
            🔧 EXPO GO MODE - Auto-granting access in 2 seconds for testing
          </Typography>
        </View>
      )}
      
      {/* Charity Banner */}
      <View style={styles.charityBanner}>
        <Icon.Heart size={20} color={theme.colors.surface} />
        <Typography 
          variant="body" 
          color={theme.colors.surface}
          style={styles.bannerText}
        >
          {t('charityBanner', { charity: 'UNRWA' })}
        </Typography>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Illustration */}
        <Image 
          source={require('../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Spacer size="xl" />

        {/* Headline */}
        <Typography 
          variant="h2" 
          color={theme.colors.textPrimary}
          style={styles.headline}
        >
          {t('goPremiumTitle')}
        </Typography>

        <Spacer size="lg" />

        {/* Price */}
        <Typography 
          variant="h1" 
          color={theme.colors.primary}
          style={styles.price}
        >
          {weeklyPackage?.localizedPrice
            ? t('subscribeWeeklyWithCharity', { price: weeklyPackage.localizedPrice })
            : t('subscribeWeeklyWithCharity', { price: '$1.99' })}
        </Typography>

        <Spacer size="xl" />

        {/* Feature List */}
        <View style={styles.featureList}>
          {PREMIUM_FEATURES.map(renderFeatureRow)}
        </View>

        <Spacer size="xl" />

        {/* Error Message */}
        {error && (
          <>
            <View style={styles.errorContainer}>
              <Typography 
                variant="small" 
                color={theme.colors.error}
                style={styles.errorText}
              >
                {error}
              </Typography>
            </View>
            <Spacer size="md" />
          </>
        )}

        {/* Subscribe Button */}
        <PrimaryButton
          label={loading ? t('loading') || 'Loading...' : t('subscribeWeekly')}
          onPress={handlePurchase}
          disabled={loading}
          style={styles.subscribeButton}
        />

        <Spacer size="lg" />

        {/* Restore Purchases */}
        <TouchableOpacity 
          onPress={handleRestore}
          style={styles.restoreButton}
          disabled={loading}
        >
          <Typography 
            variant="small" 
            color={loading ? theme.colors.textMuted : theme.colors.textSecondary}
          >
            {t('restorePurchases')}
          </Typography>
        </TouchableOpacity>

        <Spacer size="xl" />

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Typography 
            variant="caption" 
            color={theme.colors.textMuted}
            style={styles.disclaimerText}
          >
            {t('charityDisclaimer', { charity: '' })}
            <TouchableOpacity onPress={handleCharityLink}>
              <Typography
                variant="caption"
                color={theme.colors.primary}
              >
                UNRWA
              </Typography>
            </TouchableOpacity>
            .
          </Typography>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  charityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accent,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  bannerText: {
    marginLeft: theme.spacing.sm,
  },
  devBanner: {
    backgroundColor: '#FF6B35', // Orange for development
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  logo: {
    width: '100%',
    height: 120,
    marginTop: theme.spacing.xl,
  },
  headline: {
    textAlign: 'center',
  },
  price: {
    textAlign: 'center',
  },
  featureList: {
    gap: theme.spacing.lg,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  featureText: {
    flex: 1,
  },
  subscribeButton: {
    width: '100%',
  },
  restoreButton: {
    alignItems: 'center',
  },
  disclaimer: {
    alignItems: 'center',
  },
  disclaimerText: {
    textAlign: 'center',
    lineHeight: 20,
  },
  errorContainer: {
    backgroundColor: theme.colors.errorBackground || '#FFEBEE',
    padding: theme.spacing.md,
    borderRadius: theme.radii.md,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
}); 