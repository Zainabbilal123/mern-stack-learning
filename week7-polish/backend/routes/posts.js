const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateID');
const { createPostSchema, updatePostSchema } = require('../validators/postValidator');
const {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postcontroller');

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, upload.single('coverImage'), createPost);
router.put('/:id', protect, upload.single('coverImage'), updatePost);
router.delete('/:id', protect, deletePost);
router.get('/:id', validateObjectId('id'), getPostById);
router.post('/', protect, upload.single('coverImage'), validate(createPostSchema), createPost);
router.put('/:id', protect, validateObjectId('id'), validate(updatePostSchema), updatePost);
router.delete('/:id', protect, validateObjectId('id'), deletePost);

module.exports = router;