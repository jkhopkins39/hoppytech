export const config = { runtime: 'edge' };

const MODEL = 'gemini-3-flash-preview';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

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

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
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

  const body = {
    contents,
    generationConfig: { maxOutputTokens: 384, temperature: 0.6 },
  };

  if (systemMessage?.content) {
    body.systemInstruction = { parts: [{ text: String(systemMessage.content) }] };
  }

  const url = `${API_BASE}/models/${MODEL}:streamGenerateContent?alt=sse&key=${apiKey}`;

  let geminiRes;
  try {
    geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    return jsonResponse({ error: `Upstream request failed: ${err.message}` }, 502);
  }

  if (!geminiRes.ok) {
    const errText = await geminiRes.text().catch(() => 'Unknown upstream error');
    const status = [400, 401, 403, 429, 503].includes(geminiRes.status) ? geminiRes.status : 502;
    return jsonResponse({ error: errText }, status);
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const enc = new TextEncoder();

  const pipe = async () => {
    const reader = geminiRes.body.getReader();
    const dec = new TextDecoder();
    let buf = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });

        const lines = buf.split('\n');
        buf = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const text = JSON.parse(payload)?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) await writer.write(enc.encode(JSON.stringify({ t: text }) + '\n'));
          } catch { /* skip malformed chunk */ }
        }
      }
      await writer.write(enc.encode(JSON.stringify({ done: true }) + '\n'));
    } catch (err) {
      try {
        await writer.write(enc.encode(JSON.stringify({ error: String(err.message || err) }) + '\n'));
      } catch { /* writer already closed */ }
    } finally {
      try { await writer.close(); } catch { /* already closed */ }
    }
  };

  pipe();

  return new Response(readable, {
    headers: {
      ...CORS,
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
