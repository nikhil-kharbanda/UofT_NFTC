const router = require("express").Router();
const withAuth = require("../utils/auth");
const { Collect, User, Comment } = require("../models");
const { sequelize } = require("../models/User");


router.get('/feed', withAuth,  async (req, res) => {  

  try {
    const collectsData = await Collect.findAll({
      include: [
       
 
       {
          model: User,
          attributes: ['userName', 'id'] ,
          required: true    
         },
         { model: Comment, 
          attributes: ['content','collectId', 'userId', 'id'],
          required: false,
          include:[
            {model:User,
            attributes:['userName'],
          required:false}      
        ]
      },
        ],
    });


    const collects= collectsData.map(collect=>collect.get({plain:true}))
console.log(collects)
console.log(collects[0].comments)

    res.render('feed', {
      collects,
       title: "feed",
       style: "feed.css",
       exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
       scripts: [{ script: "index.js" }, { script: 'logout.js' }],
       user_id: req.session.user_id
    })



  } catch (err) {
    console.log('is this here?')
    res.status(400).json(err);
  }
});
    
router.get("/", (req, res) => {
  res.redirect("/feed");
});

router.get("/login", (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect("/feed");
  //   return;
  // }

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
