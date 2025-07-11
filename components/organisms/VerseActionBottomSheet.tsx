import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Animated, Share, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { theme } from '../../constants/theme';

interface VerseActionBottomSheetProps {
  visible: boolean;
  verseText: string;
  verseNumber: number;
  surahName: string;
  surahNumber: number;
  onHighlight: () => void;
  onAsk: () => void;
  onClose: () => void;
}

export const VerseActionBottomSheet: React.FC<VerseActionBottomSheetProps> = ({
  visible,
  verseText,
  verseNumber,
  surahName,
  surahNumber,
  onHighlight,
  onAsk,
  onClose,
}) => {
  const translateY = React.useRef(new Animated.Value(300)).current;
  const backdropOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 300,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleBackdropPress = () => {
    onClose();
  };

  const handleShare = async () => {
    try {
      const shareText = `🕌 ${surahName} ${surahNumber}:${verseNumber}\n\n"${verseText}"\n\n— Quran Chat`;
      
      await Share.share({
        message: shareText,
        title: `${surahName} ${surahNumber}:${verseNumber}`,
      });
      
      onClose();
    } catch (error) {
      console.error('Error sharing verse:', error);
      Alert.alert('Error', 'Failed to share verse. Please try again.');
    }
  };

  const handleHighlight = () => {
    onHighlight();
  };

  const handleAsk = () => {
    onAsk();
  };

  // Truncate verse text for preview
  const truncatedText = verseText.length > 80 ? verseText.substring(0, 80) + '...' : verseText;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Backdrop with blur */}
        <Animated.View 
          style={[
            styles.backdrop,
            { opacity: backdropOpacity }
          ]}
        >
          <BlurView intensity={20} style={StyleSheet.absoluteFill} />
          <TouchableOpacity
            style={styles.backdropTouchable}
            onPress={handleBackdropPress}
            activeOpacity={1}
          />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View 
          style={[
            styles.bottomSheet,
            { transform: [{ translateY }] }
          ]}
        >
          {/* Handle */}
          <View style={styles.handle} />
          
          {/* Verse Preview */}
          <View style={styles.versePreview}>
            <Typography 
              variant="small" 
              color={theme.colors.textMuted}
              style={styles.verseReference}
            >
              {surahName.toUpperCase()} {surahNumber}:{verseNumber}
            </Typography>
            <Typography 
              variant="body" 
              color={theme.colors.textPrimary}
              style={styles.verseTextPreview}
            >
              {truncatedText}
            </Typography>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleHighlight}
              activeOpacity={0.7}
            >
              <Icon.Star size={20} color="#FF9800" style={styles.actionIcon} />
              <Typography 
                variant="body" 
                color={theme.colors.textPrimary}
                style={styles.actionLabel}
              >
                Highlight
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAsk}
              activeOpacity={0.7}
            >
              <Icon.MessageCircle size={20} color="#4CAF50" style={styles.actionIcon} />
              <Typography 
                variant="body" 
                color={theme.colors.textPrimary}
                style={styles.actionLabel}
              >
                Ask about this verse
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Icon.Share size={20} color="#2196F3" style={styles.actionIcon} />
              <Typography 
                variant="body" 
                color={theme.colors.textPrimary}
                style={styles.actionLabel}
              >
                Share verse
              </Typography>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backdropTouchable: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 34,
    paddingHorizontal: 0,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  versePreview: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  verseReference: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
    color: '#6B7280',
  },
  verseTextPreview: {
    fontSize: 15,
    lineHeight: 20,
    color: '#374151',
  },
  actionsContainer: {
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.surface,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '400',
  },
}); 