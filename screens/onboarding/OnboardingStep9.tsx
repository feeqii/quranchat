import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { TestimonialCard } from '../../components/molecules/TestimonialCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { useAnalyticsStore } from '../../store/useAnalyticsStore';
import { t } from '../../localization';

export const OnboardingStep9: React.FC = () => {
  const navigation = useNavigation();
  const { logEvent } = useAnalyticsStore();

  useEffect(() => {
    logEvent({ name: 'screen_view', screenName: 'OnboardingStep9' });
    logEvent({ name: 'onboarding_complete_step', step: 9 });
  }, [logEvent]);

const testimonials = [
  {
    name: "Fatima",
      text: t('thisKeepsMeGroundedInDailyQuranicReflection'),
    rating: 5,
  },
  {
    name: "Omar",
      text: t('theWidgetRemindsMeToPauseReflectAndReconnect'),
    rating: 5,
  },
  {
    name: "Layla",
      text: t('simpleElegantAndDeeplyHelpful'),
    rating: 5,
  },
];

  const handleContinue = () => {
    navigation.navigate('OnboardingFoundersNote' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title={t('whatOthersAreSaying')}
        subtitle={t('realReflectionsFromRealUsers')}
        progress={90}
      >
        <View style={styles.content}>
          <ScrollView 
            style={styles.testimonialsContainer}
            showsVerticalScrollIndicator={false}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                text={testimonial.text}
                rating={testimonial.rating}
                style={styles.testimonialCard}
              />
            ))}
          </ScrollView>
          
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
  testimonialsContainer: {
    flex: 1,
    paddingTop: theme.spacing.lg,
  },
  testimonialCard: {
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
}); 