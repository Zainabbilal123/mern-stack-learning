const required = [
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    
];
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

required.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

module.exports = {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    clientUrl: process.env.CLIENT_URL,
    testMongoUri: process.env.TEST_MONGO_URI
};

if (process.env.NODE_ENV === 'development') {
    console.log('✅ Environment variables loaded successfully');
}