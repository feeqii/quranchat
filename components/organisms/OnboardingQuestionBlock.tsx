import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { SectionTitle } from '../atoms/SectionTitle';
import { ProgressBar } from '../atoms/ProgressBar';

interface OnboardingQuestionBlockProps {
  title: string;
  subtitle?: string;
  progress?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export const OnboardingQuestionBlock: React.FC<OnboardingQuestionBlockProps> = ({
  title,
  subtitle,
  progress,
  children,
  style,
}) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressFadeAnim = useRef(new Animated.Value(0)).current;
  const titleFadeAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start main container animation first - longer and more luxurious
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Increased from 600ms to 1000ms
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,    // Reduced tension for slower spring
        friction: 10,   // Increased friction for smoother settling
        useNativeDriver: true,
      }),
    ]).start();

    // Then stagger the section animations with longer delays
    Animated.stagger(250, [ // Increased from 150ms to 250ms
      Animated.timing(progressFadeAnim, {
        toValue: 1,
        duration: 600,  // Increased from 400ms to 600ms
        useNativeDriver: true,
      }),
      Animated.timing(titleFadeAnim, {
        toValue: 1,
        duration: 600,  // Increased from 400ms to 600ms
        useNativeDriver: true,
      }),
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 600,  // Increased from 400ms to 600ms
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, progressFadeAnim, titleFadeAnim, contentFadeAnim]);

  return (
    <LinearGradient
      colors={[
        'rgba(248, 250, 249, 0.95)',
        'rgba(232, 244, 241, 0.90)',
        'rgba(217, 237, 231, 0.85)',
        'rgba(248, 250, 249, 0.98)'
      ]}
      locations={[0, 0.3, 0.7, 1]}
      style={[styles.gradientContainer, style]}
    >
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }
        ]}
      >
        {/* Progress Section */}
        {progress !== undefined && (
          <Animated.View 
            style={[
              styles.progressSection,
              { opacity: progressFadeAnim }
            ]}
          >
            <ProgressBar
              progress={progress}
              style={styles.progressBar}
            />
          </Animated.View>
        )}
        
        {/* Title Section */}
        <Animated.View 
          style={[
            styles.titleSection,
            { opacity: titleFadeAnim }
          ]}
        >
          <SectionTitle
            title={title}
            subtitle={subtitle}
            style={styles.title}
          />
        </Animated.View>
        
        {/* Content Section */}
        <Animated.View 
          style={[
            styles.contentSection,
            { opacity: contentFadeAnim }
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: theme.spacing.xl,
  },
  progressSection: {
    marginBottom: theme.spacing.xxl,
  },
  progressBar: {
    // Enhanced progress bar container
  },
  titleSection: {
    marginBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  title: {
    // Enhanced title styling
  },
  contentSection: {
    flex: 1,
  },
}); 