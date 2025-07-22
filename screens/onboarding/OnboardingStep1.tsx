import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { YesNoBlock } from '../../components/organisms/YesNoBlock';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

export const OnboardingStep1: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();
  const { logEvent } = useAnalyticsStore();

  useEffect(() => {
    logEvent({ name: 'screen_view', screenName: 'OnboardingStep1' });
  }, [logEvent]);

  const handleYes = () => {
    setField('wantsDailyReminder', true);
    logEvent({ name: 'onboarding_complete_step', step: 1 });
    navigation.navigate('OnboardingStep2' as never);
  };

  const handleNo = () => {
    setField('wantsDailyReminder', false);
    logEvent({ name: 'onboarding_complete_step', step: 1 });
    navigation.navigate('OnboardingStep2' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('dailyGuidanceTitle')}
        subtitle={t('dailyGuidanceSubtitle')}
        progress={10}
      >
        <YesNoBlock
          question={t('dailyGuidanceQuestion')}
          onYes={handleYes}
          onNo={handleNo}
          yesLabel={t('yes')}
          noLabel={t('no')}
          questionVariant="subtitle"
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