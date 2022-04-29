const { promises: fs } = require('fs');
const { Comment } = require('../models');

exports.createComment = async (req, res) => {
  if (typeof req.body.content !== 'string') {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(400).json({ message: 'please provides all fields' });
  }
  if (req.files) {
    const comment = Comment.create({
      userId: req.auth.userId,
      content: req.body.content,
      postId: req.body.postId,
      media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
    });
    if (comment) {
      return res.status(201).json({ message: 'Commentaire créé' });
    }
    await fs.unlink(`images/${req.files.media[0].filename}`);
  }
  const comment = Comment.create({
    userId: req.auth.userId,
    content: req.body.content,
    postId: req.body.postId,
  });
  if (comment) return res.status(201).json({ message: 'Commentaire créé' });
  return res.status(404).json({ message: 'Error' });
};

// // Comment
// exports.createComment = async (req, res) => {
//   if (typeof req.body.content !== 'string') {
//     if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
//     return res.status(400).json({ message: 'please provides all fields' });
//   }

//   const comment = Comment.create({
//     userId: req.auth.userId,
//     content: req.body.content,
//     postId: req.body.postId,
//     media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
//   });
//   if (comment) {
//     return res.status(201).json({ message: 'Commentaire posté !' });
//   }
//   if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
//   return res.status(404).json({ message: 'Error' });
// };

// Get all comments
exports.getAllComments = async (req, res) => {
  const comment = await Comment.findAll({
    order: [['createdAt', 'DESC']],
  })
    .catch((error) => res.status(404).json({ error }));
  return res.status(200).json(comment);
};

// Get one Comment
exports.getOneComment = async (req, res) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } }).catch(
    (error) => res.status(404).json({ error }),
  );
  return res.status(200).json(comment);
};

// modify Comment
exports.modifyComment = async (req, res) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });
  if (comment === null) {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(404).json({ message: 'Post not found' });
  }

  if (comment.userId != req.auth.userId) {
    if (req.files) await fs.unlink(`images/${req.files.avatar[0].filename}`);
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  const commentObject = req.files ? {
    ...req.body,
    media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
  } : req.body;

  await Comment.update({ ...commentObject, id: req.params.id }, { where: { id: req.params.id } })
    .catch((error) => res.status(400).json({ error }));
  if (req.files) {
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

  if (comment.userId !== req.auth.userId) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }
  const filename = comment.media.split('/images/')[1];
  await fs.unlink(`images/${filename}`);
  await Comment.destroy({ where: { id: req.params.id } }).catch((error) => res.status(400).json({ error }));
  return res.status(200).json({ message: 'Objet supprimé !' });
};
