import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Settings, Mail, Users, BarChart3, MoreHorizontal } from 'lucide-react-native';
import BottomNavigation from '@/components/BottomNavigation';

// Assuming you have this component in your project structure
// import BottomNavigation from '@/components/BottomNavigation';

// --- TYPE DEFINITIONS ---
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

// --- REUSABLE InfoCard COMPONENT ---
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, subtitle }) => {
  return (
    <View className="bg-white rounded-2xl p-5 flex-row items-center justify-between mt-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="bg-violet-100 rounded-full w-12 h-12 justify-center items-center">
          {icon}
        </View>
        <View className="ml-4">
          <Text className="text-base font-bold text-gray-800">{title}</Text>
          <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <MoreHorizontal size={24} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};


// --- MAIN PROFILE SCREEN COMPONENT ---
const ProfileScreen: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1">
          {/* --- Header --- */}
          <View className="flex-row justify-between items-center p-5 bg-slate-50">
            <Text className="text-3xl font-bold text-gray-900">Profile</Text>
            <TouchableOpacity>
              <Settings size={26} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            {/* --- Profile Info Section --- */}
            <View className="items-center mt-6">
              <View className="w-28 h-28 bg-violet-600 rounded-full justify-center items-center">
                <Text className="text-white text-5xl font-bold">D</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900 mt-4">Daisy Johnson</Text>
              <Text className="text-base text-gray-500 mt-1">Senior Product Designer</Text>
              <View className="bg-violet-100 px-4 py-1.5 rounded-full mt-3">
                <Text className="text-violet-700 font-semibold text-sm">Team Lead</Text>
              </View>
            </View>

            {/* --- Information Cards Section --- */}
            <View className="mt-8">
              <InfoCard
                icon={<Mail size={24} color="#6D28D9" />}
                title="Email Address"
                subtitle="daisy.johnson@company.com"
              />
              <InfoCard
                icon={<Users size={24} color="#6D28D9" />}
                title="Department"
                subtitle="Design Team • 12 members"
              />
              <InfoCard
                icon={<BarChart3 size={24} color="#6D28D9" />}
                title="Performance"
                subtitle="95% completion rate"
              />
            </View>

            {/* --- Edit Profile Button --- */}
            <TouchableOpacity className="bg-violet-600 rounded-full py-4 mt-8">
              <Text className="text-white text-center text-lg font-bold">Edit Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
       <BottomNavigation activeTab="profile" />
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;