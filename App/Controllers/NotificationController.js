import Notifications from '../Models/Notifications.js';
import NotificationTypes from '../Models/NotificationTypes.js';

export class NotificationsController {
   /**
    * Show all Notifications
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         const notifications = await Notifications.find();

         return response.status(200).send({
            success: true,
            data: notifications,
            message: 'Notifications retrieved successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Notifications not retrieved',
         });
      }
   }

   /**
    * Show single notification
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async show(request, response) {
      try {
         const { id } = request.params;
         const notifications = await Notifications.findById(id);

         if (!notifications)
            return response.status(404).json({
               success: false,
               message: 'Notification not found',
            });

         return response.json({
            success: true,
            data: notifications,
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later',
         });
      }
   }

   /**
    * Create notification
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async create(request, response) {
      try {
         await Notifications.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'Notification created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Can not create Notification. Try again later',
         });
      }
   }

   /**
    * Update Notification
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async update(request, response) {
      try {
         const { id } = request.params;
         const update = await Notifications.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: update,
            message: 'Category update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Categories retrieved successfully',
         });
      }
   }

   /**
    * Delete Notification
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async delete(req, res) {
      try {
         const { id } = req.params;
         await Notifications.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'Notification deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve Notification. Try again later.',
         });
      }
   }

   /**
    * Show notification types
    * @param {*} request
    * @param {*} response
    * @returns
    */
    static async getNotificationTypes(request, response) {
      try {
         const notifications = await NotificationTypes.find();

         return response.status(200).send({
            success: true,
            data: notifications,
            message: 'Notification types retrieved successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Notifications not retrieved',
         });
      } 
   }
}
