import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import colors from '@/constants/Colors';

interface MoodDataPoint {
  day: string;
  mood: number;
  note: string;
}

interface WeekdaySelectorProps {
  data: MoodDataPoint[];
}

export function WeekdaySelector({ data }: WeekdaySelectorProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  
  const handleDayPress = (day: string) => {
    setSelectedDay(day === selectedDay ? null : day);
  };
  
  const selectedDayData = selectedDay 
    ? data.find(item => item.day === selectedDay) 
    : null;
  
  const getMoodText = (mood: number) => {
    switch (mood) {
      case 1: return 'Very Low';
      case 2: return 'Low';
      case 3: return 'Neutral';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return 'Unknown';
    }
  };
  
  const getMoodColor = (mood: number) => {
    if (mood <= 2) return themeColors.error;
    if (mood === 3) return themeColors.warning;
    return themeColors.success;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        {data.map((item) => {
          const isSelected = selectedDay === item.day;
          
          return (
            <TouchableOpacity
              key={item.day}
              style={[
                styles.dayBubble,
                isSelected && { backgroundColor: themeColors.tint },
                { borderColor: isSelected ? themeColors.tint : themeColors.border }
              ]}
              onPress={() => handleDayPress(item.day)}
            >
              <Text style={[
                styles.dayText,
                isSelected ? { color: '#FFFFFF' } : { color: themeColors.text }
              ]}>
                {item.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
      {selectedDayData && (
        <View style={[
          styles.detailCard,
          { backgroundColor: themeColors.secondaryBg }
        ]}>
          <View style={styles.detailHeader}>
            <Text style={[styles.detailDay, { color: themeColors.text }]}>
              {selectedDayData.day}
            </Text>
            <View style={[
              styles.moodPill,
              { backgroundColor: getMoodColor(selectedDayData.mood) + '20' }
            ]}>
              <Text style={[styles.moodText, { color: getMoodColor(selectedDayData.mood) }]}>
                {getMoodText(selectedDayData.mood)}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.noteText, { color: themeColors.text }]}>
            "{selectedDayData.note}"
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailCard: {
    padding: 16,
    borderRadius: 12,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailDay: {
    fontSize: 16,
    fontWeight: '600',
  },
  moodPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '600',
  },
  noteText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});