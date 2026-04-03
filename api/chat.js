/**
 * Vercel Edge Runtime — starts in <1ms, no Node.js cold start.
 * Calls the Gemini REST API directly via fetch (no SDK import cost).
 * Transforms Gemini SSE → NDJSON so the frontend stays unchanged.
 */
export const config = { runtime: 'edge' };

const MODEL = 'gemini-3-flash-preview';
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const MAX_OUTPUT_TOKENS = 512;
const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const jsonRes = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });

function isOverloaded(status, errBody) {
  if (status === 503 || status === 429) return true;
  const m = (errBody?.error?.message || '').toLowerCase();
  return (
    m.includes('unavailable') ||
    m.includes('high demand') ||
    m.includes('overloaded') ||
    m.includes('resource exhausted')
  );
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: CORS });
  if (req.method !== 'POST') return jsonRes({ error: 'Method not allowed' }, 405);

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return jsonRes(
      { error: 'GEMINI_API_KEY not set — add it in Vercel → Settings → Environment Variables.' },
      500,
    );
  }

  let messages;
  try {
    ({ messages } = await req.json());
  } catch {
    return jsonRes({ error: 'Invalid JSON body' }, 400);
  }

  if (!Array.isArray(messages)) return jsonRes({ error: 'messages must be an array' }, 400);

  const systemMessage = messages.find((m) => m.role === 'system');
  const conversationMessages = messages.filter((m) => m.role !== 'system');

  const contents = conversationMessages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(m.content ?? '') }],
  }));

  const reqBody = {
    contents,
    generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS, temperature: 0.6 },
  };
  if (systemMessage?.content) {
    reqBody.systemInstruction = { parts: [{ text: String(systemMessage.content) }] };
  }

  const url = `${GEMINI_BASE}/models/${MODEL}:streamGenerateContent?key=${encodeURIComponent(apiKey)}&alt=sse`;

  let geminiRes;
  let lastErrBody = {};

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
    } catch (e) {
      return jsonRes({ error: `Network error reaching Gemini: ${e.message}` }, 502);
    }

    if (geminiRes.ok) break;

    lastErrBody = await geminiRes.json().catch(() => ({}));
    if (attempt < MAX_RETRIES - 1 && isOverloaded(geminiRes.status, lastErrBody)) {
      await sleep(350 * Math.pow(2, attempt)); // 350ms, 700ms
      continue;
    }
    break;
  }

  if (!geminiRes.ok) {
    const msg = lastErrBody?.error?.message || `Gemini API error ${geminiRes.status}`;
    return jsonRes({ error: msg }, geminiRes.status);
  }

  // Transform Gemini SSE → NDJSON for the frontend
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  (async () => {
    const reader = geminiRes.body.getReader();
    const decoder = new TextDecoder();
    let sseBuffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split('\n');
        sseBuffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            const text =
              parsed?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('') ?? '';
            if (text) {
              await writer.write(encoder.encode(`${JSON.stringify({ t: text })}\n`));
            }
          } catch {
            /* skip malformed SSE chunk */
          }
        }
      }
      await writer.write(encoder.encode(`${JSON.stringify({ done: true })}\n`));
    } catch (e) {
      try {
        await writer.write(encoder.encode(`${JSON.stringify({ error: e.message })}\n`));
      } catch {
        /* stream already closed */
      }
    } finally {
      writer.releaseLock();
      await writable.close().catch(() => {});
    }
  })();

  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
      ...CORS,
    },
  });
}
