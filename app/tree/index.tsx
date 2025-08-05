import { useTheme } from '@/context/theme/ThemeContext';
import { getTotalRequiredSessions, getTreeStage, stages } from '@/utils/getTreeStage';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTreeStore } from '../../hooks/useTree';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import SVG components for each stage
const stageEmojis: Record<string, string> = {
  seed: '🌱',
  roots: '🌿',
  leaf: '🍃',
  tree: '🌳',
  bloom: '🌸',
};

const TreeScreen = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { sessionCount, incrementSession, loadSessionCount, resetTree } = useTreeStore();
  const currentStageKey = getTreeStage(sessionCount);
  const currentStage = stages.find(s => s.key === currentStageKey);
  const totalRequiredSessions = getTotalRequiredSessions();

  const getCumulativeSessionsUpToStage = (targetStageKey: string) => {
    let cumulative = 0;
    for (const stage of stages) {
      if (stage.key === targetStageKey) {
        return cumulative;
      }
      cumulative += stage.requiredSessions;
    }
    return cumulative;
  };

  const currentCumulativeSessions = getCumulativeSessionsUpToStage(currentStageKey);
  const nextStageRequiredSessions = currentStage ? currentStage.requiredSessions : 0;
  const sessionsInCurrentStage = sessionCount - currentCumulativeSessions;
  const sessionsRemainingInCurrentStage = nextStageRequiredSessions - sessionsInCurrentStage;

  const iconScale = useSharedValue(1);
  const iconOpacity = useSharedValue(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasShownCongrats, setHasShownCongrats] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    loadSessionCount();
    // Load completed sessions from storage
    const loadCompletedSessions = async () => {
      try {
        const storedCount = await AsyncStorage.getItem('completedSessions');
        if (storedCount !== null) {
          setCompletedSessions(parseInt(storedCount));
        }
      } catch (error) {
        console.error('Failed to load completed sessions:', error);
      }
    };
    loadCompletedSessions();
  }, []);

  useEffect(() => {
    // Animate icon change
    iconScale.value = withTiming(0.8, { duration: 150 }, () => {
      iconOpacity.value = withTiming(0, { duration: 100 }, () => {
        iconScale.value = withTiming(1.2, { duration: 150 }, () => {
          iconScale.value = withSpring(1);
          iconOpacity.value = withTiming(1, { duration: 100 });
        });
      });
    });

    if (
      currentStageKey === 'bloom' &&
      sessionCount === totalRequiredSessions &&
      !hasShownCongrats
    ) {
      setShowConfetti(true);
      setHasShownCongrats(true);

      // Increment completed sessions and save to storage
      setCompletedSessions(prev => {
        const newCount = prev + 1;
        AsyncStorage.setItem('completedSessions', newCount.toString());
        return newCount;
      });

      // Hide after 3 seconds and reset progress
      setTimeout(() => {
        setShowConfetti(false);
        setHasShownCongrats(false); // Optional: allow it again in the future
        resetTree(); // Reset to start
      }, 3000);
    }
  }, [currentStageKey, sessionCount, totalRequiredSessions, hasShownCongrats, resetTree]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
      opacity: iconOpacity.value,
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => router.back()} className="absolute left-4">
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-black">
            Tree Progress
          </Text>
        </View>
        <View className="absolute right-4 flex-row items-center bg-gray-200/50 px-3 py-1 rounded-full">
          <Text style={{ fontSize: 18 }}>🏆</Text>
          <Text className="ml-1 text-lg font-bold text-black">{completedSessions}</Text>
        </View>
      </View>

      {/* Tree Stage Card (Main Bubble Card) */}
      <View className="mx-4 mt-4 p-4 bg-white rounded-2xl shadow-lg shadow-gray-400">
        <View className="items-center justify-center">
          <View className="w-40 h-40 rounded-full bg-white/30 items-center justify-center">
            <Animated.View style={animatedIconStyle}>
              {currentStage && <Text style={{ fontSize: 80 }}>{stageEmojis[currentStage.key]}</Text>}
            </Animated.View>
          </View>
          <Text className="text-2xl font-bold text-black mt-4">
            {currentStage?.label}
          </Text>
          <Text className="text-lg text-gray-600 mt-1">
            {currentStageKey === 'bloom' && sessionCount === totalRequiredSessions && showConfetti ? 'Congratulations!' : `${sessionsInCurrentStage} / ${nextStageRequiredSessions} sessions`}
          </Text>
        </View>
      </View>

      {/* Stage Table Card (Progress Tracker) */}
      <View className="mx-4 mt-4 p-4 bg-white rounded-2xl shadow-lg shadow-gray-400">
        {stages.map((stage, index) => {
          const isCurrent = stage.key === currentStageKey;
          let sessionsCompletedForStage = 0;
          let cumulativeRequired = 0;
          for (let i = 0; i <= index; i++) {
            cumulativeRequired += stages[i].requiredSessions;
          }
          if (index === 0) {
            sessionsCompletedForStage = Math.min(sessionCount, stage.requiredSessions);
          } else {
            const prevCumulativeRequired = getCumulativeSessionsUpToStage(stages[index-1].key) + stages[index-1].requiredSessions;
            sessionsCompletedForStage = Math.min(Math.max(0, sessionCount - prevCumulativeRequired), stage.requiredSessions);
          }

          return (
            <View key={stage.key} className="flex-row items-center py-2 border-b border-gray-200 last:border-b-0">
              <View className="w-10 items-center">
                <Text style={{ fontSize: 24 }}>{stageEmojis[stage.key]}</Text>
              </View>
              <View className="flex-1 ml-2">
                <Text className="font-semibold text-black">
                  {stage.label}
                </Text>
                <Text className="text-sm text-gray-600">
                  {sessionsCompletedForStage} / {stage.requiredSessions} sessions
                </Text>
              </View>
              {isCurrent && (
                <View className="bg-blue-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-bold">Current Session</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Increment Session Button */}
      <TouchableOpacity
        onPress={incrementSession}
        className={`mt-12 mx-4 px-6 py-3 rounded-full items-center ${
          currentStageKey === 'bloom' && sessionCount === totalRequiredSessions && showConfetti
            ? 'bg-gray-400'
            : 'bg-blue-500'
        }`}
        disabled={currentStageKey === 'bloom' && sessionCount === totalRequiredSessions && showConfetti}
      >
        <Text className="text-white font-bold text-lg">Complete Session</Text>
      </TouchableOpacity>

      {currentStageKey === 'bloom' && sessionCount === totalRequiredSessions && showConfetti && (
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <Text className="text-4xl font-bold text-green-600 mb-4">Congratulations!</Text>
          {showConfetti && (
            <Text style={{ fontSize: 100 }}>🎉</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default TreeScreen;
