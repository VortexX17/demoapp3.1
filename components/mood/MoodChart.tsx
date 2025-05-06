import React from 'react';
import { View, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Theme';

const windowWidth = Dimensions.get('window').width;

interface MoodDataPoint {
  day: string;
  mood: number; // 1-5 scale
  note: string;
}

interface MoodChartProps {
  data: MoodDataPoint[];
}

export function MoodChart({ data }: MoodChartProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  const barHeights = useSharedValue<number[]>(Array(data.length).fill(0));
  
  React.useEffect(() => {
    // Calculate heights based on mood (1-5 scale)
    const heights = data.map(item => item.mood * 20); // Convert 1-5 to percentage (20-100%)
    barHeights.value = heights.map(_ => 0); // Reset to 0 first
    
    // Animate each bar with a slight delay
    setTimeout(() => {
      barHeights.value = heights.map((height, index) => {
        return withTiming(height, { duration: 800 + index * 100 });
      });
    }, 300);
  }, [data]);
  
  const getBarColor = (mood: number) => {
    if (mood <= 2) return themeColors.error;
    if (mood === 3) return themeColors.warning;
    return themeColors.success;
  };
  
  // Calculate average mood
  const averageMood = data.reduce((acc, item) => acc + item.mood, 0) / data.length;
  const formattedAverage = averageMood.toFixed(1);
  
  return (
    <View>
      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Mood Overview
        </Text>
        <View style={[
          styles.averageContainer, 
          { backgroundColor: themeColors.primaryLight }
        ]}>
          <Text style={[styles.averageText, { color: themeColors.tint }]}>
            Avg: {formattedAverage}
          </Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.yAxis}>
          <Text style={[styles.yAxisLabel, { color: themeColors.neutral3 }]}>Great</Text>
          <Text style={[styles.yAxisLabel, { color: themeColors.neutral3 }]}>Good</Text>
          <Text style={[styles.yAxisLabel, { color: themeColors.neutral3 }]}>Okay</Text>
          <Text style={[styles.yAxisLabel, { color: themeColors.neutral3 }]}>Low</Text>
          <Text style={[styles.yAxisLabel, { color: themeColors.neutral3 }]}>Bad</Text>
        </View>
        
        <View style={styles.barContainer}>
          {data.map((item, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              return {
                height: `${barHeights.value[index]}%`,
              };
            });
            
            return (
              <View key={item.day} style={styles.barColumn}>
                <View style={styles.barWrapper}>
                  <Animated.View
                    style={[
                      styles.bar,
                      { backgroundColor: getBarColor(item.mood) },
                      animatedStyle
                    ]}
                  />
                </View>
                <Text style={[styles.dayLabel, { color: themeColors.text }]}>
                  {item.day}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  averageContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  averageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginTop: 8,
  },
  yAxis: {
    width: 40,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  yAxisLabel: {
    fontSize: 10,
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    height: '90%',
    width: '50%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  dayLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});