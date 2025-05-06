import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FileSliders as Sliders, CircleCheck as CheckCircle, ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Theme';
import { GoalProgressCard } from '@/components/home/GoalProgressCard';
import { LessonOfDayCard } from '@/components/home/LessonOfDayCard';
import { MoodCheckInButton } from '@/components/home/MoodCheckInButton';
import { ZenModeToggle } from '@/components/common/ZenModeToggle';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [zenMode, setZenMode] = useState(false);
  const themeColors = colors[colorScheme ?? 'light'];
  
  const todaysGoals = [
    { id: '1', title: 'Morning meditation', completed: true },
    { id: '2', title: 'Review weekly goals', completed: false },
    { id: '3', title: 'Drink 8 glasses of water', completed: false },
  ];

  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: themeColors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Animated.Text 
          entering={FadeIn.delay(100)}
          style={[globalStyles.screenTitle, { color: themeColors.text }]}
        >
          Hello, Taylor
        </Animated.Text>
        
        <ZenModeToggle isActive={zenMode} onToggle={() => setZenMode(!zenMode)} />
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <GoalProgressCard progress={0.65} />
        </Animated.View>
        
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <LessonOfDayCard 
            title="Embrace small wins"
            description="Celebrating small victories can boost your motivation and reinforce positive habits."
            imageUrl="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg"
          />
        </Animated.View>
        
        {!zenMode && (
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <View style={[
              globalStyles.cardContainer, 
              { backgroundColor: themeColors.cardBg }
            ]}>
              <View style={[globalStyles.row, globalStyles.spaceBetween]}>
                <Text style={[styles.todayGoalsTitle, { color: themeColors.text }]}>
                  Today's Goals
                </Text>
                <TouchableOpacity>
                  <Sliders size={20} color={themeColors.tint} />
                </TouchableOpacity>
              </View>
              
              {todaysGoals.map((goal) => (
                <View key={goal.id} style={[styles.goalItem, globalStyles.row, globalStyles.spaceBetween]}>
                  <View style={globalStyles.row}>
                    <CheckCircle 
                      size={22} 
                      color={goal.completed ? themeColors.success : themeColors.neutral3}
                      fill={goal.completed ? themeColors.success : 'transparent'}
                    />
                    <Text style={[
                      styles.goalText, 
                      { color: goal.completed ? themeColors.neutral3 : themeColors.text }
                    ]}>
                      {goal.title}
                    </Text>
                  </View>
                  <ChevronRight size={18} color={themeColors.neutral3} />
                </View>
              ))}
              
              <TouchableOpacity 
                style={[styles.viewAllButton, globalStyles.row, globalStyles.center]}
              >
                <Text style={[styles.viewAllText, { color: themeColors.tint }]}>
                  View all goals
                </Text>
                <ChevronRight size={16} color={themeColors.tint} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        
        {!zenMode && (
          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <TouchableOpacity 
              style={[
                globalStyles.cardContainer, 
                styles.recentInsightCard,
                { backgroundColor: themeColors.primaryLight }
              ]}
            >
              <Text style={[styles.insightTitle, { color: themeColors.text }]}>
                Recent Insight
              </Text>
              <Text style={[styles.insightText, { color: themeColors.text }]}>
                You've been more productive on days following 7+ hours of sleep.
              </Text>
              <Text style={[styles.insightSource, { color: themeColors.tint }]}>
                Based on your mood patterns
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
      
      <MoodCheckInButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  todayGoalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  goalItem: {
    marginBottom: 16,
  },
  goalText: {
    fontSize: 16,
    marginLeft: 12,
  },
  viewAllButton: {
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  recentInsightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6E3AFF',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  insightSource: {
    fontSize: 12,
    fontWeight: '500',
  },
});