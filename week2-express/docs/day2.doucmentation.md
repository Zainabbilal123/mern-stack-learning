# DAY 2: Route Params & Query Strings

# WHAT I DID:
- Added GET /users/:id for single user
- Added PUT /users/:id for update
- Added DELETE /users/:id for delete
- Added query string ?role=admin for filtering

# ROUTES MADE:
GET    /users/:id      - Get one user
PUT    /users/:id      - Update user
DELETE /users/:id      - Delete user
GET    /users?role=admin - Filter users

# WHAT I LEARNED:
- req.params gets :id from URL
- req.query gets ?role=admin from URL
- Always validate ID with parseInt()
- Return 404 if user not found
- Return 400 if ID is invalid

# TESTING:
 users/1     → User found
 users/99    → 404 not found
users/abc   → 400 invalid ID