import BottomNavigation from '@/components/BottomNavigation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
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

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
    <ThemedView style={{ flex: 1, backgroundColor: BG }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 22, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingTop: 25, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.13, shadowRadius: 10, elevation: 6, }}>
        <ThemedText type="subtitle" style={{ fontWeight: 'bold', fontSize: 20, color: TEXT, letterSpacing: 0.2 }}>Calendar</ThemedText>
        <TouchableOpacity
          style={{ backgroundColor: '#E6EBFF', borderRadius: 14, paddingHorizontal: 20, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', shadowColor: '#5F3EFE', shadowOpacity: 0.13, shadowRadius: 10, elevation: 6, minWidth: 148, justifyContent: 'center' }}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={{ color: '#5F3EFE', fontWeight: '600', fontSize: 16, letterSpacing: 0.1 }}>{selectedMonth.label}</Text>
          <IconSymbol name="chevron.right" size={18} color="#5F3EFE" style={{ marginLeft: 10, transform: [{ rotate: '90deg' }] }} />
        </TouchableOpacity>
      </View>
      {/* Month Dropdown Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.08)' }} onPress={() => setModalVisible(false)}>
          <View style={{ position: 'absolute', top: 70, right: 20, backgroundColor: '#fff', borderRadius: 16, elevation: 8, shadowColor: '#000', shadowOpacity: 0.10, shadowRadius: 12, minWidth: 180, paddingVertical: 6, paddingHorizontal: 0 }}>
            {MONTHS.map((m, i) => (
              <TouchableOpacity
                key={m.value}
                style={{ paddingVertical: 14, paddingHorizontal: 22, backgroundColor: selectedMonth.value === m.value ? '#5F3EFE' : '#fff', borderRadius: 12, marginVertical: 2, marginHorizontal: 6, justifyContent: 'center', alignItems: 'flex-start' }}
                onPress={() => { setSelectedMonth(m); setModalVisible(false); }}
                activeOpacity={0.85}
              >
                <Text style={{ color: selectedMonth.value === m.value ? '#fff' : '#5F3EFE', fontWeight: '600', fontSize: 16 }}>{m.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
      {/* Date Selector */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 13, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 6, marginBottom: 18, elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4 }}>
        {DATES.map((d, i) => (
          <TouchableOpacity
            key={d.date}
            style={{ alignItems: 'center', flex: 1, borderRadius: 12, backgroundColor: selectedDate === i ? '#5F3EFE' : 'transparent', paddingVertical: 7, marginHorizontal: 1, minWidth: 44, justifyContent: 'center' }}
            onPress={() => setSelectedDate(i)}
            activeOpacity={0.85}
          >
            <Text style={{ color: selectedDate === i ? '#fff' : '#71717A', fontWeight: '700', fontSize: 13, marginBottom: 2 }}>{d.day}</Text>
            <Text style={{ color: selectedDate === i ? '#fff' : TEXT, fontWeight: 'bold', fontSize: 17 }}>{d.date}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Events List */}
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {EVENTS.map((event, idx) => (
          <View
            key={event.title}
            style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 18 }}
          >
            <Text style={{ width: 54, color: SUBTEXT, fontWeight: '600', fontSize: 15, marginTop: 10, marginLeft: 10 }}>{event.time}</Text>
            <View style={{ flex: 1, backgroundColor: event.color, borderRadius: 16, padding: 16, marginLeft: 2, shadowColor: '#5F3EFE', shadowOpacity: event.shadow ? 0.08 : 0, shadowRadius: 8, elevation: event.shadow ? 3 : 0 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: event.textColor, fontWeight: 'bold', fontSize: 16 }}>{event.title}</Text>
                <View style={{ backgroundColor: event.badgeColor, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 2, minWidth: 48, alignItems: 'center' }}>
                  <Text style={{ color: event.badgeTextColor, fontWeight: 'bold', fontSize: 13 }}>{event.priority}</Text>
                </View>
              </View>
              <Text style={{ color: event.textColor === '#fff' ? '#E0E7FF' : SUBTEXT, fontWeight: '500', fontSize: 14, marginTop: 4 }}>{event.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="calendar" />
    </ThemedView>
    </>
  );
}
