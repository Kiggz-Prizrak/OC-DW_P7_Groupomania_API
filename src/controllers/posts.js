const fs = require('fs');
const { Post } = require('../models');

// Post
exports.createPost = async (req, res) => {
  console.log(req.body);
  const postObject = req.body;

  if (typeof req.body.content !== 'string') {
    return res.status(400).json({ message: 'please provides all fields' });
  }

  // création du post
  const post = Post.create({
    userId: req.auth.userId,
    content: req.body.content,
    media: `${req.protocol}://${req.get('host')}/images/${req.files.filename}`,
  });
  if (post) {
    return res.status(201).json({ message: 'post créé' });
  }
  return res.status(404).json({ message: 'Error' });
};
