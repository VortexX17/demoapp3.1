import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Theme';
import { MoodChart } from '@/components/mood/MoodChart';
import { MoodInsightCard } from '@/components/mood/MoodInsightCard';
import { WeekdaySelector } from '@/components/mood/WeekdaySelector';

const windowWidth = Dimensions.get('window').width;

export default function MoodGraphScreen() {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('week');
  const [selectedWeek, setSelectedWeek] = useState('current');
  
  const weekData = [
    { day: 'Mon', mood: 3, note: 'Started new project' },
    { day: 'Tue', mood: 4, note: 'Productive day' },
    { day: 'Wed', mood: 2, note: 'Stressed with deadlines' },
    { day: 'Thu', mood: 3, note: 'Getting back on track' },
    { day: 'Fri', mood: 4, note: 'Looking forward to weekend' },
    { day: 'Sat', mood: 5, note: 'Great day with friends' },
    { day: 'Sun', mood: 4, note: 'Relaxing day' },
  ];

  // For demo purposes, let's use the same data for last week
  const lastWeekData = weekData.map(entry => ({
    ...entry,
    mood: Math.max(1, Math.min(5, entry.mood + (Math.random() > 0.5 ? 1 : -1)))
  }));

  const currentData = selectedWeek === 'current' ? weekData : lastWeekData;

  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: themeColors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Animated.Text 
          entering={FadeIn.delay(100)}
          style={[globalStyles.screenTitle, { color: themeColors.text }]}
        >
          Mood Tracker
        </Animated.Text>
        
        <TouchableOpacity>
          <Calendar size={24} color={themeColors.tint} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'week' && { backgroundColor: themeColors.tint }
          ]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'week' ? { color: '#fff' } : { color: themeColors.text }
          ]}>
            Week
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'month' && { backgroundColor: themeColors.tint }
          ]}
          onPress={() => setActiveTab('month')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'month' ? { color: '#fff' } : { color: themeColors.text }
          ]}>
            Month
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'year' && { backgroundColor: themeColors.tint }
          ]}
          onPress={() => setActiveTab('year')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'year' ? { color: '#fff' } : { color: themeColors.text }
          ]}>
            Year
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.weekSelector}>
        <TouchableOpacity 
          onPress={() => setSelectedWeek('previous')}
          style={styles.weekArrow}
        >
          <ChevronLeft size={24} color={themeColors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.weekTitle, { color: themeColors.text }]}>
          {selectedWeek === 'current' ? 'This Week' : 'Last Week'}
        </Text>
        
        <TouchableOpacity 
          onPress={() => setSelectedWeek('current')}
          style={styles.weekArrow}
          disabled={selectedWeek === 'current'}
        >
          <ChevronRight size={24} color={selectedWeek === 'current' ? themeColors.neutral3 : themeColors.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={[
          styles.chartContainer,
          { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }
        ]}>
          <MoodChart data={currentData} />
        </View>
        
        <WeekdaySelector data={currentData} />
        
        <View style={styles.insightsContainer}>
          <View style={[globalStyles.row, globalStyles.spaceBetween]}>
            <Text style={[styles.insightsTitle, { color: themeColors.text }]}>
              AI Insights
            </Text>
            <TouchableOpacity>
              <Info size={18} color={themeColors.tint} />
            </TouchableOpacity>
          </View>
          
          <MoodInsightCard
            title="Midweek Dip"
            description="Your mood tends to dip in the middle of the week. Try scheduling enjoyable activities for Wednesday to maintain emotional balance."
            type="pattern"
          />
          
          <MoodInsightCard
            title="Weekend Boost"
            description="You consistently experience higher mood scores on weekends. This indicates good work-life balance and effective recovery time."
            type="positive"
          />
          
          <TouchableOpacity style={[
            styles.moreInsightsButton,
            { backgroundColor: themeColors.neutral1 }
          ]}>
            <Text style={[styles.moreInsightsText, { color: themeColors.tint }]}>
              View More Insights
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },
  weekSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  weekArrow: {
    padding: 8,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  chartContainer: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  insightsContainer: {
    marginTop: 24,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  moreInsightsButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  moreInsightsText: {
    fontSize: 14,
    fontWeight: '600',
  },
});