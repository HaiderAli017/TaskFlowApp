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

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useFocusEffect(
    useCallback(() => {
      RNStatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
      RNStatusBar.setBackgroundColor(isDarkMode ? '#1F2937' : '#F7F7FF');
      return () => { };
    }, [isDarkMode])
  );

  const handleSignup = () => {
    if (!fullName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!agree) {
      setError('You must agree to Terms & Conditions');
      return;
    }
    setError('');
    Alert.alert('Sign Up Successful', 'Your account has been created!');
    router.replace('/(tabs)');
  };

  const getInputBorderColor = (field: 'fullName' | 'email' | 'password') => {
    if (error && !fullName && field === 'fullName') return '#EF4444';
    if (error && !email && field === 'email') return '#EF4444';
    if (error && !password && field === 'password') return '#EF4444';
    return isDarkMode ? '#4B5563' : '#E5E7EB';
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
            <View
              className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl p-8 items-center shadow-lg"
            >
              <Text
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Create Account
              </Text>
              <Text
                className="text-base text-gray-500 dark:text-gray-400 mb-8"
              >
                Join us today
              </Text>

              {/* Full Name Input */}
              <View
                className={`flex-row items-center bg-white dark:bg-gray-700 rounded-xl border mb-5 h-14 w-full px-4`}
                style={{ borderColor: getInputBorderColor('fullName') }}
              >
                <Feather name="user" size={20} color={isDarkMode ? '#9CA3AF' : '#71717A'} className="mr-2" />
                <TextInput
                  className="flex-1 text-base text-gray-900 dark:text-white"
                  placeholder="Full Name"
                  placeholderTextColor={isDarkMode ? '#9CA3AF' : '#A1A1AA'}
                  value={fullName}
                  onChangeText={setFullName}
                  returnKeyType="next"
                />
              </View>

              {/* Email Input */}
              <View
                className={`flex-row items-center bg-white dark:bg-gray-700 rounded-xl border mb-5 h-14 w-full px-4`}
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
                  returnKeyType="next"
                />
              </View>

              {/* Password Input */}
              <View
                className={`flex-row items-center bg-white dark:bg-gray-700 rounded-xl border mb-4 h-14 w-full px-4`}
                style={{ borderColor: getInputBorderColor('password') }}
              >
                <Feather name="lock" size={20} color={isDarkMode ? '#9CA3AF' : '#71717A'} className="mr-2" />
                <TextInput
                  className="flex-1 text-base text-gray-900 dark:text-white"
                  placeholder="Password"
                  placeholderTextColor={isDarkMode ? '#9CA3AF' : '#A1A1AA'}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={isDarkMode ? '#9CA3AF' : '#71717A'} />
                </TouchableOpacity>
              </View>

              {/* Terms & Conditions Checkbox */}
              <View className="flex-row items-center w-full mb-4">
                <TouchableOpacity
                  onPress={() => setAgree(!agree)}
                  className="w-6 h-6 rounded-md items-center justify-center mr-2 shadow-md"
                  style={{ backgroundColor: agree ? (isDarkMode ? '#5F3EFE' : PURPLE) : (isDarkMode ? '#4B5563' : '#FFF') }}
                  activeOpacity={0.7}
                >
                  {agree && <Feather name="check" size={16} color="#fff" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAgree(!agree)} activeOpacity={0.7}>
                  <Text
                    className="text-gray-600 dark:text-gray-400 text-sm"
                  >
                    I agree to Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Error Alert */}
              {!!error && (
                <View className="w-full mb-3 self-start">
                  <Text className="text-red-500 text-sm font-semibold">{error}</Text>
                </View>
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                className="bg-violet-600 rounded-2xl w-full items-center py-4 mb-5 shadow-md"
                activeOpacity={0.85}
                onPress={handleSignup}
              >
                <Text
                  className="text-white font-bold text-base"
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View className="flex-row items-center">
                <Text
                  className="text-gray-500 dark:text-gray-400 text-sm"
                >
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.replace('/login')}>
                  <Text
                    className="text-violet-600 dark:text-violet-400 font-bold text-sm"
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
} 