const express = require( "express");
const FavoritesController = require( "../controllers/favoritesController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/favorites", verifyJWT, FavoritesController.getFavorites)

module.exports = router;