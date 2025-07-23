import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import BlurTabBarBackground from '@/components/ui/TabBarBackground.ios';
import { useTheme } from '@/context/theme/ThemeContext';
import '../../styles/global.css';

export default function TabLayout() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#FFFFFF' : '#000000',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <BlurTabBarBackground />,
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
