const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const User = require('../models/User');

// Get all users - Admin only
router.get('/', protect, async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({
            status: 'success',
            data: users
        });
    } catch (error) {
        next(error);
    }
});

// Get single user
router.get('/:id', protect, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;