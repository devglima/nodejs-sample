const express = require( "express");
const OrdersController = require( "../controllers/ordersController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/orders", verifyJWT, OrdersController.getOrders)
  .get("/order_statuses", verifyJWT, OrdersController.getOrdersStatuses)

module.exports = router;