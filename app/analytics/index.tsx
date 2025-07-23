import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    CheckSquare,
    TrendingUp,
    Clock,
    BarChartHorizontal,
    ChevronDown,
    ArrowLeft
} from 'lucide-react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Svg, { Rect } from 'react-native-svg';
import { useTheme } from '@/context/theme/ThemeContext';
import { useRouter } from 'expo-router';

// --- (All existing TYPE DEFINITIONS, MOCK DATA, and REUSABLE COMPONENTS remain the same) ---
interface StatCardProps { title: string; value: string; trendText: string; trendBgColor: string; bgColor: string; icon: React.ReactNode; }
interface ProjectData { id: string; initials: string; avatarColor: string; name: string; dueDate: string; progress: number; }
const DATE_RANGE_OPTIONS = [ { label: 'Today', value: 'today' }, { label: 'Yesterday', value: 'yesterday' }, { label: 'This Week', value: 'this_week' }, { label: 'Last Week', value: 'last_week' }, { label: 'This Month', value: 'this_month' }, { label: 'Last Month', value: 'last_month' }, { label: 'This Year', value: 'this_year' }, { label: 'Custom Date...', value: 'custom' }, ];
const weeklyChartData = [ { day: 'Mon', value: 60 }, { day: 'Tue', value: 75 }, { day: 'Wed', value: 90 }, { day: 'Thu', value: 80 }, { day: 'Fri', value: 85 }, { day: 'Sat', value: 50 }, { day: 'Sun', value: 70 }, ];
const projectData: ProjectData[] = [ { id: '1', initials: 'U', avatarColor: 'bg-violet-500', name: 'UI Design Project', dueDate: 'Due in 3 days', progress: 92 }, { id: '2', initials: 'B', avatarColor: 'bg-sky-500', name: 'Backend Development', dueDate: 'Due in 10 days', progress: 67 }, ];
const StatCard: React.FC<StatCardProps> = ({ title, value, trendText, trendBgColor, bgColor, icon }) => ( <View className={`p-5 rounded-2xl w-[48%] shadow-lg ${bgColor}`}><View className="flex-row justify-between items-start">{icon}<TrendingUp size={20} color="white" /></View><Text className="text-white text-4xl font-bold mt-4">{value}</Text><Text className="text-white text-base font-medium">{title}</Text><View className={`mt-3 self-start px-2.5 py-1 rounded-full ${trendBgColor}`}><Text className="text-white text-xs font-semibold">{trendText}</Text></View></View> );
const WeeklyProductivityChart: React.FC = () => { const chartHeight = 100; const maxValue = 100; return ( <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mt-4 shadow-sm"><View className="flex-row justify-between items-center mb-4"><Text className="text-lg font-bold text-gray-900 dark:text-white">Weekly Productivity</Text><BarChartHorizontal size={24} color="#9CA3AF" /></View><View className="flex-row justify-between items-end h-28 px-2">{weeklyChartData.map(item => ( <View key={item.day} className="flex-col items-center"><Svg height={chartHeight} width={12}><Rect x={0} y={chartHeight - (item.value / maxValue) * chartHeight} width={12} height={(item.value / maxValue) * chartHeight} fill="#5F3EFE" rx={6} /></Svg><Text className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.day}</Text></View> ))}</View><Text className="text-center text-base text-gray-600 dark:text-gray-300 mt-4">Average completion rate: <Text className="font-bold text-[#5F3EFE] dark:text-[#5F3EFE]">78%</Text></Text></View> ); };
const ProjectProgressCard: React.FC<{ project: ProjectData }> = ({ project }) => ( <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mt-4 shadow-sm"><View className="flex-row justify-between items-start"><View className="flex-row items-center"><View className={`w-10 h-10 rounded-full justify-center items-center ${project.avatarColor}`}><Text className="text-white font-bold text-lg">{project.initials}</Text></View><View className="ml-3"><Text className="text-base font-bold text-gray-900 dark:text-white">{project.name}</Text><Text className="text-sm text-gray-500 dark:text-gray-400">{project.dueDate}</Text></View></View><Text className="text-lg font-bold text-[#5F3EFE] dark:text-[#5F3EFE]">{project.progress}%</Text></View><View className="bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3 w-full"><View className="bg-[#5F3EFE] dark:bg-[#5F3EFE] h-2 rounded-lg" style={{ width: `${project.progress}%` }} /></View></View> );

// --- NEW HELPER FUNCTION FOR CUSTOM DATE FORMAT ---
const formatCustomDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};


// --- MAIN ANALYTICS SCREEN COMPONENT ---
const AnalyticsScreen: React.FC = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRange, setSelectedRange] = useState({ label: 'This Week', value: 'this_week' });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const isDarkMode = theme === 'dark';

    // Updated handler to use the new date format
    const handleConfirmDate = (date: Date) => {
        setShowDatePicker(false);
        setSelectedRange({
            label: formatCustomDate(date), // Use the new helper function here
            value: 'custom',
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50 dark:bg-gray-900">
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            {/* --- Header --- */}
            <View className="flex-row justify-between items-center p-5">
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={26} color={isDarkMode ? '#FFFFFF' : '#000000'} />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="bg-violet-100 dark:bg-gray-800 rounded-lg px-4 py-2 flex-row items-center"
                >
                    <Text className="text-violet-700 dark:text-violet-300 font-semibold mr-1">{selectedRange.label}</Text>
                    <ChevronDown size={16} color={isDarkMode ? '#A78BFA' : '#6D28D9'} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>
                {/* --- Screen content remains the same --- */}
                <View className="flex-row justify-between">
                    <StatCard icon={<CheckSquare size={24} color="white" />} title="Tasks Completed" value="28" trendText="+12% from last week" trendBgColor="bg-white/30" bgColor="bg-violet-600" />
                    <StatCard icon={<Clock size={24} color="white" />} title="Overdue Tasks" value="3" trendText="Needs attention" trendBgColor="bg-white/40" bgColor="bg-orange-600" />
                </View>
                <WeeklyProductivityChart />
                <View className="mt-6">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">Project Progress</Text>
                    {projectData.map(project => (<ProjectProgressCard key={project.id} project={project} />))}
                </View>
            </ScrollView>

            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <Pressable className="flex-1 bg-black/10" onPress={() => setModalVisible(false)}>
                    <View className="absolute top-24 right-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-52 p-2" style={{ elevation: 10 }}>
                        {DATE_RANGE_OPTIONS.map((item) => (
                            <TouchableOpacity
                                key={item.value}
                                className={`py-3 px-4 rounded-lg my-1 ${selectedRange.value === item.value ? 'bg-[#5F3EFE]' : ''}`}
                                onPress={() => {
                                    setModalVisible(false);
                                    if (item.value === 'custom') {
                                        setShowDatePicker(true);
                                    } else {
                                        setSelectedRange(item);
                                    }
                                }}
                            >
                                <Text className={`font-semibold text-base ${selectedRange.value === item.value ? 'text-white' : 'text-gray-800 dark:text-gray-300'}`}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
            
            <DateTimePickerModal
                isVisible={showDatePicker}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setShowDatePicker(false)}
                themeVariant={theme === 'dark' ? 'dark' : 'light'}
            />
        </SafeAreaView>
    );
};

export default AnalyticsScreen;