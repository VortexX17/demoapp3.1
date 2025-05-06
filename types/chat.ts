export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface ChatResponse {
  triggers: string[];
  responses: {
    coach: string;
    therapist: string;
  };
}

export type ChatTone = 'coach' | 'therapist';