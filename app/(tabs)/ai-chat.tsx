import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  useColorScheme,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Send } from 'lucide-react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Theme';
import { ChatMessage, ChatTone } from '@/types/chat';
import { chatResponses } from '@/constants/chatResponses';
import { ChatMessage as ChatMessageComponent } from '@/components/chat/ChatMessage';
import { EmotionToggle } from '@/components/chat/EmotionToggle';
import { TypingIndicator } from '@/components/chat/TypingIndicator';

export default function AIChatScreen() {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatTone, setChatTone] = useState<ChatTone>('coach');
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI assistant. How are you feeling today?",
      sender: 'ai',
      timestamp: Date.now()
    }
  ]);

  const findResponse = (text: string) => {
    const lowercaseText = text.toLowerCase();
    return chatResponses.find(response =>
      response.triggers.some(trigger => lowercaseText.includes(trigger))
    );
  };

  const simulateTyping = useCallback((callback: () => void) => {
    setIsTyping(true);
    const typingDuration = Math.random() * 1000 + 1000; // 1-2 seconds
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, typingDuration);
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Find and send AI response
    const matchedResponse = findResponse(message);
    
    simulateTyping(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: matchedResponse 
          ? matchedResponse.responses[chatTone]
          : chatTone === 'coach'
            ? "I understand. Let's work together to find a solution. What specific aspect would you like to focus on?"
            : "I hear you. Would you like to explore these feelings further?",
        sender: 'ai',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Scroll to bottom
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
    
    // Scroll to bottom after user message
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={[globalStyles.safeArea, { backgroundColor: themeColors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Animated.Text 
          entering={FadeIn}
          style={[globalStyles.screenTitle, { color: themeColors.text }]}
        >
          AI Assistant
        </Animated.Text>
      </View>
      
      <EmotionToggle
        selectedTone={chatTone}
        onSelectTone={setChatTone}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <Animated.View
              key={msg.id}
              entering={SlideInRight.delay(index * 100).springify()}
            >
              <ChatMessageComponent message={msg} />
            </Animated.View>
          ))}
          
          {isTyping && <TypingIndicator />}
        </ScrollView>
        
        <View style={[
          styles.inputContainer, 
          { backgroundColor: themeColors.cardBg, borderColor: themeColors.border }
        ]}>
          <TextInput
            style={[
              styles.input,
              { color: themeColors.text, backgroundColor: themeColors.neutral1 }
            ]}
            placeholder="Type your message..."
            placeholderTextColor={themeColors.neutral3}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
            onSubmitEditing={sendMessage}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              { backgroundColor: themeColors.tint }
            ]} 
            onPress={sendMessage}
            disabled={message.trim() === ''}
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingTop: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 48,
    fontSize: 16,
    maxHeight: 120,
  },
  sendButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});