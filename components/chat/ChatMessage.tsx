import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import colors from '@/constants/Colors';

interface MessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'ai';
  };
}

export function ChatMessage({ message }: MessageProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  const isUser = message.sender === 'user';
  
  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.aiContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser 
          ? [styles.userBubble, { backgroundColor: themeColors.tint }]
          : [styles.aiBubble, { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }]
      ]}>
        <Text style={[
          styles.messageText,
          isUser 
            ? styles.userText 
            : [styles.aiText, { color: themeColors.text }]
        ]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  aiContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    // Color set dynamically
  },
});