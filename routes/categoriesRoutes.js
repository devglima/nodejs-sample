const express = require( "express");
const CategoriesController = require( "../controllers/categoriesController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/categories", verifyJWT, CategoriesController.getCategories)
  .get("/foods", verifyJWT, CategoriesController.getFoods)
  .get("/categories/:id", verifyJWT, CategoriesController.getCategoriesByID)

module.exports = router;