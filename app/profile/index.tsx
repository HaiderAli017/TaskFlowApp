import BottomNavigation from '@/components/BottomNavigation';
import { useRouter } from 'expo-router';
import {
  BarChart3,
  LucideProps,
  Mail,
  MoreHorizontal,
  Settings,
  Users,
} from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useTheme } from '@/context/theme/ThemeContext';

interface InfoCardProps {
  icon: React.ReactElement<LucideProps>;
  title: string;
  subtitle: string;
}

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
          <Text className="text-base font-bold text-gray-800 dark:text-white">
            {title}
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <MoreHorizontal size={24} color={isDarkMode ? '#9CA3AF' : '#9CA3AF'} />
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F4F4F5'}
      />

      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? '#111827' : '#F4F4F5',
        }}
      >
        <View className="flex-1">
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header (scrollable now) */}
            <View className="flex-row justify-between items-center pt-2 pb-3">
              <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                Profile
              </Text>
              <TouchableOpacity onPress={() => router.push('/profileSetting')}>
                <Settings size={26} color={isDarkMode ? '#FFF' : '#4B5563'} />
              </TouchableOpacity>
            </View>

            {/* Profile Info */}
            <View className="items-center mt-4">
              <View className="w-28 h-28 bg-[#5F3EFE] rounded-full justify-center items-center">
                <Text className="text-white text-5xl font-bold">D</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
                Daisy Johnson
              </Text>
              <Text className="text-base text-gray-500 dark:text-gray-400 mt-1">
                Senior Product Designer
              </Text>
              <View className="bg-violet-100 dark:bg-gray-700 px-4 py-1.5 rounded-full mt-3">
                <Text className="text-violet-700 dark:text-[#5F3EFE] font-semibold text-sm">
                  Team Lead
                </Text>
              </View>
            </View>

            {/* Info Cards */}
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

            {/* Edit Profile */}
            <TouchableOpacity className="bg-[#5F3EFE] rounded-full py-4 mt-8">
              <Text className="text-white text-center text-lg font-bold">
                Edit Profile
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <BottomNavigation activeTab="profile" />
      </SafeAreaView>
    </>
  );
};

export default ProfileScreen;