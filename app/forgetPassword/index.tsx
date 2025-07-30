import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StatusBar as RNStatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/theme/ThemeContext';

const PURPLE = '#5F3EFE';

export default function ForgetPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useFocusEffect(
        useCallback(() => {
            RNStatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
            RNStatusBar.setBackgroundColor(isDarkMode ? '#1F2937' : '#F7F7FF');
            return () => { };
        }, [isDarkMode])
    );

    const handleReset = () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        setError('');
        Alert.alert('Reset Link Sent', 'A reset link has been sent to your email address.');
        router.replace('/login');
    };

    return (
        <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-[#F7F7FF]'}`}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            paddingVertical: 32,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <TouchableOpacity
                            className="absolute left-4 top-4 z-10 p-2"
                            onPress={() => router.replace('/login')}
                            activeOpacity={0.7}
                        >
                            <Feather name="arrow-left" size={26} color={isDarkMode ? '#5F3EFE' : PURPLE} />
                        </TouchableOpacity>
                        <View
                            className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-8 items-center shadow-lg"
                        >
                            <Text
                                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                            >
                                Reset Password
                            </Text>
                            <Text
                                className="text-base text-gray-500 dark:text-gray-400 mb-8 text-center"
                            >
                                Enter your email to receive reset link
                            </Text>

                            {/* Email Input */}
                            <View
                                className={`flex-row items-center bg-white dark:bg-gray-700 rounded-xl border mb-5 h-14 w-full px-4 ${error && !email ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                            >
                                <Feather name="mail" size={20} color={isDarkMode ? '#9CA3AF' : '#71717A'} className="mr-2" />
                                <TextInput
                                    className="flex-1 text-base text-gray-900 dark:text-white"
                                    placeholder="Email address"
                                    placeholderTextColor={isDarkMode ? '#9CA3AF' : '#A1A1AA'}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                    returnKeyType="done"
                                />
                            </View>

                            {/* Error Alert */}
                            {!!error && (
                                <View className="w-full mb-3 self-start">
                                    <Text className="text-red-500 text-sm font-semibold">{error}</Text>
                                </View>
                            )}

                            {/* Reset Button */}
                            <TouchableOpacity
                                className="bg-violet-600 rounded-2xl w-full items-center py-4 mb-4 shadow-md"
                                activeOpacity={0.85}
                                onPress={handleReset}
                            >
                                <Text
                                    className="text-white font-bold text-lg"
                                >
                                    Send Reset Link
                                </Text>
                            </TouchableOpacity>

                            <Text
                                className="text-gray-500 dark:text-gray-400 text-sm text-center"
                            >
                                We'll send you a reset link via email
                            </Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
} 