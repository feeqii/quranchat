import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { OnboardingQuestionBlock } from '../../components/organisms/OnboardingQuestionBlock';
import { TestimonialCard } from '../../components/molecules/TestimonialCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';

const testimonials = [
  {
    name: "Fatima",
    text: "This keeps me grounded in daily Quranic reflection. The widget on my home screen is a beautiful reminder of Allah's presence throughout my day.",
    rating: 5,
  },
  {
    name: "Omar",
    text: "The widget reminds me to pause, reflect, and reconnect with my faith. It's like having a gentle spiritual companion in my pocket.",
    rating: 5,
  },
  {
    name: "Layla",
    text: "Simple, elegant, and deeply helpful. I feel more spiritually consistent and connected to the Quran than ever before.",
    rating: 5,
  },
];

export const OnboardingStep9: React.FC = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('OnboardingFinalQuestion1' as never);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OnboardingQuestionBlock
        title="What others are saying"
        subtitle="Real reflections from real users"
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