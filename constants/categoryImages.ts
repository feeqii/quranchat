import { ImageSourcePropType } from 'react-native';

export const categoryImages: Record<string, ImageSourcePropType> = {
  // Original categories
  Creation: require('../assets/category/creation.png'),
  Forgiveness: require('../assets/category/forgiveness.png'),
  Gratitude: require('../assets/category/gratitude.png'),
  Purpose: require('../assets/category/purpose.png'),
  Relationships: require('../assets/category/relationships.png'),
  Patience: require('../assets/category/patience.png'),
  'Prayer & Worship': require('../assets/category/worship.png'),
  
  // Life Challenges
  Anxiety: require('../assets/category/patience.png'), // Fallback to patience
  Stress: require('../assets/category/patience.png'),
  Loss: require('../assets/category/forgiveness.png'), // Fallback to forgiveness
  Loneliness: require('../assets/category/relationships.png'),
  Grief: require('../assets/category/forgiveness.png'),
  
  // Personal Growth
  'Self-love': require('../assets/category/gratitude.png'),
  Wisdom: require('../assets/category/purpose.png'),
  Growth: require('../assets/category/purpose.png'),
  
  // Relationships (extended)
  Family: require('../assets/category/relationships.png'),
  Friendship: require('../assets/category/relationships.png'),
  Marriage: require('../assets/category/relationships.png'),
  Community: require('../assets/category/relationships.png'),
  Compassion: require('../assets/category/forgiveness.png'),
  
  // Worship & Faith
  Prayer: require('../assets/category/worship.png'),
  "Du'a": require('../assets/category/worship.png'),
  Tawakkul: require('../assets/category/gratitude.png'),
  Taqwa: require('../assets/category/worship.png'),
  Iman: require('../assets/category/purpose.png'),
  Ihsan: require('../assets/category/worship.png'),
};

// Helper function to get random user count for development
export const getRandomUserCount = (): number => {
  return Math.floor(Math.random() * (35000 - 10000) + 10000);
}; 