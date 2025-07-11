import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <StatusBar style="dark" />

      <View className="items-center">
        <Image
          source={require('../../assets/images/react-logo.png')} 
          className="w-30 h-30 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-black-800">TaskFlow</Text>
      </View>
    </SafeAreaView>
  );
}
