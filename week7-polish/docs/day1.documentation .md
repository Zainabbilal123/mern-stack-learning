# DAY 1: Environment Variables & .env

# WHAT I DID:
- Created .env files for backend and frontend
- Moved all secrets (MongoDB URI, JWT secret) to .env
- Created .env.example files as templates
- Added config/env.js to validate required variables
- Added .env to .gitignore

 # FILES CREATED:
backend/.env
backend/.env.example
backend/config/env.js
frontend/.env
frontend/.env.example



 # WHAT I LEARNED:
- Never commit .env to git
- Always commit .env.example
- Validate required variables on startup
- Use VITE_ prefix for frontend env vars