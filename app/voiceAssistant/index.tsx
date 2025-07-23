import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import { ArrowLeft, Mic } from 'lucide-react-native';
import { useTheme } from '@/context/theme/ThemeContext';

// --- Reusable Components for this screen ---

const SoundWave: React.FC<{ isListening: boolean }> = ({ isListening }) => {
    const [waveData, setWaveData] = useState<number[]>([4, 8, 12, 16, 20, 24, 28, 22, 18, 14, 10, 6, 10, 14, 18, 22, 28, 24, 20, 16, 12, 8, 4]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        if (isListening) {
            intervalRef.current = setInterval(() => {
                setWaveData(currentData =>
                    currentData.map(() => Math.floor(Math.random() * 28) + 4)
                );
            }, 150);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setWaveData([4, 8, 12, 16, 20, 24, 28, 22, 18, 14, 10, 6, 10, 14, 18, 22, 28, 24, 20, 16, 12, 8, 4]);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isListening]);

    return (
        <View className="flex-row items-center justify-center h-10 my-8">
            {waveData.map((height, index) => (
                <View
                    key={index}
                    style={{ height }}
                    className="w-1 bg-[#7F56D9] rounded-full mx-0.5"
                />
            ))}
        </View>
    );
};

const QuickCommandButton: React.FC<{ text: string; onPress: () => void }> = ({ text, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        className="bg-violet-100/70 dark:bg-violet-900/50 rounded-full px-4 py-2"
    >
        <Text className="text-violet-700 dark:text-violet-300 font-medium">{text}</Text>
    </TouchableOpacity>
);


// --- Main AI Voice Assistant Screen Component ---
const AIVoiceAssistantScreen: React.FC = () => {
    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [spokenText, setSpokenText] = useState('');
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const handleToggleListening = () => {
        setIsListening(prev => !prev);
        // In a real app, you would start/stop voice recognition here.
        if (!isListening) {
            setSpokenText(''); // Clear previous text when starting a new session
        }
    };

    const handleQuickCommand = (command: string) => {
        setSpokenText(`"${command}"`);
    };

    const suggestionText = spokenText || '"Create a new task for tomorrow"';
    const suggestionSubtext = spokenText ? 'Here is what I heard...' : 'Try saying something like this';

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#18181B' : '#F7F7FF'} />

            {/* --- Header --- */}
            <View className="flex-row items-center p-5 absolute top-0 left-0 right-0 z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-1">
                    <ArrowLeft size={26} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
            </View>

            <View className="flex-1 justify-center items-center px-6 pt-16">
                {/* --- Main Title --- */}
                <View className="items-center">
                    <Text className="text-3xl font-bold text-gray-900 dark:text-white">
                        AI Voice Assistant
                    </Text>
                    <Text className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                        {isListening ? 'I am listening...' : 'Listening for your command...'}
                    </Text>
                </View>

                {/* --- Central Mic Button --- */}
                <View className="my-10">
                    <View
                        className={`w-32 h-32 rounded-full justify-center items-center transition-all duration-300 ${isListening ? 'bg-white' : 'bg-[#5F3EFE]'
                            }`}
                        // Adding platform-specific shadow for the "listening" state
                        style={isListening && (Platform.OS === 'ios' ? {
                            shadowColor: '#7F56D9',
                            shadowOffset: { width: 0, height: 8 },
                            shadowOpacity: 0.4,
                            shadowRadius: 15,
                        } : {
                            elevation: 12,
                            shadowColor: '#7F56D9',
                        })}
                    >
                        <Mic size={60} color={isListening ? '#5F3EFE' : '#FFFFFF'} />
                    </View>
                </View>

                {/* --- Sound Wave Visualization --- */}
                <SoundWave isListening={isListening} />

                {/* --- Suggestion Card --- */}
                <View className="bg-slate-50 dark:bg-gray-800 rounded-2xl p-5 w-full items-center min-h-[90px] justify-center">
                    <Text className="text-lg font-semibold text-center text-gray-800 dark:text-gray-200">
                        {suggestionText}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {suggestionSubtext}
                    </Text>
                </View>

                {/* --- Tap to Speak Button --- */}
                <TouchableOpacity
                    onPress={handleToggleListening}
                    className={`rounded-full px-8 py-4 mt-8 transition-all duration-300 ${isListening ? 'bg-[#5F3EFE]' : 'border border-violet-300 dark:border-violet-700'
                        }`}
                >
                    <Text
                        className={`font-bold text-lg ${isListening ? 'text-white' : 'text-violet-600 dark:text-violet-400'
                            }`}
                    >
                        {isListening ? 'Listening...' : 'Tap to Speak'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* --- Quick Commands --- */}
            {/* --- Quick Commands --- */}
            <View className="items-center pb-10">
                <Text className="text-base text-gray-400 dark:text-gray-500 mb-4">
                    Quick Commands:
                </Text>
                <View className="flex-row space-x-3 gap-3">
                    <QuickCommandButton text="Show my tasks" onPress={() => handleQuickCommand('Show my tasks')} />
                    <QuickCommandButton text="Schedule meeting" onPress={() => handleQuickCommand('Schedule meeting')} />
                </View>
                <View className="mt-3">
                    <QuickCommandButton text="Team status" onPress={() => handleQuickCommand('Team status')} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AIVoiceAssistantScreen;