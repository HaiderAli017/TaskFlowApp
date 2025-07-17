import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

    return (
      <SafeAreaView className="flex-1 bg-[#6443FE] items-center justify-center relative">
        <StatusBar style="light" backgroundColor="#6443FE" />

        <View className="w-20 h-20 bg-white/20 rounded-2xl items-center justify-center mb-6">
          <Feather name="check-square" size={40} color="white" />
        </View>

        <Text className="text-white text-3xl font-bold mb-2">TaskFlow</Text>
        <Text className="text-white text-md font-semibold tracking-wide text-center">
          Organize • Collaborate • Achieve
        </Text>


        <View className="absolute bottom-8">
          <Text className="text-white/70 text-xs">Powered by FlowTech</Text>
        </View>
      </SafeAreaView>
    );
  }
