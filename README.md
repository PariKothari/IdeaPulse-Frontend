
IdeaPulse Frontend
IdeaPulse is a full stack web application that helps users generate, evaluate, and compare startup ideas using AI.
This repository contains the React frontend, deployed on Vercel.
LINK:https://idea-pulse-frontend.vercel.app/
Features
- Google authentication with Firebase
- AI idea generation powered by the backend
- Evaluation results with scores and feedback
- Roadmap generator for step by step startup plans
-Idea generator for startup ideas
- Trendy ideas swipe deck
- Vault (History) to save, view, delete, and compare ideas
- Compare mode to evaluate two ideas side by side

Tech Stack(frontend)
- React 
- Axios for API calls
- Firebase Auth for Google login
- Framer Motion for animations
- React Markdown for rendering feedback
- Vercel for deployment
Environment Variables
Create a .env file in the frontend root:
REACT_APP_API_URL=https://ideapulse-backend.onrender.com
REACT_APP_FIREBASE_API_KEY=your-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
Getting Started
npm install
npm start
npm run build
