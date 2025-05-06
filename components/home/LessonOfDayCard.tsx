import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme, ImageBackground } from 'react-native';
import { globalStyles } from '@/constants/Theme';
import colors from '@/constants/Colors';
import { BookOpen, ChevronRight } from 'lucide-react-native';

interface LessonOfDayCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function LessonOfDayCard({ title, description, imageUrl }: LessonOfDayCardProps) {
  const colorScheme = useColorScheme();
  const themeColors = colors[colorScheme ?? 'light'];
  
  return (
    <TouchableOpacity 
      style={[
        globalStyles.cardContainer, 
        styles.container,
        { backgroundColor: themeColors.cardBg }
      ]}
    >
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.imageBackground}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.lessonTagContainer}>
            <BookOpen size={14} color="#FFFFFF" style={styles.tagIcon} />
            <Text style={styles.lessonTag}>LESSON OF THE DAY</Text>
          </View>
        </View>
      </ImageBackground>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: themeColors.text }]}>
          {title}
        </Text>
        <Text style={[styles.description, { color: themeColors.neutral3 }]}>
          {description}
        </Text>
        
        <TouchableOpacity style={[globalStyles.row, styles.readMoreButton]}>
          <Text style={[styles.readMoreText, { color: themeColors.tint }]}>
            Read More
          </Text>
          <ChevronRight size={16} color={themeColors.tint} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageBackground: {
    height: 140,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  lessonTagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6E3AFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  tagIcon: {
    marginRight: 4,
  },
  lessonTag: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreButton: {
    alignItems: 'center',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});