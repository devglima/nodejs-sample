const notificationsModel = require("../models/notification.js");
const notificationTypesModel = require("../models/notification_types.js");
class NotificationsController {

    static async getNotifications(req, res) {
        await notificationsModel.find((err, notifications) => {
            if (err) return res.status(404).json({ "Error": error.message });
            return res.status(200).json({
                "success": true,
                "data": notifications,
                "message": "notifications retrieved successfully"
            });
        });
    }

    static async getNotificationTypes(req, res) {
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