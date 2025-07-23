import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  ScrollView, 
  Linking, 
  TouchableOpacity, 
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  FlatList
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

const ReviewCard: React.FC<{ review: typeof REVIEWS_DATA[0] }> = ({ review }) => (
  <View style={styles.reviewCardContainer}>
    <View style={styles.reviewCard}>
      <View style={styles.starsRow}>
        {[...Array(review.stars)].map((_, i) => (
          <Icon.Star key={i} size={18} color="#FFB000" />
        ))}
      </View>
      <Typography variant="body" style={styles.reviewText}>
        "{review.text}"
      </Typography>
      <Typography variant="caption" style={styles.reviewAuthor}>
        {review.author}
      </Typography>
    </View>
  </View>
);

const PREMIUM_FEATURES = [
  {
    icon: <Icon.Infinity size={24} color={theme.colors.primary} />,
    title: t('unlimitedConversations'),
    description: t('unlimitedConversationsDesc'),
    premium: true
  },
  {
    icon: <Icon.BookOpen size={24} color={theme.colors.accent} />,
    title: t('dailyReflections'),
    description: t('dailyReflectionsDesc'),
    premium: true
  },
  {
    icon: <Icon.Zap size={24} color={theme.colors.success} />,
    title: t('premiumInsights'),
    description: t('premiumInsightsDesc'),
    premium: true
  },
  {
    icon: <Icon.Gift size={24} color="#e74c3c" />,
    title: t('charityImpact'),
    description: t('charityImpactDesc'),
    premium: true
  }
];

const REVIEWS_DATA = [
  {
    id: 1,
    text: "This app has transformed my daily connection with Allah",
    author: "Join 10,000+ Muslims on their spiritual journey",
    stars: 5
  },
  {
    id: 2,
    text: "Finally, an app that understands the depth of Quranic wisdom",
    author: "Islamic scholar and app user",
    stars: 5
  },
  {
    id: 3,
    text: "The AI guidance feels like having a wise companion",
    author: "Daily user from Malaysia",
    stars: 5
  },
  {
    id: 4,
    text: "Perfect for busy Muslims seeking spiritual growth",
    author: "Working mother of three",
    stars: 5
  },
  {
    id: 5,
    text: "Beautiful integration of technology and faith",
    author: "University student",
    stars: 5
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
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviewsRef = useRef<FlatList>(null);

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

  // Auto-scroll reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % REVIEWS_DATA.length;
        reviewsRef.current?.scrollToIndex({ 
          index: nextIndex, 
          animated: true 
        });
        return nextIndex;
      });
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(timer);
  }, []);

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


      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoBackground}>
                  <Icon.Building size={40} color={theme.colors.primary} />
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
                    {weeklyPackage?.localizedPrice || '$3.99'}
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

            {/* Reviews Carousel */}
            <View style={styles.reviewsSection}>
              <FlatList
                ref={reviewsRef}
                data={REVIEWS_DATA}
                renderItem={({ item }) => <ReviewCard review={item} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(event) => {
                  const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                  setCurrentReviewIndex(newIndex);
                }}
                style={styles.reviewsList}
                snapToInterval={width}
                snapToAlignment="start"
                decelerationRate="fast"
                bounces={false}
                getItemLayout={(data, index) => ({
                  length: width,
                  offset: width * index,
                  index,
                })}
              />
              
              {/* Pagination dots */}
              <View style={styles.paginationDots}>
                {REVIEWS_DATA.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentReviewIndex && styles.activePaginationDot
                    ]}
                  />
                ))}
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
  reviewsSection: {
    marginBottom: theme.spacing.xl,
  },
  reviewsList: {
    marginBottom: theme.spacing.md,
  },
  reviewCardContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  reviewCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    ...theme.shadows.sm,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  reviewText: {
    textAlign: 'center',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
    lineHeight: 22,
  },
  reviewAuthor: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  activePaginationDot: {
    backgroundColor: theme.colors.primary,
    width: 12,
    height: 8,
    borderRadius: 4,
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