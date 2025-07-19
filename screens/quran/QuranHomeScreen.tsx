import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Share,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { SurahHeader } from "../../components/molecules/SurahHeader";
import { VerseList } from "../../components/organisms/VerseList";
import { VerseActionBar } from "../../components/molecules/VerseActionBar";
import { Typography } from "../../components/atoms/Typography";
import { Spacer } from "../../components/atoms/Spacer";
import { theme } from "../../constants/theme";
import { useQuranStore, HighlightColor } from "../../store/useQuranStore";
import { useChatStore } from "../../store/useChatStore";
import { surahList } from "../../constants/surahList";
import { translations } from "../../lib/api/quranApi";
import { t } from "../../localization";

type QuranHomeScreenNavigationProp = NativeStackNavigationProp<
  any,
  "QuranHomeScreen"
>;

export const QuranHomeScreen: React.FC = () => {
  const navigation = useNavigation<QuranHomeScreenNavigationProp>();
  const {
    currentSurah,
    currentTranslation,
    verses,
    isLoading,
    fetchVerses,
    highlights,
    selectedVerse,
    selectVerse,
    clearSelection,
    highlightVerse,
    removeHighlight,
    getVerseKey,
  } = useQuranStore();
  const { setTopicWithVerses, clearMessages, addMessage } = useChatStore();

  // Get current surah info
  const currentSurahInfo =
    surahList.find((s) => s.number === currentSurah) || surahList[0];
  const translationName =
    translations[currentTranslation as keyof typeof translations] ||
    t("sahihInternational");

  // Fetch verses when surah or translation changes
  useEffect(() => {
    if (currentSurah) {
      fetchVerses().catch((error) => {
        Alert.alert(t("error"), t("failedToLoadVersesPleaseTryAgain"));
      });
    }
  }, [currentSurah, currentTranslation]);

  // Clear selection when surah changes
  useEffect(() => {
    clearSelection();
  }, [currentSurah]);

  const handleSurahPress = () => {
    navigation.navigate("SurahSelectionModal");
  };

  const handleTranslationPress = () => {
    navigation.navigate("TranslationSelectionModal");
  };

  const handleVersePress = (verseNumber: number) => {
    if (!currentSurah) return;

    // If same verse is selected, deselect it
    if (selectedVerse && selectedVerse.verseNumber === verseNumber) {
      clearSelection();
    } else {
      // Select the verse (shows action bar)
      selectVerse(currentSurah, verseNumber);
    }
  };

  const handleHighlight = (color: HighlightColor) => {
    if (selectedVerse && currentSurah) {
      const verseKey = getVerseKey(currentSurah, selectedVerse.verseNumber);
      const currentHighlight = highlights[verseKey];

      // If verse is already highlighted with the same color, remove highlight
      if (currentHighlight && currentHighlight.color === color) {
        removeHighlight(currentSurah, selectedVerse.verseNumber);
      } else {
        // Otherwise, highlight with the selected color
        highlightVerse(currentSurah, selectedVerse.verseNumber, color);
      }

      clearSelection();
    }
  };

  const handleAsk = () => {
    if (!selectedVerse || !currentSurah) return;

    try {
      const selectedVerseData = verses.find(
        (v) => v.numberInSurah === selectedVerse.verseNumber,
      );
      if (!selectedVerseData) return;

      // Create a formatted question with the selected verse
      const verseText = `${currentSurahInfo.name} ${currentSurah}:${selectedVerse.verseNumber} - "${selectedVerseData.text}"`;
      const prefill = `${t("canYouHelpMeUnderstandThisVerse")}\n\n${verseText}`;

      // Set topic with verse context
      setTopicWithVerses(
        `${currentSurahInfo.name} - Verse ${selectedVerse.verseNumber}`,
        [selectedVerseData],
      );

      // Clear any prior messages
      clearMessages();

      // Seed the chat with user's first message
      addMessage({ role: "user", content: prefill });

      // Clear selections and navigate to chat
      clearSelection();
      navigation.navigate("TopicChatScreen" as never);
    } catch (error) {
      console.error("Error setting up verse chat:", error);
      Alert.alert(t("error"), t("failedToSetUpChatPleaseTryAgain"));
    }
  };

  const handleShare = async () => {
    if (!selectedVerse || !currentSurah) return;

    try {
      const selectedVerseData = verses.find(
        (v) => v.numberInSurah === selectedVerse.verseNumber,
      );
      if (!selectedVerseData) return;

      const shareText = t("quranChatVerseShare", {
        surahName: currentSurahInfo.name,
        surahNumber: currentSurah,
        verseNumber: selectedVerse.verseNumber,
        verseText: selectedVerseData.text,
      });

      await Share.share({
        message: shareText,
        title: `${currentSurahInfo.name} ${currentSurah}:${selectedVerse.verseNumber}`,
      });

      clearSelection();
    } catch (error) {
      console.error("Error sharing verse:", error);
      Alert.alert(t("error"), t("failedToShareVersePleaseTryAgain"));
    }
  };

  // Get current highlight for selected verse
  const currentHighlight =
    selectedVerse && currentSurah
      ? highlights[getVerseKey(currentSurah, selectedVerse.verseNumber)]
      : null;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <SurahHeader
          surahName={currentSurahInfo.name}
          surahNumber={currentSurahInfo.number}
          verseCount={currentSurahInfo.ayahs}
          currentTranslation={translationName}
          onSurahPress={handleSurahPress}
          onTranslationPress={handleTranslationPress}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Spacer size="md" />
          <Typography variant="body" color={theme.colors.textSecondary}>
            {t("loadingWithSurah", { surahName: currentSurahInfo.name })}
          </Typography>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SurahHeader
        surahName={currentSurahInfo.name}
        surahNumber={currentSurahInfo.number}
        verseCount={currentSurahInfo.ayahs}
        currentTranslation={translationName}
        onSurahPress={handleSurahPress}
        onTranslationPress={handleTranslationPress}
      />

      <VerseList
        verses={verses}
        selectedVerses={
          selectedVerse ? new Set([selectedVerse.verseNumber]) : new Set()
        }
        highlights={highlights}
        surahNumber={currentSurah || 1}
        onVersePress={handleVersePress}
        isSelectable={true}
      />

      {/* Subtle Action Bar */}
      <VerseActionBar
        visible={!!selectedVerse}
        currentHighlightColor={currentHighlight?.color || null}
        onHighlight={handleHighlight}
        onAsk={handleAsk}
        onShare={handleShare}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },
});
