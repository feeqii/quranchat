import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { OptionCard } from '../../components/molecules/OptionCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

export const OnboardingStep2: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const { logEvent } = useAnalyticsStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    logEvent({ name: 'screen_view', screenName: 'OnboardingStep2' });
  }, [logEvent]);

  const supportOptions = [
    t('justStudyTheQuran'),
    t('overcomeLifeStrugglesAndChallenges')
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setField('supportType', selectedOption);
      logEvent({ name: 'onboarding_complete_step', step: 2 });
      navigation.navigate('OnboardingStep3' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('howCanQuranChatSupportYou')}
        subtitle={t('yourExperienceWillBeTailoredToYourNeeds')}
        progress={20}
      >
        <View style={styles.content}>
          <View style={styles.optionsContainer}>
            {supportOptions.map((option, index) => (
              <OptionCard
                key={index}
                label={option}
                selected={selectedOption === option}
                onPress={() => handleOptionSelect(option)}
                style={styles.optionCard}
              />
            ))}
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              label={t('continue')}
              onPress={handleContinue}
              disabled={!selectedOption}
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
  optionsContainer: {
    flex: 1,
    paddingTop: theme.spacing.lg,
  },
  optionCard: {
    marginBottom: theme.spacing.md,
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 