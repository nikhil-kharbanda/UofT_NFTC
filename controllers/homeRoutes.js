const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
  

    res.render('feed', {
      title: "feed",
          style: "feed.css",
          exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
          script: "index.js",
     
          logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('index', {
        title: "Sign in",
        style: "style.css",
        //login.js
        script: "login.js"
      });
});

router.get("/signup", (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render("signup", {
    title: "Sign up",
    style: "style.css",
    //signup.js
  });
});

module.exports = router;
