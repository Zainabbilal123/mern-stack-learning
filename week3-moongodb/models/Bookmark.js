const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, 'URL is required'],
        validate: {
            validator: function(v) {
                return v.startsWith('http://') || v.startsWith('https://');
            },
            message: 'URL must start with http:// or https://'
        }
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bookmarkSchema.index({ url: 1, createdBy: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);