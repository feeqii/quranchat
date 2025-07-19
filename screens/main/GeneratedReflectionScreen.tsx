import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { t } from '../../localization';
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { SecondaryButton } from '../../components/atoms/SecondaryButton';
import { Icon } from '../../components/atoms/Icon';
import { theme } from '../../constants/theme';
import { useTodayStore } from '../../store/useTodayStore';
import { TodayStackParamList } from '../../navigation/TodayStackNavigator';
import { useChatStore } from '../../store/useChatStore';

type GeneratedReflectionScreenNavigationProp = NativeStackNavigationProp<TodayStackParamList, 'GeneratedReflectionScreen'>;

export const GeneratedReflectionScreen: React.FC = () => {
  const navigation = useNavigation<GeneratedReflectionScreenNavigationProp>();
  const { 
    generatedReflection,
    selectedVerse,
    moodLevel,
    moodDescription,
    selectedContexts,
    userReflection,
    completeJourney
  } = useTodayStore();
  
  const { setTopicWithVerses, clearMessages, addMessage } = useChatStore();
  
  const [actionScale] = useState(new Animated.Value(1));
  const [completeScale] = useState(new Animated.Value(1));

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAskMore = () => {
    if (!generatedReflection) return;

    try {
      // Create a topic for chat about this reflection
      const contextText = `Generated Reflection: "${generatedReflection}"
      
${selectedVerse ? `Verse: "${selectedVerse.text}" - ${selectedVerse.reference}` : ''}

Mood: ${moodDescription} (${moodLevel}/5)
Context: ${selectedContexts.join(', ')}
User's thoughts: "${userReflection}"`;

      setTopicWithVerses('Reflection Discussion', []);
      clearMessages();
      addMessage({ 
        role: 'user', 
        content: t('idLikeToDiscussThisReflectionFurther', { reflection: generatedReflection })
      });

      navigation.navigate('TopicChatScreen' as never);
    } catch (error) {
      console.error('Error navigating to chat:', error);
      Alert.alert(t('error'), t('unableToStartChatDiscussion'));
    }
  };

  const handleCompleteJourney = () => {
    // Gentle tap animation
    Animated.sequence([
      Animated.timing(completeScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(completeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    completeJourney();
    navigation.navigate('TodayHomeScreen');
  };

  const handleListen = () => {
    // Gentle tap animation
    Animated.sequence([
      Animated.timing(actionScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(actionScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Alert.alert(t('audioFeature'), t('audioPlaybackFeatureComingSoon'));
  };

  const handleShare = () => {
    Alert.alert(t('share'), t('sharingFeatureComingSoon'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Icon.Back size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        
        <Typography
          variant="h2"
          color={theme.colors.textPrimary}
          style={styles.headerTitle}
        >
          {t('yourReflection')}
        </Typography>
        
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Spacer size="lg" />

        {/* Main Reflection Card */}
        {generatedReflection && (
          <View style={styles.reflectionContainer}>
            <LinearGradient
              colors={['#E6F4F1', '#F5F1E8', '#FFFFFF']} // Same gradient as Verse of the Day
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.reflectionCard}
            >
              <Typography
                variant="body"
                color="#2C3E50"
                style={styles.reflectionText}
              >
                {generatedReflection}
              </Typography>
            </LinearGradient>
          </View>
        )}

        <Spacer size="xl" />

        {/* Verse Section */}
        {selectedVerse && (
          <View style={styles.verseContainer}>
            <LinearGradient
              colors={['#F0F9FF', '#EFF6FF', '#FFFFFF']} // Soft blue gradient for verse
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.verseCard}
            >
              <Typography
                variant="small"
                color={theme.colors.textMuted}
                style={styles.verseLabel}
              >
                {t('reflectingOn')}
              </Typography>
              
              <Typography
                variant="body"
                color="#2C3E50"
                style={styles.verseText}
              >
                "{selectedVerse.text}"
              </Typography>
              
              <Typography
                variant="small"
                color={theme.colors.textMuted}
                style={styles.verseReference}
              >
                {selectedVerse.reference}
              </Typography>
            </LinearGradient>
          </View>
        )}

        <Spacer size="xl" />

        {/* Context Section */}
        <View style={styles.contextContainer}>
          <LinearGradient
            colors={['#FEF7FF', '#F8FAFF', '#FFFFFF']} // Soft purple gradient for context
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.contextCard}
          >
            <Typography
              variant="small"
              color={theme.colors.textMuted}
              style={styles.contextLabel}
            >
              {t('yourJourneyToday')}
            </Typography>
            
            <Typography
              variant="small"
              color="#6B7280"
              style={styles.contextText}
            >
              {t('mood')} {moodDescription} {t('focusingOn')} {selectedContexts.join(', ')}
            </Typography>
          </LinearGradient>
        </View>

        <Spacer size="xl" />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.actionsRow}>
          <Animated.View style={[{ transform: [{ scale: actionScale }] }]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleListen}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFF7ED', '#FFFFFF']}
                style={styles.actionButtonBackground}
              >
                <Icon.Volume size={20} color="#F59E0B" />
              </LinearGradient>
              <Typography
                variant="small"
                color={theme.colors.textMuted}
                style={styles.actionButtonText}
              >
                {t('listen')}
              </Typography>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAskMore}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#ECFDF5', '#FFFFFF']}
              style={styles.actionButtonBackground}
            >
              <Icon.MessageCircle size={20} color="#10B981" />
            </LinearGradient>
            <Typography
              variant="small"
              color={theme.colors.textMuted}
              style={styles.actionButtonText}
            >
              {t('ask')}
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#EFF6FF', '#FFFFFF']}
              style={styles.actionButtonBackground}
            >
              <Icon.Share size={20} color="#3B82F6" />
            </LinearGradient>
            <Typography
              variant="small"
              color={theme.colors.textMuted}
              style={styles.actionButtonText}
            >
              {t('share')}
            </Typography>
          </TouchableOpacity>
        </View>

        <Spacer size="md" />

        <Animated.View style={[{ transform: [{ scale: completeScale }] }]}>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteJourney}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#E6F4F1', '#F5F1E8']}
              style={styles.completeButtonBackground}
            >
              <Typography
                variant="body"
                color="#059669"
                style={styles.completeButtonText}
              >
                {t('completeJourney')}
              </Typography>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.1)',
  },
  backButton: {
    padding: theme.spacing.xs,
    marginEnd: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  reflectionContainer: {
    alignItems: 'center',
  },
  reflectionCard: {
    width: '100%',
    borderRadius: 20,
    padding: 32,
    minHeight: 180,
    justifyContent: 'center',
    ...theme.shadows.lg,
  },
  reflectionText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: 0.2,
    fontWeight: '400',
  },
  verseContainer: {
    alignItems: 'center',
  },
  verseCard: {
    width: '100%',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  verseLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    opacity: 0.7,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  verseReference: {
    fontSize: 13,
    fontWeight: '600',
  },
  contextContainer: {
    alignItems: 'center',
  },
  contextCard: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  contextLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    opacity: 0.7,
  },
  contextText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomActions: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    padding: theme.spacing.sm,
  },
  actionButtonBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xs,
    ...theme.shadows.sm,
  },
  actionButtonText: {
    fontWeight: '600',
    fontSize: 12,
  },
  completeButton: {
    width: '100%',
  },
  completeButtonBackground: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    ...theme.shadows.md,
    borderWidth: 1,
    borderColor: 'rgba(5, 150, 105, 0.2)',
  },
  completeButtonText: {
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
}); 