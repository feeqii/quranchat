import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../constants/theme';
import { Icon } from '../components/atoms/Icon';

// Screen imports
import { ChatHomeScreen } from '../screens/main/ChatHomeScreen';
import { TodayStackNavigator } from './TodayStackNavigator';
import { QuranHomeScreen } from '../screens/quran/QuranHomeScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Today"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case 'Chat':
              return <Icon.Chat size={size} color={color} />;
            case 'Quran':
              return <Icon.Quran size={size} color={color} />;
            case 'Today':
              return <Icon.Today size={size} color={color} />;
            case 'Profile':
              return <Icon.Profile size={size} color={color} />;
            default:
              return <Icon.Today size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.primarySoft,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSizes.small,
          fontFamily: theme.fonts.body,
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Chat" 
        component={ChatHomeScreen}
        options={{
          tabBarLabel: 'Chat',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Quran" 
        component={QuranHomeScreen}
        options={{
          tabBarLabel: 'Quran',
        }}
      />
      <Tab.Screen 
        name="Today" 
        component={TodayStackNavigator}
        options={{
          tabBarLabel: 'Today',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}; 