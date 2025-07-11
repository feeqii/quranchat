import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from '../../components/atoms/Typography';
import { Spacer } from '../../components/atoms/Spacer';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { Icon } from '../../components/atoms/Icon';
import { ReflectionInput } from '../../components/molecules/ReflectionInput';
import { theme } from '../../constants/theme';
import { useTodayStore } from '../../store/useTodayStore';
import { TodayStackParamList } from '../../navigation/TodayStackNavigator';

type ReflectionInputScreenNavigationProp = NativeStackNavigationProp<TodayStackParamList, 'ReflectionInputScreen'>;

export const ReflectionInputScreen: React.FC = () => {
  const navigation = useNavigation<ReflectionInputScreenNavigationProp>();
  const { userReflection, setUserReflection } = useTodayStore();
  
  const handleReflectionChange = (text: string) => {
    setUserReflection(text);
  };
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const handleNext = () => {
    // Navigate to content generation loading screen
    navigation.navigate('ContentGenerationLoadingScreen');
  };
  
  const canProceed = userReflection.trim().length >= 10;
  const characterCount = userReflection.length;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Icon.Back size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          
          <Typography
            variant="h2"
            color={theme.colors.textPrimary}
            style={styles.headerTitle}
          >
            Tell us a bit more
          </Typography>
          
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Spacer size="lg" />

          {/* Instruction Card */}
          <View style={styles.instructionContainer}>
            <LinearGradient
              colors={['#F0F9FF', '#EFF6FF', '#FFFFFF']} // Soft blue gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.instructionCard}
            >
              <Typography
                variant="body"
                color="#6B7280"
                style={styles.subtitle}
              >
                Share what's on your mind today. Your thoughts will help us create a personalized reflection just for you.
              </Typography>
            </LinearGradient>
          </View>

          <Spacer size="xl" />

          {/* Reflection Input */}
          <ReflectionInput
            value={userReflection}
            onChangeText={handleReflectionChange}
            placeholder="Share what's on your heart today... How are you feeling? What challenges are you facing? What are you grateful for?"
            maxLength={500}
          />
          
          <Spacer size="lg" />

          {/* Helper Text */}
          <View style={styles.helperContainer}>
            <LinearGradient
              colors={['#FEF7FF', '#F8FAFF', '#FFFFFF']} // Soft purple gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.helperCard}
            >
              <Typography
                variant="small"
                color="#6B7280"
                style={styles.helperText}
              >
                ✨ The more you share, the more personalized your reflection will be
              </Typography>
            </LinearGradient>
          </View>

          <Spacer size="xl" />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {!canProceed && (
            <Typography
              variant="small"
              color={theme.colors.textMuted}
              style={styles.footerHelperText}
            >
              Please write at least 10 characters to continue
            </Typography>
          )}
          
          <Spacer size={canProceed ? "lg" : "sm"} />
          
          <PrimaryButton
            label="Generate My Reflection"
            onPress={handleNext}
            disabled={!canProceed}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.1)',
  },
  backButton: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
  },
  headerSpacer: {
    width: 40, // Same width as back button for centering
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  instructionContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  instructionCard: {
    padding: 24,
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  helperContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  helperCard: {
    padding: 16,
    alignItems: 'center',
  },
  helperText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
  },
  footerHelperText: {
    textAlign: 'center',
    opacity: 0.7,
    fontSize: 13,
  },
}); 