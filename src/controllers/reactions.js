const { Reaction, Post, User, Comment } = require('../models');

// add Reaction
exports.createReaction = async (req, res) => {
  if (typeof req.body.type !== 'string') {
    return res.status(400).json({ message: 'please provides all fields' });
  }

  if (req.body.PostId === null && req.body.CommentId === null) {
    return res
      .status(400)
      .json({ message: 'please select comment or post to react' });
  }

  if (
    typeof req.body.PostId === 'string'
    || typeof req.body.CommentId === 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'Please provides in valide format' });
  }

  if (
    typeof req.body.PostId === 'number'
    && typeof req.body.CommentId === 'number'
  ) {
    return res
      .status(400)
      .json({ message: 'please select between comment or post to react' });
  }

  const reaction = Reaction.create({
    UserId: req.auth.UserId,
    PostId: req.body.PostId,
    CommentId: req.body.CommentId,
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
  }).catch((error) => res.status(404).json({ error }));
  return res.status(200).json(reaction);
};

// Get one Comment
exports.getOneReaction = async (req, res) => {
  const reaction = await Reaction.findOne({
    where: { id: req.params.id },
  }).catch((error) => res.status(404).json({ error }));
  return res.status(200).json(reaction);
};

// modify Comment
exports.modifyReaction = async (req, res) => {
  const reaction = await Reaction.findOne({ where: { id: req.params.id } });
  const reactionObjet = req.body;

  if (reaction.UserId !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  if (typeof req.body.type !== 'string') {
    return res.status(400).json({ message: 'please provides all fields' });
  }

  if (req.body.PostId === null && req.body.CommentId === null) {
    return res
      .status(400)
      .json({ message: 'please select comment or post to react' });
  }

  if (
    typeof req.body.PostId === 'string' ||
    typeof req.body.CommentId === 'string'
  ) {
    return res
      .status(400)
      .json({ message: 'Please provides in valide format' });
  }

  if (
    typeof req.body.PostId === 'number' &&
    typeof req.body.CommentId === 'number'
  ) {
    return res
      .status(400)
      .json({ message: 'please select between comment or post to react' });
  }

  await Reaction.update(
    { ...reactionObjet, id: req.params.id },
    { where: { id: req.params.id } },
  ).catch((error) => res.status(400).json({ error }));

  return res.status(200).json({ message: 'reaction modifié' });
};

// Delete a reaction
exports.deleteReaction = async (req, res) => {
  const reaction = await Reaction.findOne({ where: { id: req.params.id } });
  if (reaction === null) {
    return res.status(404).json({ message: 'reaction not found' });
  }

  if (reaction.UserId !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }
  await Reaction.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error }),
  );
  return res.status(200).json({ message: 'Réaction supprimé !' });
};
