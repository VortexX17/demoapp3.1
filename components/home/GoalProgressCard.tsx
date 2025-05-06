import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { globalStyles } from '@/constants/Theme';
import colors from '@/constants/Colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface GoalProgressCardProps {
  progress: number; // 0 to 1
}

export function GoalProgressCard({ progress }: GoalProgressCardProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  const progressWidth = useSharedValue(0);
  
  // Animate progress
  React.useEffect(() => {
    progressWidth.value = withTiming(progress, { duration: 1000 });
  }, [progress]);
  
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
    };
  });
  
  const getProgressColor = () => {
    if (progress < 0.3) return themeColors.error;
    if (progress < 0.7) return themeColors.warning;
    return themeColors.success;
  };
  
  return (
    <View 
      style={[
        globalStyles.cardContainer, 
        styles.container,
        { backgroundColor: themeColors.cardBg }
      ]}
    >
      <View style={[globalStyles.row, globalStyles.spaceBetween]}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          Weekly Goal Progress
        </Text>
        <Text style={[styles.percentage, { color: themeColors.text }]}>
          {Math.round(progress * 100)}%
        </Text>
      </View>
      
      <View style={[styles.progressContainer, { backgroundColor: themeColors.neutral1 }]}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { backgroundColor: getProgressColor() },
            animatedProgressStyle
          ]} 
        />
      </View>
      
      <Text style={[styles.statusText, { color: themeColors.text }]}>
        {progress < 0.3 
          ? "You're just getting started" 
          : progress < 0.7 
            ? "Making good progress" 
            : "Almost there!"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  percentage: {
    fontSize: 18,
    fontWeight: '700',
  },
  progressContainer: {
    height: 12,
    borderRadius: 6,
    marginVertical: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  statusText: {
    fontSize: 14,
  },
});