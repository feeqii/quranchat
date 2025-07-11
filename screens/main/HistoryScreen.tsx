import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { useHistoryStore } from '../../store/useHistoryStore';
import { useChatStore } from '../../store/useChatStore';
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { HistoryCard } from '../../components/molecules/HistoryCard';

interface ChatSession {
  id: string;
  topic: string;
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  createdAt: string;
  isFavorite: boolean;
}

type FilterType = "all" | "favorites";

export const HistoryScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    sessions,
    toggleFavorite,
  } = useHistoryStore();
  const { setTopic, loadMessages } = useChatStore();

  const [filter, setFilter] = useState<FilterType>("all");

  // Filter sessions based on selected tab
  const filteredSessions = sessions.filter(session =>
    filter === "all" ? true : session.isFavorite
  );

  const handleSessionPress = (session: ChatSession) => {
    // Set the topic and load the historical messages
    setTopic(session.topic);
    loadMessages(session.messages);

    (navigation as any).navigate("TopicChatScreen", { sessionId: session.id });
  };

  const handleToggleFavorite = (sessionId: string) => {
    toggleFavorite(sessionId);
  };

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

  const getPreviewText = (messages: ChatSession['messages']) => {
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

  const renderTabButton = (tabFilter: FilterType, label: string) => {
    const isActive = filter === tabFilter;
    
    return (
      <TouchableOpacity
        style={[styles.tabButton, isActive && styles.tabButtonActive]}
        onPress={() => setFilter(tabFilter)}
        activeOpacity={0.7}
      >
        <Typography
          variant="body"
          color={isActive ? theme.colors.primary : theme.colors.textMuted}
          style={[styles.tabText, isActive && styles.tabTextActive]}
        >
          {label}
        </Typography>
      </TouchableOpacity>
    );
  };

  const renderHistoryCard: ListRenderItem<ChatSession> = ({ item: session }) => {
    return (
      <HistoryCard
        session={session}
        onPress={() => handleSessionPress(session)}
        onToggleFavorite={() => handleToggleFavorite(session.id)}
      />
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Spacer size="xl" />
      <Typography
        variant="body"
        color={theme.colors.textMuted}
        align="center"
        style={styles.emptyStateText}
      >
        No {filter === "favorites" ? "favorites" : "conversations"} yet.
      </Typography>
      <Spacer size="sm" />
      <Typography
        variant="small"
        color={theme.colors.textMuted}
        align="center"
        style={styles.emptyStateSubtext}
      >
        {filter === "favorites" 
          ? "Star conversations to see them here."
          : "Start a conversation to build your spiritual archive."
        }
      </Typography>
      <Spacer size="xl" />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Typography
        variant="sectionTitle"
        color={theme.colors.textPrimary}
        style={styles.headerTitle}
      >
        Chat History
      </Typography>
      
      <Spacer size="md" />

      {/* Tab Toggle */}
      <View style={styles.tabContainer}>
        {renderTabButton("all", "All")}
        {renderTabButton("favorites", "Favorites")}
      </View>

      <Spacer size="lg" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredSessions}
        renderItem={renderHistoryCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          filteredSessions.length === 0 && styles.listContentEmpty
        ]}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Spacer size="md" />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
  },
  listContentEmpty: {
    justifyContent: 'center',
  },
  headerContainer: {
    paddingTop: theme.spacing.md,
  },
  headerTitle: {
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.xs,
  },
  tabButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radii.md,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: theme.fontSizes.body,
  },
  tabTextActive: {
    fontWeight: '600',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  emptyStateText: {
    fontSize: theme.fontSizes.h3,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    textAlign: 'center',
    opacity: 0.8,
  },
}); 