import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
          <ScrollView 
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
          <View style={styles.cardContainer}>
            <AnswerCard
              question={t('howCanIStrengthenMyFaith')}
              answer={t('faithStrengtheningAnswer')}
            />
          </View>
          </ScrollView>
          
          {/* Natural content fade overlay */}
          <LinearGradient
            colors={[
              'transparent',
              'rgba(248, 250, 249, 0.05)',
              'rgba(248, 250, 249, 0.15)',
              'rgba(248, 250, 249, 0.4)',
              'rgba(248, 250, 249, 0.8)',
              'rgba(248, 250, 249, 1)'
            ]}
            locations={[0, 0.1, 0.25, 0.5, 0.8, 1]}
            style={styles.blurOverlay}
            pointerEvents="none"
          />
          
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
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl, // Extra padding to ensure content fades nicely
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    minHeight: 400, // Ensure minimum height for proper scrolling
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 60, // Position above the button
    left: 0,
    right: 0,
    height: 100, // Taller for very gradual fade
    zIndex: 1,
  },
  buttonContainer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    backgroundColor: 'transparent', // Transparent to let gradient handle the fade
    zIndex: 2,
  },
}); 