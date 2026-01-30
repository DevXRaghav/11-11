
export enum LifeFocus {
  WEALTH = 'Wealth',
  LEGACY = 'Legacy',
  RELATIONSHIPS = 'Relationships',
  HEALTH = 'Health',
  POWER = 'Power',
  SPIRITUALITY = 'Spiritual Clarity'
}

export interface UserProfile {
  name: string;
  dob: string;
  tob: string;
  pob: string;
  gender: string;
  location?: string;
  focus: LifeFocus;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface DailyBriefing {
  tone: string;
  wealthInsight: string;
  relationshipInsight: string;
  advisoryNote: string;
}

export interface AppState {
  profile: UserProfile | null;
  briefing: DailyBriefing | null;
  history: ChatMessage[];
  loading: boolean;
}
