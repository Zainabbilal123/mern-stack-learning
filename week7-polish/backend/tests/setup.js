const mongoose = require('mongoose');
require('dotenv').config();

// Check if already connected to avoid multiple connections
beforeAll(async () => {
    const testUri = process.env.TEST_MONGO_URI || process.env.MONGO_URI;
    
    // Close existing connection if any
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    
    await mongoose.connect(testUri);
    console.log('✅ Test database connected');
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log('✅ Test database disconnected');
});