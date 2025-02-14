const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    // TODO CREATE CORRECT QUERY
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    // TODO USE BCRYPT
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

const serializeUser = passport.serializeUser((user, done) => {
  done(null, user.id);
});

const deserializeUser = passport.deserializeUser(async (id, done) => {
  try {
    // TODO USE CORRECT QUERY
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  localStrategy,
  serializeUser,
  deserializeUser,
};
