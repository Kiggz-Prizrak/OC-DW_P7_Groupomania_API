const { promises: fs } = require('fs');
const { Post } = require('../models');

// Post
exports.createPost = async (req, res) => {
  // const postObject = req.body;
  if (typeof req.body.content !== 'string') {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(400).json({ message: 'please provides all fields' });
  }
  if (req.files) {
    const post = Post.create({
      userId: req.auth.userId,
      content: req.body.content,
      media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
    });
    if (post) {
      return res.status(201).json({ message: 'Post créé' });
    }
    await fs.unlink(`images/${req.files.media[0].filename}`);
  }
  const post = Post.create({
    userId: req.auth.userId,
    content: req.body.content,
  });
  if (post) return res.status(201).json({ message: 'Post créé' });
  return res.status(404).json({ message: 'Error' });
};

// // Post
// exports.createPost = async (req, res) => {
//   // const postObject = req.body;

//   if (typeof req.body.content !== 'string') {
//     if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
//     return res.status(400).json({ message: 'please provides all fields' });
//   }

//   const post = Post.create({
//     userId: req.auth.userId,
//     content: req.body.content,
//     media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
//   });
//   if (post) {
//     return res.status(201).json({ message: 'Post créé' });
//   }
//   if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
//   return res.status(404).json({ message: 'Error' });
// };

// Get all posts
exports.getAllPosts = async (req, res) => {
  const post = await Post.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
  })
    .catch((error) => res.status(404).json({ error }));
  return res.status(200).json(post);
};

// Get one User
exports.getOnePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } })
    .catch((error) => res.status(404).json({ error }));
  return res.status(200).json(post);
};

// modify Post
exports.modifyPost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (post === null) {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.userId != req.auth.userId) {
    if (req.files) await fs.unlink(`images/${req.files.avatar[0].filename}`);
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  const postObject = req.files ? {
    ...req.body,
    media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
  } : req.body;

  await Post.update({ ...postObject, id: req.params.id }, { where: { id: req.params.id } })
    .catch((error) => res.status(400).json({ error }));
  if (req.files) {
    const filename = post.media.split('/images/')[1];
    await fs.unlink(`images/${filename}`);
  }
  return res.status(200).json({ message: 'User modifié' });
};

// DELETE Post
exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (post === null) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.userId !== req.auth.userId) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }
  const filename = post.media.split('/images/')[1];
  await fs.unlink(`images/${filename}`);
  await Post.destroy({ where: { id: req.params.id } })
    .catch((error) => res.status(400).json({ error }));
  return res.status(200).json({ message: 'Objet supprimé !' });
};
