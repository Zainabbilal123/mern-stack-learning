const Bookmark = require('../models/Bookmark');
const AppError = require('../utils/appError');

exports.getBookmarks = async (req, res, next) => {
    try {
        let filter = {};
        if (req.query.tag) {
            filter.tags = req.query.tag;
        }
        
        const bookmarks = await Bookmark.find(filter)
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            status: 'success',
            count: bookmarks.length,
            data: bookmarks
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookmarkById = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id)
            .populate('createdBy', 'name email');
        
        if (!bookmark) {
            return next(new AppError('Bookmark not found', 404));
        }
        
        res.json({
            status: 'success',
            data: bookmark
        });
    } catch (error) {
        next(error);
    }
};

exports.getBookmarksByUser = async (req, res, next) => {
    try {
        const bookmarks = await Bookmark.find({ createdBy: req.params.userId })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        
        res.json({
            status: 'success',
            count: bookmarks.length,
            data: bookmarks
        });
    } catch (error) {
        next(error);
    }
};

exports.createBookmark = async (req, res, next) => {
    try {
        const existingBookmark = await Bookmark.findOne({
            url: req.body.url,
            createdBy: req.body.createdBy
        });
        
        if (existingBookmark) {
            return next(new AppError('This URL is already bookmarked', 409));
        }
        
        const bookmark = await Bookmark.create(req.body);
        await bookmark.populate('createdBy', 'name email');
        
        res.status(201).json({
            status: 'success',
            data: bookmark
        });
    } catch (error) {
        if (error.code === 11000) {
            return next(new AppError('This URL is already bookmarked', 409));
        }
        next(error);
    }
};

exports.updateBookmark = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('createdBy', 'name email');
        
        if (!bookmark) {
            return next(new AppError('Bookmark not found', 404));
        }
        
        res.json({
            status: 'success',
            data: bookmark
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteBookmark = async (req, res, next) => {
    try {
        const bookmark = await Bookmark.findByIdAndDelete(req.params.id);
        
        if (!bookmark) {
            return next(new AppError('Bookmark not found', 404));
        }
        
        res.json({
            status: 'success',
            message: 'Bookmark deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};