import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY environment variable is not set!');
} else {
  console.log('✅ Gemini API key is configured');
}

const MODEL = 'gemini-3-flash-preview';

function getResponseText(response) {
  if (response?.text) return response.text;
  const parts = response?.candidates?.[0]?.content?.parts;
  if (!parts?.length) return '';
  return parts.map((p) => p.text || '').join('');
}

// Chat API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set in .env' });
    }

    const ai = new GoogleGenAI({ apiKey: key });

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

    const systemInstruction = systemMessage?.content
      ? { parts: [{ text: systemMessage.content }] }
      : undefined;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    });

    const rawText = getResponseText(response) || 'Sorry, I could not generate a response.';
    const text = rawText.replace(/\*+/g, '');
    res.json({ message: text });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    const msg = error?.message || String(error);
    if (msg.includes('quota')) {
      res.status(429).json({
        error: 'API quota exceeded. Please try again later or contact Jeremy directly.'
      });
    } else if (msg.includes('API key') || msg.includes('API_KEY')) {
      res.status(401).json({
        error: 'Invalid API key. Please check your Gemini API key configuration.'
      });
    } else {
      res.status(500).json({
        error: msg,
      });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!apiKey,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Admin authentication endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const ADMIN_USERNAME = process.env.USERNAME;
    const ADMIN_PASSWORD = process.env.PASSWORD;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Development server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Gemini API Key configured: ${apiKey ? 'Yes' : 'No'}`);
  console.log(`API endpoints available:`);
  console.log(`  - POST /api/chat`);
  console.log(`  - GET /api/health`);
  console.log(`  - POST /api/admin/login`);
});
