import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import colors from '@/constants/Colors';

interface GoalStatusPillProps {
  status: 'not-started' | 'in-progress' | 'completed';
}

export function GoalStatusPill({ status }: GoalStatusPillProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  const getStatusColor = () => {
    switch (status) {
      case 'not-started':
        return themeColors.neutral3;
      case 'in-progress':
        return themeColors.warning;
      case 'completed':
        return themeColors.success;
      default:
        return themeColors.neutral3;
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'not-started':
        return 'Not Started';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return '';
    }
  };
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: `${getStatusColor()}20`, borderColor: getStatusColor() }
    ]}>
      <View style={[styles.dot, { backgroundColor: getStatusColor() }]} />
      <Text style={[styles.text, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});