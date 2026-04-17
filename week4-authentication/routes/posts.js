const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const Post = require('../models/Post');
const AppError = require('../utils/appError');

router.use(protect);

router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        res.json({
            status: 'success',
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        
        if (!post) {
            return next(new AppError('Post not found', 404));
        }
        
        res.json({
            status: 'success',
            data: post
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const post = await Post.create({
            ...req.body,
            author: req.user._id
        });
        
        await post.populate('author', 'name email');
        
        res.status(201).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return next(new AppError('Post not found', 404));
        }
        
        if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return next(new AppError('You can only delete your own posts', 403));
        }
        
        await post.deleteOne();
        
        res.json({
            status: 'success',
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
