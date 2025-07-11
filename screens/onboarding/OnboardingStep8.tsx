import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { AnswerCard } from '../../components/molecules/AnswerCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';

export const OnboardingStep8: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('OnboardingStep9' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="Deepen your relationship with Allah"
        subtitle="Here's how Quran Chat might support you"
        progress={80}
      >
        <View style={styles.content}>
          <View style={styles.cardContainer}>
            <AnswerCard
              question="How can I strengthen my faith?"
              answer={`Strengthening your faith begins with regular remembrance of Allah and reflection on His words.

"Indeed, in the remembrance of Allah do hearts find rest." — Surah Ar-Ra'd (13:28)

Start small: recite an Ayah daily, reflect on its meaning, and apply it in your actions. Build consistency. Faith is not a feeling — it's a relationship nurtured through practice, patience, and presence.`}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              label="Continue"
              onPress={handleContinue}
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
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 