import { useTheme } from '@/context/theme/ThemeContext';
import { Bell, Quote, X, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Type Definitions ---
export interface TimerSettings {
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    autoStartNext: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
    showQuotes: boolean;
}

interface SettingsProps {
    visible: boolean;
    onClose: () => void;
    onSave: (newSettings: TimerSettings) => void;
    currentSettings: TimerSettings;
}

// --- Reusable Components for this screen ---
const DurationInput: React.FC<{ label: string; value: number; onChange: (value: number) => void; }> = ({ label, value, onChange }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    return (
        <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
            <Text className="text-base text-gray-700 dark:text-gray-300">{label}</Text>
            <View className="flex-row items-center bg-gray-100 dark:bg-gray-600 rounded-lg">
                <TextInput
                    className="w-16 text-center text-base font-semibold text-gray-800 dark:text-white py-2"
                    value={String(value)}
                    onChangeText={(text) => onChange(parseInt(text, 10) || 0)}
                    keyboardType="number-pad"
                    maxLength={3}
                    placeholderTextColor={isDarkMode ? '#A0AEC0' : '#9CA3AF'}
                />
                <Text className="text-base text-gray-500 dark:text-gray-400 pr-4">min</Text>
            </View>
        </View>
    );
};

const SettingsToggle: React.FC<{ label: string; icon: React.ReactNode; value: boolean; onToggle: (value: boolean) => void; }> = ({ label, icon, value, onToggle }) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    return (
        <View className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
                <View className="w-8 items-center">{icon}</View>
                <Text className="text-base text-gray-700 dark:text-gray-300 ml-4">{label}</Text>
            </View>
            <Switch
                trackColor={{ false: isDarkMode ? "#4B5563" : "#E5E7EB", true: "#8B5CF6" }}
                thumbColor={value ? "#5F3EFE" : (isDarkMode ? "#9CA3AF" : "#F4F3F4")}
                ios_backgroundColor={isDarkMode ? "#4B5563" : "#E5E7EB"}
                onValueChange={onToggle}
                value={value}
            />
        </View>
    );
};

// --- Main Settings Screen Component ---
const FocusTimerSettingsScreen: React.FC<SettingsProps> = ({ onClose, onSave, currentSettings }) => {
    const [settings, setSettings] = useState<TimerSettings>(currentSettings);
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const handleSave = () => {
        onSave(settings);
        onClose();
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-gray-900">
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1F2937' : '#FFFFFF'} />
            {/* --- Header --- */}
            <View className="flex-row justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <TouchableOpacity onPress={onClose} className="p-1">
                    <X size={26} color={isDarkMode ? '#FFF' : '#333'} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-800 dark:text-white">Timer Settings</Text>
                <View className="w-8" />
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* --- Time Settings Section --- */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">DURATIONS</Text>
                    <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
                        <DurationInput label="Focus Duration" value={settings.focusDuration} onChange={(val) => setSettings(s => ({ ...s, focusDuration: val }))} />
                        <DurationInput label="Short Break" value={settings.shortBreakDuration} onChange={(val) => setSettings(s => ({ ...s, shortBreakDuration: val }))} />
                        <DurationInput label="Long Break" value={settings.longBreakDuration} onChange={(val) => setSettings(s => ({ ...s, longBreakDuration: val }))} />
                    </View>
                </View>

                {/* --- General Settings Section --- */}
                <View>
                    <Text className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">GENERAL</Text>
                    <View className="bg-white dark:bg-gray-800 rounded-xl p-4">
                        <SettingsToggle label="Auto-start next session" icon={<Zap size={22} color={isDarkMode ? '#A0AEC0' : '#6B7280'} />} value={settings.autoStartNext} onToggle={(val) => setSettings(s => ({ ...s, autoStartNext: val }))} />
                        <SettingsToggle label="Enable Sound" icon={<Bell size={22} color={isDarkMode ? '#A0AEC0' : '#6B7280'} />} value={settings.soundEnabled} onToggle={(val) => setSettings(s => ({ ...s, soundEnabled: val }))} />
                        <SettingsToggle label="Enable Vibration" icon={<Zap size={22} color={isDarkMode ? '#A0AEC0' : '#6B7280'} />} value={settings.vibrationEnabled} onToggle={(val) => setSettings(s => ({ ...s, vibrationEnabled: val }))} />
                        <SettingsToggle label="Show Motivational Quotes" icon={<Quote size={22} color={isDarkMode ? '#A0AEC0' : '#6B7280'} />} value={settings.showQuotes} onToggle={(val) => setSettings(s => ({ ...s, showQuotes: val }))} />
                    </View>
                </View>
            </ScrollView>

            {/* --- Save Button --- */}
            <View className="p-5 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <TouchableOpacity onPress={handleSave} className="bg-[#5F3EFE] rounded-full py-4">
                    <Text className="text-white text-center text-lg font-bold">Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default FocusTimerSettingsScreen;