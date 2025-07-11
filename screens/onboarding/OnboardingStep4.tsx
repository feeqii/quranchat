import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { OptionGroup } from '../../components/molecules/OptionGroup';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';

const heardFromOptions = [
  'Digital Advertising',
  'Social Media (TikTok, Instagram, Facebook)',
  'App Store',
  'Friends or Family',
  'Online Search (Google)'
];

export const OnboardingStep4: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedOption) {
      setField('heardFrom', selectedOption);
      navigation.navigate('OnboardingStep5' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="How did you hear about Quran Chat?"
        subtitle="We are blessed to have you on board and would love to know!"
        progress={40}
      >
        <View style={styles.content}>
          <View style={styles.optionsContainer}>
            <OptionGroup
              options={heardFromOptions}
              selected={selectedOption}
              onSelect={setSelectedOption}
            />
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
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 