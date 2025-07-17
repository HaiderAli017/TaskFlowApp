import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7FF' }}>
      {/* Header */}
      <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8, paddingTop: 10, paddingBottom: 18, backgroundColor: '#F7F7FF', zIndex: 10 }}>
        <TouchableOpacity onPress={() => router.push('/dashboard')} style={{ position: 'absolute', left: 0, padding: 6 }}>
          <Feather name="arrow-left" size={26} color="#18181B" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#18181B', textAlign: 'center', flex: 1 }}>Notifications</Text>
        <TouchableOpacity style={{ position: 'absolute', right: 0, padding: 6 }}>
          <Text style={{ color: '#6366F1', fontWeight: '600', fontSize: 15 }}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((item, idx) => (
          <View
            key={idx}
            style={{
              backgroundColor: '#fff',
              borderRadius: 18,
              padding: 18,
              marginBottom: 16,
              flexDirection: 'row',
              alignItems: 'flex-start',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.06,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            {/* Icon */}
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: item.iconBg, justifyContent: 'center', alignItems: 'center', marginRight: 14, marginTop: 2 }}>
              <Feather name={item.icon as any} size={22} color={item.iconColor} />
            </View>
            {/* Content */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#18181B' }}>{item.title}</Text>
                <Text style={{ color: '#A1A1AA', fontSize: 13, marginLeft: 8 }}>{item.time}</Text>
              </View>
              <Text style={{ color: '#71717A', fontSize: 14, marginTop: 2, marginBottom: 10 }}>{item.description}</Text>
              <View style={{ alignSelf: 'flex-start', backgroundColor: item.tagColor, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3 }}>
                <Text style={{ color: item.tagTextColor, fontWeight: '600', fontSize: 13 }}>{item.tag}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
