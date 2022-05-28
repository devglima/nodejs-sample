const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
    
});

const Notifications = mongoose.model("notifications", NotificationsSchema);

module.exports = Notifications;