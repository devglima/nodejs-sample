const mongoose = require("mongoose");

const NotificationTypesSchema = new mongoose.Schema({
    
});

const NotificationTypes = mongoose.model("notification_types", NotificationTypesSchema);

module.exports = NotificationTypes;