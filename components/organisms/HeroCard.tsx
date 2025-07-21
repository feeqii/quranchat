import React from 'react';
import { View, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import { theme } from '../../constants/theme';

interface HeroCardProps {
  children: React.ReactNode;
  heightPercentage?: number; // Percentage of screen height
  style?: any;
  backgroundImage?: any; // Background image source
  overlay?: boolean; // Add overlay for text readability
  overlayOpacity?: number; // Overlay opacity (0-1)
}

export const HeroCard: React.FC<HeroCardProps> = ({
  children,
  heightPercentage = 0.6, // Default to 60% of screen height
  style,
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.3,
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  
  // Responsive values
  const isSmallScreen = screenWidth < 360;
  const cardHeight = screenHeight * heightPercentage;
  const horizontalPadding = isSmallScreen ? theme.spacing.md : theme.spacing.lg;
  const cardPadding = isSmallScreen ? theme.spacing.lg : theme.spacing.xl;

  const cardContainerStyle = [
    styles.container,
    {
      height: cardHeight,
      marginHorizontal: horizontalPadding,
    },
    style
  ];

  const contentStyle = [
    styles.content,
    {
      padding: cardPadding,
    }
  ];

  if (backgroundImage) {
    return (
      <ImageBackground
        source={backgroundImage}
        style={cardContainerStyle}
        imageStyle={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay for better text readability */}
        {overlay && (
          <View style={[
            styles.overlay,
            { backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})` }
          ]} />
        )}
        
        {/* Content */}
        <View style={contentStyle}>
          {children}
        </View>
      </ImageBackground>
    );
  }

  // Fallback to plain background if no image
  return (
    <View style={cardContainerStyle}>
      <View style={contentStyle}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radii.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400, // Prevent card from getting too wide on large screens
    alignSelf: 'center',
    ...theme.shadows.md, // Subtle drop shadow as specified
    overflow: 'hidden', // Ensure background image respects border radius
  },
  backgroundImage: {
    borderRadius: theme.radii.lg,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.radii.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    zIndex: 1, // Ensure content appears above overlay
  },
}); 