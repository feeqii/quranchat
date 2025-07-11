import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { YesNoBlock } from '../../components/organisms/YesNoBlock';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingStep10: React.FC = () => {
  const navigation = useNavigation();
  const { setField, completeOnboarding } = useOnboardingStore();
  
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
      
      // Complete onboarding
      completeOnboarding();
      
      // Navigate to main app
      navigation.navigate('MainApp' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="Just a few final questions"
        subtitle="Help us personalize your experience further"
        progress={100}
      >
        <View style={styles.content}>
          <ScrollView 
            style={styles.questionsContainer}
            showsVerticalScrollIndicator={false}
          >
            <YesNoBlock
              question="Do you finish what you start?"
              onYes={() => setIsLikelyToFinish(true)}
              onNo={() => setIsLikelyToFinish(false)}
              style={styles.questionBlock}
            />
            
            <YesNoBlock
              question="Would you like a daily reminder?"
              onYes={() => setWantsDailyReminder(true)}
              onNo={() => setWantsDailyReminder(false)}
              style={styles.questionBlock}
            />
            
            <YesNoBlock
              question="Do you want instant access to Quranic insights?"
              onYes={() => setWantsInstantAccess(true)}
              onNo={() => setWantsInstantAccess(false)}
              style={styles.questionBlock}
            />
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              label="Finish"
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