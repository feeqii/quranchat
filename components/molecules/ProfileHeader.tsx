import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../constants/theme";
import { Typography } from "../atoms/Typography";
import { Icon } from "../atoms/Icon";
import { useProfileStore } from "../../store/useProfileStore";
import { position, flexDirection } from "../../utils/rtl";

export const ProfileHeader: React.FC = () => {
  const { username, setUsername, currentStreak, longestStreak } =
    useProfileStore();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username || "");

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameSave = () => {
    if (usernameInput.trim()) {
      setUsername(usernameInput.trim());
      setIsEditingUsername(false);
    } else {
      Alert.alert("Invalid Name", "Please enter a valid username");
    }
  };

  const handleProfileImagePress = () => {
    // TODO: Implement image picker
    Alert.alert(
      "Coming Soon",
      "Profile image selection will be available soon",
    );
  };

  const getInitials = () => {
    if (username) {
      return username
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "U";
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={handleProfileImagePress}
      >
        <LinearGradient
          colors={[theme.colors.primary, "#2D8470"]}
          style={styles.profileImage}
        >
          <Typography variant="h2" color={theme.colors.surface}>
            {getInitials()}
          </Typography>
        </LinearGradient>
        <View style={styles.editIcon}>
          <Icon.Edit size={16} color={theme.colors.surface} />
        </View>
      </TouchableOpacity>
      {/* Username Section */}
      <View style={styles.usernameSection}>
        {isEditingUsername ? (
          <View style={styles.editingContainer}>
            <TextInput
              style={styles.usernameInput}
              value={usernameInput}
              onChangeText={setUsernameInput}
              onSubmitEditing={handleUsernameSave}
              onBlur={handleUsernameSave}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.textMuted}
              autoFocus
              maxLength={20}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.usernameContainer, { flexDirection: flexDirection() }]}
            onPress={handleUsernameEdit}
          >
            <Typography
              variant="h3"
              color={theme.colors.textPrimary}
              style={styles.username}
            >
              {username || "Tap to add name"}
            </Typography>
            <Icon.Edit
              size={18}
              color={theme.colors.textMuted}
              style={styles.usernameEditIcon}
            />
          </TouchableOpacity>
        )}

        <Typography
          variant="body"
          color={theme.colors.textMuted}
          style={styles.userTag}
        >
          @{username?.toLowerCase().replace(/\s+/g, "") || "user"}
        </Typography>
      </View>
      {/* Streak Cards */}
      <View style={[styles.streakContainer, { flexDirection: flexDirection() }]}>
        <View style={styles.streakCard}>
          <LinearGradient
            colors={["#F8FAFC", "#F1F5F9", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.streakCardGradient}
          >
            <Typography
              variant="h2"
              color={theme.colors.primary}
              style={styles.streakNumber}
            >
              {currentStreak}
            </Typography>
            <Typography variant="caption" color={theme.colors.textMuted}>
              Current Streak
            </Typography>
          </LinearGradient>
        </View>

        <View style={styles.streakCard}>
          <LinearGradient
            colors={["#F8FAFC", "#F1F5F9", "#FFFFFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.streakCardGradient}
          >
            <Typography
              variant="h2"
              color={theme.colors.primary}
              style={styles.streakNumber}
            >
              {longestStreak}
            </Typography>
            <Typography variant="caption" color={theme.colors.textMuted}>
              Longest Streak
            </Typography>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: theme.spacing.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    ...theme.shadows.md,
  },
  editIcon: {
    position: "absolute",
    bottom: -2,
    ...position(undefined, -2),
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  usernameSection: {
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  username: {
    marginEnd: theme.spacing.sm,
    fontWeight: "600",
  },
  usernameEditIcon: {
    opacity: 0.6,
  },
  editingContainer: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
  },
  usernameInput: {
    fontSize: theme.fontSizes.h3,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    textAlign: "center",
    paddingVertical: theme.spacing.sm,
    minWidth: 150,
  },
  userTag: {
    marginTop: theme.spacing.xs,
    opacity: 0.7,
  },
  streakContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  streakCard: {
    borderRadius: theme.radii.md,
    overflow: "hidden",
    ...theme.shadows.sm,
  },
  streakCardGradient: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: "center",
    minWidth: 100,
  },
  streakNumber: {
    fontWeight: "700",
    marginBottom: theme.spacing.xs,
  },
});
