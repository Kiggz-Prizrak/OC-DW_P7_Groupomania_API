const express = require('express');
const multer = require('../middleware/multer-config');
const usersController = require('../controllers/posts');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, multer, usersController.createPost);
// router.get('/', auth, usersController.getAllPosts);
// router.get('/:id', auth, usersController.getOnePost);
// router.put('/:id', auth, multer, usersController.modifyPost);
// router.delete('/:id', auth, usersController.deletePost);

module.exports = router;
