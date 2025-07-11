import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';

interface AnswerCardProps {
  question: string;
  answer: string;
  onShare?: () => void;
  style?: ViewStyle;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  question,
  answer,
  onShare,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* User question bubble - aligned right */}
      <View style={styles.questionContainer}>
        <View style={styles.questionBubble}>
          <Text style={styles.question}>{question}</Text>
        </View>
      </View>
      
      {/* AI answer bubble - aligned left */}
      <View style={styles.answerContainer}>
        <View style={styles.answerBubble}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
        {onShare && (
          <TouchableOpacity
            style={styles.shareButton}
            onPress={onShare}
            activeOpacity={0.8}
          >
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    width: '100%',
  },
  // Question bubble (user) - right aligned
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  questionBubble: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderBottomRightRadius: theme.radii.sm,
    maxWidth: '80%',
    ...theme.shadows.sm,
  },
  question: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.surface,
    lineHeight: theme.lineHeights.body,
  },
  // Answer bubble (AI) - left aligned
  answerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  answerBubble: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderBottomLeftRadius: theme.radii.sm,
    maxWidth: '85%',
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    ...theme.shadows.sm,
  },
  answer: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    lineHeight: theme.lineHeights.body,
  },
  shareButton: {
    marginTop: theme.spacing.md,
    marginLeft: theme.spacing.lg,
  },
  shareText: {
    fontSize: theme.fontSizes.small,
    fontFamily: theme.fonts.body,
    color: theme.colors.primary,
    lineHeight: theme.lineHeights.small,
  },
}); 