# DAY 3: Rate Limiting & Security Headers

# WHAT I DID:
- Installed helmet (12 security headers)
- Installed express-rate-limit
- General limiter: 100 requests per 15 minutes
- Auth limiter: 10 attempts per 15 minutes
- Body size limit: 10kb
- CORS whitelist configured


# HEADERS ADDED:
X-Frame-Options: DENY → Prevents clickjacking
X-Content-Type-Options: nosniff → Prevents MIME sniffing
Strict-Transport-Security → Forces HTTPS
Referrer-Policy: no-referrer → No referrer leakage

# WHAT I LEARNED:
- Rate limiting prevents brute force attacks
- Helmet sets security headers automatically
- Always limit JSON body size
- CORS whitelist restricts API access