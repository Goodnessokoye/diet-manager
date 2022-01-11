const router = require("express").Router();
const userController = require("../controller/userController");
const config = require("../config");
const { authenticate, authorize } = require("../middleware/auth");

module.exports = () => {
  const userCtl = new userController();
  router.post("/", userCtl.registerUser);

  router.post("/login", userCtl.loginUser);

  return router;
};
