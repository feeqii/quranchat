import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle, Share, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { Spacer } from '../atoms/Spacer';
import { formatChatSession } from '../../utils/formatChatSession';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  topic: string;
  messages: ChatMessage[];
  createdAt: string;
  isFavorite: boolean;
}

interface HistoryCardProps {
  session: ChatSession;
  onPress: () => void;
  onToggleFavorite: () => void;
  style?: ViewStyle;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  session,
  onPress,
  onToggleFavorite,
  style,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getPreviewText = (messages: ChatMessage[]) => {
    const lastAssistantMessage = messages
      .slice()
      .reverse()
      .find(msg => msg.role === 'assistant');
    
    if (lastAssistantMessage) {
      return lastAssistantMessage.content.length > 80
        ? lastAssistantMessage.content.substring(0, 80) + '...'
        : lastAssistantMessage.content;
    }
    
    return 'No assistant response';
  };

  const handleShare = async () => {
    try {
      const content = formatChatSession(session.topic, session.messages);
      await Share.share({
        message: content,
        title: `Quran Chat - ${session.topic}`,
      });
    } catch (error) {
      console.error('Error sharing session:', error);
      Alert.alert('Error', 'Unable to share this conversation.');
    }
  };

  const handleCopy = async () => {
    try {
      const content = formatChatSession(session.topic, session.messages);
      await Clipboard.setStringAsync(content);
      Alert.alert('Copied', 'Conversation copied to clipboard.');
    } catch (error) {
      console.error('Error copying session:', error);
      Alert.alert('Error', 'Unable to copy this conversation.');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Typography
          variant="h3"
          color={theme.colors.textPrimary}
          style={styles.topic}
          numberOfLines={1}
        >
          {session.topic}
        </Typography>
        <View style={styles.actions}>
          <Typography
            variant="small"
            color={theme.colors.textMuted}
            style={styles.date}
          >
            {formatDate(session.createdAt)}
          </Typography>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleCopy}
              style={styles.actionButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon.Copy size={18} color={theme.colors.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.actionButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Icon.Share size={18} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onToggleFavorite}
              style={styles.actionButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {session.isFavorite ? (
                <Icon.Star size={18} color={theme.colors.accent} />
              ) : (
                <Icon.StarOff size={18} color={theme.colors.textMuted} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Spacer size="xs" />

      <Typography
        variant="small"
        color={theme.colors.textSecondary}
        style={styles.preview}
        numberOfLines={2}
      >
        {getPreviewText(session.messages)}
      </Typography>

      <Spacer size="xs" />

      <Typography
        variant="small"
        color={theme.colors.textMuted}
        style={styles.stats}
      >
        {session.messages.length} message{session.messages.length !== 1 ? 's' : ''}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    ...theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  topic: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  actions: {
    alignItems: 'flex-end',
  },
  date: {
    marginBottom: theme.spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: theme.spacing.sm,
  },
  preview: {
    lineHeight: 18,
  },
  stats: {
    fontWeight: '500',
  },
}); 