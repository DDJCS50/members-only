const { body, validationResult, query } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const alphaErr = "must only contain letters.";
const passErr = "must be at least 8 characters long, contain at least one of each: lowercase letter, uppercase letter, number, symbol";

const validateFirstNameInput = [body("firstName").trim().isAlpha("en-US", { ignore: " " }).withMessage(`First name ${alphaErr}`)];
const validateLastNameInput = [body("lastName").trim().isAlpha("en-US", { ignore: " " }).withMessage(`Last name ${alphaErr}`)];
const validatePassword = [body("password").trim().isStrongPassword().withMessage(`Password ${passErr}`)];

exports.indexPageGet = (req, res, next) => {
  try {
    res.render("indexPage");
  } catch (err) {
    return next(err);
  }
};

exports.signUpGet = (req, res, next) => {
  try {
    res.render("signUp");
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.loginGet = (req, res, next) => {
  try {
    res.render("login");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect("/");
  });
};

exports.membershipGet = (req, res, next) => {
  try {
    res.render("membership");
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.membershipPost = async (req, res, next) => {
  const selectedUser = req.user;
  const { membershipSecret } = req.body;
  const secretCode = "odin";

  if (membershipSecret == secretCode) {
    await db.updateUserById(selectedUser.id);
  }
  console.log(selectedUser);

  try {
    res.render("membership");
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

exports.signUpPost = [
  validateFirstNameInput,
  validateLastNameInput,
  validatePassword,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("signUp", {
        errors: errors.array(),
      });
    }

    const { firstName, lastName, username, password, adminStatus, passwordConfirm } = req.body;

    const usernameSelected = await db.getUserByUsername(username);
    const usernameError = [{ msg: "Username already exists" }];
    const passwordError = [{ msg: "Passwords do not match" }];

    if (usernameSelected.length > 0) {
      return res.status(400).render("signUp", {
        errors: usernameError,
      });
    }

    if (passwordConfirm != password) {
      return res.status(400).render("signUp", {
        errors: passwordError,
      });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.insertUser(firstName, lastName, username, hashedPassword, adminStatus);

      res.redirect("/");
    } catch (err) {
      console.error("Error creating user:", err);
      return next(err);
    }
  },
];
