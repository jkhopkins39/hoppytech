import { GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3-flash-preview';
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 400;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Pull a stable error code/message from @google/genai thrown errors (often nested JSON in .message). */
function parseGeminiError(err) {
  const raw = err?.message != null ? String(err.message) : String(err);
  let code = err?.status ?? err?.code ?? err?.error?.code;
  let message = raw;
  try {
    const parsed = JSON.parse(raw);
    const e = parsed?.error ?? parsed;
    code = code ?? e?.code ?? e?.status;
    message = e?.message ?? raw;
  } catch {
    /* keep message as raw */
  }
  return { code, message, raw };
}

function isRetryableStatus(code, message) {
  if (code === 503 || code === 429) return true;
  const m = (message || '').toLowerCase();
  return (
    m.includes('unavailable') ||
    m.includes('high demand') ||
    m.includes('overloaded') ||
    m.includes('resource exhausted')
  );
}

function getResponseText(response) {
  if (response?.text) return response.text;
  const parts = response?.candidates?.[0]?.content?.parts;
  if (!parts?.length) return '';
  return parts.map((p) => p.text || '').join('');
}

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

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is not set. Add it in Vercel → Project → Settings → Environment Variables.',
    });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const systemMessage = messages.find((m) => m.role === 'system');
    const conversationMessages = messages.filter((m) => m.role !== 'system');

    const contents = conversationMessages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const systemInstruction = systemMessage?.content
      ? { parts: [{ text: systemMessage.content }] }
      : undefined;

    const ai = new GoogleGenAI({ apiKey });

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
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
        return res.status(200).json({ message: text });
      } catch (err) {
        const { code, message } = parseGeminiError(err);
        if (attempt < MAX_RETRIES - 1 && isRetryableStatus(code, message)) {
          await sleep(INITIAL_BACKOFF_MS * Math.pow(2, attempt));
          continue;
        }
        throw err;
      }
    }
  } catch (error) {
    console.error('Chat error:', error);
    const { code, message } = parseGeminiError(error);
    const status =
      code === 429 ? 429
      : code === 503 ? 503
      : code === 401 || code === 403 ? code
      : 500;
    return res.status(status >= 400 && status < 600 ? status : 500).json({
      error: message || 'Request failed',
    });
  }
}
