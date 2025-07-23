import { useTheme } from '@/context/theme/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PRIMARY = '#5F3EFE';
const INACTIVE_LIGHT = '#71717A';
const INACTIVE_DARK = '#A1A1AA';

export type BottomTabKey = 'home' | 'calendar' | 'plus' | 'focus' | 'profile';

export default function BottomNavigation({ activeTab }: { activeTab: BottomTabKey }) {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const inactiveColor = isDarkMode ? INACTIVE_DARK : INACTIVE_LIGHT;
  const activeColor = PRIMARY;

  return (
    <View className={`flex-row items-center justify-between px-4 py-2 rounded-t-2xl shadow-lg ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white'}`}>
      {/* Home */}
      <TouchableOpacity
        className="items-center flex-1 py-1"
        onPress={() => router.replace('/dashboard')}
      >
        <Feather name="home" size={24} color={activeTab === 'home' ? activeColor : inactiveColor} />
        <Text className="text-xs mt-1 font-semibold" style={{ color: activeTab === 'home' ? activeColor : inactiveColor }}>Home</Text>
      </TouchableOpacity>
      {/* Calendar */}
      <TouchableOpacity
        className="items-center flex-1 py-1"
        onPress={() => router.replace('/calendar')}
      >
        <Feather name="calendar" size={24} color={activeTab === 'calendar' ? activeColor : inactiveColor} />
        <Text className="text-xs mt-1 font-semibold" style={{ color: activeTab === 'calendar' ? activeColor : inactiveColor }}>Calendar</Text>
      </TouchableOpacity>
      {/* Plus (Floating Action) */}
      <TouchableOpacity
        className="w-14 h-14 rounded-full items-center justify-center mx-2 -mt-7 shadow-lg"
        style={{ backgroundColor: activeColor }}
        onPress={() => router.replace('/createTask')}
      >
        <Feather name="plus" size={32} color="#fff" />
      </TouchableOpacity>
      {/* Focus */}
      <TouchableOpacity className="items-center flex-1 py-1" onPress={() => router.replace('/focusTimer')}>
        <Feather name="target" size={24} color={activeTab === 'focus' ? activeColor : inactiveColor} />
        <Text className="text-xs mt-1 font-semibold" style={{ color: activeTab === 'focus' ? activeColor : inactiveColor }}>Focus</Text>
      </TouchableOpacity>
      {/* Profile */}
      <TouchableOpacity className="items-center flex-1 py-1" onPress={() => router.replace('/profile')}>
        <Feather name="user" size={24} color={activeTab === 'profile' ? activeColor : inactiveColor} />
        <Text className="text-xs mt-1 font-semibold" style={{ color: activeTab === 'profile' ? activeColor : inactiveColor }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
} 