import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import 'react-native-reanimated';
import { ThemeProvider as CustomThemeProvider, useTheme } from '../context/theme/ThemeContext';
import '../styles/global.css';

function AppContent() {
  const { theme } = useTheme();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} translucent backgroundColor="transparent" />
        <Stack
          initialRouteName="splash/index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="analytics/index" options={{ headerShown: false }} />
          <Stack.Screen name="profileSetting/index" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}
