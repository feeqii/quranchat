import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { Typography } from '../../components/atoms/Typography';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

interface CostItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cost: string;
}

const CostItem: React.FC<CostItemProps> = ({ icon, title, description, cost }) => (
  <View style={styles.costItem}>
    <View style={styles.costIconContainer}>
      {icon}
    </View>
    <View style={styles.costContent}>
      <Typography variant="body" style={styles.costTitle}>
        {title}
      </Typography>
      <Typography variant="caption" style={styles.costDescription}>
        {description}
      </Typography>
    </View>
    <Typography variant="body" style={styles.costAmount}>
      {cost}
    </Typography>
  </View>
);

export const OnboardingWhyNotFree: React.FC = () => {
  const navigation = useNavigation();
  const { logEvent } = useAnalyticsStore();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  useEffect(() => {
    logEvent({ name: 'screen_view', screenName: 'OnboardingWhyNotFree' });
    logEvent({ name: 'onboarding_why_not_free_viewed' });
  }, [logEvent]);

  const handleContinue = () => {
    if (!hasScrolledToBottom) return;
    logEvent({ name: 'onboarding_why_not_free_continue' });
    navigation.navigate('PaywallScreen' as never);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isScrolledToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    
    if (isScrolledToBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
      logEvent({ name: 'onboarding_why_not_free_scrolled_to_bottom' });
    }
  };

  const costItems = [
    {
      icon: <Icon.Settings size={24} color={theme.colors.primary} />,
      title: t('whyNotFreeDevelopmentTitle'),
      description: t('whyNotFreeDevelopmentDesc'),
      cost: "$45k+"
    },
    {
      icon: <Icon.Brain size={24} color={theme.colors.accent} />,
      title: t('whyNotFreeAPITitle'), 
      description: t('whyNotFreeAPIDesc'),
      cost: "$8k/mo"
    },
    {
      icon: <Icon.Globe size={24} color={theme.colors.success} />,
      title: t('whyNotFreeMarketingTitle'),
      description: t('whyNotFreeMarketingDesc'), 
      cost: "$12k/mo"
    },
    {
      icon: <Icon.Shield size={24} color={theme.colors.info} />,
      title: t('whyNotFreeInfrastructureTitle'),
      description: t('whyNotFreeInfrastructureDesc'),
      cost: "$3k/mo"
    },
    {
      icon: <Icon.DollarSign size={24} color={theme.colors.warning} />,
      title: t('whyNotFreeAppleTitle'),
      description: t('whyNotFreeAppleDesc'),
      cost: "30%"
    }
  ];

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
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.iconContainer}>
              <Icon.Lightbulb size={48} color={theme.colors.primary} />
            </View>
            <Typography variant="h2" align="center" style={styles.title}>
              {t('whyNotFreeTitle')}
            </Typography>
            <Typography variant="body" align="center" style={styles.subtitle}>
              {t('whyNotFreeSubtitle')}
            </Typography>
          </View>

          {/* Transparency Statement */}
          <View style={styles.transparencySection}>
            <Typography variant="body" style={styles.transparencyText}>
              {t('whyNotFreeTransparency')}
            </Typography>
          </View>

          {/* Cost Breakdown */}
          <View style={styles.costsSection}>
            <Typography variant="h3" style={styles.sectionTitle}>
              {t('whyNotFreeCostBreakdown')}
            </Typography>
            
            {costItems.map((item, index) => (
              <CostItem
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                cost={item.cost}
              />
            ))}
          </View>

          {/* Value Beyond Costs */}
          <View style={styles.valueSection}>
            <Typography variant="h3" style={styles.sectionTitle}>
              {t('whyNotFreeValueBeyond')}
            </Typography>
            
            <View style={styles.valueItem}>
                          <View style={styles.valueIconContainer}>
              <Icon.Award size={32} color={theme.colors.accent} />
            </View>
              <Typography variant="body" style={styles.valueText}>
                {t('whyNotFreeCharityValue')}
              </Typography>
            </View>

            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <Icon.TrendingUp size={32} color={theme.colors.success} />
              </View>
              <Typography variant="body" style={styles.valueText}>
                {t('whyNotFreeSustainabilityValue')}
              </Typography>
            </View>

            <View style={styles.valueItem}>
              <View style={styles.valueIconContainer}>
                <Icon.Users2 size={32} color={theme.colors.info} />
              </View>
              <Typography variant="body" style={styles.valueText}>
                {t('whyNotFreeGrowthValue')}
              </Typography>
            </View>
          </View>

          {/* Fair Pricing */}
          <View style={styles.pricingSection}>
            <Typography variant="h3" style={styles.sectionTitle}>
              {t('whyNotFreeFairPricing')}
            </Typography>
            <Typography variant="body" style={styles.pricingText}>
              {t('whyNotFreePricingExplanation')}
            </Typography>
          </View>

          {/* Closing */}
          <View style={styles.closingSection}>
            <Typography variant="body" style={styles.closingText}>
              {t('whyNotFreeClosing')}
            </Typography>
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label={hasScrolledToBottom ? t('whyNotFreeContinue') : t('scrollToReadMore')}
            onPress={handleContinue}
            disabled={!hasScrolledToBottom}
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
    marginBottom: theme.spacing.lg,
  },
  questionIcon: {
    fontSize: 64,
  },
  title: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  transparencySection: {
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  transparencyText: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: '500',
    lineHeight: 24,
  },
  costsSection: {
    marginBottom: theme.spacing.xxl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.lg,
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  costItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    ...theme.shadows.sm,
  },
  costIconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: theme.spacing.md,
  },
  costContent: {
    flex: 1,
  },
  costTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    color: theme.colors.textPrimary,
  },
  costDescription: {
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
  costAmount: {
    fontWeight: '700',
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subtitle,
  },
  valueSection: {
    marginBottom: theme.spacing.xxl,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  valueIconContainer: {
    marginEnd: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  valueEmoji: {
    fontSize: 24,
  },
  valueText: {
    flex: 1,
    lineHeight: 24,
    color: theme.colors.textPrimary,
  },
  pricingSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  pricingText: {
    textAlign: 'center',
    lineHeight: 24,
    color: theme.colors.textPrimary,
  },
  closingSection: {
    alignItems: 'center',
  },
  closingText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  buttonContainer: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
}); 