const express = require('express');
const multer = require('../middleware/multer-config');
const postController = require('../controllers/posts');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, multer, postController.createPost);
router.get('/', auth, postController.getAllPosts);
router.get('/:id', auth, postController.getOnePost);
router.put('/:id', auth, multer, postController.modifyPost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router;
