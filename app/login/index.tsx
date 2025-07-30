import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useState } from 'react';
import { StatusBar as RNStatusBar, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/theme/ThemeContext';

const PURPLE = '#5F3EFE';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useFocusEffect(() => {
    RNStatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    RNStatusBar.setBackgroundColor(isDarkMode ? '#1F2937' : '#F7F7FF');
    return () => {};
  });

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    Alert.alert('Login Successful', 'You have logged in successfully!');
    router.replace('/dashboard');
  };

  const getInputBorderColor = (field: 'email' | 'password') => {
    if (error && !email && field === 'email') return '#EF4444';
    if (error && !password && field === 'password') return '#EF4444';
    return isDarkMode ? '#4B5563' : '#E5E7EB';
  };

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-[#F7F7FF]'}`}
    >
      <View
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-7 items-center shadow-lg"
      >
        <Text
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
        >
          Welcome Back
        </Text>
        <Text
          className="text-base text-gray-500 dark:text-gray-400 mb-7"
        >
          Sign in to continue
        </Text>

        {/* Email Input */}
        <View
          className={`flex-row items-center bg-white dark:bg-gray-700 rounded-xl border mb-4 h-12 w-full px-4`}
          style={{ borderColor: getInputBorderColor('email') }}
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
          />
        </View>

        {/* Password Input */}
        <View
          className={`flex-row items-center bg-white dark:bg-gray-700 rounded-xl border mb-2 h-12 w-full px-4`}
          style={{ borderColor: getInputBorderColor('password') }}
        >
          <Feather name="lock" size={20} color={isDarkMode ? '#9CA3AF' : '#71717A'} className="mr-2" />
          <TextInput
            className="flex-1 text-base text-gray-900 dark:text-white"
            placeholder="Password"
            placeholderTextColor={isDarkMode ? '#9CA3AF' : '#A1A1AA'}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Error Alert */}
        {!!error && (
          <View className="w-full mb-2 self-start">
            <Text className="text-red-500 text-sm font-semibold">{error}</Text>
          </View>
        )}

        {/* Forgot Password */}
        <TouchableOpacity
          className="self-end mb-4"
          onPress={() => router.push('/forgetPassword')}
        >
          <Text
            className="text-violet-600 dark:text-violet-400 font-bold text-sm"
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-violet-600 rounded-xl w-full items-center py-3.5 mb-4 shadow-md"
          activeOpacity={0.85}
          onPress={handleLogin}
        >
          <Text
            className="text-white font-bold text-base"
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View className="flex-row items-center">
          <Text
            className="text-gray-500 dark:text-gray-400 text-sm"
          >
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
            <Text
              className="text-violet-600 dark:text-violet-400 font-bold text-sm"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 