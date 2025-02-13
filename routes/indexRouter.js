const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/sign-up", indexController.signUpGet);

indexRouter.post("/sign-up", indexController.signUpPost);

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
