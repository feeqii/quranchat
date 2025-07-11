import React from 'react';
import { View, StyleSheet, ViewStyle, ImageSourcePropType, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';

interface Category {
  title: string;
  imageSource: ImageSourcePropType;
  userCount: number;
  onPress: () => void;
}

interface CategoryGridSectionProps {
  title: string;
  categories: Category[];
  style?: ViewStyle;
}

const CategoryGridCard: React.FC<{ category: Category }> = ({ category }) => {
  const scaleValue = new Animated.Value(1);

  const handlePress = () => {
    // Gentle tap animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    category.onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={styles.gridCard}
        onPress={handlePress}
        activeOpacity={1}
      >
        <View style={styles.gridImageContainer}>
          <Image 
            source={category.imageSource} 
            style={styles.gridImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gridImageOverlay}
          />
        </View>
        <LinearGradient
          colors={['#FEFEFE', '#F8FAFC', '#FFFFFF']} // Back to original subtle gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gridContent}
        >
          <Typography 
            variant="body"
            color={theme.colors.textPrimary}
            style={styles.gridTitle}
            numberOfLines={2}
          >
            {category.title}
          </Typography>
          
          <View style={styles.gridCountRow}>
            <Icon.Users size={12} color={theme.colors.textMuted} />
            <Typography 
              variant="caption"
              color={theme.colors.textMuted}
              style={styles.gridUserCount}
            >
              {category.userCount > 1000 ? `${Math.floor(category.userCount / 1000)}k` : category.userCount}
            </Typography>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const CategoryGridSection: React.FC<CategoryGridSectionProps> = ({
  title,
  categories,
  style,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - (theme.spacing.lg * 2) - theme.spacing.md) / 2;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography 
          variant="h3"
          color={theme.colors.textPrimary}
          style={styles.sectionTitle}
        >
          {title}
        </Typography>
      </View>
      
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <View key={category.title} style={[styles.gridItem, { width: cardWidth }]}>
            <CategoryGridCard category={category} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    marginBottom: theme.spacing.md,
  },
  gridCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  gridImageContainer: {
    position: 'relative',
    width: '100%',
    height: 100,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridContent: {
    padding: 16,
    minHeight: 70,
    justifyContent: 'space-between',
  },
  gridTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 8,
  },
  gridCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  gridUserCount: {
    fontSize: 11,
    marginLeft: 4,
    opacity: 0.7,
  },
}); 