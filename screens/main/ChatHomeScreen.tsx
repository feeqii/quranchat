import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { useChatStore } from '../../store/useChatStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { categoryImages, getRandomUserCount } from '../../constants/categoryImages';
import { t } from '../../localization';

// Components
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { IconButton } from '../../components/atoms/IconButton';
import { Icon } from '../../components/atoms/Icon';
import { VerseOfTheDayCard } from '../../components/organisms/VerseOfTheDayCard';
import { CategoryGroupSection } from '../../components/organisms/CategoryGroupSection';
import { CategoryGridSection } from '../../components/organisms/CategoryGridSection';
import { JustChatCard } from '../../components/molecules/JustChatCard';

export const ChatHomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { setTopic } = useChatStore();
  const { logEvent } = useAnalyticsStore();

  // Verse data is now fetched by the VerseOfTheDayCard component

  // Helper function to create category with navigation
  const createCategory = (title: string) => ({
    title,
    imageSource: categoryImages[title],
    userCount: getRandomUserCount(),
    onPress: () => {
      logEvent({ name: 'chat_session_started' });
      setTopic(title);
      navigation.navigate("TopicChatScreen" as never);
    }
  });

  // Expanded category data with comprehensive spiritual topics
  const askAboutCategories = [
    createCategory(t('categories.creation')),
    createCategory(t('categories.relationships')),
    createCategory(t('categories.purpose')),
    createCategory(t('categories.patience'))
  ];

  const spiritualGuidanceCategories = [
    createCategory(t('categories.prayerWorship')),
    createCategory(t('categories.forgiveness')),
    createCategory(t('categories.gratitude'))
  ];

  const lifeChallengesCategories = [
    createCategory(t('categories.anxiety')),
    createCategory(t('categories.stress')),
    createCategory(t('categories.loss')),
    createCategory(t('categories.loneliness')),
    createCategory(t('categories.grief'))
  ];

  const personalGrowthCategories = [
    createCategory(t('categories.selfLove')),
    createCategory(t('categories.wisdom')),
    createCategory(t('categories.growth')),
    createCategory(t('categories.purpose'))
  ];

  const relationshipsCategories = [
    createCategory(t('categories.family')),
    createCategory(t('categories.friendship')),
    createCategory(t('categories.marriage')),
    createCategory(t('categories.community')),
    createCategory(t('categories.compassion'))
  ];

  const worshipFaithCategories = [
    createCategory(t('categories.prayer')),
    createCategory(t('categories.dua')),
    createCategory(t('categories.tawakkul')),
    createCategory(t('categories.taqwa')),
    createCategory(t('categories.iman')),
    createCategory(t('categories.ihsan'))
  ];

  // handleVersePress is now handled by the VerseOfTheDayCard component

  const handleHistoryPress = () => {
    navigation.navigate("HistoryScreen" as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with History button */}
      <View style={styles.header}>
        <Typography 
          variant="h2" 
          color={theme.colors.textPrimary}
          style={styles.headerTitle}
        >
          {t('chat')}
        </Typography>
        <IconButton
          icon={<Icon.History size={22} color={theme.colors.textMuted} />}
          onPress={handleHistoryPress}
          style={styles.historyButton}
        />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Generous top spacing */}
        <Spacer size="lg" />
        
        {/* Enhanced Verse of the Day Card */}
        <VerseOfTheDayCard />

        <Spacer size="lg" />

        {/* Just Chat Card */}
        <JustChatCard />

        <Spacer size="xl" />

        {/* Ask About Categories */}
        <CategoryGroupSection
          title={t('askAbout')}
          categories={askAboutCategories}
        />

        {/* Spiritual Guidance */}
        <CategoryGroupSection
          title={t('spiritualGuidance')}
          categories={spiritualGuidanceCategories}
        />

        {/* Life Challenges */}
        <CategoryGridSection
          title={t('lifeChallenges')}
          categories={lifeChallengesCategories}
        />

        {/* Personal Growth */}
        <CategoryGridSection
          title={t('personalGrowth')}
          categories={personalGrowthCategories}
        />

        {/* Relationships */}
        <CategoryGridSection
          title={t('relationships')}
          categories={relationshipsCategories}
        />

        {/* Worship & Faith */}
        <CategoryGridSection
          title={t('worshipFaith')}
          categories={worshipFaithCategories}
        />

        <Spacer size="xl" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  historyButton: {
    marginStart: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySoft,
  },
}); 