import { GoogleGenAI } from '@google/genai';

export const config = { runtime: 'edge' };

const MODEL = 'gemini-3-flash-preview';

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
    try {
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
    } catch (err) {
      try {
        await writer.write(
          enc.encode(JSON.stringify({ error: String(err.message || err) }) + '\n'),
        );
      } catch { /* writer already closed */ }
    } finally {
      try { await writer.close(); } catch { /* already closed */ }
    }
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
