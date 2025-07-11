import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { YesNoBlock } from '../../components/organisms/YesNoBlock';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingStep1: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();

  const handleYes = () => {
    setField('wantsDailyReminder', true);
    navigation.navigate('OnboardingStep2' as never);
  };

  const handleNo = () => {
    setField('wantsDailyReminder', false);
    navigation.navigate('OnboardingStep2' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="Seeking daily guidance rooted in Quranic wisdom?"
        subtitle="We'll personalize your experience accordingly"
        progress={10}
      >
        <YesNoBlock
          question="Would you like daily guidance?"
          onYes={handleYes}
          onNo={handleNo}
        />
      </OnboardingQuestionBlock>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}); 