import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Typography } from "../atoms/Typography";
import { theme } from "../../constants/theme";
import { alignItems } from "../../utils/rtl";

interface ReflectionInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}

export const ReflectionInput: React.FC<ReflectionInputProps> = ({
  value,
  onChangeText,
  placeholder = "Type your thoughts here...",
  maxLength = 500,
  disabled = false,
}) => {
  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8; // Warning when 80% full

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <LinearGradient
          colors={["#E6F4F1", "#F5F1E8", "#FFFFFF"]} // Same gradient as Verse of the Day
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.textInput, disabled && styles.textInputDisabled]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={8}
              maxLength={maxLength}
              editable={!disabled}
              textAlignVertical="top"
              returnKeyType="default"
              blurOnSubmit={false}
            />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.footer}>
        <Typography
          variant="small"
          color={isNearLimit ? theme.colors.warning : theme.colors.textMuted}
          style={styles.characterCount}
        >
          {characterCount}/{maxLength}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    borderRadius: 20,
    padding: 2, // Space for gradient border
    ...theme.shadows.md,
  },
  gradientBorder: {
    borderRadius: 20,
  },
  inputContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 18, // Slightly smaller than wrapper
    margin: 1, // Creates the gradient border effect
  },
  textInput: {
    padding: 24,
    fontSize: 16,
    fontFamily: theme.fonts.body,
    color: "#2C3E50",
    lineHeight: 24,
    minHeight: 140,
    maxHeight: 220,
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  textInputDisabled: {
    backgroundColor: "#F9FAFB",
    color: theme.colors.textMuted,
    opacity: 0.6,
  },
  footer: {
    alignItems: alignItems(false),
    paddingTop: 12,
    paddingHorizontal: 4,
  },
  characterCount: {
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.7,
  },
});
