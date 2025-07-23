import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/theme/ThemeContext';

const PURPLE = '#5F3EFE';

export default function Onboarding() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-[#F7F7FF]'}`}
    >
      {/* Main Icon */}
      <View
        className="w-28 h-28 rounded-2xl items-center justify-center mb-8 shadow-lg"
        style={{ backgroundColor: isDarkMode ? '#4C1D95' : PURPLE }}
      >
        <Feather name="check-square" size={56} color="#fff" />
      </View>

      {/* Features */}
      <View className="w-full mb-12">
        {[
          {
            icon: <Feather name="check-circle" size={24} color="#fff" />,
            text: 'Organize your daily tasks efficiently',
          },
          {
            icon: <MaterialCommunityIcons name="account-group-outline" size={24} color="#fff" />,
            text: 'Collaborate seamlessly with your team',
          },
          {
            icon: <FontAwesome5 name="chart-line" size={20} color="#fff" />,
            text: 'Track progress and achieve goals',
          },
        ].map((item, idx) => (
          <View
            key={idx}
            className="flex-row items-center mb-7"
          >
            <View
              className="w-11 h-11 rounded-full items-center justify-center mr-4 shadow-md"
              style={{ backgroundColor: isDarkMode ? '#4C1D95' : PURPLE }}
            >
              {item.icon}
            </View>
            <Text
              className="flex-1 text-base font-bold text-gray-900 dark:text-white"
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={() => router.replace('/login')}
        className="w-full items-center py-4 rounded-2xl shadow-lg"
        style={{ backgroundColor: isDarkMode ? '#4C1D95' : PURPLE }}
        activeOpacity={0.85}
      >
        <Text
          className="text-white font-bold text-base"
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
