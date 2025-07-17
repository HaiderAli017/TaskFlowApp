import BottomNavigation from '@/components/BottomNavigation';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TASKS = [
  {
    priority: 'High Priority',
    priorityBg: '#6C47FF',
    priorityText: '#fff',
    status: 'Due Today',
    statusColor: '#BDBDBD',
    title: 'Landing Page Redesign',
    time: 'Today, 2:00 PM',
    team: 'Design Team',
    dotColor: '#6C47FF',
    avatars: [
      { label: 'A', color: '#6C47FF' },
      { label: 'B', color: '#6C47FF' },
    ],
  },
  {
    priority: 'Medium Priority',
    priorityBg: '#A3A8F7',
    priorityText: '#fff',
    status: 'Tomorrow',
    statusColor: '#BDBDBD',
    title: 'Mobile App Prototype',
    time: 'Tomorrow, 10:00 AM',
    team: 'Development',
    dotColor: '#A3A8F7',
    avatars: [
      { label: 'C', color: '#A3A8F7' },
    ],
  },
  {
    priority: 'Low Priority',
    priorityBg: '#E5E7EB',
    priorityText: '#71717A',
    status: 'This Week',
    statusColor: '#BDBDBD',
    title: 'Team Meeting Prep',
    time: 'Friday, 3:00 PM',
    team: 'Management',
    dotColor: '#22C55E',
    avatars: [
      { label: 'D', color: '#22C55E' },
      { label: 'E', color: '#22C55E' },
    ],
  },
];

export default function TaskListScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#F7F7FF]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-6 pb-3">
        <Text className="text-lg font-extrabold text-[#18181B]" style={{ fontFamily: 'System' }}>Your Tasks</Text>
        <View className="flex-row items-center gap-2">
          <TouchableOpacity>
            <Feather name="search" size={20} color="#71717A" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="filter" size={20} color="#71717A" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Task Cards */}
      <ScrollView className="flex-1 px-3" showsVerticalScrollIndicator={false}>
        {TASKS.map((task, idx) => (
          <TouchableOpacity key={idx} onPress={() => router.push('/taskDetail')}>
            <View
              className="bg-white rounded-2xl p-4 mb-4"
            >
              {/* Top Row: Priority and Status */}
              <View className="flex-row justify-between items-center mb-2">
                <View style={{ backgroundColor: task.priorityBg }} className="px-3 py-1 rounded-full">
                  <Text className="text-xs font-bold" style={{ color: task.priorityText, fontFamily: 'System' }}>{task.priority}</Text>
                </View>
                <Text className="text-xs font-semibold" style={{ color: task.statusColor, fontFamily: 'System' }}>{task.status}</Text>
              </View>
              {/* Title */}
              <View className="flex-row items-center mb-1">
                <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: task.dotColor }} />
                <Text className="text-base font-extrabold text-[#18181B]" style={{ fontFamily: 'System' }}>{task.title}</Text>
              </View>
              {/* Time and Team */}
              <Text className="text-xs text-[#71717A] mb-2" style={{ fontFamily: 'System', fontWeight: '500' }}>{task.time} • {task.team}</Text>
              {/* Avatars */}
              <View className="flex-row justify-end mt-1">
                {task.avatars.map((avatar, i) => (
                  <View
                    key={i}
                    className="w-7 h-7 rounded-full items-center justify-center ml-[-8px] border-2 border-white"
                    style={{ backgroundColor: avatar.color, zIndex: 10 - i }}
                  >
                    <Text className="text-xs font-bold text-white" style={{ fontFamily: 'System' }}>{avatar.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Bottom Navigation (all icons inactive, Home navigates to Dashboard) */}
      <BottomNavigation activeTab="home" />
    </SafeAreaView>
  );
}
