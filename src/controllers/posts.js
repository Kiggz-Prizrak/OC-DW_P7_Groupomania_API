const { promises: fs } = require('fs');
const { Post, User, Comment, Reaction } = require('../models');
const { getAllUsers } = require('./users');

// Post
exports.createPost = async (req, res) => {
  // const postObject = req.body;
  console.log(req.auth.UserId);
  if (typeof req.body.content !== 'string') {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(400).json({ message: 'please provides valid data' });
  }
  if (req.files) {
    const post = Post.create({
      UserId: req.auth.UserId,
      content: req.body.content,
      media: `${req.protocol}://${req.get('host')}/images/${
        req.files.media[0].filename
      }`,
    });
    if (post) {
      return res.status(201).json({ message: 'Post créé' });
    }
    await fs.unlink(`images/${req.files.media[0].filename}`);
  }
  const post = Post.create({
    UserId: req.auth.UserId,
    content: req.body.content,
  });
  if (post) return res.status(201).json({ message: 'Post créé' });
  return res.status(404).json({ message: 'Error' });
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  const post = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['username', 'firstName', 'lastName', 'avatar'],
      },
      {
        model: Comment,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: Reaction,
          },
          {
            model: User,
            attributes: ['username', 'firstName', 'lastName', 'avatar'],
          },
        ],
      },
      {
        model: Reaction,
      },
    ],
    // order: [[Comment, 'createdAt', 'DESC']],
    order: [
      ['createdAt', 'DESC'],
      [Comment, 'createdAt', 'DESC'],
    ],
  }).catch((error) => res.status(400).json({ message: 'bad request' }));
  return res.status(200).json(post);
};

// Get one post
exports.getOnePost = async (req, res) => {
  const post = await Post.findOne({
    include: [
      {
        model: User,
        attributes: ['username', 'firstName', 'lastName', 'avatar'],
      },
      {
        model: Comment,
        order: [['createdAt', 'DESC']],
      },
      {
        model: Reaction,
      },
    ],
    order: [
      [Comment, 'createdAt', 'DESC'],
    ],
    where: { id: req.params.id },
  }).catch((error) => res.status(404).json({ message: 'Post not found' }));
  return res.status(200).json(post);
};

// modify Post
exports.modifyPost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (post === null) {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.UserId !== req.auth.UserId && !req.auth.isAdmin) {
    if (req.files) await fs.unlink(`images/${req.files.avatar[0].filename}`);
    return res.status(403).json({ message: 'Unauthorized request' });
  }

  const postObject = req.files
    ? {
      ...req.body,
      media: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
    }
    : req.body;

  await Post.update(
    { ...postObject, id: req.params.id },
    { where: { id: req.params.id } },
  ).catch((error) => res.status(400).json({ error }));
  if (req.files && post.media) {
    const filename = post.media.split('/images/')[1];
    await fs.unlink(`images/${filename}`);
  }
  return res.status(200).json({ message: 'Post modifié' });
};

// DELETE Post
exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });
  if (post === null) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (post.UserId !== req.auth.UserId && !req.auth.isAdmin) {
    console.log(req.body);
    return res.status(403).json({ message: 'Unauthorized request' });
  }
  if(post.media) {
    const filename = post.media.split('/images/')[1];
    await fs.unlink(`images/${filename}`);
  }
  await Post.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error }),
  );
  return res.status(200).json({ message: 'Objet supprimé !' });
};
