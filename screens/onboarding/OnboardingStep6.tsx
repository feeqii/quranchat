import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { WidgetIllustration } from '../../components/molecules/WidgetIllustration';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Typography } from '../../components/atoms/Typography';
import { t } from '../../localization';

export const OnboardingStep6: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('OnboardingStep7' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('makeYourHomeScreenAPlaceOfFaith')}
        progress={60}
      >
        <View style={styles.content}>
          <View style={styles.instructionContainer}>
            <Typography variant="body" style={styles.instructionText}>
              {t('homeScreenInstructions')}
            </Typography>
          </View>
          
          <View style={styles.illustrationContainer}>
            <WidgetIllustration />
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
  instructionContainer: {
    marginTop: -theme.spacing.lg, // Pull instruction closer to title
    paddingTop: 0, // Remove top padding
    paddingBottom: theme.spacing.lg, // Keep bottom padding
    paddingHorizontal: theme.spacing.lg, // Keep horizontal padding
  },
  instructionText: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    lineHeight: 26, // Slightly increased for better readability
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg, // Added horizontal padding
    paddingVertical: theme.spacing.xl, // Added vertical padding for balance
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    backgroundColor: 'transparent', // Match other screens
  },
}); 