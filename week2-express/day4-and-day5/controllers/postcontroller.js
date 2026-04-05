// controllers/postController.js
const apperror = require('../utils/apperror');

// Sample data
let posts = [
    { id: 1, title: 'First Post', content: 'Hello World!', userId: 1, createdAt: new Date().toISOString() },
    { id: 2, title: 'Learning Express', content: 'Express is awesome!', userId: 2, createdAt: new Date().toISOString() },
    { id: 3, title: 'REST APIs', content: 'Building REST APIs is fun', userId: 1, createdAt: new Date().toISOString() }
];

// Get all posts
const getPosts = (req, res, next) => {
    try {
        res.json({
            status: 'success',
            count: posts.length,
            data: posts
        });
    } catch (error) {
        next(error);
    }
};

// Get single post
const getPostById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return next(new AppError('Invalid ID format', 400));
        }
        
        const post = posts.find(post => post.id === id);
        
        if (!post) {
            return next(new AppError(`Post with ID ${id} not found`, 404));
        }
        
        res.json({
            status: 'success',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

// Create new post
const createPost = (req, res, next) => {
    try {
        const { title, content, userId } = req.body;
        
        if (!title || !content) {
            return next(new AppError('Title and content are required', 400));
        }
        
        const newPost = {
            id: posts.length + 1,
            title,
            content,
            userId: userId || 1,
            createdAt: new Date().toISOString()
        };
        
        posts.push(newPost);
        
        res.status(201).json({
            status: 'success',
            message: 'Post created successfully',
            data: newPost
        });
    } catch (error) {
        next(error);
    }
};

// Delete post
const deletePost = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        const postIndex = posts.findIndex(post => post.id === id);
        
        if (postIndex === -1) {
            return next(new AppError(`Post with ID ${id} not found`, 404));
        }
        
        posts.splice(postIndex, 1);
        
        res.json({
            status: 'success',
            message: 'Post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    deletePost
};