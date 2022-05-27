const express = require( "express");
const LoginController = require( "../controllers/loginController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .post("/login", LoginController.login)
  .post("/register", LoginController.register)
  .post("/users/setDeviceChosenLanguage", verifyJWT, LoginController.setDeviceChosenLanguage)
  .post("/logout", LoginController.logout)

module.exports = router;