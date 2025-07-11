import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { OptionCard } from '../../components/molecules/OptionCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';

const supportOptions = [
  'Just study the Quran',
  'Overcome life struggles and challenges'
];

export const OnboardingStep2: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      setField('supportType', selectedOption);
      navigation.navigate('OnboardingStep3' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="How can Quran Chat support you?"
        subtitle="Your experience will be tailored to your needs"
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
              label="Continue"
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