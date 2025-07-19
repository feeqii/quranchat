import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { Spacer } from '../atoms/Spacer';

interface CategoryCardProps {
  title: string;
  imageSource: ImageSourcePropType;
  userCount: number;
  onPress: () => void;
  style?: ViewStyle;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  imageSource,
  userCount,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={imageSource} 
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.imageOverlay}
        />
      </View>
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9', '#FFFFFF']} // Back to original subtle gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.content}
      >
        <Typography 
          variant="sectionTitle" 
          color={theme.colors.textPrimary}
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Typography>
        <View style={styles.countRow}>
          <Icon.Users size={16} color={theme.colors.textMuted} />
          <Spacer size="xs" horizontal />
          <Typography 
            variant="small" 
            color={theme.colors.textMuted}
            style={styles.userCount}
          >
            {userCount.toLocaleString()}
          </Typography>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 220,
    borderRadius: theme.radii.md,
    marginEnd: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '65%',
    borderTopLeftRadius: theme.radii.md,
    borderTopRightRadius: theme.radii.md,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: theme.radii.md,
    borderTopRightRadius: theme.radii.md,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderTopLeftRadius: theme.radii.md,
    borderTopRightRadius: theme.radii.md,
  },
  content: {
    padding: theme.spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  userCount: {
    fontSize: 13,
  },
}); 