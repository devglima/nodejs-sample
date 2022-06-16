import OrdersStatuses from '../Models/OrdersStatuses.js';

export class OrderStatusesController {
   /**
    * Show all OrdersStatuses
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         const ordersStatuses = await OrdersStatuses.find();

         return response.status(200).send({
            success: true,
            data: ordersStatuses,
            message: 'OrdersStatuses retrieved successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'OrdersStatuses not retrieved',
         });
      }
   }

   /**
    * Show single order statuses
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async show(request, response) {
      try {
         const { id } = request.params;
         const ordersStatuses = await OrdersStatuses.findById(id);

         if (!ordersStatuses)
            return response.status(404).json({
               success: false,
               message: 'order statuses not found',
            });

         return response.json({
            success: true,
            data: ordersStatuses,
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
    * Create order statuses
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async create(request, response) {
      try {
         await OrdersStatuses.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'order statuses created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Can not create order statuses. Try again later',
         });
      }
   }

   /**
    * Update order statuses
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async update(request, response) {
      try {
         const { id } = request.params;
         const update = await OrdersStatuses.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: update,
            message: 'order statuses update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'OrdersStatuses retrieved successfully',
         });
      }
   }

   /**
    * Delete order statuses
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async delete(req, res) {
      try {
         const { id } = req.params;
         await OrdersStatuses.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'order statuses deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve order statuses. Try again later.',
         });
      }
   }
}
