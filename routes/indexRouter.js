const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const passport = require("../controllers/passportController");

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.get("/login", indexController.loginGet);
indexRouter.get("/logout", indexController.logoutGet);
indexRouter.get("/membership", indexController.membershipGet);
indexRouter.get("/message-create", indexController.messageCreateGet);

indexRouter.post("/message-create", indexController.messageCreatePost);
indexRouter.post("/membership", indexController.membershipPost);
indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.post(
  "/login",
  passport.authenticate("MyLocalStrategy", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

indexRouter.use((req, res, next) => {
  console.log("Route does not exist");
  res.status(404).send({
    status: 404,
    message: "Route does not exist",
    type: "internal",
  });
});

module.exports = indexRouter;
