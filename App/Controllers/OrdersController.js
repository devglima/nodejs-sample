import Orders from '../Models/Orders.js';
export class OrdersController {
   static async index(req, res) {
      try {
         const orders = await Orders.find();

         if (!orders)
            return res.status(404).json({
               success: false,
               message: 'Orders not found',
            });

         return res.status(200).json({
            success: true,
            data: orders,
            message: 'Orders retrieved successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }

   /* static async getOrdersStatuses(req, res) {
      await _find((err, orders_statuses) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: orders_statuses,
            message: 'Order Statuses retrieved successfully',
         });
      });
   } */
}
