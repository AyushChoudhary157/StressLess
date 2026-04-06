# StressLess - Copilot Instructions

## Project Overview
StressLess is a mental wellness web app with a React/Vite frontend and Express/Prisma backend. Users take stress assessments across 3 categories (medical, financial, relationship), receive AI-generated analysis, chat with a wellness bot, and book therapy appointments.

## Architecture

### Frontend (Vite + React 19)
- **Single-page app** with manual routing via `currentPage` state in [src/App.jsx](src/App.jsx)
- **No React Router** - navigation handled through `setCurrentPage()` callbacks passed to components
- **State lives in App.jsx** - stress test state (questions, answers, scores) managed at top level, not in context
- **Two contexts**: `AuthContext` (auth + tokens) and `ThemeContext` (dark mode)

### Backend (Express + Prisma + PostgreSQL)
- **Single file API** at [backend/index.js](backend/index.js) - all routes in one file
- **JWT auth** with `authenticateToken` middleware - token in `Authorization: Bearer` header
- **AI via OpenRouter** (not direct OpenAI) - uses `openai` package with custom `baseURL`

## Key Patterns

### API Communication
```javascript
// Always use VITE_API_URL env var, fallback to localhost:5000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```
- Network helper with retry logic in [src/utils/networkHelper.js](src/utils/networkHelper.js)
- Components often create local axios instances with interceptors for retries
- 30s timeout standard, 60s for AI chat endpoints

### Authentication Flow
- Google OAuth via `@react-oauth/google` → backend verifies → JWT returned
- Email login auto-creates user if not exists (demo behavior)
- Token stored in `localStorage`, user data also cached there

### Stress Test Structure
Questions defined in `App.jsx` as object with 3 categories (30 questions each):
```javascript
allQuestions = { medical: [...], relationship: [...], financial: [...] }
```
- 5 random questions selected per category (15 total) via `generateRandomQuestions()`
- Score 0-4 per question (Never/Rarely/Sometimes/Often/Always)
- Results saved to `TestResult` with `categoricalScores` as JSON field

## Development Commands

### Frontend
```bash
npm run dev          # Vite dev server on port 5173
npm run build        # Production build
npm run lint         # ESLint
```

### Backend
```bash
cd backend
npm run dev          # nodemon for dev
npm start            # Production
npx prisma migrate dev   # Run migrations
npx prisma generate      # Generate client after schema changes
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<google-oauth-client-id>
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=<secret>
GOOGLE_CLIENT_ID=<same-as-frontend>
OPENROUTER_API_KEY=<for-ai-features>
```

## Database Schema
Three models in [backend/prisma/schema.prisma](backend/prisma/schema.prisma):
- `User` - email, displayName, photoURL
- `TestResult` - score, categoricalScores (JSON), level, aiAnalysis (cached)
- `Appointment` - doctorName, slot, status

## Component Conventions
- Use `framer-motion` for animations (`motion.div`, `AnimatePresence`)
- Icons from `lucide-react`
- Styling via Tailwind with custom `glass-card` class
- Dark mode via `dark:` Tailwind variants, controlled by `ThemeContext`

## AI Integration Notes
- CalmBot restricted to wellness topics only (see system prompt in `/api/chat`)
- AI analysis is cached in `TestResult.aiAnalysis` - check DB before regenerating
- Model: `arcee-ai/trinity-large-preview:free` via OpenRouter
