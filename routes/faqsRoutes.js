const express = require( "express");
const FaqsController = require( "../controllers/faqsController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/faqs", verifyJWT, FaqsController.getFaqs)

module.exports = router;