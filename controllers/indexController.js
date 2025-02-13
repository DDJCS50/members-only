const { body, validationResult, query } = require("express-validator");
const db = require("../db/queries");
// const CustomNotFoundError = require("../errors/CustomNotFoundError");
// const asyncHandler = require("express-async-handler");

const alphaErr = "must only contain letters.";
const passErr = "must be at least 8 characters long, contain at least one of each: lowercase letter, uppercase letter, number, symbol";

const validateFirstNameInput = [body("firstName").trim().isAlpha("en-US", { ignore: " " }).withMessage(`First name ${alphaErr}`)];
const validateLastNameInput = [body("lastName").trim().isAlpha("en-US", { ignore: " " }).withMessage(`Last name ${alphaErr}`)];
const validatePassword = [body("password").trim().isStrongPassword().withMessage(`Password ${passErr}`)];

exports.indexPageGet = async (req, res, next) => {
  try {
    res.send("The index page");
  } catch (err) {
    return next(err);
  }
};

exports.signUpGet = async (req, res, next) => {
  try {
    res.render("signUp");
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

    const { firstName, lastName, username, password, adminStatus } = req.body;

    // TODO check the db to see if the db already has that username
    // CONST USERNAMESELECTED = db.GETUSERNAMEBYNAME(USERNAME)
    const usernameSelected = [1];
    const usernameError = [{ msg: "Username already exists" }];

    if (usernameSelected.length > 0) {
      return res.status(400).render("signUp", {
        errors: usernameError,
      });
    }

    try {
      res.send("successfully created");
      // TODO db.INSERTUSER;
      // res.redirect("/");
    } catch (err) {
      console.error("Error creating user:", err);
      return next(err);
    }
  },
];

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });
