const { Reaction } = require('../models');

// add Reaction
exports.createReaction = async (req, res) => {
  if (typeof req.body.type !== 'string') {
    return res.status(400).json({ message: 'please provides all fields' });
  }

  if (req.body.postId === null
  && req.body.commentId === null) {
    return res.status(400).json({ message: 'please select comment or post to react' });
  }

  if (
    typeof req.body.postId === 'string'
    || typeof req.body.commentId === 'string') {
    return res.status(400).json({ message: 'Please provides in valide format' });
  }

  if (
    typeof req.body.postId === 'number'
    && typeof req.body.commentId === 'number') {
    return res.status(400).json({ message: 'please select between comment or post to react' });
  }

  const reaction = Reaction.create({
    userId: req.auth.userId,
    postId: req.body.postId,
    commentId: req.body.commentId,
  });
  if (reaction) {
    return res.status(201).json({ message: 'Reaction postée !' });
  }
  return res.status(404).json({ message: 'Error' });
};

// Get all reactions
exports.getAllReactions = async (req, res) => {
  const reaction = await Reaction.findAll({
    order: [['createdAt', 'DESC']],
  })
    .catch((error) => res.status(404).json({ error }));
  return res.status(200).json(reaction);
};

// Get one Comment
exports.getOneReaction = async (req, res) => {
  const reaction = await Reaction.findOne({ where: { id: req.params.id } }).catch(
    (error) => res.status(404).json({ error }),
  );
  return res.status(200).json(reaction);
};

// modify Comment
exports.modifyReaction = async (req, res) => {
  const reaction = await Reaction.findOne({ where: { id: req.params.id } });
  const reactionObjet = req.body;

  if (reaction.userId !== req.auth.userId) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  if (typeof req.body.type !== 'string') {
    return res.status(400).json({ message: 'please provides all fields' });
  }

  if (req.body.postId === null && req.body.commentId === null) {
    return res.status(400).json({ message: 'please select comment or post to react' });
  }

  if (typeof req.body.postId === 'string' || typeof req.body.commentId === 'string') {
    return res.status(400).json({ message: 'Please provides in valide format' });
  }

  if (typeof req.body.postId === 'number' && typeof req.body.commentId === 'number') {
    return res.status(400).json({ message: 'please select between comment or post to react' });
  }

  await Reaction.update({ ...reactionObjet, id: req.params.id }, { where: { id: req.params.id } })
    .catch((error) => res.status(400).json({ error }));

  return res.status(200).json({ message: 'reaction modifié' });
};

// Delete a reaction
exports.deleteReaction = async (req, res) => {
  const reaction = await Reaction.findOne({ where: { id: req.params.id } });
  if (reaction === null) {
    return res.status(404).json({ message: 'reaction not found' });
  }

  if (reaction.userId !== req.auth.userId) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }
  await Reaction.destroy({ where: { id: req.params.id } }).catch((error) => res.status(400).json({ error }));
  return res.status(200).json({ message: 'Réaction supprimé !' });
};
