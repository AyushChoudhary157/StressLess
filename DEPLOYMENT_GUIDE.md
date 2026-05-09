# StressLess Deployment Guide

This project has two separate apps:
- Frontend: `frontend/` on Vercel
- Backend: `backend/` on Render

The frontend is a Vite React app, so Vercel should build it with `npm run build` and publish the `dist` folder. The backend is an Express + Prisma API, so Render should start it with `npm start` and provide the production environment variables.

## Project Analysis

### Frontend
- Built with Vite and React.
- Uses `import.meta.env.VITE_API_URL` in multiple places, with a fallback to `http://localhost:5000/api`.
- Build output is `dist`.
- `frontend/vercel.json` already contains SPA rewrite rules, which is useful for client-side navigation.

### Backend
- Express server listens on `process.env.PORT || 5000` and binds to `0.0.0.0`, which is correct for Render.
- Prisma is configured for PostgreSQL.
- Backend uses CORS with a hardcoded production origin: `https://stress-less-omega.vercel.app`.
- There is a health endpoint at `/api/health`.

### Important Deployment Note
If your Vercel URL is not exactly `https://stress-less-omega.vercel.app`, update the backend CORS allowlist before deploying or the frontend requests will be blocked.

## Environment Variables

### Frontend on Vercel
Set these in the Vercel project settings:
- `VITE_API_URL` = your Render backend URL plus `/api`
- `VITE_GOOGLE_CLIENT_ID` = your Google OAuth client ID

Example:
- `VITE_API_URL=https://your-backend-name.onrender.com/api`

### Backend on Render
Set these in the Render service settings:
- `DATABASE_URL` = PostgreSQL connection string
- `JWT_SECRET` = a long random secret
- `GOOGLE_CLIENT_ID` = same Google OAuth client ID used by the frontend
- `OPENROUTER_API_KEY` = your OpenRouter key
- `NODE_ENV` = `production`

## Step-by-Step Deployment

### 1. Push the project to GitHub
- Make sure the full repository is committed to GitHub.
- Keep both `frontend/` and `backend/` in the same repo.

### 2. Create the PostgreSQL database
- Use Neon, Supabase, or Render Postgres.
- Copy the connection string.
- Put that value into `DATABASE_URL` on Render.

### 3. Deploy the backend on Render
1. Open Render and create a new Web Service.
2. Connect your GitHub repository.
3. Set the root directory to `backend`.
4. Set the build command to:
   - `npm install`
5. Set the start command to:
   - `npm start`
6. Add the environment variables listed above.
7. Deploy the service.

### 4. Run Prisma migrations on the production database
After the backend is connected to the production database, run:
- `npx prisma migrate deploy`
- `npx prisma generate`

If Render gives you a shell or deploy hook, run those commands there. If not, run them locally while pointing `DATABASE_URL` to the production database.

### 5. Copy the backend URL
- After deployment, Render will give you a public URL.
- Example: `https://your-backend-name.onrender.com`
- Your API base URL for the frontend should be:
  - `https://your-backend-name.onrender.com/api`

### 6. Deploy the frontend on Vercel
1. Open Vercel and create a new project.
2. Import the same GitHub repository.
3. Set the root directory to `frontend`.
4. Set the build command to:
   - `npm run build`
5. Set the output directory to:
   - `dist`
6. Add the environment variables listed above.
7. Deploy the project.

### 7. Update Google OAuth settings
In Google Cloud Console, add the deployed frontend URL to the authorized JavaScript origins.

If needed, also update:
- Authorized redirect URIs
- Any domain restrictions tied to your OAuth client

### 8. Update backend CORS if the Vercel URL changed
In `backend/index.js`, the CORS allowlist currently includes only one production origin.

If your frontend deploys to a different Vercel domain, change that origin to your actual Vercel URL and redeploy the backend.

### 9. Test the deployed app
Check these flows after deployment:
- Sign up / log in
- Google login
- Stress test submission
- Results page
- Dashboard history
- ChatBot requests
- Appointment booking

If requests fail, check these first:
- `VITE_API_URL`
- `DATABASE_URL`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `OPENROUTER_API_KEY`
- CORS origin in the backend

## Recommended Production Values

### Render
- Runtime: Node
- Root directory: `backend`
- Start command: `npm start`
- Database: PostgreSQL

### Vercel
- Framework preset: Vite
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

## Quick Checklist
- [ ] GitHub repo pushed
- [ ] PostgreSQL database created
- [ ] Backend deployed on Render
- [ ] Prisma migrations applied
- [ ] Frontend deployed on Vercel
- [ ] `VITE_API_URL` set to Render backend URL
- [ ] CORS origin matches Vercel domain
- [ ] Google OAuth client updated with deployed domain

## Notes for This Codebase
- The frontend already supports environment-based API URLs.
- The backend is already prepared for hosted ports through `process.env.PORT`.
- The frontend Vercel rewrite config is already present, so deep links should work.
- The backend health endpoint can be used to confirm the API is alive after deployment.
