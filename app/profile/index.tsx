import BottomNavigation from '@/components/BottomNavigation';
import { useRouter } from 'expo-router';
import { BarChart3, LucideProps, Mail, MoreHorizontal, Settings, Users } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../context/theme/ThemeContext';

// Assuming you have this component in your project structure
// import BottomNavigation from '@/components/BottomNavigation';

// --- TYPE DEFINITIONS ---
interface InfoCardProps {
  icon: React.ReactElement<LucideProps>;
  title: string;
  subtitle: string;
}

// --- REUSABLE InfoCard COMPONENT ---
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, subtitle }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  return (
    <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 flex-row items-center justify-between mt-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="bg-violet-100 dark:bg-gray-700 rounded-full w-12 h-12 justify-center items-center">
          {React.cloneElement(icon, { color: '#5F3EFE' })}
        </View>
        <View className="ml-4">
          <Text className="text-base font-bold text-gray-800 dark:text-white">{title}</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <MoreHorizontal size={24} color={isDarkMode ? '#9CA3AF' : '#9CA3AF'} />
      </TouchableOpacity>
    </View>
  );
};


// --- MAIN PROFILE SCREEN COMPONENT ---
const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1F2937' : '#F8FAFC'} />
      <SafeAreaView className="flex-1 bg-slate-50 dark:bg-gray-900">
        <View className="flex-1">
          {/* --- Header --- */}
          <View className="flex-row justify-between items-center p-5 bg-slate-50 dark:bg-gray-900">
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">Profile</Text>
            <TouchableOpacity onPress={() => router.push('/profileSetting')}>
              <Settings size={26} color={isDarkMode ? '#FFF' : '#4B5563'} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            {/* --- Profile Info Section --- */}
            <View className="items-center mt-6">
              <View className="w-28 h-28 bg-[#5F3EFE] rounded-[100%] justify-center items-center">
                <Text className="text-white text-5xl font-bold">D</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Daisy Johnson</Text>
              <Text className="text-base text-gray-500 dark:text-gray-400 mt-1">Senior Product Designer</Text>
              <View className="bg-violet-100 dark:bg-gray-700 px-4 py-1.5 rounded-full mt-3">
                <Text className="text-violet-700 dark:text-[#5F3EFE] font-semibold text-sm">Team Lead</Text>
              </View>
            </View>

            {/* --- Information Cards Section --- */}
            <View className="mt-8">
              <InfoCard
                icon={<Mail size={24} color="#5F3EFE" />}
                title="Email Address"
                subtitle="daisy.johnson@company.com"
              />
              <InfoCard
                icon={<Users size={24} color="#5F3EFE" />}
                title="Department"
                subtitle="Design Team • 12 members"
              />
              <InfoCard
                icon={<BarChart3 size={24} color="#5F3EFE" />}
                title="Performance"
                subtitle="95% completion rate"
              />
            </View>

            {/* --- Edit Profile Button --- */}
            <TouchableOpacity className="bg-[#5F3EFE] rounded-full py-4 mt-8">
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