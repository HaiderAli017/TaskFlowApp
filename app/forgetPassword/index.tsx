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

export default function ForgetPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

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
        <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
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
                        <TouchableOpacity
                            style={{ position: 'absolute', left: 18, top: 18, zIndex: 2 }}
                            onPress={() => router.replace('/login')}
                            activeOpacity={0.7}
                        >
                            <Feather name="arrow-left" size={26} color={PURPLE} />
                        </TouchableOpacity>
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
                                minHeight: 340,
                                justifyContent: 'center',
                                position: 'relative',
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
                                Reset Password
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
                                Enter your email to receive reset link
                            </Text>

                            {/* Email Input */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: error && !email ? '#EF4444' : '#E5E7EB',
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
                                    returnKeyType="done"
                                />
                            </View>

                            {/* Error Alert */}
                            {!!error && (
                                <View style={{ width: '100%', marginBottom: 12, alignItems: 'flex-start' }}>
                                    <Text style={{ color: '#EF4444', fontSize: 15, fontWeight: '700' }}>{error}</Text>
                                </View>
                            )}

                            {/* Reset Button */}
                            <TouchableOpacity
                                style={{
                                    backgroundColor: PURPLE,
                                    borderRadius: 16,
                                    width: '100%',
                                    alignItems: 'center',
                                    paddingVertical: 16,
                                    marginBottom: 18,
                                    shadowColor: PURPLE,
                                    shadowOffset: { width: 0, height: 8 },
                                    shadowOpacity: 0.18,
                                    shadowRadius: 16,
                                    elevation: 8,
                                }}
                                activeOpacity={0.85}
                                onPress={handleReset}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: 17,
                                        fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                                    }}
                                >
                                    Send Reset Link
                                </Text>
                            </TouchableOpacity>

                            <Text
                                style={{
                                    color: '#71717A',
                                    fontSize: 15,
                                    fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
                                    textAlign: 'center',
                                }}
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