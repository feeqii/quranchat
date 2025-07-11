import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { WidgetProgressLayout } from '../../components/organisms/WidgetProgressLayout';
import { Typography } from '../../components/atoms/Typography';
import { YesNoBlock } from '../../components/organisms/YesNoBlock';
import { useOnboardingStore } from '../../store/useOnboardingStore';

export const OnboardingFinalQuestion3: React.FC = () => {
  const navigation = useNavigation();
  const { setField, completeOnboarding } = useOnboardingStore();

  const handleYes = () => {
    setField('wantsInstantAccess', true);
    completeOnboarding();
    navigation.navigate('MainApp' as never);
  };

  const handleNo = () => {
    setField('wantsInstantAccess', false);
    completeOnboarding();
    navigation.navigate('MainApp' as never);
  };

  return (
    <WidgetProgressLayout
      analyzingProgress={100}
      creatingProgress={100}
      settingUpProgress={100}
    >
      <View style={styles.content}>
        <Typography variant="h3" style={styles.preQuestion}>
          To move forward, please specify
        </Typography>
        
        <YesNoBlock
          question="Would you like to have instant access to daily inspiration and your progress?"
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