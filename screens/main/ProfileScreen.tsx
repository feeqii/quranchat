import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../../constants/theme';
import { useProfileStore } from '../../store/useProfileStore';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { useTodayStore } from '../../store/useTodayStore';

// Components
import { ProfileHeader } from '../../components/molecules/ProfileHeader';
import { WidgetsSection } from '../../components/molecules/WidgetsSection';
import { PersonalDetails } from '../../components/molecules/PersonalDetails';
import { SubscriptionDetails } from '../../components/molecules/SubscriptionDetails';
import { AboutSection } from '../../components/molecules/AboutSection';
import { AccountSettings } from '../../components/molecules/AccountSettings';
import { Spacer } from '../../components/atoms/Spacer';

export const ProfileScreen: React.FC = () => {
  const { updateStreakData, syncOnboardingData, isOnboardingDataSynced } = useProfileStore();
  const { streakDays } = useTodayStore();
  const { 
    ageGroup, 
    islamicBackground, 
    wantsDailyReminder, 
    supportType,
    onboardingCompleted 
  } = useOnboardingStore();

  // Sync onboarding data to profile on first load
  useEffect(() => {
    if (onboardingCompleted && !isOnboardingDataSynced) {
      syncOnboardingData({
        ageGroup,
        islamicBackground,
        wantsDailyReminder,
        supportType,
      });
    }
  }, [onboardingCompleted, isOnboardingDataSynced, syncOnboardingData, ageGroup, islamicBackground, wantsDailyReminder, supportType]);

  // Update streak data from Today store
  useEffect(() => {
    const currentStreak = streakDays.length;
    // For demo purposes, assume longest streak is current + some historical data
    const longestStreak = Math.max(currentStreak, 5);
    updateStreakData(currentStreak, longestStreak);
  }, [streakDays, updateStreakData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile Header with avatar, username, and streak cards */}
        <ProfileHeader />

        {/* Widgets Discovery Section */}
        <WidgetsSection />

        {/* Personal Details Form - Now auto-populated from onboarding */}
        <PersonalDetails />

        {/* Subscription Management */}
        <SubscriptionDetails />

        {/* About & Support Section */}
        <AboutSection />

        {/* Account Settings & Logout */}
        <AccountSettings />

        {/* Bottom spacing for safe area */}
        <Spacer size="xl" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xl,
  },
}); 