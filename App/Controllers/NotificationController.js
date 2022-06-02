import { find } from '../Models/Notification.js';
import { find as _find } from '../Models/NotificationTypes.js';

class NotificationsController {
   static async getNotifications(req, res) {
      await find((err, notifications) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: notifications,
            message: 'Notifications retrieved successfully',
         });
      });
   }

   static async getNotificationTypes(req, res) {
      await _find((err, notification_types) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: notification_types,
            message: 'Notifications types retrieved successfully',
         });
      });
   }
}

export default NotificationsController;
