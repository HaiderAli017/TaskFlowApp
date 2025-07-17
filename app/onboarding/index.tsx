import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PURPLE = '#5F3EFE';
const BG = '#F7F7FF';

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: BG,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
      }}
    >
      {/* Main Icon */}
      <View
        style={{
          width: 112,
          height: 112,
          borderRadius: 24,
          backgroundColor: PURPLE,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
          ...Platform.select({
            ios: {
              shadowColor: PURPLE,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.18,
              shadowRadius: 16,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
      >
        <Feather name="check-square" size={56} color="#fff" />
      </View>

      {/* Features */}
      <View style={{ width: '100%', marginBottom: 48 }}>
        {[
          {
            icon: <Feather name="check-circle" size={24} color="#fff" />,
            text: 'Organize your daily tasks efficiently',
          },
          {
            icon: <MaterialCommunityIcons name="account-group-outline" size={24} color="#fff" />,
            text: 'Collaborate seamlessly with your team',
          },
          {
            icon: <FontAwesome5 name="chart-line" size={20} color="#fff" />,
            text: 'Track progress and achieve goals',
          },
        ].map((item, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: idx < 2 ? 28 : 0,
            }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: PURPLE,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
                ...Platform.select({
                  ios: {
                    shadowColor: PURPLE,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 8,
                  },
                  android: {
                    elevation: 4,
                  },
                }),
              }}
            >
              {item.icon}
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: '700',
                color: '#18181B',
                fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
              }}
            >
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        onPress={() => router.replace('/login')}
        style={{
          backgroundColor: PURPLE,
          paddingVertical: 18,
          borderRadius: 16,
          width: '100%',
          alignItems: 'center',
          ...Platform.select({
            ios: {
              shadowColor: PURPLE,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.18,
              shadowRadius: 16,
            },
            android: {
              elevation: 8,
            },
          }),
        }}
        activeOpacity={0.85}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: '700',
            fontSize: 16,
            fontFamily: Platform.OS === 'ios' ? 'Poppins' : 'sans-serif',
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
