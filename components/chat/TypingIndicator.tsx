import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import Animated, { 
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay
} from 'react-native-reanimated';
import colors from '@/constants/Colors';

export function TypingIndicator() {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  const dots = [0, 1, 2].map(index => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{
          translateY: withRepeat(
            withSequence(
              withDelay(
                index * 200,
                withTiming(-6, { duration: 300 })
              ),
              withTiming(0, { duration: 300 })
            ),
            -1
          )
        }]
      };
    });
    
    return (
      <Animated.View 
        key={index}
        style={[
          styles.dot,
          { backgroundColor: themeColors.tint },
          animatedStyle
        ]}
      />
    );
  });
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: themeColors.cardBg }
    ]}>
      {dots}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
});