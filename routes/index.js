const router = require("express").Router();
const userRoute = require('./userRoute')


module.exports = function () {
  router.use("/users", userRoute());

  return router;
};
