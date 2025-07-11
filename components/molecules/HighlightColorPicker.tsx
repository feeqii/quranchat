import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Typography } from '../atoms/Typography';
import { theme } from '../../constants/theme';
import { HighlightColor } from '../../store/useQuranStore';

interface HighlightColorPickerProps {
  visible: boolean;
  onSelectColor: (color: HighlightColor) => void;
  onRemoveHighlight: () => void;
  onClose: () => void;
  currentColor?: HighlightColor | null;
}

const colorOptions: { color: HighlightColor; name: string; backgroundColor: string }[] = [
  { color: 'green', name: 'Green', backgroundColor: '#E8F5E8' },
  { color: 'blue', name: 'Blue', backgroundColor: '#E3F2FD' },
  { color: 'yellow', name: 'Yellow', backgroundColor: '#FFF9C4' },
  { color: 'pink', name: 'Pink', backgroundColor: '#FCE4EC' },
  { color: 'purple', name: 'Purple', backgroundColor: '#F3E5F5' },
];

export const HighlightColorPicker: React.FC<HighlightColorPickerProps> = ({
  visible,
  onSelectColor,
  onRemoveHighlight,
  onClose,
  currentColor,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleBackdropPress = () => {
    onClose();
  };

  const handleColorSelect = (color: HighlightColor) => {
    onSelectColor(color);
    onClose();
  };

  const handleRemoveHighlight = () => {
    onRemoveHighlight();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        style={[
          styles.backdrop,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          onPress={handleBackdropPress}
          activeOpacity={1}
        />
        
        <Animated.View 
          style={[
            styles.modal,
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }] 
            }
          ]}
        >
          <Typography 
            variant="h3" 
            color={theme.colors.textPrimary}
            style={styles.title}
          >
            Highlight Color
          </Typography>
          
          <View style={styles.colorGrid}>
            {colorOptions.map((option) => (
              <TouchableOpacity
                key={option.color}
                style={[
                  styles.colorOption,
                  currentColor === option.color && styles.selectedColorOption,
                ]}
                onPress={() => handleColorSelect(option.color)}
                activeOpacity={0.8}
              >
                <View 
                  style={[
                    styles.colorSwatch,
                    { backgroundColor: option.backgroundColor }
                  ]} 
                />
                <Typography 
                  variant="body" 
                  color={theme.colors.textPrimary}
                  style={styles.colorName}
                >
                  {option.name}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
          
          {currentColor && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveHighlight}
              activeOpacity={0.8}
            >
              <Typography 
                variant="body" 
                color="#DC2626"
                style={styles.removeText}
              >
                Remove Highlight
              </Typography>
            </TouchableOpacity>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 300,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#374151',
  },
  colorGrid: {
    gap: 8,
    marginBottom: 16,
  },
  colorOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  selectedColorOption: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  colorName: {
    fontSize: 15,
    color: '#374151',
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  removeText: {
    fontSize: 15,
    fontWeight: '500',
  },
}); 