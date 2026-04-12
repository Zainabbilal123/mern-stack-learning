const express = require('express');
const router = express.Router();
const {
    getBookmarks,
    getBookmarkById,
    getBookmarksByUser,
    createBookmark,
    updateBookmark,
    deleteBookmark
} = require('../controllers/bookmarkController');

router.get('/', getBookmarks);
router.get('/:id', getBookmarkById);
router.get('/user/:userId', getBookmarksByUser);
router.post('/', createBookmark);
router.put('/:id', updateBookmark);
router.delete('/:id', deleteBookmark);

module.exports = router;