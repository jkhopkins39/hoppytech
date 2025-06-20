# Chatbot Setup Instructions

## Prerequisites

1. **OpenAI API Key**: You'll need an OpenAI API key to use the chatbot. Get one at https://platform.openai.com/api-keys

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

### 3. Start the Development Server

```bash
# Terminal 1: Start the React dev server
npm run dev

# Terminal 2: Start the backend server
npm run server
```

### 4. Build for Production

```bash
npm run build
npm run server
```

## Features

- **Red-themed chatbot** with robot icon
- **Context-aware responses** about Jeremy's education, skills, and experience
- **Real-time chat interface** with typing indicators
- **Professional responses** suitable for hiring agents
- **Fallback handling** when API is unavailable

## Chatbot Context

The chatbot is pre-configured with information about:
- Education history (KSU, UWG, Bremen High School)
- Technical skills (programming languages, frameworks, tools)
- Project experience (AI apps, web development, mobile apps)
- Contact information
- Professional background

## Customization

You can modify the `systemContext` in `src/components/Chatbot.tsx` to update the information the AI assistant knows about Jeremy.

## Security Notes

- Keep your OpenAI API key secure and never commit it to version control
- Consider implementing rate limiting for production use
- Monitor API usage to manage costs 