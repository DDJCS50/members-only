require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const { mountRoutes } = require("./routes/index");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
const passport = require("passport");
const session = require("express-session");

app.use(session({ secret: "odin", resave: false, saveUninitialized: false }));
app.use(passport.session());

mountRoutes(app);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
