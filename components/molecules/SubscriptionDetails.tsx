import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useProfileStore } from '../../store/useProfileStore';
import { usePurchasesStore } from '../../store/usePurchasesStore';

export const SubscriptionDetails: React.FC = () => {
  const { subscriptionTier } = useProfileStore();
  const { weeklyPackage } = usePurchasesStore();

  const handlePremiumInfo = () => {
    Alert.alert(
      '🌟 Premium Member Benefits',
      'Thank you for being a Premium subscriber! 🎉\n\n✨ Your subscription includes:\n\n• Unlimited AI conversations with Quranic wisdom\n• Daily personalized reflections\n• Priority support & new features\n• Ad-free spiritual experience\n\n💛 CHARITABLE IMPACT:\nYour subscription directly supports:\n• Islamic education initiatives\n• Community development projects\n• Accessibility for underserved communities\n\nYou\'re not just getting premium features - you\'re making a meaningful difference in the world! 🤲',
      [{ text: 'Amazing!', style: 'default' }]
    );
  };

  const handleRedeemCode = () => {
    Alert.alert('Redeem Code', 'Enter your promotional code here (feature coming soon)');
  };

  const handleRestorePurchases = () => {
    Alert.alert('Restore Purchases', 'Checking for previous purchases...');
  };

  const handleTermsPress = async () => {
    const url = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open Terms of Use. Please try again later.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open Terms of Use. Please try again later.');
    }
  };

  const handlePrivacyPress = async () => {
    const url = 'https://www.privacypolicies.com/live/0e3e48ea-08aa-48b5-8cfe-e7fbe96752eb';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open Privacy Policy. Please try again later.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open Privacy Policy. Please try again later.');
    }
  };

  const renderSubscriptionItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress: () => void,
    isPrimary?: boolean
  ) => (
    <TouchableOpacity style={styles.subscriptionItem} onPress={onPress}>
      <View style={[styles.iconContainer, isPrimary && styles.primaryIconContainer]}>
        {icon}
      </View>
      
      <View style={styles.textContainer}>
        <Typography 
          variant="body" 
          color={isPrimary ? theme.colors.primary : theme.colors.textPrimary}
          style={[styles.itemTitle, isPrimary && styles.primaryTitle]}
        >
          {title}
        </Typography>
        <Typography variant="small" color={theme.colors.textMuted} style={styles.itemSubtitle}>
          {subtitle}
        </Typography>
      </View>
      
      <Icon.ChevronRight size={16} color={theme.colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Typography variant="h3" color={theme.colors.textPrimary} style={styles.sectionTitle}>
        Subscription
      </Typography>

      {/* Premium Subscription Status */}
      <TouchableOpacity style={styles.premiumSubscription} onPress={handlePremiumInfo}>
        <View style={styles.premiumBadge}>
          <Icon.Crown size={24} color="#FFD700" />
          <Typography 
            variant="h3" 
            color="#B8860B"
            style={styles.premiumText}
          >
            Premium Member
          </Typography>
          <View style={styles.sparkleContainer}>
            <Typography style={styles.sparkle}>✨</Typography>
          </View>
        </View>
        
        <Typography variant="body" style={styles.premiumSubtext}>
          🤲 Supporting charity • Unlimited access • Premium features
        </Typography>
        
        <View style={styles.charityHighlight}>
          <Icon.Heart size={16} color="#FFD700" />
          <Typography variant="caption" style={styles.charityText}>
            Your subscription makes a difference in the world
          </Typography>
        </View>
        
        <View style={styles.tapHint}>
          <Typography variant="caption" style={styles.tapHintText}>
            Tap to see your impact & benefits
          </Typography>
          <Icon.ChevronRight size={16} color="#B8860B" />
        </View>
      </TouchableOpacity>

      {/* Subscription Actions */}
      <View style={styles.actionsContainer}>
        {renderSubscriptionItem(
          <Icon.Gift size={20} color={theme.colors.textSecondary} />,
          'Redeem Promotional Code',
          'Enter a code to unlock special features',
          handleRedeemCode
        )}

        {renderSubscriptionItem(
          <Icon.RefreshCw size={20} color={theme.colors.textSecondary} />,
          'Restore Purchases',
          'Restore your previous premium purchases',
          handleRestorePurchases
        )}
      </View>

      {/* Subscription Information - Required by Apple */}
      <View style={styles.subscriptionInfoSection}>
        <Typography variant="body" style={styles.subscriptionInfoTitle}>
          Auto-Renewable Subscription Details
        </Typography>
        
        <View style={styles.subscriptionInfoContainer}>
          <View style={styles.infoRow}>
            <Typography variant="caption" style={styles.infoLabel}>Title:</Typography>
            <Typography variant="caption" style={styles.infoValue}>
              Quran Chat Premium Weekly
            </Typography>
          </View>
          
          <View style={styles.infoRow}>
            <Typography variant="caption" style={styles.infoLabel}>Duration:</Typography>
            <Typography variant="caption" style={styles.infoValue}>
              1 Week
            </Typography>
          </View>
          
          <View style={styles.infoRow}>
            <Typography variant="caption" style={styles.infoLabel}>Price:</Typography>
            <Typography variant="caption" style={styles.infoValue}>
              {weeklyPackage?.localizedPrice || '$3.99'} per week
            </Typography>
          </View>
          
          <Typography variant="caption" style={styles.renewalNote}>
            Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
          </Typography>
        </View>
      </View>

      {/* Legal Links */}
      <View style={styles.legalSection}>
        <Typography variant="caption" style={styles.legalTitle}>
          Legal Information
        </Typography>
        <View style={styles.legalLinksContainer}>
          <TouchableOpacity onPress={handleTermsPress} style={styles.legalLink}>
            <Icon.FileText size={16} color={theme.colors.primary} />
            <Typography variant="caption" style={styles.legalLinkText}>
              Terms of Use
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrivacyPress} style={styles.legalLink}>
            <Icon.Shield size={16} color={theme.colors.primary} />
            <Typography variant="caption" style={styles.legalLinkText}>
              Privacy Policy
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  premiumSubscription: {
    backgroundColor: '#FFFBF0',
    borderRadius: theme.radii.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  premiumText: {
    marginStart: theme.spacing.sm,
    fontWeight: '700',
    color: '#B8860B',
  },
  sparkleContainer: {
    marginStart: theme.spacing.xs,
  },
  sparkle: {
    fontSize: 16,
  },
  premiumSubtext: {
    lineHeight: 20,
    fontWeight: '500',
    color: '#8B4513',
    marginBottom: theme.spacing.sm,
  },
  charityHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.md,
    marginBottom: theme.spacing.sm,
  },
  charityText: {
    marginStart: theme.spacing.xs,
    color: '#B8860B',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  tapHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.3)',
  },
  tapHintText: {
    color: '#B8860B',
    fontWeight: '500',
    marginEnd: theme.spacing.xs,
  },
  actionsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  subscriptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: theme.spacing.md,
  },
  primaryIconContainer: {
    backgroundColor: theme.colors.primarySoft,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  primaryTitle: {
    fontWeight: '600',
  },
  itemSubtitle: {
    lineHeight: 18,
  },
  subscriptionInfoSection: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  subscriptionInfoTitle: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  subscriptionInfoContainer: {
    gap: theme.spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  infoLabel: {
    fontWeight: '500',
    color: theme.colors.textSecondary,
    flex: 1,
  },
  infoValue: {
    fontWeight: '500',
    color: theme.colors.textPrimary,
    flex: 2,
    textAlign: 'right',
  },
  renewalNote: {
    fontStyle: 'italic',
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primarySoft,
    lineHeight: 16,
  },
  legalSection: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  legalTitle: {
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  legalLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primarySoft,
  },
  legalLinkText: {
    marginLeft: theme.spacing.xs,
    color: theme.colors.primary,
    fontWeight: '500',
  },
}); 