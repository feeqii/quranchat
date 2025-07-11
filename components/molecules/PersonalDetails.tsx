import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useProfileStore } from '../../store/useProfileStore';

const AGE_RANGES = [
  '18-25', '26-35', '36-45', '46-55', '56-65', '66+'
];

const DENOMINATIONS = [
  'Sunni', 'Shia', 'Sufi', 'Other', 'Prefer not to say'
];

export const PersonalDetails: React.FC = () => {
  const { 
    email, 
    ageRange, 
    denomination, 
    customField, 
    isOnboardingDataSynced,
    setEmail, 
    setAgeRange, 
    setDenomination, 
    setCustomField 
  } = useProfileStore();
  
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showDenominationModal, setShowDenominationModal] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingCustom, setIsEditingCustom] = useState(false);
  const [emailInput, setEmailInput] = useState(email || '');
  const [customInput, setCustomInput] = useState(customField || '');

  const handleEmailSave = () => {
    if (emailInput.trim()) {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.trim())) {
        setEmail(emailInput.trim());
        setIsEditingEmail(false);
      } else {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
      }
    } else {
      setEmail('');
      setIsEditingEmail(false);
    }
  };

  const handleCustomSave = () => {
    setCustomField(customInput.trim());
    setIsEditingCustom(false);
  };

  const renderField = (
    label: string,
    value: string | null,
    onPress?: () => void,
    isEditing?: boolean,
    input?: string,
    onInputChange?: (text: string) => void,
    onInputSave?: () => void,
    placeholder?: string
  ) => (
    <View style={styles.fieldContainer}>
      <Typography variant="body" color={theme.colors.textSecondary} style={styles.fieldLabel}>
        {label}
      </Typography>
      
      {isEditing ? (
        <TextInput
          style={styles.fieldInput}
          value={input}
          onChangeText={onInputChange}
          onSubmitEditing={onInputSave}
          onBlur={onInputSave}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          autoFocus
          keyboardType={label === 'Email' ? 'email-address' : 'default'}
        />
      ) : (
        <TouchableOpacity style={styles.fieldValue} onPress={onPress}>
          <Typography 
            variant="body" 
            color={value ? theme.colors.textPrimary : theme.colors.textMuted}
            style={styles.valueText}
          >
            {value || `Add ${label.toLowerCase()}`}
          </Typography>
          <Icon.ChevronRight size={16} color={theme.colors.textMuted} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSelectionModal = (
    isVisible: boolean,
    title: string,
    items: string[],
    selectedValue: string | null,
    onSelect: (item: string) => void,
    onClose: () => void
  ) => (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Typography variant="h3" color={theme.colors.textPrimary} style={styles.modalTitle}>
              {title}
            </Typography>
            <TouchableOpacity onPress={onClose}>
              <Icon.Close size={24} color={theme.colors.textMuted} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            {items.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.modalItem,
                  selectedValue === item && styles.modalItemSelected
                ]}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Typography 
                  variant="body" 
                  color={selectedValue === item ? theme.colors.primary : theme.colors.textPrimary}
                  style={styles.modalItemText}
                >
                  {item}
                </Typography>
                {selectedValue === item && (
                  <Icon.Check size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography variant="h3" color={theme.colors.textPrimary} style={styles.sectionTitle}>
          Personal Details
        </Typography>
        
        {isOnboardingDataSynced && (ageRange || denomination) && (
          <View style={styles.autoPopulatedBadge}>
            <Icon.Check size={14} color={theme.colors.primary} />
            <Typography variant="caption" color={theme.colors.primary} style={styles.badgeText}>
              Auto-filled from setup
            </Typography>
          </View>
        )}
      </View>

      {isOnboardingDataSynced && (ageRange || denomination) && (
        <View style={styles.infoCard}>
          <Icon.Sparkles size={16} color={theme.colors.primary} />
          <Typography variant="small" color={theme.colors.textSecondary} style={styles.infoText}>
            We've pre-filled some details from your initial setup. Feel free to edit or add more information.
          </Typography>
        </View>
      )}

      {renderField(
        'Age Range',
        ageRange,
        () => setShowAgeModal(true)
      )}

      {renderField(
        'Email',
        email,
        () => setIsEditingEmail(true),
        isEditingEmail,
        emailInput,
        setEmailInput,
        handleEmailSave,
        'your.email@example.com'
      )}

      {renderField(
        'Denomination',
        denomination,
        () => setShowDenominationModal(true)
      )}

      {renderField(
        'Mosque/Community',
        customField,
        () => setIsEditingCustom(true),
        isEditingCustom,
        customInput,
        setCustomInput,
        handleCustomSave,
        'Enter your mosque or community'
      )}

      {/* Age Range Selection Modal */}
      {renderSelectionModal(
        showAgeModal,
        'Select Age Range',
        AGE_RANGES,
        ageRange,
        setAgeRange,
        () => setShowAgeModal(false)
      )}

      {/* Denomination Selection Modal */}
      {renderSelectionModal(
        showDenominationModal,
        'Select Denomination',
        DENOMINATIONS,
        denomination,
        setDenomination,
        () => setShowDenominationModal(false)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  autoPopulatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radii.sm,
  },
  badgeText: {
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.primarySoft,
    padding: theme.spacing.md,
    borderRadius: theme.radii.sm,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    lineHeight: 18,
  },
  fieldContainer: {
    marginBottom: theme.spacing.md,
  },
  fieldLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  fieldValue: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
  },
  valueText: {
    flex: 1,
  },
  fieldInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...theme.shadows.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  modalTitle: {
    fontWeight: '600',
  },
  modalBody: {
    maxHeight: 300,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  modalItemSelected: {
    backgroundColor: theme.colors.primarySoft,
  },
  modalItemText: {
    flex: 1,
    fontWeight: '500',
  },
}); 