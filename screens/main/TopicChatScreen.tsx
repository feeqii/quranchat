import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ListRenderItem,
  Alert,
  Share,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from '../../localization';
import { theme } from '../../constants/theme';
import { useChatStore } from '../../store/useChatStore';
import { useHistoryStore } from '../../store/useHistoryStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { formatChatSession } from '../../utils/formatChatSession';

import { askQuran } from '../../lib/api/askQuran';
import { Typography } from '../../components/atoms/Typography';
import { IconButton } from '../../components/atoms/IconButton';
import { ChatBubble } from '../../components/molecules/ChatBubble';
import { PromptInput } from '../../components/molecules/PromptInput';
import { Icon } from '../../components/atoms/Icon';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const TopicChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const flatListRef = useRef<FlatList>(null);
  const { logEvent } = useAnalyticsStore();
  
  const {
    currentTopic,
    messages,
    addMessage,
    clearMessages,
    clearTopic,
    setTopic,
    loadMessages,
  } = useChatStore();

  const { saveSession, getSessionById } = useHistoryStore();

  // Check if this is a replay from history
  const { sessionId } = (route.params as any) ?? {};
  const isReplaying = !!sessionId;

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const hasSaved = useRef(false);

  // Redirect back if no topic is set
  useEffect(() => {
    if (!currentTopic) {
      // Navigate back to the Chat tab when no topic is set
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "MainTabNavigator" as never,
            state: {
              routes: [
                { name: "Chat" },
                { name: "Quran" },
                { name: "Today" },
                { name: "Profile" }
              ],
              index: 0, // Chat tab index (0-based: Chat=0, Quran=1, Today=2, Profile=3)
            },
          },
        ],
      });
    }
  }, [currentTopic, navigation]);

  // Scroll to bottom when new messages are added or typing indicator appears
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isTyping]);

  // Load session if opened from history
  useEffect(() => {
    if (sessionId) {
      const session = getSessionById(sessionId);
      if (session) {
        setTopic(session.topic);
        loadMessages(session.messages);
      }
    }
  }, [sessionId, getSessionById, setTopic, loadMessages]);

  // Reset hasSaved when starting a new topic
  useEffect(() => {
    hasSaved.current = false;
  }, [currentTopic]);

  // Auto-trigger AI response when a user message is pre-seeded (from story screens)
  useEffect(() => {
    const hasUserMessage = messages.length === 1 && messages[0].role === 'user';
    const hasNoAssistantResponse = !messages.some(msg => msg.role === 'assistant');
    
    if (hasUserMessage && hasNoAssistantResponse && currentTopic && !isSending && !isReplaying) {
      // Automatically get AI response for pre-seeded user message
      const triggerAutoResponse = async () => {
        setIsSending(true);
        setIsTyping(true);
        
        try {
          const assistantResponse = await askQuran(messages[0].content, currentTopic);
          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: assistantResponse,
          };
          addMessage(assistantMessage);
        } catch (error) {
          console.error('Error getting auto-response:', error);
          const fallbackMessage: ChatMessage = {
            role: 'assistant',
            content: t('iApologizeButImHavingDifficultyRespondingAtThisMoment'),
          };
          addMessage(fallbackMessage);
        } finally {
          setIsSending(false);
          setIsTyping(false);
        }
      };
      
      // Small delay to ensure UI is ready
      setTimeout(triggerAutoResponse, 500);
    }
  }, [messages, currentTopic, isSending, isReplaying, addMessage]);

  const handleSend = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput || isSending || !currentTopic) return;

    // Log chat message sent
    logEvent({ name: 'chat_message_sent', messageLength: trimmedInput.length });

    // Add user message immediately
    const userMessage: ChatMessage = {
      role: 'user',
      content: trimmedInput,
    };
    addMessage(userMessage);
    setInputText('');
    setIsSending(true);

    try {
      setIsTyping(true);
      // Get response from Claude
      const assistantResponse = await askQuran(trimmedInput, currentTopic);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: assistantResponse,
      };
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error getting response:', error);
      // Add a graceful fallback message
      const fallbackMessage: ChatMessage = {
        role: 'assistant',
        content: t('iApologizeButImHavingDifficultyRespondingAtThisMoment'),
      };
      addMessage(fallbackMessage);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const handleBack = () => {
    // Save session only if not replaying and not already saved
    if (!isReplaying && !hasSaved.current && currentTopic && messages.length > 1) {
      saveSession(currentTopic, messages);
      hasSaved.current = true;
    }

    clearMessages();
    clearTopic();
    
    // Navigate directly back to Chat tab
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "MainTabNavigator" as never,
          state: {
            routes: [
              { name: "Chat" },
              { name: "Quran" },
              { name: "Today" },
              { name: "Profile" }
            ],
            index: 0, // Chat tab index (0-based: Chat=0, Quran=1, Today=2, Profile=3)
          },
        },
      ],
    });
  };

  const handleCopyMessage = (content: string) => {
    // Future: Implement clipboard functionality
    Alert.alert(t('copy'), t('thisFeatureWillBeAvailableSoonInshaallah'));
  };

  const handleShareMessage = async (content: string) => {
    try {
      if (isReplaying && sessionId) {
        // In replay mode, share the entire session
        const session = getSessionById(sessionId);
        if (session) {
          const sessionContent = formatChatSession(session.topic, session.messages);
          await Share.share({
            message: sessionContent,
            title: `${t('quranChatSpiritualGuidance')} - ${session.topic}`,
          });
        } else {
          Alert.alert(t('error'), t('unableToFindThisConversation'));
        }
      } else {
        // In regular mode, share just the message
        await Share.share({
          message: `🕌 ${t('quranChatSpiritualGuidance')}\n\n${content}`,
          title: t('quranChatSpiritualGuidance'),
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert(t('error'), t('unableToShareThisContent'));
    }
  };

  const handleLikeMessage = () => {
    // Future: Implement feedback functionality
  };

  const handleDislikeMessage = () => {
    // Future: Implement feedback functionality
  };

  const handleRegenerateMessage = async () => {
    if (messages.length < 2 || isSending) return;
    
    // Get the last user message
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find(msg => msg.role === 'user');
    
    if (!lastUserMessage || !currentTopic) return;

    setIsSending(true);
    setIsTyping(true);
    try {
      const assistantResponse = await askQuran(lastUserMessage.content, currentTopic);
      const newAssistantMessage: ChatMessage = {
        role: 'assistant',
        content: assistantResponse,
      };
      addMessage(newAssistantMessage);
    } catch (error) {
      console.error('Error regenerating response:', error);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const renderMessage: ListRenderItem<ChatMessage> = ({ item }) => {
    return (
      <ChatBubble
        role={item.role}
        content={item.content}
        onLike={item.role === 'assistant' ? handleLikeMessage : undefined}
        onDislike={item.role === 'assistant' ? handleDislikeMessage : undefined}
        onCopy={item.role === 'assistant' ? () => handleCopyMessage(item.content) : undefined}
        onShare={item.role === 'assistant' ? () => handleShareMessage(item.content) : undefined}
        onRegenerate={item.role === 'assistant' ? handleRegenerateMessage : undefined}
      />
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <IconButton
        icon={<Icon.Back size={24} color={theme.colors.textPrimary} />}
        onPress={handleBack}
        style={styles.backButton}
      />
      <View style={styles.headerContent}>
        <Typography variant="h2" color={theme.colors.textPrimary}>
          {currentTopic || t('chat')}
        </Typography>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Typography
        variant="body"
        color={theme.colors.textMuted}
        style={styles.emptyStateText}
      >
        {t('peaceBeUponYouHowMayIAssistYouInYourSpiritualJourneyToday')}
      </Typography>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {renderHeader()}
        
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => `message-${index}`}
          contentContainerStyle={[
            styles.messagesList,
            messages.length === 0 && styles.messagesListEmpty
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          onContentSizeChange={() => {
            if (messages.length > 0) {
              flatListRef.current?.scrollToEnd({ animated: true });
            }
          }}
        />

        {isTyping && (
          <ChatBubble
            role="assistant"
            content="..."
            isTyping={true}
          />
        )}

        <PromptInput
          value={inputText}
          onChangeText={setInputText}
          onSend={handleSend}
          isSending={isSending || isTyping}
          style={styles.promptInput}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  backButton: {
    marginEnd: theme.spacing.sm,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginEnd: theme.spacing.lg, // Offset for the back button
  },
  messagesList: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  messagesListEmpty: {
    justifyContent: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  promptInput: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.primarySoft,
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.lg,
  },
}); 