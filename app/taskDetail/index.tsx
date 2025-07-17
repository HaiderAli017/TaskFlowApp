import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { ArrowLeft, Check, CheckSquare, Edit, MoreHorizontal, Plus, Square, Trash2 } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    Alert,
    Modal,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// --- MOCK DATA ---
// Define interfaces for strong typing
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

// Using Date objects directly in the initial state.
const initialTask: Task = {
  id: 1,
  title: 'Landing Page Design',
  tags: [
    { name: 'High Priority', color: 'bg-violet-600', textColor: 'text-white' },
    { name: 'Design', color: 'bg-sky-100', textColor: 'text-sky-800' },
  ],
  description: 'Create a modern and responsive landing page for the new product launch. Include hero section, features showcase, testimonials, and compelling call-to-action buttons.',
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

// Helper function to format dates for display
const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// --- MAIN COMPONENT ---
const TaskDetailScreen: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [task, setTask] = useState<Task>(initialTask);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editableTask, setEditableTask] = useState<Task | null>(null); // This will hold the "draft" during editing
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  // Date Picker State
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [datePickerFor, setDatePickerFor] = useState<'start' | 'due'>('start');

  // --- DERIVED STATE (Calculations) ---
  const { progress, completedCount } = useMemo(() => {
    const currentChecklist = isEditing && editableTask ? editableTask.checklist : task.checklist;
    const completedItems = currentChecklist.filter((item: ChecklistItem) => item.completed).length;
    const totalItems = currentChecklist.length;
    const prog = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
    return { progress: prog, completedCount: completedItems };
  }, [isEditing, task.checklist, editableTask?.checklist]);

  // --- HANDLERS ---

  // Toggles between view and edit mode
  const handleToggleEdit = () => {
    if (isEditing) {
      // --- SAVE logic ---
      if (editableTask) {
        setTask(editableTask); // Commit the changes
      }
      setIsEditing(false);
      setEditableTask(null); // Clear the draft state
    } else {
      // --- START EDITING logic ---
      // Create a deep copy to avoid editing the original state directly
      const taskToEdit: Task = JSON.parse(JSON.stringify(task));
      // **IMPORTANT FIX**: Convert date strings from JSON back to Date objects
      taskToEdit.startDate = new Date(taskToEdit.startDate);
      taskToEdit.dueDate = new Date(taskToEdit.dueDate);
      setEditableTask(taskToEdit);
      setIsEditing(true);
    }
  };

  // Generic handler to update any field in the editableTask state
  const handleEditChange = (field: keyof Task, value: any) => {
    if (editableTask) {
      setEditableTask({ ...editableTask, [field]: value });
    }
  };

  // --- Checklist-specific handlers (only affect the draft 'editableTask') ---
  const handleChecklistTextChange = (text: string, itemId: number) => {
    if (!editableTask) return;
    const updatedChecklist = editableTask.checklist.map((item: ChecklistItem) =>
      item.id === itemId ? { ...item, text } : item
    );
    handleEditChange('checklist', updatedChecklist);
  };
  
  const handleRemoveChecklistItem = (itemId: number) => {
    if (!editableTask) return;
    const updatedChecklist = editableTask.checklist.filter((item: ChecklistItem) => item.id !== itemId);
    handleEditChange('checklist', updatedChecklist);
  };

  const handleAddNewChecklistItem = () => {
    if (!editableTask) return;
    const newItem: ChecklistItem = {
      id: Date.now(), // Unique ID
      text: 'New checklist item',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completed: false
    };
    const updatedChecklist = [...editableTask.checklist, newItem];
    handleEditChange('checklist', updatedChecklist);
  };

  // --- Date Picker Handler ---
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
      handleEditChange(datePickerFor === 'start' ? 'startDate' : 'dueDate', selectedDate);
    }
  };
  
  // Toggles a checklist item's 'completed' status in VIEW mode
  const handleToggleChecklistItem = (itemId: number) => {
    if (isEditing || task.isCompleted) return;
    const updatedChecklist = task.checklist.map((item: ChecklistItem) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setTask({ ...task, checklist: updatedChecklist });
  };

  const handleMarkAsComplete = () => {
    if (progress === 100) {
      setTask({ ...task, isCompleted: true });
      setPopupVisible(true);
      setTimeout(() => setPopupVisible(false), 2000);
    } else {
      Alert.alert("Cannot Complete", "Please complete all checklist items first.");
    }
  };
  
  // Determine which task object to use for rendering
  const displayTask: Task | null = isEditing ? editableTask : task;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <SafeAreaView className="flex-1 bg-gray-50">
        {/* --- Header --- */}
        <View className="flex-row justify-between items-center p-4 bg-gray-50">
          <TouchableOpacity onPress={() => isEditing ? setIsEditing(false) : router.replace('/taskList')}>
            <ArrowLeft size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Task Details</Text>
          <TouchableOpacity onPress={handleToggleEdit}>
            {isEditing ? (
              <Text className="font-bold text-lg text-violet-600">Save</Text>
            ) : (
              <Edit size={22} color="#333" />
            )}
          </TouchableOpacity>
        </View>

        {/* We need to check if displayTask is not null before rendering */}
        {displayTask && (
          <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
            <View className="bg-white p-6 rounded-2xl">
              {/* --- Non-Editable Section --- */}
              <View className="flex-row justify-between items-start">
                <Text className="text-2xl font-bold text-gray-900 flex-1 pr-4">{displayTask.title}</Text>
                <TouchableOpacity><MoreHorizontal size={24} color="#888" /></TouchableOpacity>
              </View>
              {task.isCompleted && !isEditing && (
                <View className="bg-green-100 border border-green-300 rounded-lg p-2 mt-4 flex-row items-center self-start">
                  <Check size={16} color="rgb(34, 197, 94)" />
                  <Text className="text-green-700 font-semibold ml-2">Task Completed</Text>
                </View>
              )}
              <View className="flex-row flex-wrap mt-4">
                {displayTask.tags.map((tag: Tag) => (
                  <View key={tag.name} className={`px-4 py-1 rounded-full mr-2 mb-2 ${tag.color}`}>
                    <Text className={`${tag.textColor} font-medium text-sm`}>{tag.name}</Text>
                  </View>
                ))}
              </View>

              {/* --- Description --- */}
              <View className="bg-gray-50 p-4 rounded-xl mt-6">
                <Text className="text-base font-bold text-gray-800 mb-2">Description</Text>
                {isEditing ? (
                  <TextInput
                    value={displayTask.description}
                    onChangeText={(text: string) => handleEditChange('description', text)}
                    multiline
                    className="bg-white border border-gray-300 rounded-lg p-3 text-base leading-6 h-32"
                    textAlignVertical="top"
                  />
                ) : (
                  <Text className="text-gray-600 text-base leading-6">{displayTask.description}</Text>
                )}
              </View>
              
              {/* --- Dates --- */}
              <View className="flex-row justify-between mt-6">
                <TouchableOpacity 
                  className="bg-gray-50 p-4 rounded-xl w-[48%] items-center"
                  disabled={!isEditing}
                  onPress={() => { setDatePickerFor('start'); setShowDatePicker(true); }}
                >
                  <Text className="text-sm text-gray-500 font-medium">Start Date</Text>
                  <Text className="text-base text-gray-800 font-bold mt-1">
                    {formatDate(displayTask.startDate)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-gray-50 p-4 rounded-xl w-[48%] items-center"
                  disabled={!isEditing}
                  onPress={() => { setDatePickerFor('due'); setShowDatePicker(true); }}
                >
                  <Text className="text-sm text-gray-500 font-medium">Due Date</Text>
                  <Text className="text-base text-gray-800 font-bold mt-1">
                    {formatDate(displayTask.dueDate)}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* --- Checklist --- */}
              <View className="mt-8">
                <Text className="text-lg font-bold text-gray-800 mb-3">Checklist ({completedCount}/{displayTask.checklist.length} completed)</Text>
                {isEditing ? (
                  // --- EDIT MODE CHECKLIST ---
                  <>
                    {displayTask.checklist.map((item: ChecklistItem) => (
                      <View key={item.id} className="flex-row items-center py-2">
                        <TextInput 
                          className="ml-4 text-base flex-1 border-b border-gray-300 pb-1"
                          value={item.text}
                          onChangeText={(text: string) => handleChecklistTextChange(text, item.id)}
                        />
                        <TouchableOpacity onPress={() => handleRemoveChecklistItem(item.id)} className="p-2 ml-2">
                          <Trash2 size={20} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity onPress={handleAddNewChecklistItem} className="flex-row items-center py-3 mt-2 bg-sky-100 rounded-lg justify-center">
                      <Plus size={20} color="#0369A1" />
                      <Text className="text-sky-800 font-bold ml-2">Add Item</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  // --- VIEW MODE CHECKLIST ---
                  <>
                    {displayTask.checklist.map((item: ChecklistItem) => (
                      <TouchableOpacity key={item.id} className="flex-row items-center justify-between py-3 border-b border-gray-100" onPress={() => handleToggleChecklistItem(item.id)} disabled={task.isCompleted}>
                        <View className="flex-row items-center flex-1">
                          {item.completed ? <CheckSquare size={24} color="#6443FE" /> : <Square size={24} color="#A0AEC0" />}
                          <Text className={`ml-4 text-base flex-1 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.text}</Text>
                        </View>
                        <Text className={`text-sm ${item.completed ? 'text-gray-400' : 'text-gray-500'}`}>{item.date}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </View>

              {/* --- Progress & Complete Button --- */}
              {!isEditing && (
                <>
                  <View className="mt-8">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-lg font-bold text-gray-800">Overall Progress</Text>
                      <Text className="text-lg font-bold text-violet-600">{progress}%</Text>
                    </View>
                    <View className="bg-gray-200 h-2.5 rounded-full w-full"><View className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} /></View>
                  </View>
                  {!task.isCompleted && (
                    <TouchableOpacity
                      className={`rounded-lg py-4 mt-8 ${progress === 100 ? 'bg-gray-800' : 'bg-gray-300'}`}
                      onPress={handleMarkAsComplete}
                      disabled={progress !== 100}
                    >
                      <Text className="text-white text-center text-lg font-bold">Mark as Complete</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </ScrollView>
        )}

        {/* --- Modals --- */}
        {showDatePicker && displayTask && (
          <DateTimePicker value={datePickerFor === 'start' ? displayTask.startDate : displayTask.dueDate} mode="date" display="default" onChange={onDateChange} />
        )}
        <Modal animationType="fade" transparent={true} visible={isPopupVisible} onRequestClose={() => setPopupVisible(false)}>
          <View className="flex-1 justify-center items-center bg-black/30">
            <View className="bg-violet-600 rounded-2xl p-8 items-center justify-center w-64 h-64">
              <View className="bg-white/30 rounded-full p-4"><Check size={60} color="white" strokeWidth={3} /></View>
              <Text className="text-white text-xl font-bold mt-6">Task Completed!</Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default TaskDetailScreen;