import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Log environment info on startup
console.log('Starting server...');
console.log('Port:', port);
console.log('OpenAI API Key configured:', !!process.env.OPENAI_API_KEY);
console.log('Environment:', process.env.NODE_ENV || 'development');

// Initialize OpenAI only if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('✅ OpenAI client initialized');
} else {
  console.warn('⚠️  No OpenAI API key found. Chatbot will return fallback responses.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    openai: !!openai,
    timestamp: new Date().toISOString()
  });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Invalid request format',
        message: "I'm sorry, there was a problem with your request format. Please try again."
      });
    }

    if (!openai) {
      console.log('No OpenAI client available, returning fallback response');
      return res.json({ 
        message: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again later or contact Jeremy directly at jeremyyhopkins@gmail.com. You can also reach out on LinkedIn or check out his projects on GitHub!"
      });
    }

    console.log('Processing chat request with', messages.length, 'messages');

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    console.log('✅ Chat response generated successfully');
    res.json({ message: response });
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);
    console.error('Error details:', error);
    
    // More specific error handling
    let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Jeremy directly at jeremyyhopkins@gmail.com";
    
    if (error.code === 'insufficient_quota') {
      errorMessage = "I'm currently experiencing high usage. Please try again in a moment or contact Jeremy directly at jeremyyhopkins@gmail.com";
    } else if (error.code === 'rate_limit_exceeded') {
      errorMessage = "I'm receiving too many requests right now. Please wait a moment and try again.";
    }
    
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      message: errorMessage
    });
  }
});

// Serve static files
app.use(express.static('dist'));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Frontend served from: ${path.join(__dirname, 'dist')}`);
  console.log(`🤖 Chatbot API: ${openai ? 'Ready' : 'Fallback mode (no API key)'}`);
}); 