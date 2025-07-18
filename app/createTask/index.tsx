import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, X } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Helper function to format date for the header
const formatDateForHeader = (date: Date) => {
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
  // Using 'en-GB' for a format like "Saturday, 3 Oct 2024"
  return date.toLocaleDateString('en-GB', options as Intl.DateTimeFormatOptions);
};

// Helper function to format time for display (e.g., "4:00 PM")
const formatTimeForDisplay = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Main Component
const CreateTaskScreen = () => {
  const router = useRouter();
  // --- State Management ---
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<string[]>(['Meeting', 'Urgent', 'Work', 'Design']);
  const [selectedCategory, setSelectedCategory] = useState('Urgent');

  // --- Time Picker State ---
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [showPicker, setShowPicker] = useState(false);
  const [pickerFor, setPickerFor] = useState<'start' | 'end'>('start'); // 'start' or 'end'

  // --- Popup Modal State ---
  const [isPopupVisible, setPopupVisible] = useState(false);

  // New state for inline add category
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  // --- Time Picker Handlers ---
  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      if (pickerFor === 'start') {
        setStartTime(selectedDate);
        setEndTime(new Date(selectedDate.getTime() + 60 * 60 * 1000));
      } else {
        if (selectedDate < startTime) {
          Alert.alert("Invalid Time", "End time cannot be earlier than start time.");
        } else {
          setEndTime(selectedDate);
        }
      }
    }
  };

  const showTimePicker = (pickerType: 'start' | 'end') => {
    setPickerFor(pickerType);
    setShowPicker(true);
  };

  // --- Form Reset Handler ---
  const resetForm = () => {
    setTaskTitle('');
    setDescription('');
    setSelectedCategory('Urgent');
    const now = new Date();
    setStartTime(now);
    setEndTime(new Date(now.getTime() + 60 * 60 * 1000));
  };

  // --- Create Task Handler ---
  const handleCreateTask = () => {
    if (!taskTitle) {
      Alert.alert('Validation Error', 'Task title is required.');
      return;
    }
    console.log('--- New Task Created ---');
    console.log('Title:', taskTitle);
    console.log('Start Time:', formatTimeForDisplay(startTime));
    console.log('End Time:', formatTimeForDisplay(endTime));
    console.log('Description:', description);
    console.log('Category:', selectedCategory);
    console.log('------------------------');
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      resetForm();
    }, 2000);
  };

  // --- Add New Category Handler ---
  const handleAddNewCategory = () => {
    setIsAddingCategory(true);
    setNewCategory('');
  };
  const handleConfirmAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
    }
    setIsAddingCategory(false);
    setNewCategory('');
  };
  const handleCancelAddCategory = () => {
    setIsAddingCategory(false);
    setNewCategory('');
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6443FE" translucent={false} />
      <SafeAreaView className="flex-1 bg-[#6443FE]">
        <View className="flex-1">
          {/* --- Header --- */}
          <View className="px-5 pt-5 pb-12">
            <View className="flex-row justify-between items-center">
              <TouchableOpacity onPress={() => router.replace('/dashboard')}>
                <ArrowLeft size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.replace('/dashboard')}>
                <X size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text className="text-white text-3xl font-bold mt-4">Create New Task</Text>
            <Text className="text-white text-base mt-1">{formatDateForHeader(new Date())}</Text>
          </View>

          {/* --- Form Card --- */}
          <ScrollView 
            className="flex-1 bg-white p-6 rounded-t-3xl"
            showsVerticalScrollIndicator={false}
          >
            {/* Task Title */}
            <Text className="text-base font-medium text-gray-600 mb-2">Task Title</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Enter task title"
              placeholderTextColor="#9CA3AF"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            {/* Time Pickers */}
            <View className="flex-row justify-between mt-6">
              <View className="w-[48%]">
                <Text className="text-base font-medium text-gray-600 mb-2">Start Time</Text>
                <TouchableOpacity
                  onPress={() => showTimePicker('start')}
                  className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
                >
                  <Text className="text-base">{formatTimeForDisplay(startTime)}</Text>
                  <View className="w-2 h-2 border-b-2 border-r-2 border-gray-500 transform rotate-45" />
                </TouchableOpacity>
              </View>
              <View className="w-[48%]">
                <Text className="text-base font-medium text-gray-600 mb-2">End Time</Text>
                <TouchableOpacity
                  onPress={() => showTimePicker('end')}
                  className="border border-gray-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
                >
                  <Text className="text-base">{formatTimeForDisplay(endTime)}</Text>
                  <View className="w-2 h-2 border-b-2 border-r-2 border-gray-500 transform rotate-45" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description */}
            <Text className="text-base font-medium text-gray-600 mt-6 mb-2">Description</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base h-24"
              placeholder="Add task description..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={description}
              onChangeText={setDescription}
            />

            {/* Category */}
            <Text className="text-base font-medium text-gray-600 mt-6 mb-2">Category</Text>
            <View className="flex-row flex-wrap items-center">
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-lg mr-3 mb-3 ${selectedCategory === cat ? 'bg-[#6443FE]' : 'bg-gray-100'}`}
                >
                  <Text className={`${selectedCategory === cat ? 'text-white' : 'text-gray-800'} font-medium`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
              {isAddingCategory ? (
                <View className="flex-row items-center border-2 border-dashed border-[#6443FE] rounded-lg mr-3 mb-3 bg-white">
                  <TextInput
                    value={newCategory}
                    onChangeText={setNewCategory}
                    placeholder="New category"
                    placeholderTextColor="#6443FE"
                    className="px-3 py-2 min-w-[80px] text-[#6443FE]"
                    autoFocus
                  />
                  <TouchableOpacity
                    onPress={handleConfirmAddCategory}
                    className="ml-1 bg-[#6443FE] rounded-full p-1"
                  >
                    <Check size={18} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCancelAddCategory}
                    className="ml-1 bg-red-500 rounded-full p-1"
                  >
                    <X size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleAddNewCategory}
                  className="px-5 py-2 rounded-lg mr-3 mb-3 border-2 border-dashed border-[#6443FE] flex-row items-center"
                >
                  <Text className="text-[#6443FE] font-medium">+ Add New</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="h-24" /> 
          </ScrollView>
          
          {/* --- Create Task Button --- */}
          <View className="p-6 bg-white">
            <TouchableOpacity 
              className="bg-[#6443FE] rounded-lg py-4"
              onPress={handleCreateTask}
            >
              <Text className="text-white text-center text-lg font-bold">Create Task</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* --- Date/Time Picker Component --- */}
        {showPicker && (
          <DateTimePicker
            value={pickerFor === 'start' ? startTime : endTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        {/* --- Success Popup Modal --- */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isPopupVisible}
          onRequestClose={() => setPopupVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/30">
            <View className="bg-[#6443FE] rounded-2xl p-8 items-center justify-center w-64 h-64">
              <View className="bg-white/30 rounded-full p-4">
                <Check size={60} color="white" strokeWidth={3} />
              </View>
              <Text className="text-white text-xl font-bold mt-6">Task Created</Text>
              <Text className="text-white text-base">Successful</Text>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </>
  );
};

export default CreateTaskScreen;