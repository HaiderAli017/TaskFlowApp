import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect, useRouter } from 'expo-router';
import { ArrowLeft, Check, X } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/theme/ThemeContext';

// Format helpers
const formatDateForHeader = (date: Date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options as Intl.DateTimeFormatOptions);
};

const CreateTaskScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
      StatusBar.setBackgroundColor(isDarkMode ? '#1F2937' : '#6443FE');
      StatusBar.setTranslucent(false);
    }, [isDarkMode])
  );

  // States...
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(['Meeting', 'Urgent', 'Work', 'Design']);
  const [selectedCategory, setSelectedCategory] = useState('Urgent');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [priority, setPriority] = useState('Medium'); // Default priority
  const [assignedPeople, setAssignedPeople] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerFor, setPickerFor] = useState<'start' | 'end'>('start');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (event.type === 'set' && selectedDate) {
      if (pickerFor === 'start') {
        setStartDate(selectedDate);
        if (selectedDate > endDate) {
          setEndDate(selectedDate);
        }
      } else {
        if (selectedDate < startDate) {
          Alert.alert("Invalid Date", "End date cannot be earlier than start date.");
        } else {
          setEndDate(selectedDate);
        }
      }
    }
  };

  const showDatePicker = (pickerType: 'start' | 'end') => {
    setPickerFor(pickerType);
    setShowPicker(true);
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklistItems([...checklistItems, newChecklistItem.trim()]);
      setNewChecklistItem('');
    }
  };

  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTaskTitle('');
    setDescription('');
    setSelectedCategory('Urgent');
    const now = new Date();
    setStartDate(now);
    setEndDate(now);
    setChecklistItems([]);
    setNewChecklistItem('');
    setPriority('Medium');
    setAssignedPeople('');
  };

  const handleCreateTask = () => {
    if (!taskTitle) {
      Alert.alert('Validation Error', 'Task title is required.');
      return;
    }
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      resetForm();
    }, 2000);
  };

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
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-gray-800' : 'bg-[#6443FE]'}`}>
      <View className="flex-1">
        {/* Header */}
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

        {/* Form Card */}
        <ScrollView
          className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-t-3xl"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">Task Title</Text>
          <TextInput
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-black dark:text-white"
            placeholder="Enter task title"
            placeholderTextColor="#9CA3AF"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />

          {/* Start Date & End Date */}
          <View className="flex-row justify-between mt-6">
            <View className="w-[48%]">
              <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">Start Date</Text>
              <TouchableOpacity
                onPress={() => showDatePicker('start')}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 flex-row justify-between items-center"
              >
                <Text className="text-base text-black dark:text-white">{formatDateForHeader(startDate)}</Text>
                <View className="w-2 h-2 border-b-2 border-r-2 border-gray-500 dark:border-gray-400 transform rotate-45" />
              </TouchableOpacity>
            </View>
            <View className="w-[48%]">
              <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mb-2">End Date</Text>
              <TouchableOpacity
                onPress={() => showDatePicker('end')}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 flex-row justify-between items-center"
              >
                <Text className="text-base text-black dark:text-white">{formatDateForHeader(endDate)}</Text>
                <View className="w-2 h-2 border-b-2 border-r-2 border-gray-500 dark:border-gray-400 transform rotate-45" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mt-6 mb-2">Description</Text>
          <TextInput
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base h-24 text-black dark:text-white"
            placeholder="Add task description..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />

          {/* Checklist */}
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mt-6 mb-2">Checklist</Text>
          {checklistItems.map((item, index) => (
            <View key={index} className="flex-row items-center justify-between border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-2">
              <Text className="text-base text-black dark:text-white flex-1">{item}</Text>
              <TouchableOpacity onPress={() => removeChecklistItem(index)} className="ml-2">
                <X size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <View className="flex-row items-center mt-2">
            <TextInput
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-black dark:text-white flex-1 mr-2"
              placeholder="Add checklist item"
              placeholderTextColor="#9CA3AF"
              value={newChecklistItem}
              onChangeText={setNewChecklistItem}
              onSubmitEditing={addChecklistItem}
            />
            <TouchableOpacity onPress={addChecklistItem} className="bg-[#6443FE] rounded-lg px-4 py-3">
              <Text className="text-white text-base font-bold">Add</Text>
            </TouchableOpacity>
          </View>

          {/* Priority */}
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mt-6 mb-2">Priority</Text>
          <View className="flex-row flex-wrap items-center">
            {['Low', 'Medium', 'High', 'Critical'].map((prio) => (
              <TouchableOpacity
                key={prio}
                onPress={() => setPriority(prio)}
                className={`px-5 py-2 rounded-lg mr-3 mb-3 ${priority === prio ? 'bg-[#6443FE]' : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <Text className={`${priority === prio ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-800'} font-medium`}>
                  {prio}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Assigned People */}
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mt-6 mb-2">Assigned People</Text>
          <TextInput
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base text-black dark:text-white"
            placeholder="Enter names (comma-separated)"
            placeholderTextColor="#9CA3AF"
            value={assignedPeople}
            onChangeText={setAssignedPeople}
          />

          {/* Category */}
          <Text className="text-base font-medium text-gray-600 dark:text-gray-400 mt-6 mb-2">Category</Text>
          <View className="flex-row flex-wrap items-center">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-lg mr-3 mb-3 ${selectedCategory === cat ? 'bg-[#6443FE]' : isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <Text className={`${selectedCategory === cat ? 'text-white' : isDarkMode ? 'text-gray-300' : 'text-gray-800'} font-medium`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
            {isAddingCategory ? (
              <View className="flex-row items-center border-2 border-dashed border-[#6443FE] rounded-lg mr-3 mb-3 bg-transparent">
                <TextInput
                  value={newCategory}
                  onChangeText={setNewCategory}
                  placeholder="New category"
                  placeholderTextColor="#6443FE"
                  className="px-3 py-2 min-w-[80px] text-[#6443FE] dark:text-blue-400"
                  autoFocus
                />
                <TouchableOpacity onPress={handleConfirmAddCategory} className="ml-1 bg-[#6443FE] rounded-full p-1">
                  <Check size={18} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancelAddCategory} className="ml-1 bg-red-500 rounded-full p-1">
                  <X size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleAddNewCategory}
                className="px-5 py-2 rounded-lg mr-3 mb-3 border-2 border-dashed border-[#6443FE] flex-row items-center"
              >
                <Text className="text-[#6443FE] dark:text-[#5F3EFE] font-medium">+ Add New</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View className="p-6 bg-white dark:bg-gray-900">
          <TouchableOpacity className="bg-[#6443FE] rounded-lg py-4" onPress={handleCreateTask}>
            <Text className="text-white text-center text-lg font-bold">Create Task</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker */}
        {showPicker && (
          <DateTimePicker
            value={pickerFor === 'start' ? startDate : endDate}
            mode="date"
            display="default"
            onChange={onDateChange}
            themeVariant={isDarkMode ? 'dark' : 'light'}
          />
        )}

        {/* Success Modal */}
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
      </View>
    </SafeAreaView>
  );
};

export default CreateTaskScreen;
