import React from "react";
import { View, StyleSheet } from "react-native";
import { Typography } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { theme } from "../../constants/theme";
import { alignItems } from "../../utils/rtl";

interface VersePreviewProps {
  text: string;
  reference: string;
  maxLength?: number;
}

export const VersePreview: React.FC<VersePreviewProps> = ({
  text,
  reference,
  maxLength = 50,
}) => {
  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon.Quran size={16} color="#4A6560" />
      </View>
      <View style={styles.textContainer}>
        <Typography variant="caption" style={styles.verseText}>
          "{truncatedText}"
        </Typography>
        <Typography variant="caption" style={styles.referenceText}>
          — {reference}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: alignItems(true),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  iconContainer: {
    marginEnd: theme.spacing.sm,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  verseText: {
    fontSize: 14,
    lineHeight: 18,
    fontStyle: "italic",
    color: "#4A6560",
  },
  referenceText: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
});
