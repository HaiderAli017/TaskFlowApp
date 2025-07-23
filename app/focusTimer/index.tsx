import BottomNavigation from '@/components/BottomNavigation';
import { useTheme } from '@/context/theme/ThemeContext';
import { ArrowLeft, Pause, Play, Repeat, Settings, Square } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Modal, // Add Modal
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FocusTimerSettingsScreen, { TimerSettings } from '../focusTimerSetting'; // Assuming settings screen is in @/screens

// --- Type Definitions ---
type Mode = 'focus' | 'break' | 'longBreak';

const MAX_SESSIONS = 4;

// --- Helper Function ---
const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// --- Main Component ---
const FocusTimerScreen: React.FC = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    // --- Settings State ---
    const [settings, setSettings] = useState<TimerSettings>({
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        autoStartNext: true,
        soundEnabled: true,
        vibrationEnabled: true,
        showQuotes: true,
    });
    const [isSettingsVisible, setIsSettingsVisible] = useState<boolean>(false);

    // --- Memoized Durations from Settings ---
    const MODES = useMemo(() => ({
        focus: { duration: settings.focusDuration * 60, label: 'Focus' },
        break: { duration: settings.shortBreakDuration * 60, label: 'Short Break' },
        longBreak: { duration: settings.longBreakDuration * 60, label: 'Long Break' },
    }), [settings]);

    // --- Timer State ---
    const [mode, setMode] = useState<Mode>('focus');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [secondsLeft, setSecondsLeft] = useState<number>(MODES.focus.duration);
    const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);
    const [timerKey, setTimerKey] = useState<number>(0);

    // --- Timer Logic ---
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            if (mode === 'focus') {
                const newSessionCount = sessionsCompleted + 1;
                setSessionsCompleted(newSessionCount);
                const nextMode = newSessionCount % MAX_SESSIONS === 0 ? 'longBreak' : 'break';
                handleModeChange(nextMode, settings.autoStartNext);
            } else {
                handleModeChange('focus', settings.autoStartNext);
            }
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, secondsLeft, settings.autoStartNext]);

    // --- Handlers ---
    const handleModeChange = (newMode: Mode, autoStart = false): void => {
        setIsActive(autoStart);
        setMode(newMode);
        setSecondsLeft(MODES[newMode].duration);
        setTimerKey(prev => prev + 1);
    };
    
    const handleSaveSettings = (newSettings: TimerSettings) => {
        setSettings(newSettings);
        if (!isActive) {
            const durationKey = `${mode}Duration` as keyof Pick<TimerSettings, 'focusDuration' | 'shortBreakDuration' | 'longBreakDuration'>;
            const newDurationInSeconds = newSettings[durationKey] * 60;
            setSecondsLeft(newDurationInSeconds);
            setTimerKey(prev => prev + 1);
        }
    };

    const handleStartPause = (): void => {
        setIsActive(prev => !prev);
    };

    const handleReset = (): void => {
        setIsActive(false);
        setSecondsLeft(MODES[mode].duration);
        setTimerKey(prev => prev + 1);
    };

    // --- Derived Values for UI ---
    const progressPercent = useMemo(() => {
        return (secondsLeft / MODES[mode].duration) * 100;
    }, [secondsLeft, mode, MODES]);

    const motivationalQuote = "Stay focused. You're doing great!";

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? '#1F2937' : '#6443FE'} />
            <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-[#6443FE]'}`}>
                {/* --- Header --- */}
                <View className="flex-row justify-between items-center p-5">
                    <TouchableOpacity>
                        <ArrowLeft size={26} color="white" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold text-white">Focus Timer</Text>
                    <TouchableOpacity onPress={() => setIsSettingsVisible(true)}>
                        <Settings size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center items-center px-5">
                    {/* --- Mode Selection --- */}
                    <View className={`flex-row p-1 rounded-full mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white/20'}`}>
                        {Object.keys(MODES).map((key) => (
                            <TouchableOpacity
                                key={key}
                                onPress={() => handleModeChange(key as Mode)}
                                className={`px-6 py-2 rounded-full ${mode === key ? (isDarkMode ? 'bg-[#5F3EFE]' : 'bg-white') : ''}`}
                            >
                                <Text className={`font-bold text-base ${mode === key ? (isDarkMode ? 'text-white' : 'text-violet-700') : (isDarkMode ? 'text-gray-400' : 'text-white')}`}>
                                    {MODES[key as Mode].label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* --- Timer Display --- */}
                    <AnimatedCircularProgress
                        key={timerKey}
                        size={280}
                        width={15}
                        fill={progressPercent}
                        tintColor={isDarkMode ? '#5F3EFE' : '#FFFFFF'}
                        backgroundColor={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}
                        rotation={0}
                        lineCap="round"
                        duration={500}
                    >
                        {() => (
                            <View className="items-center">
                                <Text className="text-white font-bold text-6xl tracking-wider">
                                    {formatTime(secondsLeft)}
                                </Text>
                                {settings.showQuotes && (
                                  <Text className="text-white/80 text-lg mt-2">
                                    {motivationalQuote}
                                  </Text>
                                )}
                            </View>
                        )}
                    </AnimatedCircularProgress>

                    {/* --- Control Buttons --- */}
                    <View className="flex-row items-center justify-center mt-12" style={{ gap: 25 }}>
                        <TouchableOpacity onPress={handleReset} className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-white/20'}`}>
                            <Square size={28} color="white" fill="white" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleStartPause} className={`w-20 h-20 rounded-full items-center justify-center shadow-lg`} style={{ backgroundColor: isActive ? '#5F3EFE' : (isDarkMode ? '#fff' : '#fff') }}>
                            {isActive ? (
                                <Pause size={40} color={isActive ? '#fff' : '#5F3EFE'} fill={isActive ? '#fff' : '#5F3EFE'} />
                            ) : (
                                <Play size={40} color={'#5F3EFE'} fill={'#5F3EFE'} style={{ marginLeft: 5 }} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleModeChange(mode === 'focus' ? 'break' : 'focus')} className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-white/20'}`}>
                            <Repeat size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Progress Tracker --- */}
                <View className="items-center mb-8">
                    <Text className="text-white/90 font-medium text-base mb-3">
                        {sessionsCompleted} of {MAX_SESSIONS} focus sessions completed
                    </Text>
                    <View className="flex-row space-x-3">
                        {Array.from({ length: MAX_SESSIONS }).map((_, index) => (
                            <View
                                key={index}
                                className={`w-3 h-3 rounded-full ${index < sessionsCompleted ? (isDarkMode ? 'bg-violet-400' : 'bg-white') : (isDarkMode ? 'bg-gray-600' : 'bg-white/30')}`}
                            />
                        ))}
                    </View>
                </View>
                <BottomNavigation activeTab="focus" />
            </SafeAreaView>

            {/* --- Settings Modal --- */}
            <Modal
                visible={isSettingsVisible}
                animationType="slide"
                onRequestClose={() => setIsSettingsVisible(false)}
            >
                <FocusTimerSettingsScreen
                    visible={isSettingsVisible}
                    onClose={() => setIsSettingsVisible(false)}
                    onSave={handleSaveSettings}
                    currentSettings={settings}
                />
            </Modal>
        </>
    );
};

export default FocusTimerScreen;