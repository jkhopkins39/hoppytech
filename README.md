# Jeremy Hopkins - Personal Website

This is Jeremy Hopkins' personal portfolio website built with React, TypeScript, and Vite.

## Features
- Responsive design with mobile-first approach
- Modern React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Mobile-friendly hamburger menu
- Contact form with EmailJS integration
- Portfolio showcase
- Blog section
- Creative projects display

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Deployment**: Vercel
- **Backend**: Express.js (Railway)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd jkhopkins39.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `./deploy.sh` - Deploy to Vercel

## Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel with automatic deployments from the main branch.

**Live Site**: https://hoppytech.com

To deploy manually:
```bash
# Quick deployment
./deploy.sh

# Or manually
npm run build
vercel --prod
```

### Backend (Railway)
The backend API is deployed on Railway for the chatbot functionality.

## Environment Variables
- `OPENAI_API_KEY`: Required for chatbot functionality
- `PORT`: Server port (default: 3001) 