const router = require("express").Router();
const { Collect, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const newCollect = await Collect.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    res.render("feed", {
      newCollect,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
