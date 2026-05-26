const Post = require('../models/post');
const AppError = require('../utils/appError');

    exports.getPosts = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 6;
            const search = req.query.search || '';
            const skip = (page - 1) * limit;
    
            
            let filter = {};
            if (search) {
                filter = {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { body: { $regex: search, $options: 'i' } }
                    ]
                };
            }
    
            const total = await Post.countDocuments(filter);
            const posts = await Post.find(filter)
                .populate('author', 'name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
    
            res.json({
                status: 'success',
                data: posts,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / limit),
                    limit
                }
            });
        } catch (error) {
            next(error);
        }
    };

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name');
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
        const { title, body } = req.body;
        const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

        const post = await Post.create({
            title,
            body,
            coverImage,
            author: req.user._id
        });

        await post.populate('author', 'name');

        res.status(201).json({
            status: 'success',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return next(new AppError('Post not found', 404));
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return next(new AppError('You can only update your own posts', 403));
        }

        const { title, body } = req.body;
        if (title) post.title = title;
        if (body) post.body = body;
        if (req.file) post.coverImage = `/uploads/${req.file.filename}`;

        await post.save();
        await post.populate('author', 'name');

        res.json({
            status: 'success',
            data: post
        });
    } catch (error) {
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return next(new AppError('Post not found', 404));
        }

        if (post.author.toString() !== req.user._id.toString()) {
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
};