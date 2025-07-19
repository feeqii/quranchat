import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { t } from "../../localization";
import { Typography } from "../../components/atoms/Typography";
import { Spacer } from "../../components/atoms/Spacer";
import { ProgressBar } from "../../components/atoms/ProgressBar";
import { Icon } from "../../components/atoms/Icon";
import { DailyStreakCalendarOrganism } from "../../components/organisms/DailyStreakCalendarOrganism";
import { theme } from "../../constants/theme";
import { textAlign, alignItems } from "../../utils/rtl";
import { useTodayStore } from "../../store/useTodayStore";
import { TodayStackParamList } from "../../navigation/TodayStackNavigator";

type TodayHomeScreenNavigationProp = NativeStackNavigationProp<
  TodayStackParamList,
  "TodayHomeScreen"
>;

export const TodayHomeScreen: React.FC = () => {
  const navigation = useNavigation<TodayHomeScreenNavigationProp>();
  const {
    journeyCompleted,
    resetForNewDay,
    moodLevel,
    selectedContexts,
    userInput,
    streakDays,
    generatedReflection,
    selectedVerse,
    moodDescription,
    lastCompletedDate,
    selectedDate,
    setSelectedDate,
    getReflectionForDate,
  } = useTodayStore();

  const [completedCardScale] = useState(new Animated.Value(1));

  // Reset data for new day on component mount
  useEffect(() => {
    resetForNewDay();
  }, [resetForNewDay]);

  // Calculate progress based on completed steps
  const getJourneyProgress = () => {
    if (journeyCompleted) return 100;

    let progress = 0;
    if (moodLevel !== null) progress += 33;
    if (selectedContexts.length > 0) progress += 33;
    if (userInput !== null && userInput.trim() !== "") progress += 34;

    return Math.min(progress, 100);
  };

  const progress = getJourneyProgress();

  const handleStartJourney = () => {
    // Navigate to mood check-in screen
    navigation.navigate("MoodCheckinScreen");
  };

  const handleContinueJourney = () => {
    // Navigate to appropriate next screen based on progress
    if (moodLevel === null) {
      navigation.navigate("MoodCheckinScreen");
    } else if (selectedContexts.length === 0) {
      navigation.navigate("ContextSelectionScreen");
    } else {
      navigation.navigate("ReflectionInputScreen");
    }
  };

  const handleViewResults = () => {
    // Gentle tap animation
    Animated.sequence([
      Animated.timing(completedCardScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(completedCardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Check if generated content exists before navigating
    const { generatedReflection, selectedVerse } = useTodayStore.getState();

    if (!generatedReflection && !selectedVerse) {
      // Content is missing, show alert and offer to regenerate
      Alert.alert(t("contentMissing"), t("contentMissingMessage"), [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("regenerate"),
          onPress: () => {
            // Navigate to loading screen to regenerate content
            navigation.navigate("ContentGenerationLoadingScreen");
          },
        },
      ]);
    } else {
      // Navigate to the completed reflection screen
      navigation.navigate("GeneratedReflectionScreen");
    }
  };

  // Get data for currently selected date
  const getSelectedDateData = () => {
    if (!selectedDate) {
      // No date selected, return today's data
      return {
        isToday: true,
        reflection: null,
        dateFormatted: t("today"),
      };
    }

    const dateObj = new Date(selectedDate);
    const reflection = getReflectionForDate(selectedDate);
    const dateFormatted = dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    return {
      isToday: false,
      reflection,
      dateFormatted,
    };
  };

  const selectedDateData = getSelectedDateData();

  // Simple card for past reflection
  const renderPastReflectionCard = (reflection: any, dateFormatted: string) => {
    return (
      <View
        style={[
          styles.journeyCard,
          { backgroundColor: "rgba(60, 140, 126, 0.05)", alignItems: alignItems(true) },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Typography
            variant="h3"
            color={theme.colors.textPrimary}
            style={{ fontWeight: "700" }}
          >
            {t("dateReflection", { date: dateFormatted })}
          </Typography>
          <TouchableOpacity
            onPress={() => setSelectedDate(null)}
            style={{ padding: 4 }}
          >
            <Typography variant="body" color={theme.colors.textMuted}>
              ✕
            </Typography>
          </TouchableOpacity>
        </View>

        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={{ marginBottom: 8, fontSize: 12, fontWeight: "600" }}
        >
          {t("mood").toUpperCase()}
        </Typography>
        <Typography
          variant="body"
          color={theme.colors.textPrimary}
          style={{ marginBottom: 16 }}
        >
          {reflection.moodDescription} ({reflection.moodLevel}/10)
        </Typography>

        {reflection.selectedContexts.length > 0 && (
          <>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={{ marginBottom: 8, fontSize: 12, fontWeight: "600" }}
            >
              {t("lifeAreas").toUpperCase()}
            </Typography>
            <Typography
              variant="body"
              color={theme.colors.textPrimary}
              style={{ marginBottom: 16 }}
            >
              {reflection.selectedContexts.join(", ")}
            </Typography>
          </>
        )}

        {reflection.userInput && (
          <>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={{ marginBottom: 8, fontSize: 12, fontWeight: "600" }}
            >
              {t("yourReflection").toUpperCase()}
            </Typography>
            <Typography
              variant="body"
              color={theme.colors.textPrimary}
              style={{ marginBottom: 16, lineHeight: 22 }}
            >
              {reflection.userInput}
            </Typography>
          </>
        )}

        {reflection.generatedReflection && (
          <>
            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={{ marginBottom: 8, fontSize: 12, fontWeight: "600" }}
            >
              {t("aiGuidance").toUpperCase()}
            </Typography>
            <Typography
              variant="body"
              color={theme.colors.textPrimary}
              style={{ marginBottom: 16, lineHeight: 22, fontStyle: "italic" }}
            >
              {reflection.generatedReflection}
            </Typography>
          </>
        )}

        {reflection.selectedVerse && (
          <View
            style={{
              backgroundColor: theme.colors.primarySoft,
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
            }}
          >
            <Typography
              variant="body"
              color={theme.colors.textPrimary}
              style={{ fontStyle: "italic", lineHeight: 22 }}
            >
              "{reflection.selectedVerse.text}"
            </Typography>
            <Typography
              variant="caption"
              color={theme.colors.textMuted}
              style={{ marginTop: 8, textAlign: textAlign() }}
            >
              — {reflection.selectedVerse.reference}
            </Typography>
          </View>
        )}

        <Typography
          variant="caption"
          color={theme.colors.primary}
          style={{ textAlign: "center", fontWeight: "600" }}
        >
          ✅ {t("completed")}
        </Typography>
      </View>
    );
  };

  // Simple card for no reflection
  const renderNoReflectionCard = (dateFormatted: string) => {
    return (
      <View
        style={[
          styles.journeyCard,
          { backgroundColor: "rgba(139, 147, 150, 0.1)", alignItems: alignItems(true) },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Typography
            variant="h3"
            color={theme.colors.textMuted}
            style={{ fontWeight: "700" }}
          >
            {dateFormatted}
          </Typography>
          <TouchableOpacity
            onPress={() => setSelectedDate(null)}
            style={{ padding: 4 }}
          >
            <Typography variant="body" color={theme.colors.textMuted}>
              ✕
            </Typography>
          </TouchableOpacity>
        </View>

        <Typography
          variant="body"
          color={theme.colors.textMuted}
          style={{ textAlign: "center", marginBottom: 12 }}
        >
          {t("noReflectionRecorded")}
        </Typography>

        <Typography
          variant="caption"
          color={theme.colors.textMuted}
          style={{ textAlign: "center" }}
        >
          {t("trySelectingDifferentDate")}
        </Typography>
      </View>
    );
  };

  const renderJourneyCard = () => {
    // If viewing a past date
    if (!selectedDateData.isToday) {
      if (selectedDateData.reflection) {
        return renderPastReflectionCard(
          selectedDateData.reflection,
          selectedDateData.dateFormatted,
        );
      } else {
        return renderNoReflectionCard(selectedDateData.dateFormatted);
      }
    }

    // Today's journey logic
    if (journeyCompleted) {
      return (
        <Animated.View style={[{ transform: [{ scale: completedCardScale }] }]}>
          <TouchableOpacity
            style={styles.journeyCompletedContainer}
            onPress={handleViewResults}
            activeOpacity={1}
          >
            <LinearGradient
              colors={["#E6F4F1", "#F5F1E8", "#FFFFFF"]} // Same gradient as Verse of the Day
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.journeyCompletedCard}
            >
              {/* Main Content */}
              <View style={styles.journeyCompletedContent}>
                <Typography
                  variant="h2"
                  color="#2C3E50"
                  style={styles.journeyCompletedTitle}
                >
                  {t("todaysJourneyComplete")}
                </Typography>

                <Typography
                  variant="body"
                  color="#6B7280"
                  style={styles.journeyCompletedDescription}
                >
                  {moodDescription
                    ? t("basedOnFeelingReady", {
                        mood: moodDescription.toLowerCase(),
                      })
                    : t("personalizedReflectionReady")}
                </Typography>
              </View>

              {/* Action Section */}
              <View style={styles.journeyCompletedAction}>
                <LinearGradient
                  colors={["#ECFDF5", "#FFFFFF"]}
                  style={styles.actionButtonBackground}
                >
                  <Typography
                    variant="body"
                    color="#059669"
                    style={styles.actionText}
                  >
                    {t("viewResults")}
                  </Typography>
                  <Icon.ChevronRight
                    size={18}
                    color="#059669"
                    style={styles.actionIcon}
                  />
                </LinearGradient>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    if (progress > 0) {
      return (
        <TouchableOpacity
          style={[styles.journeyCard, { alignItems: alignItems(true) }]}
          onPress={handleContinueJourney}
          activeOpacity={0.8}
        >
          <View style={styles.journeyCardContent}>
            <Typography
              variant="h3"
              color={theme.colors.textPrimary}
              style={styles.journeyTitle}
            >
              {t("continueYourJourney")}
            </Typography>

            <Spacer size="sm" />

            <Typography
              variant="body"
              color={theme.colors.textSecondary}
              style={styles.journeyDescription}
            >
              {t("progressThroughReflection", { progress })}
            </Typography>

            <Spacer size="md" />

            <ProgressBar progress={progress} />
          </View>

          <View style={styles.journeyAction}>
            <Typography
              variant="subtitle"
              color={theme.colors.primary}
              style={styles.actionText}
            >
              {t("continue")}
            </Typography>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={[styles.journeyCard, { alignItems: alignItems(true) }]}
        onPress={handleStartJourney}
        activeOpacity={0.8}
      >
        <View style={styles.journeyCardContent}>
          <Typography
            variant="h3"
            color={theme.colors.textPrimary}
            style={styles.journeyTitle}
          >
            {t("beginTodaysJourney")}
          </Typography>

          <Spacer size="sm" />

          <Typography
            variant="body"
            color={theme.colors.textSecondary}
            style={styles.journeyDescription}
          >
            {t("takeTimeToReflect")}
          </Typography>
        </View>

        <View style={styles.journeyAction}>
          <Typography
            variant="subtitle"
            color={theme.colors.primary}
            style={styles.actionText}
          >
            {t("start")}
          </Typography>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Typography
            variant="h2"
            color={theme.colors.textPrimary}
            style={styles.headerTitle}
          >
            {t("todaysJourney")}
          </Typography>

          <View style={styles.streakBadge}>
            <View style={styles.streakIcon} />
            <Typography
              variant="caption"
              color={theme.colors.textMuted}
              style={styles.streakNumber}
            >
              {streakDays.length}
            </Typography>
          </View>
        </View>

        <Spacer size="lg" />

        {/* Reflection subtitle */}
        <Typography
          variant="subtitle"
          color={theme.colors.textMuted}
          style={styles.subtitle}
        >
          {t("reflectingOnYourGrowth")}
        </Typography>

        <Spacer size="xl" />

        {/* Daily Streak Calendar */}
        <DailyStreakCalendarOrganism />

        <Spacer size="xl" />

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Typography
            variant="title"
            color={theme.colors.textPrimary}
            style={styles.progressTitle}
          >
            {t("progressToday")}
          </Typography>

          <Typography
            variant="h3"
            color={theme.colors.primary}
            style={styles.progressPercentage}
          >
            {progress}%
          </Typography>
        </View>

        <Spacer size="sm" />

        <ProgressBar progress={progress} />

        <Spacer size="xl" />

        {/* Journey Card */}
        {renderJourneyCard()}

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
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.md,
  },
  headerTitle: {
    flex: 1,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.pill,
  },
  streakIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
    marginEnd: theme.spacing.xs,
  },
  streakNumber: {
    fontWeight: "600",
    color: theme.colors.primary,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  progressSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    flex: 1,
  },
  progressPercentage: {
    fontWeight: "700",
  },
  journeyCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: 24, // Increased padding for better readability
    flexDirection: "row",
    alignItems: "flex-start", // Better alignment for multi-line content
    ...theme.shadows.md,
  },
  journeyCardContent: {
    flex: 1,
  },
  journeyTitle: {
    fontWeight: "700", // Bolder for better hierarchy
    fontSize: theme.fontSizes.h3,
  },
  journeyDescription: {
    lineHeight: 22,
    fontSize: 14, // Smaller, lighter font for supplemental info
    color: "#6B7C93", // Lighter gray as specified
  },
  // Completed Journey Card Styles
  journeyCompletedContainer: {
    borderRadius: 20,
    overflow: "hidden",
    ...theme.shadows.lg,
  },
  journeyCompletedCard: {
    minHeight: 240,
    padding: 40,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  journeyCompletedContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 60, // Increased spacing for View Results button
  },
  journeyCompletedTitle: {
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 32,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  journeyCompletedDescription: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: "90%",
    letterSpacing: 0.2,
    fontWeight: "400",
    marginBottom: 20, // Added margin bottom for extra spacing
  },
  journeyCompletedAction: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    ...theme.shadows.sm,
  },
  actionButtonBackground: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  actionText: {
    fontWeight: "600",
    textAlign: "center",
  },
  journeyAction: {
    marginStart: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  actionIcon: {
    marginStart: 4,
  },
  completionTime: {
    opacity: 0.7,
    fontWeight: "500",
    fontSize: 12,
  },
});
