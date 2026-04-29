const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const authorise = require('../middleware/authorise');
const User = require('../models/User');
const AppError = require('../utils/appError');

router.use(protect);


router.get('/', authorise('admin'), async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        res.json({
            status: 'success',
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return next(new AppError('You can only update your own profile', 403));
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', authorise('admin'), async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        
        res.json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;