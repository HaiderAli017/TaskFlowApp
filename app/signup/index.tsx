import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#5F3EFE';
const BG = '#F7F7FF';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    return '#E5E7EB';
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: BG }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
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
              style={{
                width: '100%',
                maxWidth: 360,
                backgroundColor: '#fff',
                borderRadius: 22,
                padding: 32,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 16 },
                shadowOpacity: 0.16,
                shadowRadius: 32,
                elevation: 16,
                minHeight: 500,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: '700',
                  color: '#18181B',
                  marginBottom: 10,
                  fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  textAlign: 'center',
                }}
              >
                Create Account
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#71717A',
                  marginBottom: 32,
                  fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  textAlign: 'center',
                }}
              >
                Join us today
              </Text>

              {/* Full Name Input */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: getInputBorderColor('fullName'),
                  paddingHorizontal: 14,
                  marginBottom: 22,
                  height: 52,
                  width: '100%',
                }}
              >
                <Feather name="user" size={20} color="#71717A" style={{ marginRight: 8 }} />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: '#18181B',
                    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  }}
                  placeholder="Full Name"
                  placeholderTextColor="#A1A1AA"
                  value={fullName}
                  onChangeText={setFullName}
                  returnKeyType="next"
                />
              </View>

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
                  marginBottom: 22,
                  height: 52,
                  width: '100%',
                }}
              >
                <Feather name="mail" size={20} color="#71717A" style={{ marginRight: 8 }} />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: '#18181B',
                    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  }}
                  placeholder="Email address"
                  placeholderTextColor="#A1A1AA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="next"
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
                  marginBottom: 18,
                  height: 52,
                  width: '100%',
                }}
              >
                <Feather name="lock" size={20} color="#71717A" style={{ marginRight: 8 }} />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: '#18181B',
                    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  }}
                  placeholder="Password"
                  placeholderTextColor="#A1A1AA"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="done"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#71717A" />
                </TouchableOpacity>
              </View>

              {/* Terms & Conditions Checkbox */}
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 18 }}>
                <TouchableOpacity
                  onPress={() => setAgree(!agree)}
                  style={{
                    width: 22,
                    height: 22,
                    // Remove border
                    borderWidth: 0,
                    borderColor: undefined,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                    backgroundColor: agree ? PURPLE : '#fff',
                    // Add shadow
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3,
                  }}
                  activeOpacity={0.7}
                >
                  {agree && <Feather name="check" size={16} color="#fff" />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAgree(!agree)} activeOpacity={0.7}>
                  <Text
                    style={{
                      color: '#71717A',
                      fontSize: 15,
                      fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                    }}
                  >
                    I agree to Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Error Alert */}
              {!!error && (
                <View style={{ width: '100%', marginBottom: 12, alignItems: 'flex-start' }}>
                  <Text style={{ color: '#EF4444', fontSize: 15, fontWeight: '700' }}>{error}</Text>
                </View>
              )}

              {/* Sign Up Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: PURPLE,
                  borderRadius: 16,
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: 16,
                  marginBottom: 22,
                  shadowColor: PURPLE,
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.18,
                  shadowRadius: 16,
                  elevation: 8,
                }}
                activeOpacity={0.85}
                onPress={handleSignup}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 17,
                    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{
                    color: '#71717A',
                    fontSize: 15,
                    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                  }}
                >
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={() => router.replace('/login')}>
                  <Text
                    style={{
                      color: PURPLE,
                      fontWeight: '700',
                      fontSize: 15,
                      fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                    }}
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