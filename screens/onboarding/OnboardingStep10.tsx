import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { YesNoBlock } from '../../components/organisms/YesNoBlock';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

export const OnboardingStep10: React.FC = () => {
  const navigation = useNavigation();
  const { setField, completeOnboarding } = useOnboardingStore();
  const { logEvent } = useAnalyticsStore();

  useEffect(() => {
    logEvent({ name: 'onboarding_complete_step', step: 10 });
  }, [logEvent]);
  
  // Local state for tracking answers
  const [isLikelyToFinish, setIsLikelyToFinish] = useState<boolean | null>(null);
  const [wantsDailyReminder, setWantsDailyReminder] = useState<boolean | null>(null);
  const [wantsInstantAccess, setWantsInstantAccess] = useState<boolean | null>(null);

  // Check if all questions are answered
  const allQuestionsAnswered = 
    isLikelyToFinish !== null && 
    wantsDailyReminder !== null && 
    wantsInstantAccess !== null;

  const handleFinish = () => {
    if (allQuestionsAnswered) {
      // Save all answers to Zustand
      setField('isLikelyToFinish', isLikelyToFinish);
      setField('wantsDailyReminder', wantsDailyReminder);
      setField('wantsInstantAccess', wantsInstantAccess);
      
      // Log onboarding completion
      logEvent({ name: 'onboarding_finish' });
      
      // Navigate to Final Questions instead of completing onboarding
      navigation.navigate('OnboardingFinalQuestion1' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('justAFewFinalQuestions')}
        subtitle={t('helpUsPersonalizeYourExperienceFurther')}
        progress={100}
      >
        <View style={styles.content}>
          <ScrollView 
            style={styles.questionsContainer}
            showsVerticalScrollIndicator={false}
          >
            <YesNoBlock
              question={t('doYouFinishWhatYouStart')}
              onYes={() => setIsLikelyToFinish(true)}
              onNo={() => setIsLikelyToFinish(false)}
              style={styles.questionBlock}
            />
            
            <YesNoBlock
              question={t('wouldYouLikeADailyReminder')}
              onYes={() => setWantsDailyReminder(true)}
              onNo={() => setWantsDailyReminder(false)}
              style={styles.questionBlock}
            />
            
            <YesNoBlock
              question={t('doYouWantInstantAccessToQuranicInsights')}
              onYes={() => setWantsInstantAccess(true)}
              onNo={() => setWantsInstantAccess(false)}
              style={styles.questionBlock}
            />
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              label={t('finish')}
              onPress={handleFinish}
              disabled={!allQuestionsAnswered}
            />
          </View>
        </View>
      </OnboardingQuestionBlock>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  questionsContainer: {
    flex: 1,
    paddingTop: theme.spacing.lg,
  },
  questionBlock: {
    marginBottom: theme.spacing.xl,
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 