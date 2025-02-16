const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const passport = require("../controllers/passportController");

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/sign-up", indexController.signUpGet);
indexRouter.get("/login", indexController.loginGet);

indexRouter.post("/sign-up", indexController.signUpPost);
indexRouter.post(
  "/login",
  passport.authenticate("MyLocalStrategy", {
    successRedirect: "/sign-up",
    failureRedirect: "/sign-up",
  })
);

indexRouter.use((req, res, next) => {
  console.log("Route does not exist");
  console.log(JSON.stringify(req.headers));
  res.status(404).send({
    status: 404,
    message: "Route does not exist",
    type: "internal",
  });
});

module.exports = indexRouter;
