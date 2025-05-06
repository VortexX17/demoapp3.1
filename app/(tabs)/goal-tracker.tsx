import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Plus, Filter, ChevronRight, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Theme';
import { GoalTimelineItem } from '@/components/goals/GoalTimelineItem';
import { GoalStatusPill } from '@/components/goals/GoalStatusPill';

export default function GoalTrackerScreen() {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  const [activeFilter, setActiveFilter] = useState('all');
  
  const goals = [
    {
      id: '1',
      title: 'Complete Project X prototype',
      description: 'Finish the initial wireframes and prototype for client review',
      dueDate: 'Oct 15',
      status: 'in-progress',
      milestones: [
        { id: 'm1', title: 'Research phase', completed: true },
        { id: 'm2', title: 'Wireframing', completed: true },
        { id: 'm3', title: 'Prototype development', completed: false },
      ]
    },
    {
      id: '2',
      title: 'Learn React Native animation',
      description: 'Master Reanimated 2 for creating fluid animations',
      dueDate: 'Oct 30',
      status: 'not-started',
      milestones: [
        { id: 'm1', title: 'Basic concepts', completed: false },
        { id: 'm2', title: 'Simple animations', completed: false },
        { id: 'm3', title: 'Complex gestures', completed: false },
      ]
    },
    {
      id: '3',
      title: 'Establish meditation habit',
      description: 'Meditate for 10 minutes every morning',
      dueDate: 'Ongoing',
      status: 'completed',
      milestones: [
        { id: 'm1', title: '3 days streak', completed: true },
        { id: 'm2', title: '1 week streak', completed: true },
        { id: 'm3', title: '1 month streak', completed: true },
      ]
    },
  ];

  const filteredGoals = activeFilter === 'all' 
    ? goals 
    : goals.filter(goal => goal.status === activeFilter);

  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: themeColors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Animated.Text 
          entering={FadeIn.delay(100)}
          style={[globalStyles.screenTitle, { color: themeColors.text }]}
        >
          Goals & Milestones
        </Animated.Text>
        
        <TouchableOpacity style={[styles.filterButton, { borderColor: themeColors.border }]}>
          <Filter size={18} color={themeColors.text} style={styles.filterIcon} />
          <Text style={[styles.filterText, { color: themeColors.text }]}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeFilter === 'all' && {backgroundColor: themeColors.tint}
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[
              styles.tabText,
              activeFilter === 'all' ? {color: '#fff'} : {color: themeColors.text}
            ]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeFilter === 'in-progress' && {backgroundColor: themeColors.tint}
            ]}
            onPress={() => setActiveFilter('in-progress')}
          >
            <Text style={[
              styles.tabText,
              activeFilter === 'in-progress' ? {color: '#fff'} : {color: themeColors.text}
            ]}>
              In Progress
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeFilter === 'not-started' && {backgroundColor: themeColors.tint}
            ]}
            onPress={() => setActiveFilter('not-started')}
          >
            <Text style={[
              styles.tabText,
              activeFilter === 'not-started' ? {color: '#fff'} : {color: themeColors.text}
            ]}>
              Not Started
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeFilter === 'completed' && {backgroundColor: themeColors.tint}
            ]}
            onPress={() => setActiveFilter('completed')}
          >
            <Text style={[
              styles.tabText,
              activeFilter === 'completed' ? {color: '#fff'} : {color: themeColors.text}
            ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView
        style={styles.goalsContainer}
        contentContainerStyle={styles.goalsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredGoals.map((goal, index) => (
          <Animated.View 
            key={goal.id}
            entering={SlideInUp.delay(index * 100).springify()}
          >
            <TouchableOpacity 
              style={[
                styles.goalCard,
                { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }
              ]}
            >
              <View style={[globalStyles.row, globalStyles.spaceBetween]}>
                <Text style={[styles.goalTitle, { color: themeColors.text }]}>
                  {goal.title}
                </Text>
                <GoalStatusPill status={goal.status} />
              </View>
              
              <Text style={[styles.goalDescription, { color: themeColors.neutral3 }]}>
                {goal.description}
              </Text>
              
              <View style={styles.dueDateContainer}>
                <Text style={[styles.dueDateLabel, { color: themeColors.neutral3 }]}>
                  Due:
                </Text>
                <Text style={[styles.dueDate, { color: themeColors.text }]}>
                  {goal.dueDate}
                </Text>
              </View>
              
              <View style={styles.milestones}>
                <Text style={[styles.milestonesTitle, { color: themeColors.text }]}>
                  Milestones
                </Text>
                
                {goal.milestones.map((milestone, idx) => (
                  <GoalTimelineItem 
                    key={milestone.id}
                    title={milestone.title}
                    completed={milestone.completed}
                    isLast={idx === goal.milestones.length - 1}
                  />
                ))}
              </View>
              
              <TouchableOpacity style={[
                styles.viewDetailsButton,
                { backgroundColor: themeColors.neutral1 }
              ]}>
                <Text style={[styles.viewDetailsText, { color: themeColors.tint }]}>
                  View Details
                </Text>
                <ChevronRight size={16} color={themeColors.tint} />
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
      
      <TouchableOpacity 
        style={[styles.addButton, { backgroundColor: themeColors.tint }]}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterIcon: {
    marginRight: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabsContainer: {
    paddingVertical: 16,
  },
  tabs: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  goalsContainer: {
    flex: 1,
  },
  goalsContent: {
    padding: 16,
    paddingBottom: 100,
  },
  goalCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  goalDescription: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  dueDateContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dueDateLabel: {
    fontSize: 14,
    marginRight: 4,
  },
  dueDate: {
    fontSize: 14,
    fontWeight: '500',
  },
  milestones: {
    marginTop: 8,
  },
  milestonesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});