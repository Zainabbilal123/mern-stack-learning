# DAY 3: Middleware

# WHAT I DID:
- Installed morgan and cors
- Added app.use(morgan('dev'))
- Added app.use(cors())
- Created custom requestLogger middleware
- Created requireJson middleware

# COMMANDS:
npm install morgan cors

# MIDDLEWARE MADE:
1. requestLogger - Logs timestamp, method, URL
2. requireJson - Checks Content-Type is JSON
3. checkAdmin - Checks user role header

# WHAT I LEARNED:
- Middleware runs in order
- Always call next() or send response
- Third-party middleware saves time
- Custom middleware can validate requests

# TESTING:
 Morgan logs every request in terminal
 CORS allows frontend to access API
 requireJson blocks wrong content-type