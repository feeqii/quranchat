import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  onLike?: () => void;
  onDislike?: () => void;
  onCopy?: () => void;
  onShare?: () => void;
  onRegenerate?: () => void;
  isTyping?: boolean;
  style?: ViewStyle;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  onLike,
  onDislike,
  onCopy,
  onShare,
  onRegenerate,
  isTyping,
  style,
}) => {
  const isUser = role === "user";
  const isAssistant = role === "assistant";
  const [dots, setDots] = useState('...');

  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? '.' : prev + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  return (
    <View style={[styles.container, style]}>
      {/* Chat Bubble */}
      <View style={[
        styles.bubbleContainer,
        isUser ? styles.userContainer : styles.assistantContainer
      ]}>
        <View style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.assistantBubble,
          isTyping && styles.typingBubble
        ]}>
          <Typography
            variant="body"
            color={isUser ? theme.colors.surface : theme.colors.textPrimary}
            style={[styles.messageText, isTyping && styles.typingText]}
          >
            {isTyping ? dots : content}
          </Typography>
        </View>
      </View>

      {/* Action Buttons (only for assistant messages and not while typing) */}
      {isAssistant && !isTyping && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={onLike} style={styles.actionButton}>
            <Icon.Like size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDislike} style={styles.actionButton}>
            <Icon.Dislike size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onCopy} style={styles.actionButton}>
            <Icon.Copy size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onShare} style={styles.actionButton}>
            <Icon.Share size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onRegenerate} style={styles.actionButton}>
            <Icon.Refresh size={18} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  bubbleContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  bubble: {
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    flex: 1,
  },
  userBubble: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.sm,
  },
  assistantBubble: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    ...theme.shadows.sm,
  },
  messageText: {
    lineHeight: theme.lineHeights.body,
    textAlign: 'left',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginLeft: theme.spacing.md,
    gap: theme.spacing.md,
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    backgroundColor: 'transparent',
  },
  typingBubble: {
    minWidth: 60,
    maxWidth: 80,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  typingText: {
    fontSize: theme.fontSizes.title,
    lineHeight: theme.lineHeights.title,
    textAlign: 'center',
    opacity: 0.7,
  },
}); 