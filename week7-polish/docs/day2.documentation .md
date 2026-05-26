# DAY 2: Input Validation & Sanitisation

# WHAT I DID:
- Installed Zod for validation
- Created validators for auth (register, login)
- Created validators for posts (create, update)
- Built validate middleware factory
- Added ObjectId validation for route params

# FILES CREATED:
validators/authValidator.js
validators/postValidator.js
middleware/validate.js
middleware/validateId.js

# VALIDATION RULES:
- Email: valid format, lowercase
- Password: minimum 8 characters
- Name: 2-50 characters
- Title: 3-120 characters
- Post body: minimum 10 characters

 # WHAT I LEARNED:
- Never trust user input
- Zod provides clear error messages
- ObjectId validation prevents Mongoose errors