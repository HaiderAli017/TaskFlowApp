import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Lock, MoreHorizontal } from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    StatusBar as RNStatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../context/theme/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingsRow: React.FC<{ children: React.ReactNode; isFirst?: boolean }> = ({
    children,
    isFirst,
}) => (
    <View
        className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md ${isFirst ? '' : 'mt-4'
            }`}
    >
        {children}
    </View>
);

const ProfileSettingsScreen: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === 'dark';
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView
            edges={['top', 'left', 'right']}
            className="flex-1"
            style={{
                backgroundColor: isDarkMode ? '#111827' : '#F4F4F5',
                paddingTop: Math.max(insets.top - 6, 0), 
            }}
        >
            <RNStatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#111827' : '#F4F4F5'}
            />

            {/* Header */}
            <View className="flex-row items-center px-5 mb-4">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft size={24} color={isDarkMode ? '#FFFFFF' : '#1F2937'} />
                </TouchableOpacity>
                <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white ml-3">Settings</Text>
                </View>
                <View className="w-6" />
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
                <SettingsRow isFirst>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-10 h-10 bg-[#E6EBFF] rounded-full items-center justify-center flex">
                                <Bell className="w-5 h-5" color="#5F3EFE" />
                            </View>
                            <View>
                                <Text className="font-semibold ml-2 text-gray-900 dark:text-white text-base">
                                    Notifications
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                    Push notifications and alerts
                                </Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#E5E7EB', true: '#5F3EFE' }}
                            thumbColor="#FFFFFF"
                            onValueChange={() => { }}
                            value={true}
                        />
                    </View>
                </SettingsRow>

                <SettingsRow>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <View className="w-5 h-5 bg-gray-900 dark:bg-white rounded-full" />
                            </View>
                            <View>
                                <Text className="font-semibold ml-2 text-gray-900 dark:text-white text-base">
                                    Dark Mode
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                    Switch to dark theme
                                </Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#E5E7EB', true: '#5F3EFE' }}
                            thumbColor="#FFFFFF"
                            onValueChange={toggleTheme}
                            value={isDarkMode}
                        />
                    </View>
                </SettingsRow>

                <SettingsRow>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-10 h-10 bg-[#E6EBFF] rounded-full flex items-center justify-center">
                                <View className="w-5 h-5 bg-[#5F3EFE] dark:bg-blue-400 rounded-full flex items-center justify-center">
                                    <Text className="text-white dark:text-gray-900 text-xs font-bold">A</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="font-semibold ml-2 text-gray-900 dark:text-white text-base">
                                    Language
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                    App language settings
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity className="flex-row items-center space-x-2">
                            <Text className="text-gray-500 dark:text-gray-400 mr-2 text-sm">English</Text>
                            <MoreHorizontal className="w-5 h-5" color={isDarkMode ? '#fff' : '#9CA3AF'} />
                        </TouchableOpacity>
                    </View>
                </SettingsRow>

                <SettingsRow>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-10 h-10 bg-[#E6EBFF] rounded-full flex items-center justify-center">
                                <Lock className="w-5 h-5" color="#5F3EFE" />
                            </View>
                            <View>
                                <Text className="font-semibold ml-2 text-gray-900 dark:text-white text-base">
                                    Privacy & Security
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                    Manage your privacy settings
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <MoreHorizontal className="w-5 h-5" color={isDarkMode ? '#fff' : '#9CA3AF'} />
                        </TouchableOpacity>
                    </View>
                </SettingsRow>

                <SettingsRow>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <View className="w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center">
                                    <Text className="text-white dark:text-gray-900 text-xs font-bold">?</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="font-semibold ml-2 text-gray-900 dark:text-white text-base">
                                    Help & Support
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                                    Get help and contact support
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <MoreHorizontal className="w-5 h-5" color={isDarkMode ? '#fff' : '#9CA3AF'} />
                        </TouchableOpacity>
                    </View>
                </SettingsRow>

                <SettingsRow>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center space-x-3">
                            <View className="w-10 h-10 bg-green-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <View className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
                                    <Text className="text-white dark:text-gray-900 text-xs font-bold italic">i</Text>
                                </View>
                            </View>
                            <View>
                                <Text className="font-semibold ml-2 text-gray-900 dark:text-white text-base">
                                    About TaskFlow
                                </Text>
                                <Text className="text-gray-500 dark:text-gray-400 ml-2 text-sm">Version 2.1.0</Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <MoreHorizontal className="w-5 h-5" color={isDarkMode ? '#fff' : '#9CA3AF'} />
                        </TouchableOpacity>
                    </View>
                </SettingsRow>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileSettingsScreen;
