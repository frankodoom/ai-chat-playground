import { create } from 'zustand';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatStore {
  messages: Message[];
  selectedModel: string;
  temperature: number;
  maxTokens: number;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setSelectedModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (tokens: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  selectedModel: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2000,
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  clearMessages: () => set({ messages: [] }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setTemperature: (temperature) => set({ temperature }),
  setMaxTokens: (maxTokens) => set({ maxTokens }),
}));