const notificationsModel = require("../models/notifications.js");
const notificationTypesModel = require("../models/notification_types.js");
class NotificationsController {

    static async getnotifications(req, res) {
        await notificationsModel.find((err, notifications) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": notifications,
                "message": "notifications retrieved successfully"
            });
        });
    }

    static async getnotificationTypes(req, res) {
        await notificationTypesModel.find((err, notification_types) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": notification_types,
                "message": "Notifications types retrieved successfully"
            });
        });
    }
}

module.exports = NotificationsController;