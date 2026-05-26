# DAY 4: Writing Tests with Jest & Supertest

# WHAT I DID:
- Installed Jest and Supertest
- Created test database (TEST_MONGO_URI)
- Wrote unit tests for AppError and JWT
- Wrote integration tests for auth routes
- Separated app.js from server.js for testing


# FILES CREATED:
tests/setup.js
tests/auth.test.js
tests/utils.test.js
app.js (separated from server.js)


# WHAT I LEARNED:
- Separate app from server for testing
- Supertest tests API without starting server
- Use beforeEach() to clean database
- Test both success and error cases