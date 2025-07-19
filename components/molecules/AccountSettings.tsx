import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { theme } from '../../constants/theme';
import { Typography } from '../atoms/Typography';
import { Icon } from '../atoms/Icon';
import { useProfileStore } from '../../store/useProfileStore';

export const AccountSettings: React.FC = () => {
  const { 
    personalizeConversations, 
    reminderSettings, 
    isOnboardingDataSynced,
    setPersonalizeConversations, 
    setReminderSettings 
  } = useProfileStore();

  const handleLogin = () => {
    Alert.alert('Login/Logout', 'Account management features coming soon!');
  };

  const handleManageReminders = () => {
    Alert.alert('Manage Reminders', 'Reminder settings will be available soon.');
  };

  const togglePersonalization = (value: boolean) => {
    setPersonalizeConversations(value);
  };

  const toggleReminders = (value: boolean) => {
    setReminderSettings({
      ...reminderSettings,
      enabled: value,
    });
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    onPress?: () => void,
    showSwitch?: boolean,
    switchValue?: boolean,
    onSwitchChange?: (value: boolean) => void,
    isAutoSynced?: boolean
  ) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Typography variant="body" color={theme.colors.textPrimary} style={styles.itemTitle}>
            {title}
          </Typography>
          {isAutoSynced && (
            <View style={styles.syncBadge}>
              <Icon.Check size={12} color={theme.colors.primary} />
            </View>
          )}
        </View>
        <Typography variant="small" color={theme.colors.textMuted} style={styles.itemSubtitle}>
          {subtitle}
        </Typography>
      </View>
      
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: theme.colors.textMuted, true: theme.colors.primarySoft }}
          thumbColor={switchValue ? theme.colors.primary : theme.colors.surface}
        />
      ) : (
        <Icon.ChevronRight size={16} color={theme.colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Typography variant="h3" color={theme.colors.textPrimary} style={styles.sectionTitle}>
        Account & Settings
      </Typography>

      <View style={styles.itemsContainer}>
        {renderSettingItem(
          <Icon.Profile size={20} color={theme.colors.primary} />,
          'Login / Account',
          'Manage your account and authentication',
          handleLogin
        )}

        {renderSettingItem(
          <Icon.Brain size={20} color={theme.colors.primary} />,
          'Personalize Conversations',
          'AI learns from your preferences and past conversations',
          undefined,
          true,
          personalizeConversations,
          togglePersonalization
        )}

        {renderSettingItem(
          <Icon.Bell size={20} color={theme.colors.primary} />,
          'Daily Reminders',
          isOnboardingDataSynced 
            ? (reminderSettings.enabled ? `Enabled at ${reminderSettings.time} (from setup)` : 'Disabled')
            : (reminderSettings.enabled ? `Enabled at ${reminderSettings.time}` : 'Disabled'),
          handleManageReminders,
          true,
          reminderSettings.enabled,
          toggleReminders,
          isOnboardingDataSynced
        )}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogin}>
        <Icon.LogOut size={20} color={theme.colors.danger} />
        <Typography variant="body" color={theme.colors.danger} style={styles.logoutText}>
          Logout
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  itemsContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    marginBottom: theme.spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primarySoft,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: theme.spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  itemSubtitle: {
    lineHeight: 18,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncBadge: {
    marginStart: theme.spacing.xs,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radii.sm,
    padding: theme.spacing.xs,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  logoutText: {
    marginStart: theme.spacing.sm,
    fontWeight: '500',
  },
}); 