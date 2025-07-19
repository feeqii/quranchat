import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { AnswerCard } from '../../components/molecules/AnswerCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { t } from '../../localization';

export const OnboardingStep8: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('OnboardingStep9' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('deepenYourRelationshipWithAllah')}
        subtitle={t('heresHowQuranChatMightSupportYou')}
        progress={80}
      >
        <View style={styles.content}>
          <View style={styles.cardContainer}>
            <AnswerCard
              question={t('howCanIStrengthenMyFaith')}
              answer={t('faithStrengtheningAnswer')}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <PrimaryButton
              label={t('continue')}
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