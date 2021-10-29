const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/feed", withAuth, async (req, res) => {
  try {
    res.render("feed", {
      title: "feed",
      style: "feed.css",
      exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
      scripts: [{script:"index.js"},{script:'logout.js'}],

      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/',(req,res)=>{
  res.redirect('/feed')
})

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/feed");
    return;
  }

  res.render("index", {
    title: "Sign in",
    style: "style.css",
    scripts:[ {script:"login.js"}],
  });
});

router.get("/signup", (req, res) => {
  
  res.render("signup", {
    title: "Sign up",
    style: "style.css",
    scripts:[ {script:"signup.js"}]
  });
});

module.exports = router;
