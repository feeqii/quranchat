import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../../components/atoms/Typography';
import { Icon } from '../../components/atoms/Icon';
import { Spacer } from '../../components/atoms/Spacer';
import { theme } from '../../constants/theme';
import { TodayStackParamList } from '../../navigation/TodayStackNavigator';
import { t } from '../../localization';

type PastReflectionDetailScreenRouteProp = RouteProp<
  TodayStackParamList,
  'PastReflectionDetailScreen'
>;

export const PastReflectionDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PastReflectionDetailScreenRouteProp>();
  const { date, reflection } = route.params;

  // Debug: Log the reflection data to see what's available
  console.log('📊 Past Reflection Data:', {
    userInput: reflection.userInput,
    userReflection: reflection.userReflection,
    generatedReflection: !!reflection.generatedReflection,
    selectedVerse: !!reflection.selectedVerse,
    selectedVerse_text: reflection.selectedVerse?.text?.substring(0, 50),
  });

  // Format the date for display
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format completion time
  const formatCompletionTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Get mood emoji based on level
  const getMoodEmoji = (moodLevel: number) => {
    if (moodLevel >= 9) return '😊';
    if (moodLevel >= 7) return '🙂';
    if (moodLevel >= 5) return '😐';
    if (moodLevel >= 3) return '😔';
    return '😢';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon.Back size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Typography variant="h3" style={styles.headerTitle}>
            Your Reflection
          </Typography>
          <Typography variant="caption" style={styles.headerDate}>
            {formatDate(date)}
          </Typography>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Mood Section */}
        <LinearGradient
          colors={['#F0F8FF', '#E6F4F1', '#FFFFFF']}
          style={styles.moodCard}
        >
          <View style={styles.moodHeader}>
            <Typography variant="caption" style={styles.sectionLabel}>
              YOUR MOOD
            </Typography>
            <Typography variant="caption" style={styles.completionTime}>
              Completed at {formatCompletionTime(reflection.completedAt)}
            </Typography>
          </View>
          
          <View style={styles.moodContent}>
            <Typography style={styles.moodEmoji}>
              {getMoodEmoji(reflection.moodLevel)}
            </Typography>
            <View style={styles.moodText}>
              <Typography variant="h2" style={styles.moodDescription}>
                {reflection.moodDescription}
              </Typography>
              <Typography variant="body" style={styles.moodLevel}>
                {reflection.moodLevel}/10
              </Typography>
            </View>
          </View>
        </LinearGradient>

        <Spacer size="lg" />

        {/* Life Areas Section */}
        {reflection.selectedContexts.length > 0 && (
          <>
            <View style={styles.section}>
              <Typography variant="caption" style={styles.sectionLabel}>
                LIFE AREAS YOU REFLECTED ON
              </Typography>
              <View style={styles.contextsContainer}>
                {reflection.selectedContexts.map((context, index) => (
                  <View key={index} style={styles.contextChip}>
                    <Typography variant="caption" style={styles.contextText}>
                      {context}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
            <Spacer size="lg" />
          </>
        )}

        {/* User Reflection Section */}
        {(reflection.userReflection || reflection.userInput) && (
          <>
            <View style={styles.section}>
              <Typography variant="caption" style={styles.sectionLabel}>
                YOUR THOUGHTS
              </Typography>
              <View style={styles.contentCard}>
                <Typography variant="body" style={styles.userInput}>
                  {reflection.userReflection || reflection.userInput}
                </Typography>
              </View>
            </View>
            <Spacer size="lg" />
          </>
        )}

        {/* AI Reflection Section */}
        {reflection.generatedReflection && (
          <>
            <View style={styles.section}>
              <Typography variant="caption" style={styles.sectionLabel}>
                SPIRITUAL GUIDANCE
              </Typography>
              <LinearGradient
                colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']}
                style={styles.reflectionCard}
              >
                <Typography variant="body" style={styles.generatedReflection}>
                  {reflection.generatedReflection}
                </Typography>
              </LinearGradient>
            </View>
            <Spacer size="lg" />
          </>
        )}

        {/* Verse Section */}
        {reflection.selectedVerse && (
          <>
            <View style={styles.section}>
              <Typography variant="caption" style={styles.sectionLabel}>
                {t('reflectingOn')}
              </Typography>
              <LinearGradient
                colors={['#F0F9FF', '#EFF6FF', '#FFFFFF']} // Same colors as current day
                style={styles.verseCard}
              >
                <Typography variant="body" style={styles.verseText}>
                  "{reflection.selectedVerse.text}"
                </Typography>
                <Typography variant="caption" style={styles.verseReference}>
                  — {reflection.selectedVerse.reference}
                </Typography>
              </LinearGradient>
            </View>
            <Spacer size="xl" />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSoft,
  },
  backButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  headerDate: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  headerSpacer: {
    width: 40, // Same width as back button to center title
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  moodCard: {
    borderRadius: theme.radii.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.md,
  },
  moodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  completionTime: {
    fontSize: 11,
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
  moodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 48,
    marginRight: theme.spacing.lg,
  },
  moodText: {
    flex: 1,
  },
  moodDescription: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textTransform: 'capitalize',
  },
  moodLevel: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  section: {
    marginBottom: theme.spacing.md,
  },
  contextsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  contextChip: {
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.pill,
  },
  contextText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  contentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  userInput: {
    lineHeight: 24,
    color: theme.colors.textPrimary,
  },
  reflectionCard: {
    borderRadius: theme.radii.xl,
    padding: theme.spacing.xl,
    marginTop: theme.spacing.md,
    ...theme.shadows.sm,
  },
  generatedReflection: {
    lineHeight: 26,
    color: theme.colors.textPrimary,
    fontStyle: 'italic',
  },
  verseCard: {
    borderRadius: theme.radii.xl,
    padding: theme.spacing.xl,
    marginTop: theme.spacing.md,
    ...theme.shadows.sm,
  },
  verseText: {
    lineHeight: 26,
    color: theme.colors.textPrimary,
    fontStyle: 'italic',
    marginBottom: theme.spacing.md,
    fontSize: 16,
  },
  verseReference: {
    color: theme.colors.textMuted,
    textAlign: 'right',
    fontWeight: '600',
  },
}); 