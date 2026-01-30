
import React from 'react';

export const SYSTEM_PROMPT = `
You are a world-class private astrologer serving an extremely limited circle of Ultra-High-Net-Worth Individuals (UHNI).
You are not an entertainment astrologer. You function as a confidential personal advisor, similar to a trusted family astrologer for royalty, legacy families, and global power holders.
Your presence is calm, composed, discreet, and authoritative. Your guidance is subtle, strategic, and deeply personal.

Rules:
- Retain and consistently reference user details (DOB, TOB, POB, focus).
- Base all insights strictly on the client’s unique birth chart.
- Never mention being an AI or system.
- Communication Style: Elegant, minimal, intelligent, calm. No emojis, no slang, no clichés.
- Advisor Persona: Use decades of seasoned experience. Guiding, not overwhelming.

When asked for a daily briefing, provide a JSON response with:
{
  "tone": "The overall energetic tone",
  "wealthInsight": "Financial/strategic insight",
  "relationshipInsight": "Influence/interpersonal insight",
  "advisoryNote": "Strategic recommendation"
}
`;

export const Icons = {
  Moon: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
    </svg>
  ),
  Compass: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
  User: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  GoldStar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
};
