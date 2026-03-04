import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const text = response.text || 'Sorry, I could not generate a response.';

    res.status(200).json({ message: text });
  } catch (error) {
    console.error('Error in chat endpoint:', error);

    if (error.message?.includes('quota')) {
      res.status(429).json({
        error: 'API quota exceeded. Please try again later or contact Jeremy directly.'
      });
    } else if (error.message?.includes('API key')) {
      res.status(401).json({
        error: 'Invalid API key. Please check your Gemini API key configuration.'
      });
    } else {
      res.status(500).json({
        error: 'Internal server error. Please try again later.'
      });
    }
  }
}
