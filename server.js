const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const expbs = require("express-handlebars");
const mysql = require('mysql2')
const fileUpload = require('express-fileupload')
const helpers = require('./utils/helpers');
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = expbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", 'handlebars');

app.use(fileUpload())


const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('imgs'))


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(routes);

//TODO: put this in route handler
// app.get("/profile", (req, res) => {
//   res.render("profile", {
//     title: "profile",
//     style: "feed.css",
//     exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
//     script: "index.js"
//   });
// });



// app.get('/', (req, res) => {
//   console.log('hi there')
//   connection.query('SELECT * FROM user WHERE id = 1', (err, rows) => {
//       console.log(rows)
//       if (err) {
//           console.log(err)
         
//       }
//       res.render('/', { rows });
//   });
// });


// app.post('/', (req, res) => {
//   let sampleFile;
//   let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send('No files were uploaded.');
//   }

//   // name of the input is sampleFile
//   sampleFile = req.files.sampleFile;
//   uploadPath = __dirname + '/upload/' + sampleFile.name;

//   console.log(sampleFile);

//   // Use mv() to place file on the server
//   sampleFile.mv(uploadPath, function (err) {
//       if (err) return res.status(500).send(err);

//       connection.query('UPDATE user SET image_tag = ? WHERE id =1', [sampleFile.name], (err, rows) => {
//           if (!err) {
//               res.redirect('/');
//           } else {
//               console.log(err);
//           }
//       });
//   });
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
