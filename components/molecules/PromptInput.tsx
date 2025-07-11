import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../../constants/theme';
import { Icon } from '../atoms/Icon';

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  isSending?: boolean;
  style?: ViewStyle;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  value,
  onChangeText,
  onSend,
  isSending = false,
  style,
}) => {
  const handleSubmit = () => {
    if (value.trim() && !isSending) {
      onSend();
    }
  };

  const canSend = value.trim().length > 0 && !isSending;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Write any question here"
          placeholderTextColor={theme.colors.textMuted}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          multiline={false}
          editable={!isSending}
          selectTextOnFocus={true}
          blurOnSubmit={false}
        />
        
        <TouchableOpacity
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
          onPress={handleSubmit}
          disabled={!canSend}
          activeOpacity={0.7}
        >
          {isSending ? (
            <Icon.Loading
              size={20}
              color={theme.colors.textMuted}
              style={styles.loadingIcon}
            />
          ) : (
            <Icon.Send
              size={20}
              color={canSend ? theme.colors.primary : theme.colors.textMuted}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.sm,
    minHeight: 48,
    maxHeight: 48,
  },
  textInput: {
    flex: 1,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.body,
    color: theme.colors.textPrimary,
    paddingVertical: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    lineHeight: 20,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: theme.radii.full,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.xs,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  loadingIcon: {
    // Could add animation here in the future
  },
}); 