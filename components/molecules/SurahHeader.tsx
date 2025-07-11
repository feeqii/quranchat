import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { Spacer } from '../atoms/Spacer';
import { theme } from '../../constants/theme';

interface SurahHeaderProps {
  surahName: string;
  surahNumber: number;
  verseCount: number;
  currentTranslation: string;
  onSurahPress: () => void;
  onTranslationPress: () => void;
}

export const SurahHeader: React.FC<SurahHeaderProps> = ({
  surahName,
  surahNumber,
  verseCount,
  currentTranslation,
  onSurahPress,
  onTranslationPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSurahPress} style={styles.surahSelector}>
        <View style={styles.surahInfo}>
          <Typography variant="h2" color={theme.colors.textPrimary}>
            {surahName}
          </Typography>
          <Typography variant="body" color={theme.colors.textSecondary}>
            {surahNumber} • {verseCount} verses
          </Typography>
        </View>
        <Icon.ChevronRight size={24} color={theme.colors.textMuted} />
      </TouchableOpacity>
      
      <Spacer size="sm" />
      
      <TouchableOpacity onPress={onTranslationPress} style={styles.translationSelector}>
        <Typography variant="small" color={theme.colors.textSecondary}>
          {currentTranslation}
        </Typography>
        <Icon.ChevronRight size={16} color={theme.colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  surahSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
  },
  surahInfo: {
    flex: 1,
  },
  translationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.xs,
  },
}); 