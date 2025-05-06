import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import colors from '@/constants/Colors';
import { Chrome as Home, MessageSquare, ChartBar as BarChart3, Target } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color, size }) => <MessageSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="goal-tracker"
        options={{
          title: 'Goals',
          tabBarIcon: ({ color, size }) => <Target size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mood-graph"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}