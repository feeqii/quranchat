import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { OptionCard } from '../../components/molecules/OptionCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { t } from '../../localization';

export const OnboardingStep4: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const heardFromOptions = [
    t('digitalAdvertising'),
    t('socialMediaTiktokInstagramFacebook'),
    t('appStore'),
    t('friendsOrFamily'),
    t('onlineSearchGoogle')
  ];

  const handleContinue = () => {
    if (selectedOption) {
      setField('heardFrom', selectedOption);
      navigation.navigate('OnboardingStep5' as never);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('howDidYouHearAboutQuranChat')}
        subtitle={t('weAreBlessedToHaveYouOnBoardAndWouldLoveToKnow')}
        progress={40}
      >
        <View style={styles.content}>
          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={100}
          >
          <View style={styles.optionsContainer}>
              {heardFromOptions.map((option, index) => (
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
    paddingBottom: theme.spacing.xxl + theme.spacing.xl, // Extra space so last item fades nicely
  },
  optionsContainer: {
    paddingTop: theme.spacing.lg,
  },
  optionCard: {
    marginBottom: theme.spacing.lg, // Increased from md to lg for better spacing
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    backgroundColor: 'transparent',
  },
}); 