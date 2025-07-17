import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#5F3EFE';
const BG = '#F7F7FF';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    return '#E5E7EB';
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BG,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: '100%',
          maxWidth: 340,
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 28,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
          elevation: 8,
          minHeight: 420,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#18181B',
            marginBottom: 8,
            fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            textAlign: 'center',
          }}
        >
          Welcome Back
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#71717A',
            marginBottom: 28,
            fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            textAlign: 'center',
          }}
        >
          Sign in to continue
        </Text>

        {/* Email Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: getInputBorderColor('email'),
            paddingHorizontal: 14,
            marginBottom: 16,
            height: 48,
            width: '100%',
          }}
        >
          <Feather name="mail" size={20} color="#71717A" style={{ marginRight: 8 }} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 15,
              color: '#18181B',
              fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            }}
            placeholder="Email address"
            placeholderTextColor="#A1A1AA"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: getInputBorderColor('password'),
            paddingHorizontal: 14,
            marginBottom: 8,
            height: 48,
            width: '100%',
          }}
        >
          <Feather name="lock" size={20} color="#71717A" style={{ marginRight: 8 }} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 15,
              color: '#18181B',
              fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            }}
            placeholder="Password"
            placeholderTextColor="#A1A1AA"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Error Alert */}
        {!!error && (
          <View style={{ width: '100%', marginBottom: 10, alignItems: 'flex-start' }}>
            <Text style={{ color: '#EF4444', fontSize: 14, fontWeight: '700' }}>{error}</Text>
          </View>
        )}

        {/* Forgot Password */}
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginBottom: 18 }}
          onPress={() => router.push('/forgetPassword')}
        >
          <Text
            style={{
              color: PURPLE,
              fontWeight: '700',
              fontSize: 14,
              fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: PURPLE,
            borderRadius: 14,
            width: '100%',
            alignItems: 'center',
            paddingVertical: 14,
            marginBottom: 18,
            shadowColor: PURPLE,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
            elevation: 8,
          }}
          activeOpacity={0.85}
          onPress={handleLogin}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: '700',
              fontSize: 16,
              fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: '#71717A',
              fontSize: 14,
              fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
            }}
          >
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/signup')}>
            <Text
              style={{
                color: PURPLE,
                fontWeight: '700',
                fontSize: 14,
                fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
} 