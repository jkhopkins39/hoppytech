import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Jeremy's AI assistant. Ask me anything about his education, skills, or projects.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const systemContext = `You are Jeremy Hopkins' AI assistant. Here's information about Jeremy:

EDUCATION:
- Currently pursuing Computer Science degree at Kennesaw State University (2022-2025) with focus on Artificial Intelligence
- Previously attended University of West Georgia (2021-2022)
- Graduated from Bremen High School (2017-2021) - National Honor Society, brass captain of BHS Marching Blue Devils

SKILLS:
Programming Languages: Python, JavaScript/TypeScript, Java, C#, HTML, CSS
Frameworks & Libraries: React, Node.js, Express, TensorFlow, PyTorch, Tailwind CSS
Tools & Technologies: Git, MongoDB, PostgreSQL, Linux, OpenAI API

PROJECTS:
- Watch Trading Post: luxury watch marketplace (React, Node.js, Stripe)
- Landlock Solutions LLC: professional business website
- SXNCTUARY: modern website for a DNB artist
- Mom and Pop's Pizza: software engineering project (Java)

PERSONALITY: Introverted but friendly, loves hip-hop (The Roots, Kendrick Lamar, Outkast), gym enthusiast, detail-oriented.

CONTACT: jeremyyhopkins@gmail.com | GitHub: jkhopkins39 | LinkedIn: jeremy-hopkins-160001275

Be helpful, professional, and concise. For specifics not listed, suggest contacting Jeremy directly.

OUTPUT: Reply briefly for greetings and simple questions (often 1-3 sentences). Expand only when the user asks for detail.`;

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const sentValue = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.DEV
        ? 'http://localhost:3001/api/chat'
        : '/api/chat';

      // Skip index 0 (initial greeting) — Gemini requires conversations to start
      // with a user turn, so the assistant greeting must not be in the history.
      const history = messages
        .slice(1)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/x-ndjson, application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemContext },
            ...history,
            { role: 'user', content: sentValue },
          ],
        }),
      });

      const ct = response.headers.get('content-type') || '';

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: unknown };
        let errBody: string;
        if (typeof data.error === 'string') {
          errBody = data.error;
        } else if (data.error && typeof data.error === 'object') {
          const e = data.error as Record<string, unknown>;
          errBody = typeof e.message === 'string'
            ? e.message
            : `Server error ${response.status}`;
        } else {
          errBody = `Server error ${response.status}`;
        }
        throw new Error(errBody);
      }

      if (ct.includes('ndjson') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let acc = '';

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '', timestamp: new Date() },
        ]);

        const applyAcc = (text: string) => {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === 'assistant') {
              next[next.length - 1] = { ...last, content: text };
            }
            return next;
          });
        };

        readLines: while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            let obj: { t?: string; done?: boolean; error?: string };
            try {
              obj = JSON.parse(trimmed) as { t?: string; done?: boolean; error?: string };
            } catch {
              continue;
            }
            if (obj.error != null) {
              const e = obj.error;
              throw new Error(
                typeof e === 'string' ? e
                : (e && typeof e === 'object' && typeof (e as Record<string, unknown>).message === 'string')
                  ? String((e as Record<string, unknown>).message)
                  : JSON.stringify(e),
              );
            }
            if (obj.t) {
              acc += obj.t;
              applyAcc(acc);
            }
            if (obj.done) break readLines;
          }
        }
        if (buffer.trim()) {
          try {
            const obj = JSON.parse(buffer.trim()) as { t?: string; error?: string; done?: boolean };
            if (obj.error != null) {
              const e = obj.error;
              throw new Error(
                typeof e === 'string' ? e
                : (e && typeof e === 'object' && typeof (e as Record<string, unknown>).message === 'string')
                  ? String((e as Record<string, unknown>).message)
                  : JSON.stringify(e),
              );
            }
            if (obj.t) {
              acc += obj.t;
              applyAcc(acc);
            }
          } catch (e) {
            if (e instanceof SyntaxError) {
              /* incomplete trailing line */
            } else {
              throw e;
            }
          }
        }
        applyAcc(acc.replace(/\*+/g, '') || "I couldn't generate a reply. Try again.");
      } else {
        const data = (await response.json()) as { message?: string };
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: (data.message || '').replace(/\*+/g, ''),
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Something went wrong: ${msg}. Try again or email Jeremy directly.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-200"
        style={{
          background: isOpen
            ? 'var(--surface)'
            : 'linear-gradient(135deg, var(--accent-light), var(--accent))',
          border: isOpen ? '1px solid var(--border-color)' : 'none',
          boxShadow: isOpen ? 'none' : '0 8px 32px color-mix(in srgb, var(--accent) 40%, transparent)',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-5 h-5 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: 'var(--canvas)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[340px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-color)',
              height: '440px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b flex-none"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-none"
                style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--accent))' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--canvas)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-ink">Jeremy's AI Assistant</p>
                <p className="text-[11px] text-muted">Powered by Gemini</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                    }`}
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'linear-gradient(135deg, var(--accent-light), var(--accent))'
                          : 'var(--surface-alpha)',
                      border: msg.role === 'assistant' ? '1px solid var(--border-color)' : 'none',
                      color: msg.role === 'user' ? 'var(--canvas)' : 'var(--ink)',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-2xl rounded-bl-sm"
                    style={{
                      background: 'var(--surface-alpha)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((n) => (
                        <motion.div
                          key={n}
                          className="w-1.5 h-1.5 rounded-full bg-muted"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: n * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3 border-t flex-none"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl text-[13px] text-ink placeholder-muted-2 disabled:opacity-50 transition-colors focus:outline-none"
                style={{
                  background: 'var(--surface-alpha)',
                  border: '1px solid var(--border-color)',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex-none"
                style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--accent))' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--canvas)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
