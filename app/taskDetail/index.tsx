import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Check,
  CheckSquare,
  Edit,
  MoreHorizontal,
  Plus,
  Square,
  Trash2,
} from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar as RNStatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/theme/ThemeContext';

interface Tag {
  name: string;
  color: string;
  textColor: string;
}

interface ChecklistItem {
  id: number;
  text: string;
  date: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  tags: Tag[];
  description: string;
  startDate: Date;
  dueDate: Date;
  isCompleted: boolean;
  checklist: ChecklistItem[];
}

const initialTask: Task = {
  id: 1,
  title: 'Landing Page Design',
  tags: [
    { name: 'High Priority', color: 'bg-violet-600', textColor: 'text-white' },
    { name: 'Design', color: 'bg-sky-100', textColor: 'text-sky-800' },
  ],
  description:
    'Create a modern and responsive landing page for the new product launch.',
  startDate: new Date('2024-10-15T12:00:00Z'),
  dueDate: new Date('2024-10-25T12:00:00Z'),
  isCompleted: false,
  checklist: [
    { id: 1, text: 'Research competitor websites', date: 'Oct 15', completed: true },
    { id: 2, text: 'Create wireframes and mockups', date: 'Oct 17', completed: true },
    { id: 3, text: 'Design hero section', date: 'Oct 19', completed: true },
    { id: 4, text: 'Implement responsive design', date: 'Oct 22', completed: false },
    { id: 5, text: 'Final testing and optimization', date: 'Oct 24', completed: false },
  ],
};

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const TaskDetailScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const insets = useSafeAreaInsets();

  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableTask, setEditableTask] = useState<Task | null>(null);
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [datePickerFor, setDatePickerFor] = useState<'start' | 'due'>('start');

  useFocusEffect(
    useCallback(() => {
      RNStatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
      if (Platform.OS === 'android') {
        RNStatusBar.setBackgroundColor(isDarkMode ? '#1F2937' : '#F8F9FA');
      }
    }, [isDarkMode])
  );

  const { progress, completedCount } = useMemo(() => {
    const checklist = isEditing && editableTask ? editableTask.checklist : task.checklist;
    const completed = checklist.filter((item) => item.completed).length;
    const prog = checklist.length ? Math.round((completed / checklist.length) * 100) : 0;
    return { progress: prog, completedCount: completed };
  }, [isEditing, task.checklist, editableTask?.checklist]);

  const handleToggleEdit = () => {
    if (isEditing) {
      if (editableTask) setTask(editableTask);
      setEditableTask(null);
      setIsEditing(false);
    } else {
      const draft = JSON.parse(JSON.stringify(task));
      draft.startDate = new Date(draft.startDate);
      draft.dueDate = new Date(draft.dueDate);
      setEditableTask(draft);
      setIsEditing(true);
    }
  };

  const handleEditChange = (field: keyof Task, value: any) => {
    if (!editableTask) return;
    setEditableTask({ ...editableTask, [field]: value });
  };

  const handleChecklistTextChange = (text: string, id: number) => {
    if (!editableTask) return;
    const updated = editableTask.checklist.map((i) =>
      i.id === id ? { ...i, text } : i
    );
    handleEditChange('checklist', updated);
  };

  const handleRemoveChecklistItem = (id: number) => {
    if (!editableTask) return;
    const updated = editableTask.checklist.filter((i) => i.id !== id);
    handleEditChange('checklist', updated);
  };

  const handleAddNewChecklistItem = () => {
    if (!editableTask) return;
    const newItem: ChecklistItem = {
      id: Date.now(),
      text: 'New item',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      completed: false,
    };
    handleEditChange('checklist', [...editableTask.checklist, newItem]);
  };

  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleEditChange(datePickerFor === 'start' ? 'startDate' : 'dueDate', selectedDate);
    }
  };

  const handleToggleChecklistItem = (id: number) => {
    if (isEditing || task.isCompleted) return;
    const updated = task.checklist.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTask({ ...task, checklist: updated });
  };

  const handleMarkAsComplete = () => {
    if (progress === 100) {
      setTask({ ...task, isCompleted: true });
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 2000);
    } else {
      Alert.alert('Cannot Complete', 'Please complete all checklist items first.');
    }
  };

  const displayTask = isEditing ? editableTask : task;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }} className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity onPress={() => (isEditing ? setIsEditing(false) : router.back())}>
          <ArrowLeft size={24} color={isDarkMode ? '#FFF' : '#333'} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800 dark:text-white">Task Details</Text>
        <TouchableOpacity onPress={handleToggleEdit}>
          {isEditing ? (
            <Text className="text-violet-600 font-bold text-lg">Save</Text>
          ) : (
            <Edit size={22} color={isDarkMode ? '#FFF' : '#333'} />
          )}
        </TouchableOpacity>
      </View>

      {displayTask && (
        <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          <View className="bg-white dark:bg-gray-800 p-6 rounded-2xl">
            {/* Title & Tags */}
            <View className="flex-row justify-between items-start">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white flex-1 pr-4">{displayTask.title}</Text>
              <TouchableOpacity><MoreHorizontal size={24} color={isDarkMode ? '#A0AEC0' : '#888'} /></TouchableOpacity>
            </View>

            {task.isCompleted && !isEditing && (
              <View className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg p-2 mt-4 flex-row items-center self-start">
                <Check size={16} color={isDarkMode ? 'rgb(134, 239, 172)' : 'rgb(34, 197, 94)'} />
                <Text className="text-green-700 dark:text-green-300 font-semibold ml-2">Task Completed</Text>
              </View>
            )}

            <View className="flex-row flex-wrap mt-4">
              {displayTask.tags.map((tag) => (
                <View key={tag.name} className={`px-4 py-1 rounded-full mr-2 mb-2 ${tag.color}`}>
                  <Text className={`${tag.textColor} font-medium text-sm`}>{tag.name}</Text>
                </View>
              ))}
            </View>

            {/* Description */}
            <View className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl mt-6">
              <Text className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2">Description</Text>
              {isEditing ? (
                <TextInput
                  value={displayTask.description}
                  onChangeText={(text) => handleEditChange('description', text)}
                  multiline
                  className="bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg p-3 text-base leading-6 h-32 text-black dark:text-white"
                  textAlignVertical="top"
                  placeholderTextColor={isDarkMode ? '#A0AEC0' : '#9CA3AF'}
                />
              ) : (
                <Text className="text-gray-600 dark:text-gray-300 text-base leading-6">{displayTask.description}</Text>
              )}
            </View>

            {/* Dates */}
            <View className="flex-row justify-between mt-6">
              {['start', 'due'].map((type) => (
                <TouchableOpacity
                  key={type}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl w-[48%] items-center"
                  disabled={!isEditing}
                  onPress={() => {
                    setDatePickerFor(type as 'start' | 'due');
                    setShowDatePicker(true);
                  }}
                >
                  <Text className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {type === 'start' ? 'Start Date' : 'Due Date'}
                  </Text>
                  <Text className="text-base text-gray-800 dark:text-white font-bold mt-1">
                    {formatDate(
                      type === 'start'
                        ? displayTask.startDate
                        : displayTask.dueDate
                    )}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Checklist */}
            <View className="mt-8">
              <Text className="text-lg font-bold text-gray-800 dark:text-white mb-3">
                Checklist ({completedCount}/{displayTask.checklist.length})
              </Text>

              {isEditing ? (
                <>
                  {displayTask.checklist.map((item) => (
                    <View key={item.id} className="flex-row items-center py-2">
                      <TextInput
                        className="ml-4 text-base flex-1 border-b border-gray-300 dark:border-gray-600 pb-1 text-black dark:text-white"
                        value={item.text}
                        onChangeText={(text) => handleChecklistTextChange(text, item.id)}
                      />
                      <TouchableOpacity onPress={() => handleRemoveChecklistItem(item.id)} className="p-2 ml-2">
                        <Trash2 size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={handleAddNewChecklistItem}
                    className="flex-row items-center py-3 mt-2 bg-sky-100 dark:bg-sky-900 rounded-lg justify-center"
                  >
                    <Plus size={20} color={isDarkMode ? '#7DD3FC' : '#0369A1'} />
                    <Text className="text-sky-800 dark:text-sky-200 font-bold ml-2">Add Item</Text>
                  </TouchableOpacity>
                </>
              ) : (
                displayTask.checklist.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="flex-row items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700"
                    onPress={() => handleToggleChecklistItem(item.id)}
                    disabled={task.isCompleted}
                  >
                    <View className="flex-row items-center flex-1">
                      {item.completed ? (
                        <CheckSquare size={24} color="#6443FE" />
                      ) : (
                        <Square size={24} color={isDarkMode ? '#718096' : '#A0AEC0'} />
                      )}
                      <Text
                        className={`ml-4 text-base flex-1 ${
                          item.completed
                            ? 'text-gray-400 dark:text-gray-500 line-through'
                            : 'text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {item.text}
                      </Text>
                    </View>
                    <Text
                      className={`text-sm ${
                        item.completed
                          ? 'text-gray-400 dark:text-gray-500'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {item.date}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>

            {/* Progress */}
            {!isEditing && (
              <>
                <View className="mt-8">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-bold text-gray-800 dark:text-white">Overall Progress</Text>
                    <Text className="text-lg font-bold text-violet-600 dark:text-[#5F3EFE]">{progress}%</Text>
                  </View>
                  <View className="bg-gray-200 dark:bg-gray-600 h-2.5 rounded-full w-full">
                    <View className="h-2.5 rounded-full" style={{ width: `${progress}%`, backgroundColor: '#5F3EFE' }} />
                  </View>
                </View>

                {!task.isCompleted && (
                  <TouchableOpacity
                    className={`rounded-lg py-4 mt-8 ${
                      progress === 100 ? 'bg-[#5F3EFE]' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                    onPress={handleMarkAsComplete}
                    disabled={progress !== 100}
                  >
                    <Text
                      className={`text-center text-lg font-bold ${
                        progress === 100 ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      Mark as Complete
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </ScrollView>
      )}

      {showDatePicker && displayTask && (
        <DateTimePicker
          value={datePickerFor === 'start' ? displayTask.startDate : displayTask.dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          themeVariant={isDarkMode ? 'dark' : 'light'}
        />
      )}

      <Modal animationType="fade" transparent={true} visible={isPopupVisible}>
        <View className="flex-1 justify-center items-center bg-black/30">
          <View className="bg-violet-600 rounded-2xl p-8 items-center justify-center w-64 h-64">
            <View className="bg-white/30 rounded-full p-4">
              <Check size={60} color="white" strokeWidth={3} />
            </View>
            <Text className="text-white text-xl font-bold mt-6">Task Completed!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TaskDetailScreen;