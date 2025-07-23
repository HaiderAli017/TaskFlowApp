import BottomNavigation from '@/components/BottomNavigation';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/theme/ThemeContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const MONTHS = [
  { label: 'October 2024', value: '2024-10' },
  { label: 'November 2024', value: '2024-11' },
  { label: 'December 2024', value: '2024-12' },
];

const DATES = [
  { day: 'Mon', date: 15 },
  { day: 'Tue', date: 16 },
  { day: 'Wed', date: 17 },
  { day: 'Thu', date: 18 },
  { day: 'Fri', date: 19 },
  { day: 'Sat', date: 20 },
  { day: 'Sun', date: 21 },
];

const EVENTS = [
  {
    time: '08:00',
    title: 'Design Review',
    subtitle: '1 hour • Conference Room A',
    priority: 'High',
    color: '#5F3EFE',
    badgeColor: '#7C5CFA',
    textColor: '#fff',
    badgeTextColor: '#fff',
    shadow: true,
  },
  {
    time: '10:00',
    title: 'Team Standup',
    subtitle: '30 min • Virtual Meeting',
    priority: 'Medium',
    color: '#fff',
    badgeColor: '#E0D7FB',
    textColor: '#18181B',
    badgeTextColor: '#7C5CFA',
    shadow: true,
  },
  {
    time: '14:00',
    title: 'Client Presentation',
    subtitle: '2 hours • Client Office',
    priority: 'Low',
    color: '#fff',
    badgeColor: '#D1FADF',
    textColor: '#18181B',
    badgeTextColor: '#22C55E',
    shadow: true,
  },
];

const PRIMARY = '#5F3EFE';
const BG = '#F7F7FF';
const BORDER = '#E5E7EB';
const ACTIVE = '#7C5CFA';
const INACTIVE = '#F4F4F5';
const TEXT = '#18181B';
const SUBTEXT = '#71717A';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(2); // index of 17th
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#18181B' : '#FFFFFF'} translucent={false} />
    <View className="flex-1 bg-slate-50 dark:bg-gray-900">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pb-5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-6 mb-5 shadow-md">
        <Text className="font-bold text-xl text-gray-900 dark:text-white">Calendar</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#E6EBFF', borderRadius: 14, paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', shadowColor: '#5F3EFE', shadowOpacity: 0.13, shadowRadius: 10, elevation: 6, minWidth: 148, justifyContent: 'center' }}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text className="text-[#5F3EFE] dark:text-blue-400 font-semibold text-base">{selectedMonth.label}</Text>
          <IconSymbol name="chevron.right" size={18} color={isDarkMode ? '#60A5FA' : '#5F3EFE'} style={{ marginLeft: 10, transform: [{ rotate: '90deg' }] }} />
        </TouchableOpacity>
      </View>
      {/* Month Dropdown Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable className="flex-1 bg-black/10" onPress={() => setModalVisible(false)}>
          <View className="absolute top-20 right-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg min-w-[200px] p-2">
            {MONTHS.map((m, i) => (
              <TouchableOpacity
                key={m.value}
                className={`py-3 px-5 rounded-lg my-1 ${selectedMonth.value === m.value ? 'bg-[#5F3EFE]' : ''}`}
                onPress={() => { setSelectedMonth(m); setModalVisible(false); }}
                activeOpacity={0.85}
              >
                <Text className={`font-semibold text-base ${selectedMonth.value === m.value ? 'text-white' : 'text-gray-800 dark:text-gray-300'}`}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      {/* Date Selector */}
      <View className="flex-row justify-between mx-3 bg-white dark:bg-gray-800 rounded-2xl p-2 mb-4 shadow-md">
        {DATES.map((d, i) => (
          <TouchableOpacity
            key={d.date}
            className={`items-center flex-1 rounded-xl py-2 mx-0.5 ${selectedDate === i ? 'bg-[#5F3EFE]' : ''}`}
            onPress={() => setSelectedDate(i)}
            activeOpacity={0.85}
          >
            <Text className={`font-bold text-sm mb-1 ${selectedDate === i ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>{d.day}</Text>
            <Text className={`font-bold text-lg ${selectedDate === i ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{d.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Events List */}
      <View className="flex-1 px-3">
        {EVENTS.map((event, idx) => (
          <View
            key={event.title}
            className="flex-row items-start mb-4"
          >
            <Text className="w-16 text-gray-500 dark:text-gray-400 font-semibold text-base pt-2 pl-2">{event.time}</Text>
            <View className={`flex-1 rounded-2xl p-4 ml-1 shadow-md ${event.shadow ? (isDarkMode ? 'bg-gray-800' : 'bg-white') : ''}`}>
              <View className="flex-row items-center justify-between">
                <Text className={`font-bold text-base ${event.textColor === '#000' ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{event.title}</Text>
                <View style={{ backgroundColor: event.badgeColor }} className="rounded-lg px-3 py-1">
                  <Text style={{ color: event.badgeTextColor }} className="font-bold text-sm">{event.priority}</Text>
                </View>
              </View>
              <Text className={`font-medium text-sm mt-1 ${event.textColor === '#fff' ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>{event.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="calendar" />
    </View>
    </>
  );
}
