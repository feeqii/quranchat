import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { Icon } from "../atoms/Icon";
import { LocalizationContext } from "../../localization/LocalizationContext";

const LanguageSelector: React.FC = () => {
  const {
    locale: currentLanguage,
    changeLocale,
    t,
  } = useContext(LocalizationContext);

  const handleLanguagePress = (language: "en" | "ar") => {
    changeLocale(language);
  };

  return (
    <View style={styles.container}>
      {/* Header row with settings icon and label */}
      <View style={styles.header}>
        <Icon.Settings size={20} color={theme.colors.textPrimary} />
        <Text style={styles.headerText}>{t("selectLanguage")}</Text>
      </View>

      {/* Language selection buttons */}
      <View style={styles.buttonsContainer}>
        {/* English Button */}
        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === "en"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => handleLanguagePress("en")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              currentLanguage === "en"
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {t("language.en")}
          </Text>
        </TouchableOpacity>

        {/* Arabic Button */}
        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === "ar"
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => handleLanguagePress("ar")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.buttonText,
              currentLanguage === "ar"
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            {t("language.ar")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  headerText: {
    fontSize: theme.fontSizes.body,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginStart: theme.spacing.sm,
  },
  buttonsContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.md,
    padding: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  languageButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radii.sm,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: theme.fontSizes.body,
    fontWeight: "600",
    textAlign: "center",
  },
  activeText: {
    color: theme.colors.surface, // white text on primary background
  },
  inactiveText: {
    color: theme.colors.textSecondary,
  },
});

export default LanguageSelector;
