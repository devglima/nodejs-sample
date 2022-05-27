const express = require( "express");
const CategoriesController = require( "../controllers/categoriesController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/categories", verifyJWT, CategoriesController.getCategories)
  .get("/faq_categories", verifyJWT, CategoriesController.getFaq_Categories)
  .get("/foods", verifyJWT, CategoriesController.getFoods)
  .get("/categories/:id", verifyJWT, CategoriesController.getCategoriesByID)

module.exports = router;