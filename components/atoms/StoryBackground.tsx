import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';

interface StoryBackgroundProps {
  children: React.ReactNode;
}

export const StoryBackground: React.FC<StoryBackgroundProps> = ({ children }) => {
  // Try to use image background, fallback to gradient if image is not available
  const imageSource = (() => {
    try {
      return require('../../assets/images/verse-story-bg.jpg');
    } catch {
      return null;
    }
  })();

  if (imageSource) {
    return (
      <View style={styles.container}>
        {/* Background Image */}
        <ImageBackground
          source={imageSource}
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
        />
        
        {/* Dark Overlay for Text Readability */}
        <LinearGradient
          colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.45)']}
          locations={[0.1, 1]}
          style={StyleSheet.absoluteFill}
        />
        
        {/* Content Layer */}
        <View style={styles.contentLayer}>
          {children}
        </View>
      </View>
    );
  }

  // Fallback to soft gradient (no overlay needed as it's already dark)
  return (
    <LinearGradient
      colors={['#8B4A6B', '#4A2C3A']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayer: {
    flex: 1,
    zIndex: 2,
  },
}); 