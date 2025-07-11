import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { WidgetIllustration } from '../../components/molecules/WidgetIllustration';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Typography } from '../../components/atoms/Typography';

export const OnboardingStep6: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('OnboardingStep7' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="Make Your Home Screen a Place of Faith"
        subtitle=""
        progress={60}
      >
        <View style={styles.content}>
          <View style={styles.instructionContainer}>
            <Typography variant="body" style={styles.instructionText}>
              From the Home Screen of your phone, touch and hold an empty area until the apps jiggle
            </Typography>
          </View>
          
          <View style={styles.illustrationContainer}>
            <WidgetIllustration />
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
  instructionContainer: {
    paddingTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  instructionText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 