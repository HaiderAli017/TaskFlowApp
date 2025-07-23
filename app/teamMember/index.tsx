import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    FlatList,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Search, MoreHorizontal, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router'; // 1. Import useRouter
import { useTheme } from '@/context/theme/ThemeContext';

// --- (Keep all your existing TYPE DEFINITIONS, MOCK DATA, and MemberCard component) ---
type Status = 'Online' | 'Away';
interface TeamMember {
    id: string;
    name: string;
    initials: string;
    role: string;
    department: string;
    tag: {
        label: 'Admin' | 'Developer' | 'Designer';
        bgColor: string;
        textColor: string;
    };
    status: Status;
    avatarColor: string;
}
const allMembers: TeamMember[] = [
    { id: '1', name: 'Daisy Johnson', initials: 'DJ', role: 'Team Lead', department: 'Design Department', tag: { label: 'Admin', bgColor: 'bg-violet-100', textColor: 'text-violet-700' }, status: 'Online', avatarColor: 'bg-violet-500' },
    { id: '2', name: 'Alex Morgan', initials: 'AM', role: 'Senior Developer', department: 'Frontend', tag: { label: 'Developer', bgColor: 'bg-sky-100', textColor: 'text-sky-700' }, status: 'Online', avatarColor: 'bg-sky-500' },
    { id: '3', name: 'Sarah Brown', initials: 'SB', role: 'UI/UX Designer', department: 'Design Team', tag: { label: 'Designer', bgColor: 'bg-pink-100', textColor: 'text-pink-700' }, status: 'Away', avatarColor: 'bg-pink-500' },
    { id: '4', name: 'Mike Johnson', initials: 'MJ', role: 'Backend Developer', department: 'Engineering', tag: { label: 'Developer', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' }, status: 'Online', avatarColor: 'bg-emerald-400' },
];
const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
    const statusDotColor = member.status === 'Online' ? 'bg-green-500' : 'bg-gray-400';
    return (
        <View className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm mt-4">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                    <View className={`w-12 h-12 rounded-full justify-center items-center ${member.avatarColor}`}><Text className="text-white font-bold text-lg">{member.initials}</Text></View>
                    <View className="ml-4 flex-1">
                        <Text className="text-base font-bold text-gray-900 dark:text-white">{member.name}</Text>
                        <Text className="text-sm text-gray-500 mt-1">{member.role} • {member.department}</Text>
                        <View className="flex-row items-center mt-2 space-x-3">
                            <View className={`px-2.5 py-0.5 rounded-full ${member.tag.bgColor}`}><Text className={`text-sm font-medium ${member.tag.textColor}`}>{member.tag.label}</Text></View>
                            <View className="flex-row items-center"><View className={`w-2 h-2 rounded-full ml-2 ${statusDotColor}`} /><Text className="text-sm text-gray-600 ml-1.5">{member.status}</Text></View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity className="p-2"><MoreHorizontal size={24} color="#9CA3AF" /></TouchableOpacity>
            </View>
        </View>
    );
};


// --- MAIN TEAM MEMBERS SCREEN COMPONENT ---
const TeamMembersScreen: React.FC = () => {
    const router = useRouter(); // 2. Initialize the router
    const [searchQuery, setSearchQuery] = useState('');
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    const filteredMembers = useMemo(() => {
        if (!searchQuery) return allMembers;
        return allMembers.filter(member =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#18181B' : '#F7F7FF'} />
            <SafeAreaView className="flex-1 bg-slate-50 dark:bg-black">
                {/* --- Header --- */}
                <View className="flex-row justify-between items-center bg-slate-50 dark:bg-black">
                    <View className="flex-row justify-start items-center p-5">
                        <TouchableOpacity onPress={() => router.replace('/dashboard')}>
                            <ArrowLeft size={24} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                        </TouchableOpacity>
                        <Text className="text-xl ml-2 font-bold text-gray-900 dark:text-white">Team Members</Text>
                        {/* 3. Add onPress to navigate */}
                    </View>
                    <View className="flex-row justify-end items-center mr-5">
                        <TouchableOpacity
                            onPress={() => router.push('/addMember')}
                            className="bg-[#5F3EFE] rounded-lg px-4 py-2.5"
                        >
                            <Text className="text-white font-semibold">Add Member</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* --- (Rest of the component remains the same) --- */}
                <View className="px-5">
                    <View className="bg-white dark:bg-gray-900 rounded-lg p-3 flex-row items-center border border-gray-200 dark:border-gray-700">
                        <Search size={20} color="#6B7280" />
                        <TextInput
                            className="flex-1 ml-2 text-base text-gray-800"
                            placeholder="Search team members..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                <FlatList
                    data={filteredMembers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MemberCard member={item} />}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </>
    );
};

export default TeamMembersScreen;