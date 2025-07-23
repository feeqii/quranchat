import React, { useEffect, useState } from 'react';
import { 
  View, 
  ScrollView, 
  Linking, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { t } from '../../localization';
import { theme } from '../../constants/theme';
import { Typography } from '../../components/atoms/Typography';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { usePurchasesStore } from '../../store/usePurchasesStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { useNavigation } from '@react-navigation/native';
import { isExpoGo, devLog } from '../../utils/developmentUtils';

const { width } = Dimensions.get('window');

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  premium?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, premium = false }) => (
  <View style={styles.featureItem}>
    <View style={[styles.featureIcon, premium && styles.premiumFeatureIcon]}>
      {icon}
    </View>
    <View style={styles.featureContent}>
      <View style={styles.featureTitleRow}>
        <Typography variant="body" style={styles.featureTitle}>
          {title}
        </Typography>
        {premium && (
          <View style={styles.premiumBadge}>
            <Icon.Crown size={14} color={theme.colors.accent} />
          </View>
        )}
      </View>
      <Typography variant="caption" style={styles.featureDescription}>
        {description}
      </Typography>
    </View>
    <Icon.Check size={20} color={theme.colors.primary} />
  </View>
);

const PREMIUM_FEATURES = [
  {
    icon: <Icon.MessageCircle size={24} color={theme.colors.primary} />,
    title: t('unlimitedConversations'),
    description: t('unlimitedConversationsDesc'),
    premium: true
  },
  {
    icon: <Icon.Heart size={24} color={theme.colors.accent} />,
    title: t('dailyReflections'),
    description: t('dailyReflectionsDesc'),
    premium: true
  },
  {
    icon: <Icon.Sparkles size={24} color={theme.colors.success} />,
    title: t('premiumInsights'),
    description: t('premiumInsightsDesc'),
    premium: true
  },
  {
    icon: <Icon.Shield size={24} color={theme.colors.info} />,
    title: t('prioritySupport'),
    description: t('prioritySupportDesc'),
    premium: true
  }
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
  
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

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
      }, 2000);
      return;
    }
    
    if (isEntitled) {
      navigation.replace('MainApp' as never);
    }
  }, [isEntitled, navigation]);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

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

  if (isEntitled) {
    return null; // Will navigate away
  }

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
        {/* Development Banner for Expo Go */}
        {isExpoGo() && (
          <View style={styles.devBanner}>
            <Typography variant="caption" color={theme.colors.surface} align="center">
              🔧 EXPO GO MODE - Auto-granting access in 2 seconds for testing
            </Typography>
          </View>
        )}

        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }
          ]}
        >
      {/* Charity Banner */}
          <TouchableOpacity style={styles.charityBanner} onPress={handleCharityLink}>
            <Icon.Heart size={16} color={theme.colors.surface} />
            <Typography variant="caption" color={theme.colors.surface} style={styles.charityText}>
          {t('charityBanner', { charity: 'UNRWA' })}
        </Typography>
          </TouchableOpacity>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoBackground}>
                  <Typography variant="h1" style={styles.logoEmoji}>
                    🕌
                  </Typography>
                </View>
              </View>

              <Typography variant="h2" align="center" style={styles.heroTitle}>
                {t('paywall_hero_title')}
              </Typography>
              
              <Typography variant="body" align="center" style={styles.heroSubtitle}>
                {t('paywall_hero_subtitle')}
              </Typography>
            </View>

            {/* Pricing Card */}
            <View style={styles.pricingCard}>
              <LinearGradient
                colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']}
                style={styles.pricingGradient}
              >
                <View style={styles.pricingHeader}>
                  <Typography variant="caption" style={styles.pricingLabel}>
                    {t('paywall_weekly_plan')}
                  </Typography>
                  <View style={styles.popularBadge}>
                    <Typography variant="caption" style={styles.popularText}>
                      {t('paywall_most_popular')}
        </Typography>
                  </View>
                </View>

                <View style={styles.priceRow}>
                  <Typography variant="display" style={styles.price}>
                    {weeklyPackage?.localizedPrice || '$1.99'}
                  </Typography>
                  <Typography variant="body" style={styles.pricePeriod}>
                    /{t('paywall_week')}
                  </Typography>
                </View>
                
                <Typography variant="caption" style={styles.priceSubtext}>
                  {t('paywall_price_subtext')}
                </Typography>

                {/* Charity Highlight */}
                <View style={styles.charityHighlight}>
                  <Icon.Heart size={18} color={theme.colors.primary} />
                  <Typography variant="caption" style={styles.charityHighlightText}>
                    {t('paywall_charity_highlight')}
                  </Typography>
                </View>
              </LinearGradient>
            </View>

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <Typography variant="h3" align="center" style={styles.featuresTitle}>
                {t('paywall_features_title')}
        </Typography>

              <View style={styles.featuresList}>
                {PREMIUM_FEATURES.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    premium={feature.premium}
                  />
                ))}
              </View>
            </View>

            {/* Social Proof */}
            <View style={styles.socialProofSection}>
              <View style={styles.socialProofCard}>
                <View style={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Icon.Star key={i} size={20} color="#FFB000" />
                  ))}
                </View>
                <Typography variant="body" style={styles.socialProofText}>
                  {t('paywall_social_proof')}
                </Typography>
                <Typography variant="caption" style={styles.socialProofCaption}>
                  {t('paywall_social_proof_caption')}
                </Typography>
              </View>
        </View>

            {/* Guarantee */}
            <View style={styles.guaranteeSection}>
              <View style={styles.guaranteeRow}>
                <Icon.Shield size={24} color={theme.colors.success} />
                <Typography variant="body" style={styles.guaranteeText}>
                  {t('paywall_guarantee')}
                </Typography>
              </View>
            </View>
          </ScrollView>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
        {/* Error Message */}
        {error && (
            <View style={styles.errorContainer}>
                <Typography variant="caption" color={theme.colors.danger} align="center">
                {error}
              </Typography>
            </View>
        )}

            {/* Main CTA Button */}
        <PrimaryButton
              label={loading ? t('loading') || 'Loading...' : t('paywall_cta_button')}
          onPress={handlePurchase}
          disabled={loading}
              size="large"
              style={styles.ctaButton}
        />

            {/* Secondary Actions */}
            <View style={styles.secondaryActions}>
              <TouchableOpacity onPress={handleRestore} style={styles.restoreButton}>
                <Typography variant="caption" style={styles.restoreText}>
                  {t('paywall_restore_purchases')}
          </Typography>
        </TouchableOpacity>

              <Typography variant="caption" style={styles.termsText}>
                {t('paywall_terms_text')}
              </Typography>
            </View>
        </View>
        </Animated.View>
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
  devBanner: {
    backgroundColor: '#FF6B35',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
  },
  container: {
    flex: 1,
  },
  charityBanner: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  charityText: {
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  heroSection: {
    alignItems: 'center',
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  logoContainer: {
    marginBottom: theme.spacing.xl,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: theme.radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  logoEmoji: {
    fontSize: 48,
  },
  heroTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: theme.colors.textSecondary,
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  },
  pricingCard: {
    marginBottom: theme.spacing.xxl,
    borderRadius: theme.radii.xl,
    overflow: 'hidden',
    ...theme.shadows.lg,
  },
  pricingGradient: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  pricingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  pricingLabel: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginRight: theme.spacing.md,
  },
  popularBadge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.md,
  },
  popularText: {
    color: theme.colors.surface,
    fontWeight: '600',
    fontSize: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: theme.spacing.sm,
  },
  price: {
    color: theme.colors.primary,
    fontWeight: '800',
  },
  pricePeriod: {
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  priceSubtext: {
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
  },
  charityHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.lg,
  },
  charityHighlightText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  featuresSection: {
    marginBottom: theme.spacing.xxl,
  },
  featuresTitle: {
    marginBottom: theme.spacing.xl,
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  featuresList: {
    gap: theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    ...theme.shadows.sm,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  premiumFeatureIcon: {
    backgroundColor: theme.colors.accentSoft,
  },
  featureContent: {
    flex: 1,
  },
  featureTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  featureTitle: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
    flex: 1,
  },
  premiumBadge: {
    marginLeft: theme.spacing.xs,
  },
  featureDescription: {
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
  socialProofSection: {
    marginBottom: theme.spacing.xl,
  },
  socialProofCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  socialProofText: {
    textAlign: 'center',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  socialProofCaption: {
    textAlign: 'center',
    color: theme.colors.textMuted,
  },
  guaranteeSection: {
    marginBottom: theme.spacing.lg,
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(127, 176, 105, 0.1)',
    padding: theme.spacing.md,
    borderRadius: theme.radii.lg,
  },
  guaranteeText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.success,
    fontWeight: '500',
  },
  ctaSection: {
    padding: theme.spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSoft,
  },
  errorContainer: {
    marginBottom: theme.spacing.md,
  },
  ctaButton: {
    marginBottom: theme.spacing.lg,
  },
  secondaryActions: {
    alignItems: 'center',
  },
  restoreButton: {
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  restoreText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  termsText: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    lineHeight: 16,
  },
}); 