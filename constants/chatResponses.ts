import { ChatResponse } from '@/types/chat';

export const chatResponses: ChatResponse[] = [
  {
    triggers: ['overwhelmed', 'stressed', 'too much'],
    responses: {
      coach: "Let's break this down into manageable steps. What's the most immediate task you're facing?",
      therapist: "I hear that you're feeling overwhelmed. It's a very normal response to challenging situations. Would you like to explore what's contributing to these feelings?"
    }
  },
  {
    triggers: ['anxious', 'worried', 'nervous'],
    responses: {
      coach: "Here's what we can do right now: 1) Take three deep breaths 2) Write down your specific concerns 3) Create an action plan. Which step would you like to start with?",
      therapist: "Anxiety can feel very overwhelming. You're showing strength by acknowledging these feelings. Can you tell me more about what's causing your anxiety?"
    }
  },
  {
    triggers: ['sad', 'depressed', 'down'],
    responses: {
      coach: "Let's focus on actions that can help lift your mood. Have you engaged in any activities you usually enjoy today?",
      therapist: "I'm here to listen and support you through these feelings. Would you like to talk about what's been happening lately?"
    }
  },
  {
    triggers: ['stuck', 'unmotivated', 'procrastinating'],
    responses: {
      coach: "Small steps lead to big progress. Let's identify one tiny action you can take right now to move forward.",
      therapist: "It's common to feel stuck sometimes. Let's explore what might be holding you back without judgment."
    }
  },
  {
    triggers: ['happy', 'excited', 'achieved'],
    responses: {
      coach: "That's excellent! Let's build on this momentum. What's your next goal?",
      therapist: "I'm glad you're feeling positive! These moments are worth celebrating. Would you like to reflect on what contributed to this success?"
    }
  }
];