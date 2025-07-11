import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

export const AboutSection: React.FC = () => {
  const handleRateApp = () => {
    Alert.alert('Rate Quran Chat', 'Thank you for using Quran Chat! We\'d love your feedback on the App Store.');
  };

  const handleProvideFeedback = () => {
    Alert.alert('Help us improve', 'We value your input! Feature coming soon.');
  };

  const handleShareWithFriends = () => {
    Alert.alert('Share Quran Chat', 'Help spread the peace and wisdom of Quran Chat with your friends!');
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Need help? Our support team will be available soon.');
  };

  const handleTermsOfUse = () => {
    Alert.alert('Terms of Use', 'Terms of Use will be available soon.');
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Privacy Policy', 'Privacy Policy will be available soon.');
  };

  const renderAboutItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => (
    <TouchableOpacity style={styles.aboutItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <View style={styles.textContainer}>
        <Typography variant="body" color={theme.colors.textPrimary} style={styles.itemTitle}>
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
        About & Support
      </Typography>

      <View style={styles.itemsContainer}>
        {renderAboutItem(
          <Icon.Star size={20} color="#FFB000" />,
          'Rate App',
          'Share your experience on the App Store',
          handleRateApp
        )}

        {renderAboutItem(
          <Icon.MessageSquare size={20} color={theme.colors.primary} />,
          'Provide Feedback',
          'Help us improve Quran Chat',
          handleProvideFeedback
        )}

        {renderAboutItem(
          <Icon.Share2 size={20} color="#4285F4" />,
          'Share with Friends',
          'Spread the peace and wisdom',
          handleShareWithFriends
        )}

        {renderAboutItem(
          <Icon.HelpCircle size={20} color={theme.colors.textSecondary} />,
          'Contact Support',
          'Get help and assistance',
          handleContactSupport
        )}

        {renderAboutItem(
          <Icon.FileText size={20} color={theme.colors.textSecondary} />,
          'Terms of Use',
          'Read our terms and conditions',
          handleTermsOfUse
        )}

        {renderAboutItem(
          <Icon.Shield size={20} color={theme.colors.textSecondary} />,
          'Privacy Policy',
          'Learn how we protect your data',
          handlePrivacyPolicy
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
  itemsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  aboutItem: {
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
    marginRight: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  itemSubtitle: {
    lineHeight: 18,
  },
}); 