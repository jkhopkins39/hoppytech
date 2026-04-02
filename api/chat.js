import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemMessage = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const contents = conversationMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: systemMessage?.content || '',
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    const rawText = response.text || 'Sorry, I could not generate a response.';
    const text = rawText.replace(/\*+/g, '');

    res.status(200).json({ message: text });
  } catch (error) {
    console.error('Chat error:', error);
    const errorMsg = error?.message || String(error);
    res.status(500).json({ error: `Server error: ${errorMsg}` });
  }
}
