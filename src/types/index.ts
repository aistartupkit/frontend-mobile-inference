export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'google' | 'facebook' | 'github' | 'microsoft' | 'email';
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  size: number;
  downloadUrl: string;
  localPath?: string;
  isDownloaded: boolean;
  downloadProgress?: number;
}

export interface AdMetrics {
  impressions: number;
  clicks: number;
  revenue: number;
  lastShown?: number;
}

export interface AppState {
  user: User | null;
  currentModel: AIModel | null;
  chatSessions: ChatSession[];
  adMetrics: AdMetrics;
}
