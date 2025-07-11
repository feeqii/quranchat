import React from 'react';
import { View, FlatList, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { CategoryCard } from '../molecules/CategoryCard';

interface Category {
  title: string;
  imageSource: ImageSourcePropType;
  userCount: number;
  onPress: () => void;
}

interface CategoryGroupSectionProps {
  title: string;
  categories: Category[];
  style?: ViewStyle;
}

export const CategoryGroupSection: React.FC<CategoryGroupSectionProps> = ({
  title,
  categories,
  style,
}) => {
  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard
      title={item.title}
      imageSource={item.imageSource}
      userCount={item.userCount}
      onPress={item.onPress}
    />
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Typography 
          variant="sectionTitle" 
          color={theme.colors.textPrimary}
          style={styles.sectionTitle}
        >
          {title}
        </Typography>
      </View>
      
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.title}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  list: {
    flexGrow: 0,
  },
  listContent: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
  },
}); 