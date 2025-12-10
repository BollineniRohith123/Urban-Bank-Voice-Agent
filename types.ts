export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  KNOWLEDGE_BOT = 'KNOWLEDGE_BOT',
  ROLEPLAY_TRAINER = 'ROLEPLAY_TRAINER'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isThinking?: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  systemInstruction: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  voiceName: 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'Zephyr';
}

export enum Language {
  ENGLISH = 'English',
  TELUGU = 'Telugu'
}