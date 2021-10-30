const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Collect, User, Comment } = require('../models');

router.get("/feed", withAuth, async (req, res) => {
  try {
    res.render("feed", {
      title: "feed",
      style: "feed.css",
      exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
      scripts: [{ script: "index.js" }, { script: "logout.js" }],
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const newCollect = await Collect.findAll({
//       // include:[
//       //    {
//       //      model: Comment, 
//       //     //  attributes: ['comment', 'dateCreated','userId','CollectId'],
//       //       required: false
//       //     },
//       //   ],
//         include: [
//           {
//             model: Comment,
//             // attributes: ['userName'],
//             required: false
//         }
//         ]
//     });
//     const collects = newCollect.map(collect => collect.get({ plain: true }));
//     res.render('feed', {
//       collects,
//        title: "feed",
//        style: "feed.css",
//        exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
//        scripts: [{ script: "index.js" }, { script: 'logout.js' }],
//       // logged_in: req.session.logged_in
//     });
//     console.log(collects);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

router.get('/feed', async (req, res) => {
  try {
    const collects = await Collect.findAll({
    
        include: [
          {
            model: User,
            attributes: ['userName'],
            required: true
        }, {
          model: Comment,
          attributes: ['content'],
           required: false
         },
        ],
        nest:true,
        raw:true
    });
    console.log(collects)
    // const collects = newCollect.map(collect => collect.get({ plain: true }));

    res.render('feed', {
      collects,
       title: "feed",
       style: "feed.css",
       exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
       scripts: [{ script: "index.js" }, { script: 'logout.js' }],
      // logged_in: req.session.logged_in
    });
    // console.log(collects);
  } catch (err) {
    res.status(500).json(err);
  }
})

 router.get("/", (req, res) => {
   res.redirect("/feed");
 });

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/feed");
    return;
  }

  res.render("index", {
    title: "Sign in",
    style: "style.css",
    scripts: [{ script: "login.js" }],
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    title: "Sign up",
    style: "style.css",
    scripts: [{ script: "signup.js" }],
  });
});

module.exports = router;
