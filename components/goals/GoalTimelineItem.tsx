import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Check } from 'lucide-react-native';
import colors from '@/constants/Colors';

interface GoalTimelineItemProps {
  title: string;
  completed: boolean;
  isLast: boolean;
}

export function GoalTimelineItem({ title, completed, isLast }: GoalTimelineItemProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  return (
    <View style={styles.container}>
      <View style={styles.timelineCol}>
        <View 
          style={[
            styles.circle,
            completed 
              ? { backgroundColor: themeColors.success, borderColor: themeColors.success }
              : { backgroundColor: 'transparent', borderColor: themeColors.neutral3 }
          ]}
        >
          {completed && <Check size={12} color="#FFFFFF" />}
        </View>
        
        {!isLast && (
          <View 
            style={[
              styles.line,
              { backgroundColor: completed ? themeColors.success : themeColors.neutral3 }
            ]} 
          />
        )}
      </View>
      
      <View style={styles.contentCol}>
        <Text style={[
          styles.title,
          completed 
            ? [styles.completedTitle, { color: themeColors.neutral3 }]
            : { color: themeColors.text }
        ]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineCol: {
    width: 30,
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  contentCol: {
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: -2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
});