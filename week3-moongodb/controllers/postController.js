const Post = require('../models/Post');
const AppError = require('../utils/appError');

exports.getPosts = async (req, res, next) => {
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
};

exports.getPostById = async (req, res, next) => {
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
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        await post.populate('author', 'name email');
        res.status(201).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return next(new AppError('Post not found', 404));
        }
        
        res.json({
            status: 'success',
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};