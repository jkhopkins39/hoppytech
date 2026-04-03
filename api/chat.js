import { GoogleGenAI } from '@google/genai';

export const config = { runtime: 'edge' };

const MODEL = 'gemini-3-flash-preview';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 300;

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function isRetryable(err) {
  const m = String(err?.message ?? err).toLowerCase();
  return m.includes('503') || m.includes('429') || m.includes('unavailable')
    || m.includes('overloaded') || m.includes('high demand') || m.includes('resource exhausted');
}

function friendlyError(err) {
  const m = String(err?.message ?? err).toLowerCase();
  if (m.includes('503') || m.includes('unavailable') || m.includes('high demand') || m.includes('overloaded'))
    return 'The AI model is temporarily overloaded. Please try again in a moment.';
  if (m.includes('429') || m.includes('resource exhausted'))
    return 'Rate limit reached. Please wait a moment and try again.';
  if (m.includes('401') || m.includes('403') || m.includes('api key'))
    return 'API authentication error. Please contact Jeremy.';
  return 'An unexpected error occurred. Please try again.';
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405);

  if (!ai) {
    return jsonResponse(
      { error: 'GEMINI_API_KEY not set — add it in Vercel → Settings → Environment Variables.' },
      500,
    );
  }

  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }
  if (!Array.isArray(messages)) return jsonResponse({ error: 'messages must be an array' }, 400);

  const systemMessage = messages.find((m) => m.role === 'system');
  const contents = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content ?? '') }],
    }));

  const genConfig = { maxOutputTokens: 384, temperature: 0.6 };
  if (systemMessage?.content) genConfig.systemInstruction = String(systemMessage.content);

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const enc = new TextEncoder();

  (async () => {
    let lastErr;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));

        const stream = await ai.models.generateContentStream({
          model: MODEL,
          contents,
          config: genConfig,
        });

        for await (const chunk of stream) {
          const text = chunk.text || '';
          if (text) await writer.write(enc.encode(JSON.stringify({ t: text }) + '\n'));
        }
        await writer.write(enc.encode(JSON.stringify({ done: true }) + '\n'));
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        if (attempt < MAX_RETRIES && isRetryable(err)) continue;
        break;
      }
    }

    if (lastErr) {
      try {
        await writer.write(
          enc.encode(JSON.stringify({ error: friendlyError(lastErr) }) + '\n'),
        );
      } catch { /* writer already closed */ }
    }

    try { await writer.close(); } catch { /* already closed */ }
  })();

  return new Response(readable, {
    headers: {
      ...CORS,
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
