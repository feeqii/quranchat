import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Typography } from './Typography';
import { theme } from '../../constants/theme';

interface AnimatedLoaderProps {
  size?: number;
  color?: string;
  affirmations?: string[];
}

export const AnimatedLoader: React.FC<AnimatedLoaderProps> = ({
  size = 60,
  color = theme.colors.primary,
  affirmations = [
    "Reflecting on your insights...",
    "Seeking guidance from the Quran...",
    "Tailoring today's message for you..."
  ],
}) => {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const spinValue = new Animated.Value(0);
  const fadeValue = new Animated.Value(1);
  
  useEffect(() => {
    // Spinning animation
    const startSpinning = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startSpinning());
    };
    
    startSpinning();
  }, []);
  
  useEffect(() => {
    // Affirmation cycling with fade effect
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Change text
        setCurrentAffirmation(prev => (prev + 1) % affirmations.length);
        
        // Fade in
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [affirmations.length]);
  
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return (
    <View style={styles.container}>
      {/* Animated Spinner */}
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={[
            styles.spinner,
            {
              width: size,
              height: size,
              borderColor: `${color}20`,
              borderTopColor: color,
              transform: [{ rotate: spin }],
            },
          ]}
        />
        
        {/* Inner dot */}
        <View style={[
          styles.innerDot,
          {
            backgroundColor: color,
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: size * 0.1,
          }
        ]} />
      </View>
      
      {/* Cycling Affirmations */}
      <Animated.View style={[styles.affirmationContainer, { opacity: fadeValue }]}>
        <Typography
          variant="body"
          color={theme.colors.textSecondary}
          style={styles.affirmationText}
        >
          {affirmations[currentAffirmation]}
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 100,
  },
  innerDot: {
    position: 'absolute',
  },
  affirmationContainer: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 50, // Prevent layout shift during text changes
    justifyContent: 'center',
  },
  affirmationText: {
    textAlign: 'center',
    fontWeight: '500',
    opacity: 0.8,
  },
}); 