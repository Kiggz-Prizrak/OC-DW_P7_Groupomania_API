const { Report } = require('../models');

// add Reaction
exports.createReport = async (req, res) => {
  if (req.body.PostId === null && req.body.CommentId === null) {
    return res
      .status(400)
      .json({ message: 'please select comment or post to report' });
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

  //
  if (typeof req.body.CommentId !== 'undefined') {
    const reportCommentFind = await Report.findOne({
      where: { CommentId: req.body.CommentId, UserId: req.auth.UserId },
    });
    if (reportCommentFind) {
      return res.status(400).json({ message: 'element already reacted' });
    }
    const report = Report.create({
      UserId: req.auth.UserId,
      CommentId: req.body.CommentId,
    });
    if (report) {
      return res.status(201).json({ message: 'Reported !' });
    }
    return res.status(404).json({ message: 'Error' });
  } 
  const reportPostFind = await Report.findOne({
    where: { PostId: req.body.PostId, UserId: req.auth.UserId },
  });

  if (reportPostFind) {
    return res.status(400).json({ message: 'element already reacted' });
  }
  const report = Report.create({
    UserId: req.auth.UserId,
    PostId: req.body.PostId,
    CommentId: req.body.CommentId,
  });
  if (report) {
    return res.status(201).json({ message: 'Reported !' });
  }
  return res.status(404).json({ message: 'Error' });
};

// Get all Reports
exports.getAllReports = async (req, res) => {
  const report = await Report.findAll({
    order: [['createdAt', 'DESC']],
  }).catch((error) => res.status(404).json({ error }));
  return res.status(200).json(report);
};

// Get one Report
exports.getOneReport = async (req, res) => {
  const report = await Report.findOne({ where: { id: req.params.id } }).catch(
    (error) => res.status(404).json({ error }),
  );
  return res.status(200).json(report);
};

// Delete a report
exports.deleteReport = async (req, res) => {
  const report = await Report.findOne({ where: { id: req.params.id } });
  if (report === null) {
    return res.status(404).json({ message: 'reaction not found' });
  }

  if (report.UserId !== req.auth.UserId) {
    return res.status(403).json({ message: 'Unauthorized request' });
  }
  await Report.destroy({ where: { id: req.params.id } }).catch((error) =>
    res.status(400).json({ error }),
  );
  return res.status(200).json({ message: 'report supprimé !' });
};
