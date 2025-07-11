import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Icon } from './Icon';
import { theme } from '../../constants/theme';

interface SurahListItemProps {
  number: number;
  name: string;
  arabicName: string;
  verseCount: number;
  revelationType: 'Meccan' | 'Medinan';
  isSelected: boolean;
  onPress: () => void;
}

export const SurahListItem: React.FC<SurahListItemProps> = ({
  number,
  name,
  arabicName,
  verseCount,
  revelationType,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.numberContainer, isSelected && styles.numberContainerSelected]}>
        <Typography
          variant="small"
          color={isSelected ? theme.colors.surface : theme.colors.textMuted}
        >
          {number}
        </Typography>
      </View>
      
      <View style={styles.content}>
        <Typography
          variant="body"
          color={isSelected ? theme.colors.surface : theme.colors.textPrimary}
          style={styles.name}
        >
          {name}
        </Typography>
        <Typography
          variant="small"
          color={isSelected ? theme.colors.surface : theme.colors.textSecondary}
        >
          {arabicName} • {verseCount} verses • {revelationType}
        </Typography>
      </View>
      
      {isSelected && (
        <Icon.Check size={20} color={theme.colors.surface} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  containerSelected: {
    backgroundColor: theme.colors.primary,
  },
  numberContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.radii.full,
    backgroundColor: theme.colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  numberContainerSelected: {
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
}); 