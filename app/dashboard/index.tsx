import BottomNavigation from '@/components/BottomNavigation';
import { useTheme } from '@/context/theme/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Drawer Menu Item Component
function DrawerMenuItem({ icon, label, active = false, onPress }: { icon: keyof typeof Feather.glyphMap; label: string; active?: boolean; onPress?: () => void }) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: active ? '#5F3EFE' : 'transparent',
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 6,
      }}
    >
      <Feather name={icon} size={22} color={active ? '#fff' : isDarkMode ? '#fff' : '#18181B'} style={{ marginRight: 16, }} />
      <Text style={{ color: active ? '#fff' : isDarkMode ? '#fff' : '#18181B', fontWeight: active ? 'bold' : 'normal', fontSize: 17 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const PURPLE = '#5F3EFE';
const BLUE = '#3576EC';
const BG = '#F7F7FF';
const PRODUCTIVITY_GREEN = '#22C55E';
const ENERGY_ORANGE = '#F59E42';
const CARD_DATA = [
  { title: 'UI Design Project', progress: 0.85, color: PURPLE, icon: 'edit-3' as const, tasks: 12 },
  { title: 'Backend Development', progress: 0.6, color: BLUE, icon: 'bar-chart-2' as const, tasks: 8 },
  { title: 'Frontend Refactor', progress: 0.45, color: '#A259FF', icon: 'code' as const, tasks: 10 },
  { title: 'Testing Suite', progress: 0.7, color: ENERGY_ORANGE, icon: 'check-circle' as const, tasks: 6 },
  { title: 'API Integration', progress: 0.3, color: PRODUCTIVITY_GREEN, icon: 'link' as const, tasks: 7 },
  { title: 'Deployment', progress: 0.95, color: '#EF4444', icon: 'upload' as const, tasks: 3 },
];
const MOODS = [
  { emoji: '😐', color: '#FACC15' },
  { emoji: '🙂', color: '#FACC15' },
  { emoji: '😊', color: '#FACC15' },
  { emoji: '😃', color: '#FACC15' },
  { emoji: '😍', color: '#F472B6' },
];
const windowWidth = Dimensions.get('window').width;
const CARD_WIDTH = windowWidth * 0.7;
const maxWater = 8;

export default function DashboardScreen() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  // Carousel state
  const [activeCard, setActiveCard] = useState(0);
  const flatListRef = useRef(null);

  // Water tracker state
  const [waterCount, setWaterCount] = useState(6); // Example: 6/8

  // Mood tracker state
  const [selectedMood, setSelectedMood] = useState(0);

  // Drawer state
  const insets = useSafeAreaInsets();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerShouldRender, setDrawerShouldRender] = useState(false);
  const drawerAnim = useRef(new Animated.Value(-windowWidth * 0.8)).current; // Start hidden

  // Active drawer item state
  const [activeDrawerItem, setActiveDrawerItem] = useState('Home');

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
    }, [isDarkMode])
  );

  // Animated values for dots
  const dotWidths = CARD_DATA.map((_, i) => useRef(new Animated.Value(i === 0 ? 32 : 10)).current);

  // Animate dot width on activeCard change
  React.useEffect(() => {
    CARD_DATA.forEach((_, i) => {
      Animated.timing(dotWidths[i], {
        toValue: i === activeCard ? 32 : 10,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start();
    });
  }, [activeCard]);

  // Drawer open/close animation and rendering
  useEffect(() => {
    if (drawerVisible) {
      setDrawerShouldRender(true);
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (drawerShouldRender) {
      Animated.timing(drawerAnim, {
        toValue: -windowWidth * 0.8,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerShouldRender(false));
    }
  }, [drawerVisible]);

  // Handler for closing the drawer with animation
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const router = useRouter();

  return (
    <>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#18181B' : '#F7F7FF'} translucent={false} /> */}
      <SafeAreaView className="flex-1 bg-[#F7F7FF] dark:bg-[#18181B]">
        {/* Header */}
        <View className={`flex-row items-center justify-between px-[18px] ${Platform.OS === 'ios' ? 'pt-8' : 'pt-6'} pb-[18px] bg-[#F7F7FF] dark:bg-[#18181B] z-10`}>
          <TouchableOpacity className="p-[6px]" onPress={() => setDrawerVisible(true)}>
            <Feather name="menu" size={28} color={isDarkMode ? '#fff' : '#18181B'} />
          </TouchableOpacity>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="mr-2 relative" onPress={() => router.push('/notifications')}>
              <Feather name="bell" size={24} color={isDarkMode ? '#fff' : '#18181B'} />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] justify-center items-center px-1">
                <Text className="text-white font-bold text-xs">3</Text>
              </View>
            </TouchableOpacity>
            <View className="w-9 h-9 rounded-full bg-[#5F3EFE] justify-center items-center">
              <Text className="text-white font-bold text-lg">D</Text>
            </View>
          </View>
        </View>

        {/* Drawer Overlay */}
        {drawerShouldRender && (
          <Pressable
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.15)',
              zIndex: 100,
            }}
            onPress={handleCloseDrawer}
          >
            {/* Drawer */}
            <Animated.View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '80%',
                height: '100%',
                transform: [{ translateX: drawerAnim }],
              }}
            >
              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: isDarkMode ? '#1F2937' : '#fff',
                  paddingTop: insets.top - 8,
                  paddingHorizontal: 20,
                  elevation: 10,
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, marginTop: 15 }}>
                  <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#5F3EFE', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 22 }}>D</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: isDarkMode ? '#fff' : '#000' }}>Daisy Johnson</Text>
                    <Text style={{ color: isDarkMode ? '#A1A1AA' : '#71717A', fontSize: 15 }}>Product Designer</Text>
                  </View>
                  <TouchableOpacity onPress={handleCloseDrawer}>
                    <Feather name="x" size={24} color={isDarkMode ? '#fff' : '#18181B'} />
                  </TouchableOpacity>
                </View>
                {/* Menu Items */}
                <DrawerMenuItem
                  onPress={() => {
                    setActiveDrawerItem('Home');
                    router.push('/dashboard');
                  }}
                  icon="home"
                  label="Home"
                  active={activeDrawerItem === 'Home'}
                />
                <DrawerMenuItem
                  onPress={() => {
                    setActiveDrawerItem('Calendar');
                    router.push('/calendar');
                  }}
                  icon="calendar"
                  label="Calendar"
                  active={activeDrawerItem === 'Calendar'}
                />
                <DrawerMenuItem
                  onPress={() => {
                    setActiveDrawerItem('Create New Task');
                    router.push('/createTask');
                  }}
                  icon="edit-3"
                  label="Create New Task"
                  active={activeDrawerItem === 'Create New Task'}
                />
                <DrawerMenuItem
                  onPress={() => {
                    setActiveDrawerItem('Team Members');
                    router.push('/teamMember');
                  }}
                  icon="users"
                  label="Team Members"
                  active={activeDrawerItem === 'Team Members'}
                />
                <DrawerMenuItem
                  onPress={() => { setActiveDrawerItem('Analytics')
                    router.push('/analytics');
                  }}
                  icon="bar-chart-2"
                  label="Analytics"
                  active={activeDrawerItem === 'Analytics'}
                />
                <DrawerMenuItem
                  onPress={() => { setActiveDrawerItem('Settings')
                    router.push('/profileSetting');
                  }}
                  icon="settings"
                  label="Settings"
                  active={activeDrawerItem === 'Settings'}
                />
                <DrawerMenuItem
                  onPress={() => { setActiveDrawerItem('AI Voice Assistant')
                    router.push('/voiceAssistant');
                  }}
                  icon="cpu"
                  label="AI Voice Assistant"
                  active={activeDrawerItem === 'AI Voice Assistant'}
                />
                <DrawerMenuItem
                  onPress={() => setActiveDrawerItem('Logout')}
                  icon="log-out"
                  label="Logout"
                  active={activeDrawerItem === 'Logout'}
                />
              </SafeAreaView>
            </Animated.View>
          </Pressable>
        )}

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
          {/* Welcome Section */}
          <View className="px-[18px] mt-2">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-[26px] font-normal text-[#71717A] dark:text-[#A1A1AA]">
                  Hello <Text className="font-bold text-[#18181B] dark:text-white">Daisy!</Text> <Text className="text-[22px]">👋</Text>
                </Text>
                <Text className="text-[17px] text-[#71717A] dark:text-[#A1A1AA] mt-0.5">
                  Have a productive day
                </Text>
              </View>
              <TouchableOpacity 
                className="bg-[#5F3EFE] px-4 py-2 rounded-[12px]"
                style={{
                  shadowColor: '#5F3EFE',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
                onPress={() => router.push('/taskList')}
              >
                <Text className="text-white font-semibold text-[14px]">View All Tasks</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Project Cards Carousel */}
          <View className="h-[190px]">
            <FlatList
              ref={flatListRef}
              data={CARD_DATA}
              keyExtractor={(_, i) => i.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToAlignment="center"
              decelerationRate={0}
              contentContainerStyle={{ paddingHorizontal: 18 }}
              renderItem={({ item, index }) => (
                <View
                  className="h-[150px] rounded-[22px] p-[22px] justify-center shadow-lg"
                  style={{
                    backgroundColor: item.color,
                    width: CARD_WIDTH,
                    marginRight: index === CARD_DATA.length - 1 ? 0 : 16,
                    marginTop: 8,
                    marginBottom: 32,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 24,
                    elevation: 8,
                  }}
                >
                  <View className="flex-row items-center mb-2">
                    <Feather name={item.icon} size={20} color="#fff" className="mr-[6px]" />
                    <Text className="text-white font-semibold text-base">{Math.round(item.progress * 100)}%</Text>
                  </View>
                  <Text className="text-white font-bold text-[19px] mb-[6px]">{item.title}</Text>
                  <Text className="text-[#E0E7FF] text-[15px] mb-[18px]">{item.tasks} tasks</Text>
                  <View className="h-[6px] w-full bg-white/20 rounded-[3px]">
                    <View
                      className="h-[6px] rounded-[3px] bg-white"
                      style={{ width: `${item.progress * 100}%` }}
                    />
                  </View>
                </View>
              )}
              onScroll={e => {
                const offset = e.nativeEvent.contentOffset.x;
                setActiveCard(Math.round(offset / CARD_WIDTH));
              }}
            />
            {/* Animated Dots Indicator */}
            <View className="flex-row justify-center items-center mt-3 gap-2">
              {CARD_DATA.map((_, i) => {
                const isActive = i === activeCard;
                return (
                  <Animated.View
                    key={i}
                    className="h-2 rounded-[4px] mx-[3px]"
                    style={{
                      width: dotWidths[i],
                      backgroundColor: isActive ? PURPLE : isDarkMode ? '#374151' : '#E5E7EB',
                    }}
                  />
                );
              })}
            </View>
          </View>
          {/* Today's Progress */}
          <Text className="text-[22px] font-bold text-[#18181B] dark:text-white ml-[18px] mt-[18px] mb-2">
            Today's Progress
          </Text>
          <View className="flex-row justify-between px-[18px] mb-2.5 gap-3">
            <View className="flex-1 bg-white dark:bg-[#1F2937] rounded-[18px] p-4 items-center mx-0.5 shadow-lg min-w-[120px]">
              <View className="flex-row items-center justify-between w-full">
                <Feather name="check-square" size={22} color={PURPLE} />
                <Text className="font-bold text-xl mt-[6px] mb-0.5 text-[#5F3EFE]">12/16</Text>
              </View>
              <Text className="text-black dark:text-white text-[15px] font-bold mb-[6px] text-start w-full mt-2">Tasks Done</Text>
              <View className="w-full h-[7px] bg-[#E5E7EB] dark:bg-gray-700 rounded-[3px] mb-1">
                <View className="h-[7px] rounded-[3px] bg-[#5F3EFE]" style={{ width: '75%' }} />
              </View>
              <Text className="text-[#71717A] dark:text-gray-400 text-[13px] mt-0.5">75% completed</Text>
            </View>
            {/* Focus Time */}
            <View className="flex-1 bg-white dark:bg-[#1F2937] rounded-[18px] p-4 items-center mx-0.5 shadow-lg min-w-[120px]">
              <View className="flex-row items-center justify-between w-full">
                <Feather name="clock" size={22} color={BLUE} />
                <Text className="font-bold text-xl mt-[6px] mb-0.5 text-[#3576EC]">2.5h</Text>
              </View>
              <Text className="text-black dark:text-white text-[15px] font-bold mb-[6px] text-start w-full mt-2">Focus Time</Text>
              <View className="w-full h-[7px] bg-[#E5E7EB] dark:bg-gray-700 rounded-[3px] mb-1">
                <View className="h-[7px] rounded-[3px] bg-[#3576EC]" style={{ width: '62%' }} />
              </View>
              <Text className="text-[#71717A] dark:text-gray-400 text-[13px] mt-0.5">5 sessions</Text>
            </View>
          </View>
          <View className="flex-row justify-between px-[18px] mb-2.5 gap-3">
            {/* Productivity */}
            <View className="flex-1 bg-white dark:bg-[#1F2937] rounded-[18px] p-4 items-center mx-0.5 shadow-lg min-w-[120px]">
              <View className="flex-row items-center justify-between w-full">
                <Feather name="trending-up" size={22} color={PRODUCTIVITY_GREEN} />
                <Text className="font-bold text-xl mt-[6px] mb-0.5 text-[#22C55E]">85%</Text>
              </View>
              <Text className="text-black dark:text-white text-[15px] font-bold mb-[6px] text-start w-full mt-2">Productivity</Text>
              <View className="w-full h-[7px] bg-[#E5E7EB] dark:bg-gray-700 rounded-[3px] mb-1">
                <View className="h-[7px] rounded-[3px] bg-[#22C55E]" style={{ width: '85%' }} />
              </View>
              <Text className="text-[#71717A] dark:text-gray-400 text-[13px] mt-0.5">Above average</Text>
            </View>
            {/* Energy */}
            <View className="flex-1 bg-white dark:bg-[#1F2937] rounded-[18px] p-4 items-center mx-0.5 shadow-lg min-w-[120px]">
              <View className="flex-row items-center justify-between w-full">
                <Feather name="activity" size={22} color={ENERGY_ORANGE} />
                <Text className="font-bold text-xl mt-[6px] mb-0.5 text-[#F59E42]">High</Text>
              </View>
              <Text className="text-black dark:text-white text-[15px] font-bold mb-[6px] text-start w-full mt-2">Energy</Text>
              <View className="w-full h-[7px] bg-[#E5E7EB] dark:bg-gray-700 rounded-[3px] mb-1">
                <View className="h-[7px] rounded-[3px] bg-[#F59E42]" style={{ width: '80%' }} />
              </View>
              <Text className="text-[#71717A] dark:text-gray-400 text-[13px] mt-0.5">Feeling great!</Text>
            </View>
          </View>
          {/* Water Tracker */}
          <View className="bg-white dark:bg-[#1F2937] rounded-[18px] p-[18px] mx-[18px] mt-4 shadow-lg flex-row items-center">
            {/* Icon with blue circle */}
            <View className="w-12 h-12 rounded-full bg-[#E0EDFF] justify-center items-center mr-3">
              <Feather name="droplet" size={24} color={BLUE} />
            </View>
            {/* Texts */}
            <View className="flex-1">
              <Text className="font-bold text-[16px] text-[#18181B] dark:text-white">Water{'\n'}Tracker</Text>
              <Text className="text-[#71717A] dark:text-gray-400 text-[13px] mt-1">{waterCount}/{maxWater} glasses{'\n'}today</Text>
            </View>
            {/* Water glasses */}
            <View className="flex-row items-center mx-4">
              {[...Array(maxWater)].map((_, i) => (
                <View
                  key={i}
                  className="w-2.5 h-6 rounded-full mx-0.5"
                  style={{
                    backgroundColor: i < waterCount ? '#3576EC' : isDarkMode ? '#374151' : '#E5E7EB',
                  }}
                />
              ))}
            </View>
            {/* Plus button */}
            <TouchableOpacity
              className="bg-[#3576EC] rounded-full w-8 h-8 justify-center items-center ml-2"
              onPress={() => setWaterCount(waterCount < maxWater ? waterCount + 1 : maxWater)}
              disabled={waterCount >= maxWater}
            >
              <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Mood Tracker */}
          <View className="bg-white dark:bg-[#1F2937] rounded-[18px] p-[18px] mx-[18px] mt-4 shadow-lg flex-row items-center">
            {/* Left emoji in yellow circle */}
            <View
              className="w-12 h-12 rounded-full justify-center items-center mr-3"
              style={{
                backgroundColor: '#FEF9C3',
                borderWidth: 2,
                borderColor: '#FACC15',
              }}
            >
              <Text className="text-[18px]">{MOODS[selectedMood].emoji}</Text>
            </View>

            {/* Texts */}
            <View className="flex-1">
              <Text className="font-bold text-[16px] text-[#18181B] dark:text-white leading-tight">
                Mood{'\n'}Tracker
              </Text>
              <Text className="text-[#71717A] dark:text-gray-400 text-[13px] mt-1">How are you feeling?</Text>
            </View>

            {/* Mood emoji pills */}
            <View className="flex-row items-center">
              {MOODS.map((mood, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedMood(i)}
                  activeOpacity={0.8}
                  className="mx-1"
                >
                  <View
                    className="w-8 h-8 rounded-full justify-center items-center"
                    style={{
                      backgroundColor: selectedMood === i ? '#FEF9C3' : 'transparent',
                      borderWidth: selectedMood === i ? 2 : 0,
                      borderColor: selectedMood === i ? '#FACC15' : 'transparent',
                    }}
                  >
                    <Text className="text-[16.5px]">{mood.emoji}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        {/* Bottom Navigation */}
        <BottomNavigation activeTab="home" />
      </SafeAreaView >
    </>
  );
}