const express = require( "express");
const NotificationController = require( "../controllers/notificationController.js");
const verifyJWT = require("../utils/verifyJWT.js");

const router = express.Router();

router
  .get("/notifications", verifyJWT, NotificationController.getNotifications)
  .get("/notification_types", verifyJWT, NotificationController.getNotificationTypes)

module.exports = router;