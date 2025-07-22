import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { OptionCard } from '../../components/molecules/OptionCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { t } from '../../localization';

export const OnboardingStep5: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const ageGroupOptions = [
    t('ageGroup13to17'),
    t('ageGroup18to24'),
    t('ageGroup25to34'),
    t('ageGroup35to44'),
    t('ageGroup45to54'),
    t('ageGroup55plus')
  ];

  const handleContinue = () => {
    if (selectedOption) {
      setField('ageGroup', selectedOption);
      navigation.navigate('OnboardingStep6' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('whatsYourAgeGroup')}
        subtitle={t('thisHelpsUsTailorYourExperience')}
        progress={50}
      >
        <View style={styles.content}>
          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.optionsContainer}>
              {ageGroupOptions.map((option, index) => (
                <OptionCard
                  key={index}
                  label={option}
                  selected={selectedOption === option}
                  onPress={() => setSelectedOption(option)}
                  style={styles.optionCard}
                />
              ))}
            </View>
          </ScrollView>
          
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.lg,
  },
  optionsContainer: {
    paddingTop: theme.spacing.lg,
  },
  optionCard: {
    marginBottom: theme.spacing.lg, // Better spacing between options
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    backgroundColor: 'transparent', // Completely transparent
  },
}); 