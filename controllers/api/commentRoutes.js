const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {

  console.log(req.body,req.session.user_id)
  try {
     const newComment = await Comment.create({
      content:req.body.content,
      collectId:req.body.collectId,
      userId:req.session.user_id.id
     });
 
    console.log(newComment);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;