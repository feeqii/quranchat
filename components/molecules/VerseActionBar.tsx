import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Icon } from '../atoms/Icon';
import { theme } from '../../constants/theme';
import { HighlightColor } from '../../store/useQuranStore';

interface VerseActionBarProps {
  visible: boolean;
  currentHighlightColor?: HighlightColor | null;
  onHighlight: (color: HighlightColor) => void;
  onAsk: () => void;
  onShare: () => void;
}

const highlightColors: { color: HighlightColor; backgroundColor: string }[] = [
  { color: 'yellow', backgroundColor: '#FFF9C4' },
  { color: 'green', backgroundColor: '#E8F5E8' },
  { color: 'blue', backgroundColor: '#E3F2FD' },
  { color: 'pink', backgroundColor: '#FCE4EC' },
  { color: 'purple', backgroundColor: '#F3E5F5' },
];

export const VerseActionBar: React.FC<VerseActionBarProps> = ({
  visible,
  currentHighlightColor,
  onHighlight,
  onAsk,
  onShare,
}) => {
  const translateY = React.useRef(new Animated.Value(60)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 60,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        }
      ]}
    >
      <View style={styles.actionBar}>
        {/* Highlight section with color picker */}
        <View style={styles.highlightSection}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onHighlight('yellow')} // Default to yellow
            activeOpacity={0.7}
          >
            <Icon.Star size={20} color="#FF9800" />
          </TouchableOpacity>
          
          {/* Color picker dots */}
          <View style={styles.colorPicker}>
            {highlightColors.map((colorOption) => (
              <TouchableOpacity
                key={colorOption.color}
                style={[
                  styles.colorDot,
                  { backgroundColor: colorOption.backgroundColor },
                  currentHighlightColor === colorOption.color && styles.selectedColorDot,
                ]}
                onPress={() => onHighlight(colorOption.color)}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Ask button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onAsk}
          activeOpacity={0.7}
        >
          <Icon.MessageCircle size={20} color="#4CAF50" />
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onShare}
          activeOpacity={0.7}
        >
          <Icon.Share size={20} color="#2196F3" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 34, // Safe area bottom
    backgroundColor: 'rgba(59, 130, 246, 0.05)', // Very subtle blue tint
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  highlightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  colorPicker: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 6,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  selectedColorDot: {
    borderColor: '#374151',
    borderWidth: 2,
    transform: [{ scale: 1.1 }],
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 8,
  },
}); 