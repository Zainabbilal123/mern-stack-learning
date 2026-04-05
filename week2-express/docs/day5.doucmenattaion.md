DAY 5: Global Error Handling

WHAT I DID:
- Created AppError class in utils/
- Added 404 handler for unknown routes
- Added global error handler at bottom
- Updated controllers to use next(error)

FILES MADE:
utils/appError.js - Custom error class

ERROR HANDLERS:
1. 404 handler - Catches unknown routes
2. Global error handler - Catches all errors

WHAT I LEARNED:
- Always put 404 handler BEFORE global error handler
- Global error handler needs 4 parameters (err, req, res, next)
- AppError class keeps errors consistent
- Use next(error) to send errors to handler

TESTING:
✅ /invalid → 404 "Route not found"
✅ /users/999 → 404 "User not found"
✅ /users/abc → 400 "Invalid ID format"
✅ POST without body → 400 "Name required"

ALL ROUTES WORKING WITH ERROR HANDLING!