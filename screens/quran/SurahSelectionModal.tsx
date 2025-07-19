import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Typography } from "../../components/atoms/Typography";
import { Icon } from "../../components/atoms/Icon";
import { SurahList } from "../../components/organisms/SurahList";
import { theme } from "../../constants/theme";
import { useQuranStore } from "../../store/useQuranStore";
import { Surah } from "../../constants/surahList";
import { t } from "../../localization";

type SurahSelectionModalNavigationProp = NativeStackNavigationProp<
  any,
  "SurahSelectionModal"
>;

export const SurahSelectionModal: React.FC = () => {
  const navigation = useNavigation<SurahSelectionModalNavigationProp>();
  const { currentSurah, setSurah } = useQuranStore();

  const handleSurahSelect = (surah: Surah) => {
    // Step 1: Explicitly close modal first
    navigation.goBack();

    // Step 2: Update state after modal closes
    setTimeout(() => {
      setSurah(surah.number);
    }, 100);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const renderDragHandle = () => (
    <View style={styles.dragHandle}>
      <View style={styles.dragIndicator} />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Icon.Close size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <Typography variant="h2" color={theme.colors.textPrimary}>
        {t("selectSurah")}
      </Typography>

      <View style={styles.headerSpacer} />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={handleClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        {renderDragHandle()}
        {renderHeader()}
        <SurahList
          selectedSurahNumber={currentSurah}
          onSurahSelect={handleSurahSelect}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    width: 40,
  },
  dragHandle: {
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.textMuted,
    borderRadius: 2,
  },
});
