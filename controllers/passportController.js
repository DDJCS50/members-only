const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/queries");

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    let user = await db.getUserByUsername(username);
    user = user[0];
    console.log(user);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // passwords do not match!
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.use("MyLocalStrategy", localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await db.getUserById(id);
    user = user[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
