import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useChatStore } from '../../store/useChatStore';

interface JustChatCardProps {
  style?: ViewStyle;
}

export const JustChatCard: React.FC<JustChatCardProps> = ({ style }) => {
  const navigation = useNavigation();
  const { setTopic } = useChatStore();
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

    // Set a general topic for open-ended conversation
    setTopic('Open Spiritual Conversation');
    (navigation as any).navigate('TopicChatScreen');
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={1}
      >
        <LinearGradient
          colors={['#F0E6F7', '#E8F4F8', '#FFFFFF']} // Soft lavender to sky gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          <Icon.MessageCircle size={28} color={theme.colors.primary} style={styles.icon} />
          
          <Typography 
            variant="h3" 
            color="#2C3E50"
            style={styles.title}
          >
            Just Chat
          </Typography>
          
          <Typography 
            variant="body" 
            color="#6B7C93"
            style={styles.subtitle}
          >
            Ask anything about Islam, spirituality, or life guidance
          </Typography>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.lg,
    borderRadius: 20,
    overflow: 'hidden',
    ...theme.shadows.lg,
    marginBottom: theme.spacing.lg,
  },
  gradientContainer: {
    minHeight: 140,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
}); 