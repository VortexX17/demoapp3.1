import React from 'react';
import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import colors from '@/constants/Colors';

interface ZenModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

export function ZenModeToggle({ isActive, onToggle }: ZenModeToggleProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  return (
    <TouchableOpacity 
      onPress={onToggle}
      style={[
        styles.container,
        isActive 
          ? { backgroundColor: themeColors.tint } 
          : { backgroundColor: themeColors.neutral1, borderColor: themeColors.border, borderWidth: 1 }
      ]}
    >
      {isActive ? (
        <Eye size={16} color="#FFFFFF" style={styles.icon} />
      ) : (
        <EyeOff size={16} color={themeColors.text} style={styles.icon} />
      )}
      <Text 
        style={[
          styles.text,
          isActive ? { color: '#FFFFFF' } : { color: themeColors.text }
        ]}
      >
        {isActive ? 'Zen Mode' : 'Zen Mode'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});