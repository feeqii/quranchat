import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { OptionGroup } from '../../components/molecules/OptionGroup';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { t } from '../../localization';

export const OnboardingStep7: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const islamicBackgroundOptions = [
    t('sunni'),
    t('shia'),
    t('sufi'),
    t('nonDenominational'),
    t('preferNotToSay')
  ];

  const handleContinue = () => {
    if (selectedOption) {
      setField('islamicBackground', selectedOption);
      navigation.navigate('OnboardingStep8' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('whatsYourIslamicBackground')}
        subtitle={t('wellTailorResponsesRespectfully')}
        progress={70}
      >
        <View style={styles.content}>
          <View style={styles.optionsContainer}>
            <OptionGroup
              options={islamicBackgroundOptions}
              selected={selectedOption}
              onSelect={setSelectedOption}
            />
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
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 