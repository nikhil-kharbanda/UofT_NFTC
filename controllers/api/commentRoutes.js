const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      collect_id: req.session.collect_id,
      comment: req.session.comment
    });
    console.log(newComment);
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.findAll({
    });
      console.log(newComment);
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });
module.exports = router;