import Foods from '../Models/Foods.js';

export class FoodsController {
   static async index(req, res) {
      try {
         const foods = await Foods.find();

         if (!foods)
            return res.status(404).json({
               success: false,
               message: 'Orders not found',
            });

         return res.status(200).json({
            success: true,
            data: foods,
            message: 'Foods retrieved successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Foods not retrieved. Try again later',
         });
      }
   }

   static async foodsWithOrders(req, res) {
      try {
         var foodWithOrders = await Foods.aggregate([
            {
               $lookup: {
                  from: 'orders',
                  localField: 'order_id',
                  foreignField: 'id',
                  as: 'orders',
               },
            },
         ]);

         return res.status(200).json({
            success: true,
            data: foodWithOrders,
         });
      } catch (error) {
         return res.status(422).json({
            success: false,
            message: 'Foods not retrieved. Try again later',
         });
      }
   }
}
