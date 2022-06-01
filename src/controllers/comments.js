const { promises: fs } = require('fs');
const { Comment, Post, User, Reaction } = require('../models');

exports.createComment = async (req, res) => {
  if (typeof req.body.content !== 'string') {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(400).json({ message: 'please provides all fields' });
  }
  if (req.files) {
    const comment = Comment.create({
      UserId: req.auth.UserId,
      content: req.body.content,
      PostId: req.body.PostId,
      media: `${req.protocol}://${req.get('host')}/images/${
        req.files.media[0].filename
      }`,
    });
    if (comment) {
      return res.status(201).json({ message: 'Commentaire créé' });
    }
    await fs.unlink(`images/${req.files.media[0].filename}`);
  }
  const comment = Comment.create({
    UserId: req.auth.UserId,
    content: req.body.content,
    PostId: req.body.PostId,
  });
  if (comment) return res.status(201).json({ message: 'Commentaire créé' });
  return res.status(500).json({ message: 'An error is ooccurred' });
};

// Get all comments
exports.getAllComments = async (req, res) => {
  const comment = await Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['username', 'firstName', 'lastName', 'avatar'],
      },
      {
        model: Post,
      },
      {
        model: Reaction,
      },
    ],
    order: [['createdAt', 'DESC']],
  }).catch((error) => res.status(404).json({ error }));
  return res.status(200).json(comment);
};

// Get one Comment
exports.getOneComment = async (req, res) => {
  const comment = await Comment.findOne({
    include: [
      {
        model: User,
        attributes: ['username', 'firstName', 'lastName', 'avatar'],
      },
      {
        model: Post,
      },
      {
        model: Reaction,
      },
    ],
    where: { id: req.params.id },
  }).catch((error) => res.status(400).json({ error }));
  return res.status(200).json(comment);
};

// modify Comment
exports.modifyComment = async (req, res) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  if (comment === null) {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(404).json({ message: 'Post not found' });
  }

  if (comment.UserId !== req.auth.UserId && !req.auth.isAdmin) {
    if (req.files) await fs.unlink(`images/${req.files.avatar[0].filename}`);
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  const commentObject = req.files
    ? {
        ...req.body,
        media: `${req.protocol}://${req.get('host')}/images/${
          req.files.media[0].filename
        }`,
      }
    : req.body;

  await Comment.update(
    { ...commentObject, id: req.params.id },
    { where: { id: req.params.id } },
  ).catch((error) => res.status(400).json({ error }));
  if (req.files && post.media) {
    const filename = comment.media.split('/images/')[1];
    await fs.unlink(`images/${filename}`);
  }
  return res.status(200).json({ message: 'Commentaire modifié' });
};

// delete Comment
exports.deleteComment = async (req, res) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  if (comment === null) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (comment.UserId !== req.auth.UserId && !req.auth.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  if (comment.media) {
    const filename = comment.media.split('/images/')[1];
    await fs.unlink(`images/${filename}`);
  }
  await Comment.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error }),
  );
  return res.status(200).json({ message: 'Objet supprimé !' });
};

//
//   const filename = comment.media.split('/images/')[1];
//   await fs.unlink(`images/${filename}`);
//   await Comment.destroy({ where: { id: req.params.id } }).catch((error) =>
//     res.status(400).json({ error }),
//   );
//   return res.status(200).json({ message: 'Objet supprimé !' });
// };
