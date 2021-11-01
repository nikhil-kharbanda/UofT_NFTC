//Upload image to database
const router = require("express").Router();
const { Collect, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

//CREATE a post
router.post("/", async (req, res) => {
  //the body of the request
  //the file from the body of the request(amar's upload function)
  //pass the ide from the params

  //   const variable = await Collect.create({
  //     title: req.body.title,
  //     content: req.body.content,
  //     user_id: req.session.user_id,
  //   })
  //     .then((dbPostData) => res.json(dbPostData))
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });

  console.log(req.body);
  console.log(req.files.sampleFile.name);

  let finalImg =req.files.sampleFile.name;
  let upload = "./imgs/" + req.files.sampleFile.name;

  req.files.sampleFile.mv(upload, async function (err) {
    if (err) return res.status(500).send(err);
    try {
      const dbPostData = await Collect.create({
        collectName: "GENERIC TITLE",
        content: req.body.description,
        userId: req.session.user_id.id,
        imageTag: finalImg,
      });

      res.redirect('/feed');
    } catch (err) {
      res.status(400).json(err);
    }
  });
});

module.exports = router;
