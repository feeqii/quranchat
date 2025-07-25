import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { t } from '../../localization';
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { ContextSelectionGrid } from '../../components/organisms/ContextSelectionGrid';
import { theme } from '../../constants/theme';
import { useTodayStore } from '../../store/useTodayStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { TodayStackParamList } from '../../navigation/TodayStackNavigator';

type ContextSelectionScreenNavigationProp = NativeStackNavigationProp<TodayStackParamList, 'ContextSelectionScreen'>;

export const ContextSelectionScreen: React.FC = () => {
  const navigation = useNavigation<ContextSelectionScreenNavigationProp>();
  const { selectedContexts, addContext, removeContext } = useTodayStore();
  const { logEvent } = useAnalyticsStore();
  
  const handleContextToggle = (contextId: string) => {
    if (selectedContexts.includes(contextId)) {
      removeContext(contextId);
    } else {
      addContext(contextId);
      // Log context selection
      logEvent({ name: 'context_selected', context: contextId });
    }
  };
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleNext = () => {
    // Navigate to reflection input screen
    navigation.navigate('ReflectionInputScreen');
  };
  
  const canProceed = selectedContexts.length > 0;
  
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
          variant="title"
          color={theme.colors.textPrimary}
          style={styles.headerTitle}
        >
          {t('selectContext')}
        </Typography>
        
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Spacer size="lg" />
        
        {/* Subtitle */}
        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.subtitle}
        >
          {t('chooseOneOrMore')}
        </Typography>
        
        <Spacer size="xl" />
        
        {/* Context Selection Grid */}
        <ContextSelectionGrid
          selectedContexts={selectedContexts}
          onContextToggle={handleContextToggle}
        />
        
        <Spacer size="xl" />
        
        {/* Selection Count */}
        {selectedContexts.length > 0 && (
          <View style={styles.selectionInfo}>
            <Typography
              variant="caption"
              color={theme.colors.primary}
              style={styles.selectionText}
            >
              {t('itemsSelected', { count: selectedContexts.length })}
            </Typography>
          </View>
        )}
        
        <Spacer size="lg" />
        
        {/* Encouragement Text */}
        <Typography
          variant="caption"
          color={theme.colors.textMuted}
          style={styles.encouragementText}
        >
          {t('yourExperiencesShapeYourSpiritualJourney')}
        </Typography>
        
        <Spacer size="xl" />
      </ScrollView>
      
      {/* Next Button */}
      <View style={styles.footer}>
        <PrimaryButton
          label={t('next')}
          onPress={handleNext}
          disabled={!canProceed}
        />
        
        {!canProceed && (
          <>
            <Spacer size="sm" />
            <Typography
              variant="caption"
              color={theme.colors.textMuted}
              style={styles.helperText}
            >
              {t('pleaseSelectAtLeastOneContextToContinue')}
            </Typography>
          </>
        )}
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
    borderBottomColor: theme.colors.primarySoft,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginEnd: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.8,
  },
  selectionInfo: {
    alignItems: 'center',
  },
  selectionText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  encouragementText: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.7,
    lineHeight: 18,
    paddingHorizontal: theme.spacing.md,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  helperText: {
    textAlign: 'center',
    opacity: 0.7,
  },
}); 