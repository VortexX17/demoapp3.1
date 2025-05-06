import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Lightbulb, TrendingUp, CircleAlert as AlertCircle } from 'lucide-react-native';
import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Theme';

interface MoodInsightCardProps {
  title: string;
  description: string;
  type: 'pattern' | 'positive' | 'warning';
}

export function MoodInsightCard({ title, description, type }: MoodInsightCardProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  const getIconAndColor = () => {
    switch (type) {
      case 'pattern':
        return {
          icon: <Lightbulb size={20} color={themeColors.tint} />,
          color: themeColors.tint,
          bgColor: themeColors.primaryLight
        };
      case 'positive':
        return {
          icon: <TrendingUp size={20} color={themeColors.success} />,
          color: themeColors.success,
          bgColor: `${themeColors.success}20`
        };
      case 'warning':
        return {
          icon: <AlertCircle size={20} color={themeColors.warning} />,
          color: themeColors.warning,
          bgColor: `${themeColors.warning}20`
        };
      default:
        return {
          icon: <Lightbulb size={20} color={themeColors.tint} />,
          color: themeColors.tint,
          bgColor: themeColors.primaryLight
        };
    }
  };
  
  const { icon, color, bgColor } = getIconAndColor();
  
  return (
    <View style={[
      globalStyles.cardContainer,
      styles.container,
      { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }
    ]}>
      <View style={[globalStyles.row, styles.header]}>
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          {icon}
        </View>
        <Text style={[styles.title, { color: themeColors.text }]}>
          {title}
        </Text>
      </View>
      
      <Text style={[styles.description, { color: themeColors.text }]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});