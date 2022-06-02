import { find } from '../Models/Orders.js';
import { find as _find } from '../Models/OrdersStatuses.js';

class OrdersController {
   static async getOrders(req, res) {
      await find((err, orders) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: orders,
            message: 'Orders retrieved successfully',
         });
      });
   }

   static async getOrdersStatuses(req, res) {
      await _find((err, orders_statuses) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: orders_statuses,
            message: 'Order Statuses retrieved successfully',
         });
      });
   }
}

export default OrdersController;
