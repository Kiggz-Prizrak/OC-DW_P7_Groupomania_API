const { promises: fs } = require('fs');
const { Post } = require('../models');

// Post
exports.createPost = async (req, res) => {
  const postObject = req.body;

  if (typeof req.body.content !== 'string') {
    if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
    return res.status(400).json({ message: 'please provides all fields' });
  }

  // création de l'user
  console.log(Post);

  const post = Post.create({
    userId: req.auth.userId,
    content: req.body.content,
    avatar: `${req.protocol}://${req.get('host')}/images/${req.files.media[0].filename}`,
  });
  if (post) {
    return res.status(201).json({ message: 'Post créé' });
  }
  if (req.files) await fs.unlink(`images/${req.files.media[0].filename}`);
  return res.status(404).json({ message: 'Error' });
};
