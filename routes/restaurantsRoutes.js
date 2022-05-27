const express = require( "express");
const RestaurantsController = require("../controllers/restaurantsController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/restaurants", verifyJWT, RestaurantsController.getRestaurants)

module.exports = router;