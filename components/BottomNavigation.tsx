import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const PRIMARY = '#5F3EFE';
const INACTIVE = '#71717A';

export type BottomTabKey = 'home' | 'calendar' | 'plus' | 'focus' | 'profile';

export default function BottomNavigation({ activeTab }: { activeTab: BottomTabKey }) {
  const router = useRouter();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 18, paddingVertical: 8, borderTopLeftRadius: 18, borderTopRightRadius: 18, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 8 }}>
      {/* Home */}
      <TouchableOpacity
        style={{ alignItems: 'center', flex: 1, paddingVertical: 4 }}
        onPress={() => router.replace('/dashboard')}
      >
        <Feather name="home" size={24} color={activeTab === 'home' ? PRIMARY : INACTIVE} />
        <Text style={{ color: activeTab === 'home' ? PRIMARY : INACTIVE, fontSize: 12, marginTop: 2, fontWeight: '600' }}>Home</Text>
      </TouchableOpacity>
      {/* Calendar */}
      <TouchableOpacity
        style={{ alignItems: 'center', flex: 1, paddingVertical: 4 }}
        onPress={() => router.replace('/calendar')}
      >
        <Feather name="calendar" size={24} color={activeTab === 'calendar' ? PRIMARY : INACTIVE} />
        <Text style={{ color: activeTab === 'calendar' ? PRIMARY : INACTIVE, fontSize: 12, marginTop: 2, fontWeight: '600' }}>Calendar</Text>
      </TouchableOpacity>
      {/* Plus (Floating Action) */}
      <TouchableOpacity 
        style={{ backgroundColor: PRIMARY, borderRadius: 999, width: 56, height: 56, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, marginTop: -28, shadowColor: PRIMARY, shadowOpacity: 0.18, shadowRadius: 12, elevation: 8 }}
        onPress={() => router.replace('/createTask')}
      >
        <Feather name="plus" size={32} color="#fff" />
      </TouchableOpacity>
      {/* Focus */}
      <TouchableOpacity style={{ alignItems: 'center', flex: 1, paddingVertical: 4 }}>
        <Feather name="target" size={24} color={activeTab === 'focus' ? PRIMARY : INACTIVE} />
        <Text style={{ color: activeTab === 'focus' ? PRIMARY : INACTIVE, fontSize: 12, marginTop: 2, fontWeight: '600' }}>Focus</Text>
      </TouchableOpacity>
      {/* Profile */}
      <TouchableOpacity style={{ alignItems: 'center', flex: 1, paddingVertical: 4 }} onPress={() => router.replace('/profile')}>
        <Feather name="user" size={24} color={activeTab === 'profile' ? PRIMARY : INACTIVE} />
        <Text style={{ color: activeTab === 'profile' ? PRIMARY : INACTIVE, fontSize: 12, marginTop: 2, fontWeight: '600' }}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
} 