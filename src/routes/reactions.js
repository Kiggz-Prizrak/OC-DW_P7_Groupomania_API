const express = require('express');
const reactionController = require('../controllers/reactions');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, reactionController.createReaction);
router.get('/', auth, reactionController.getAllReactions);
router.get('/:id', auth, reactionController.getOneReaction);
router.put('/:id', auth, reactionController.modifyReaction);
router.delete('/:id', auth, reactionController.deleteReaction);

module.exports = router;
