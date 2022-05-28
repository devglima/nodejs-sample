const express = require( "express");
const CartsController = require( "../controllers/cartsController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/carts", verifyJWT, CartsController.getCarts)

module.exports = router;