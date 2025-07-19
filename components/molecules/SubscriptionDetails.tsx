import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useProfileStore } from '../../store/useProfileStore';

export const SubscriptionDetails: React.FC = () => {
  const { subscriptionTier } = useProfileStore();

  const handleUpgradeToPremium = () => {
    Alert.alert('Premium Upgrade', 'Premium features coming soon!');
  };

  const handleRedeemCode = () => {
    Alert.alert('Redeem Code', 'Enter your promotional code here (feature coming soon)');
  };

  const handleRestorePurchases = () => {
    Alert.alert('Restore Purchases', 'Checking for previous purchases...');
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

      {/* Current Subscription Status */}
      <View style={styles.currentSubscription}>
        <View style={styles.subscriptionBadge}>
          <Icon.Crown 
            size={20} 
            color={subscriptionTier === 'premium' ? '#FFD700' : theme.colors.textMuted} 
          />
          <Typography 
            variant="body" 
            color={theme.colors.textPrimary}
            style={styles.subscriptionText}
          >
            {subscriptionTier === 'premium' ? 'Premium Member' : 'Free Member'}
          </Typography>
        </View>
        
        {subscriptionTier === 'free' && (
          <Typography variant="small" color={theme.colors.textMuted} style={styles.subscriptionSubtext}>
            Upgrade to unlock advanced features and unlimited access
          </Typography>
        )}
      </View>

      {/* Subscription Actions */}
      <View style={styles.actionsContainer}>
        {subscriptionTier === 'free' && renderSubscriptionItem(
          <Icon.Star size={20} color={theme.colors.primary} />,
          'Upgrade to Premium',
          'Unlock unlimited conversations and premium features',
          handleUpgradeToPremium,
          true
        )}

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
  currentSubscription: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  subscriptionText: {
    marginStart: theme.spacing.sm,
    fontWeight: '600',
  },
  subscriptionSubtext: {
    lineHeight: 18,
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
}); 