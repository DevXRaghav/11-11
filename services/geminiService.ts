
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DailyBriefing, ChatMessage } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getDailyBriefing(profile: UserProfile): Promise<DailyBriefing> {
    const prompt = `Based on my profile: ${JSON.stringify(profile)}, provide my private daily intelligence briefing for today. Format as JSON.`;
    
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tone: { type: Type.STRING },
            wealthInsight: { type: Type.STRING },
            relationshipInsight: { type: Type.STRING },
            advisoryNote: { type: Type.STRING },
          },
          required: ["tone", "wealthInsight", "relationshipInsight", "advisoryNote"],
        },
      },
    });

    return JSON.parse(response.text || '{}');
  }

  async sendMessage(profile: UserProfile, history: ChatMessage[], message: string): Promise<string> {
    const chat = this.ai.chats.create({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: `${SYSTEM_PROMPT}\n\nClient Profile Context:\n${JSON.stringify(profile)}`,
      },
    });

    // Note: In a production app, we would load existing history here.
    // For this prototype, we'll send the new message directly.
    const response = await chat.sendMessage({ message });
    return response.text || "I apologize, but I am unable to provide clarity at this moment. Please wait for the celestial cycles to align.";
  }
}

export const gemini = new GeminiService();
