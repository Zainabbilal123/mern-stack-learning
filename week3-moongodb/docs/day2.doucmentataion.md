# DAY 2: Mongoose Connect & Schema

# WHAT I DID:
- Installed mongoose and dotenv
- Created .env file
- Created config/db.js
- Created User model with schema

# SCHEMA FIELDS:
- name: String (required)
- email: String (required, unique)
- age: Number (min 0)
- createdAt: Date (default: now)

# WHAT I LEARNED:
- Schema validates data before saving
- .env stores sensitive information
- unique prevents duplicates