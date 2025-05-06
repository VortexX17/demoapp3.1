import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Brain, Heart } from 'lucide-react-native';
import colors from '@/constants/Colors';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ChatTone } from '@/types/chat';

interface EmotionToggleProps {
  selectedTone: ChatTone;
  onSelectTone: (tone: ChatTone) => void;
}

export function EmotionToggle({ selectedTone, onSelectTone }: EmotionToggleProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  return (
    <Animated.View 
      entering={FadeIn}
      style={[
        styles.container,
        { backgroundColor: themeColors.secondaryBg, borderColor: themeColors.border }
      ]}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>
        AI Response Style
      </Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleOption,
            selectedTone === 'coach' && { backgroundColor: themeColors.primaryLight }
          ]}
          onPress={() => onSelectTone('coach')}
        >
          <Brain 
            size={22} 
            color={selectedTone === 'coach' ? themeColors.tint : themeColors.neutral3} 
          />
          <Text style={[
            styles.toggleText,
            { color: selectedTone === 'coach' ? themeColors.tint : themeColors.neutral3 }
          ]}>
            Coach
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleOption,
            selectedTone === 'therapist' && { backgroundColor: themeColors.primaryLight }
          ]}
          onPress={() => onSelectTone('therapist')}
        >
          <Heart 
            size={22} 
            color={selectedTone === 'therapist' ? themeColors.tint : themeColors.neutral3} 
          />
          <Text style={[
            styles.toggleText,
            { color: selectedTone === 'therapist' ? themeColors.tint : themeColors.neutral3 }
          ]}>
            Therapist
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  toggleText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
  },
});