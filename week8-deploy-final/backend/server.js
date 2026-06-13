require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/env');

// Connect to MongoDB only when running server (not during tests)
if (require.main === module) {
    mongoose.connect(config.mongoUri)
        .then(() => {
            console.log('✅ MongoDB Connected Successfully');
            
            const PORT = config.port || 3000;
            app.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
                console.log(`📍 http://localhost:${PORT}`);
                console.log(`📁 Uploads folder: ${process.cwd()}/uploads`);
            });
        })
        .catch(err => {
            console.error('❌ MongoDB Connection Failed:', err.message);
            process.exit(1);
        });
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;