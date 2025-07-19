import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { WidgetProgressLayout } from '../../components/organisms/WidgetProgressLayout';
import { Typography } from '../../components/atoms/Typography';
import { YesNoBlock } from '../../components/organisms/YesNoBlock';
import { useOnboardingStore } from '../../store/useOnboardingStore';
import { t } from '../../localization';

export const OnboardingFinalQuestion2: React.FC = () => {
  const navigation = useNavigation();
  const { setField } = useOnboardingStore();

  const handleYes = () => {
    setField('wantsDailyReminder', true);
    navigation.navigate('OnboardingFinalQuestion3' as never);
  };

  const handleNo = () => {
    setField('wantsDailyReminder', false);
    navigation.navigate('OnboardingFinalQuestion3' as never);
  };

  return (
    <WidgetProgressLayout
      analyzingProgress={100}
      creatingProgress={100}
      settingUpProgress={60}
    >
      <View style={styles.content}>
        <Typography variant="h3" style={styles.preQuestion}>
          {t('toMoveForwardPleaseSpecify')}
        </Typography>
        
        <YesNoBlock
          question={t('wouldYouLikeADailyReminderOfYourFaithJourneyOnYourHomeScreen')}
          onYes={handleYes}
          onNo={handleNo}
        />
      </View>
    </WidgetProgressLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  preQuestion: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    fontStyle: 'italic',
  },
}); 