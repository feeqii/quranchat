import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';

import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { theme } from '../../constants/theme';

interface VerseActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onShare: () => void;
  onAsk: () => void;
  selectedCount: number;
}

export const VerseActionSheet: React.FC<VerseActionSheetProps> = ({
  visible,
  onClose,
  onShare,
  onAsk,
  selectedCount,
}) => {
  console.log('VerseActionSheet render, visible:', visible, 'selectedCount:', selectedCount);
  const handleShare = () => {
    onClose();
    setTimeout(() => onShare(), 100);
  };

  const handleAsk = () => {
    onClose();
    setTimeout(() => onAsk(), 100);
  };

  const renderDragHandle = () => (
    <View style={styles.dragHandle}>
      <View style={styles.dragIndicator} />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} style={styles.sheet}>
            {renderDragHandle()}
            
            <View style={styles.header}>
              <Typography variant="h3" color={theme.colors.textPrimary}>
                {selectedCount} verse{selectedCount !== 1 ? 's' : ''} selected
              </Typography>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <View style={styles.actionIcon}>
                  <Icon.Share size={24} color={theme.colors.primary} />
                </View>
                <Typography variant="body" color={theme.colors.textPrimary}>
                  Share verses
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={handleAsk}>
                <View style={styles.actionIcon}>
                  <Icon.Chat size={24} color={theme.colors.primary} />
                </View>
                <Typography variant="body" color={theme.colors.textPrimary}>
                  Ask about these verses
                </Typography>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Typography variant="body" color={theme.colors.textSecondary}>
                Cancel
              </Typography>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radii.lg,
    borderTopRightRadius: theme.radii.lg,
    paddingBottom: theme.spacing.xl,
  },
  dragHandle: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  dragIndicator: {
    width: 36,
    height: 4,
    backgroundColor: theme.colors.textMuted,
    borderRadius: 2,
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  actions: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  actionIcon: {
    width: 40,
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
}); 