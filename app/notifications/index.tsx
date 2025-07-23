import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/theme/ThemeContext';

const NOTIFICATIONS = [
  {
    icon: 'check-circle',
    title: 'Task Completed',
    description: 'Landing page design has been completed by Sarah Brown',
    time: '2m ago',
    tag: 'High Priority',
    tagColor: '#E0E7FF',
    tagTextColor: '#6366F1',
    iconBg: '#E0E7FF',
    iconColor: '#6366F1',
  },
  {
    icon: 'droplet',
    title: 'Hydration Reminder',
    description: 
      
      `Time to drink some water! You’re 2 glasses behind your goal.`,
    time: '15m ago',
    tag: 'Health',
    tagColor: '#DBEAFE',
    tagTextColor: '#2563EB',
    iconBg: '#DBEAFE',
    iconColor: '#2563EB',
  },
  {
    icon: 'clock',
    title: 'Focus Session Complete',
    description: 'Great job! You completed a 25-minute focus session. Time for a break.',
    time: '1h ago',
    tag: 'Productivity',
    tagColor: '#DCFCE7',
    tagTextColor: '#22C55E',
    iconBg: '#DCFCE7',
    iconColor: '#22C55E',
  },
  {
    icon: 'smile',
    title: 'Daily Mood Check-in',
    description: 'How are you feeling today? Take a moment to track your mood.',
    time: '3h ago',
    tag: 'Wellness',
    tagColor: '#FEF9C3',
    tagTextColor: '#EAB308',
    iconBg: '#FEF9C3',
    iconColor: '#EAB308',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-[#F7F7FF]'}`}>
      {/* Header */}
      <View className="relative flex-row items-center justify-center px-2 py-4 bg-transparent">
        <TouchableOpacity onPress={() => router.push('/dashboard')} className="absolute left-2 p-2">
          <Feather name="arrow-left" size={26} color={isDarkMode ? '#FFF' : '#18181B'} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white text-center flex-1">Notifications</Text>
        <TouchableOpacity className="absolute right-2 p-2">
          <Text className="text-violet-600 dark:text-violet-400 font-semibold text-sm">Mark all read</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((item, idx) => (
          <View
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 flex-row items-start shadow-md"
          >
            {/* Icon */}
            <View className="w-11 h-11 rounded-full justify-center items-center mr-3.5 mt-0.5" style={{ backgroundColor: isDarkMode ? '#374151' : item.iconBg }}>
              <Feather name={item.icon as any} size={22} color={'#5F3EFE'} />
            </View>
            {/* Content */}
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-base text-gray-900 dark:text-white">{item.title}</Text>
                <Text className="text-gray-400 dark:text-gray-500 text-xs ml-2">{item.time}</Text>
              </View>
              <Text className="text-gray-600 dark:text-gray-300 text-sm mt-0.5 mb-2.5">{item.description}</Text>
              <View className="self-start rounded-lg px-2.5 py-1" style={{ backgroundColor: isDarkMode ? '#4B5563' : item.tagColor }}>
                <Text className="font-semibold text-xs" style={{ color: isDarkMode ? '#D1D5DB' : item.tagTextColor }}>{item.tag}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
