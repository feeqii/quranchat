import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { theme } from '../../constants/theme';

interface ReflectionHistoryEntry {
  date: string;
  moodLevel: number;
  moodDescription: string;
  selectedContexts: string[];
  userInput: string | null;
  userReflection: string;
  generatedReflection: string | null;
  selectedVerse: { text: string; reference: string } | null;
  completedAt: string;
}

interface PastReflectionPreviewCardProps {
  reflection: ReflectionHistoryEntry;
  dateFormatted: string;
  onPress: () => void;
  onClose: () => void;
}

export const PastReflectionPreviewCard: React.FC<PastReflectionPreviewCardProps> = ({
  reflection,
  dateFormatted,
  onPress,
  onClose,
}) => {
  // Get mood emoji based on level
  const getMoodEmoji = (moodLevel: number) => {
    if (moodLevel >= 9) return '😊';
    if (moodLevel >= 7) return '🙂';
    if (moodLevel >= 5) return '😐';
    if (moodLevel >= 3) return '😔';
    return '😢';
  };

  // Get a snippet of the user's reflection
  const getReflectionSnippet = () => {
    if (reflection.userInput) {
      const words = reflection.userInput.split(' ').slice(0, 15);
      return words.length < reflection.userInput.split(' ').length 
        ? words.join(' ') + '...'
        : words.join(' ');
    }
    return 'No personal reflection recorded';
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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Typography variant="h3" style={styles.dateTitle}>
              {dateFormatted} Reflection
            </Typography>
            <Typography variant="caption" style={styles.completionTime}>
              Completed at {formatCompletionTime(reflection.completedAt)}
            </Typography>
          </View>
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon.Close size={20} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Mood Section */}
        <View style={styles.moodSection}>
          <View style={styles.moodDisplay}>
            <Typography style={styles.moodEmoji}>
              {getMoodEmoji(reflection.moodLevel)}
            </Typography>
            <View style={styles.moodText}>
              <Typography variant="body" style={styles.moodDescription}>
                {reflection.moodDescription}
              </Typography>
              <Typography variant="caption" style={styles.moodLevel}>
                {reflection.moodLevel}/10
              </Typography>
            </View>
          </View>
        </View>

        {/* Contexts */}
        {reflection.selectedContexts.length > 0 && (
          <View style={styles.contextsSection}>
            <Typography variant="caption" style={styles.contextLabel}>
              LIFE AREAS
            </Typography>
            <View style={styles.contextsContainer}>
              {reflection.selectedContexts.slice(0, 3).map((context, index) => (
                <View key={index} style={styles.contextChip}>
                  <Typography variant="caption" style={styles.contextText}>
                    {context}
                  </Typography>
                </View>
              ))}
              {reflection.selectedContexts.length > 3 && (
                <View style={styles.contextChip}>
                  <Typography variant="caption" style={styles.contextText}>
                    +{reflection.selectedContexts.length - 3}
                  </Typography>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Reflection Snippet */}
        <View style={styles.reflectionSection}>
          <Typography variant="caption" style={styles.reflectionLabel}>
            YOUR THOUGHTS
          </Typography>
          <Typography variant="body" style={styles.reflectionSnippet}>
            {getReflectionSnippet()}
          </Typography>
        </View>

        {/* Content Indicators */}
        <View style={styles.contentIndicators}>
          {reflection.generatedReflection && (
            <View style={styles.indicator}>
              <Icon.Sparkles size={14} color={theme.colors.primary} />
              <Typography variant="caption" style={styles.indicatorText}>
                AI Guidance
              </Typography>
            </View>
          )}
          {reflection.selectedVerse && (
            <View style={styles.indicator}>
              <Icon.BookOpen size={14} color={theme.colors.primary} />
              <Typography variant="caption" style={styles.indicatorText}>
                Quranic Verse
              </Typography>
            </View>
          )}
        </View>

        {/* Action Button */}
        <TouchableOpacity onPress={onPress} style={styles.viewButton}>
          <LinearGradient
            colors={['#ECFDF5', '#FFFFFF']}
            style={styles.viewButtonGradient}
          >
            <Typography variant="body" style={styles.viewButtonText}>
              View Full Reflection
            </Typography>
            <Icon.ChevronRight size={18} color={theme.colors.primary} />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radii.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  dateContainer: {
    flex: 1,
  },
  dateTitle: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  completionTime: {
    color: theme.colors.textMuted,
    fontStyle: 'italic',
  },
  closeButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  moodSection: {
    marginBottom: theme.spacing.md,
  },
  moodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  moodText: {
    flex: 1,
  },
  moodDescription: {
    fontWeight: '600',
    color: theme.colors.textPrimary,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.xs,
  },
  moodLevel: {
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  contextsSection: {
    marginBottom: theme.spacing.md,
  },
  contextLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.sm,
  },
  contextsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  contextChip: {
    backgroundColor: 'rgba(79, 172, 156, 0.1)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.md,
  },
  contextText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 11,
  },
  reflectionSection: {
    marginBottom: theme.spacing.lg,
  },
  reflectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.sm,
  },
  reflectionSnippet: {
    color: theme.colors.textPrimary,
    lineHeight: 20,
    fontStyle: reflection => reflection.userInput ? 'normal' : 'italic',
  },
  contentIndicators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorText: {
    color: theme.colors.primary,
    fontWeight: '500',
    marginLeft: theme.spacing.xs,
  },
  viewButton: {
    borderRadius: theme.radii.lg,
    overflow: 'hidden',
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  viewButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
    marginRight: theme.spacing.xs,
  },
}); 