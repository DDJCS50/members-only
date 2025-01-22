const { body, validationResult, query } = require("express-validator");
const db = require("../db/queries");
// const CustomNotFoundError = require("../errors/CustomNotFoundError");
// const asyncHandler = require("express-async-handler");

exports.indexPageGet = async (req, res, next) => {
  try {
    res.send("The index page");
  } catch (err) {
    next(err);
  }
};

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });
