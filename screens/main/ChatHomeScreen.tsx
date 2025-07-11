import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { useChatStore } from '../../store/useChatStore';
import { categoryImages, getRandomUserCount } from '../../constants/categoryImages';

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

  // Verse data is now fetched by the VerseOfTheDayCard component

  // Helper function to create category with navigation
  const createCategory = (title: string) => ({
    title,
    imageSource: categoryImages[title],
    userCount: getRandomUserCount(),
    onPress: () => {
      setTopic(title);
      navigation.navigate("TopicChatScreen" as never);
    }
  });

  // Expanded category data with comprehensive spiritual topics
  const askAboutCategories = [
    createCategory("Creation"),
    createCategory("Relationships"),
    createCategory("Purpose"),
    createCategory("Patience")
  ];

  const spiritualGuidanceCategories = [
    createCategory("Prayer & Worship"),
    createCategory("Forgiveness"),
    createCategory("Gratitude")
  ];

  const lifeChallengesCategories = [
    createCategory("Anxiety"),
    createCategory("Stress"),
    createCategory("Loss"),
    createCategory("Loneliness"),
    createCategory("Grief")
  ];

  const personalGrowthCategories = [
    createCategory("Self-love"),
    createCategory("Wisdom"),
    createCategory("Growth"),
    createCategory("Purpose")
  ];

  const relationshipsCategories = [
    createCategory("Family"),
    createCategory("Friendship"),
    createCategory("Marriage"),
    createCategory("Community"),
    createCategory("Compassion")
  ];

  const worshipFaithCategories = [
    createCategory("Prayer"),
    createCategory("Du'a"),
    createCategory("Tawakkul"),
    createCategory("Taqwa"),
    createCategory("Iman"),
    createCategory("Ihsan")
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
          Chat
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
          title="Ask about..."
          categories={askAboutCategories}
        />

        {/* Spiritual Guidance */}
        <CategoryGroupSection
          title="Spiritual Guidance"
          categories={spiritualGuidanceCategories}
        />

        {/* Life Challenges */}
        <CategoryGridSection
          title="Life Challenges"
          categories={lifeChallengesCategories}
        />

        {/* Personal Growth */}
        <CategoryGridSection
          title="Personal Growth"
          categories={personalGrowthCategories}
        />

        {/* Relationships */}
        <CategoryGridSection
          title="Relationships"
          categories={relationshipsCategories}
        />

        {/* Worship & Faith */}
        <CategoryGridSection
          title="Worship & Faith"
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
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.primarySoft,
  },
}); 