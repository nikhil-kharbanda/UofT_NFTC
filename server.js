const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const expbs = require("express-handlebars");


const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));

app.engine("handlebars", expbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//TODO: put this in route handler
app.get("/profile", (req, res) => {
  res.render("profile", {
    title: "profile",
    style: "feed.css",
    exStyle: "https://unicons.iconscout.com/release/v2.1.6/css/unicons.css",
    script: "index.js"
  });
});
// app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
