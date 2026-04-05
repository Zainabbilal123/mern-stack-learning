# DAY 1: Express Setup & First Routes

# WHAT I DID:
- Created week2-express folder
- Ran npm init -y
- Installed express
- Created server.js with GET /users and POST /users
- Tested with Thunder Client

# COMMANDS USED:
npm init -y
npm install express
node server.js

# ROUTES MADE:
GET  /users     - Returns list of users
POST /users     - Creates new user

# WHAT I LEARNED:
- Express makes HTTP server easy
- Need app.use(express.json()) for POST requests
- res.json() sends JSON response

# PROBLEMS:
- Forgot express.json() → body was empty
- Fixed by adding app.use(express.json())