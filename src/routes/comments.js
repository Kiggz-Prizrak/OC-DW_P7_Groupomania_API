const express = require('express');
const multer = require('../middleware/multer-config');
const commentController = require('../controllers/comments');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, multer, commentController.createComment);
router.get('/', auth, commentController.getAllComments);
router.get('/:id', auth, commentController.getOneComment);
router.put('/:id', auth, multer, commentController.modifyComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
