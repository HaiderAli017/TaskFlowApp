import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { ArrowLeft, User, Mail, Briefcase, Camera } from 'lucide-react-native';
import { useTheme } from '@/context/theme/ThemeContext';

// --- Reusable FormInput Component ---
interface FormInputProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: 'default' | 'email-address';
}

const FormInput: React.FC<FormInputProps> = ({ icon, label, placeholder, value, onChangeText, keyboardType = 'default' }) => (
    <View className="mt-6">
        <Text className="text-base font-semibold text-gray-600 dark:text-gray-300 mb-2">{label}</Text>
        <View className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 flex-row items-center border border-gray-200 dark:border-gray-700">
            {icon}
            <TextInput
                className="flex-1 ml-3 text-base text-gray-900 dark:text-white"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    </View>
);


// --- Main Add Member Screen Component ---
const AddMemberScreen: React.FC = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const handleSave = () => {
        if (!fullName || !email || !role) {
            Alert.alert('Incomplete Form', 'Please fill out all fields.');
            return;
        }

        console.log('--- New Team Member ---');
        console.log('Full Name:', fullName);
        console.log('Email:', email);
        console.log('Role:', role);
        console.log('-----------------------');

        // Navigate back to the team members list after saving
        router.back();
    };

    return (
        // Assuming your ThemeContext provides a class 'dark' on the root element
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-gray-900">
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#18181B' : '#F7F7FF'} />
            
            {/* --- Header --- */}
            <View className="flex-row justify-between items-center p-5 bg-slate-50 dark:bg-gray-900">
                <TouchableOpacity onPress={() => router.back()} className="p-1">
                    <ArrowLeft size={26} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">Add New Member</Text>
                <TouchableOpacity onPress={handleSave}>
                    <Text className="text-lg font-semibold text-[#5F3EFE]">Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* --- Profile Picture Section --- */}
                <View className="items-center">
                    <View className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full justify-center items-center">
                        <User size={60} color="#9CA3AF" />
                    </View>
                    <TouchableOpacity className="mt-4 bg-violet-100 dark:bg-violet-900/50 rounded-lg px-4 py-2 flex-row items-center">
                        <Camera size={18} color="#7F56D9" />
                        <Text className="ml-2 text-violet-700 dark:text-violet-300 font-semibold">Upload Image</Text>
                    </TouchableOpacity>
                </View>

                {/* --- Form Inputs --- */}
                <View className="mt-8">
                    <FormInput
                        label="Full Name"
                        icon={<User size={20} color="#9CA3AF" />}
                        placeholder="Enter member's full name"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                    <FormInput
                        label="Email Address"
                        icon={<Mail size={20} color="#9CA3AF" />}
                        placeholder="Enter member's email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <FormInput
                        label="Role / Position"
                        icon={<Briefcase size={20} color="#9CA3AF" />}
                        placeholder="e.g., Senior Developer"
                        value={role}
                        onChangeText={setRole}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddMemberScreen;