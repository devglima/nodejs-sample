import Orders from '../Models/Orders.js';
import { OrderRepository } from '../Repositories/OrderRepository.js';
import auth from '../Utils/auth.js';

export class OrdersController {
   constructor() {}

   static async index(request, response) {
      try {
         const { id: user_id } = await auth(request);
         const orders = await OrderRepository.get({
            user_id,
         });

         return response.json({
            success: true,
            data: orders,
            message: 'Orders retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async show(request, response) {
      try {
         const { id: user_id } = await auth(request);

         const orders = await OrderRepository.get({
            user_id,
            id: parseInt(request.params.id),
         });

         if (orders.length <= 0)
            return response
               .status(404)
               .json({ success: false, message: 'Order not found' });

         return response.json({
            success: true,
            data: orders[0],
            message: 'Orders retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async orderParameters(request, response) {
      try {
         const parameteres = await OrderRepository.getParameters(request.body);

         return response.json({
            success: true,
            data: parameteres,
            message: 'Orders retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async pix(request, response) {
      try {
         const pix = await OrderRepository.getPix(request.body);

         if (!pix.data)
            return response.json({
               success: false,
               message: 'Pix invoice not retrieved',
            });

         return response.json({
            success: true,
            data: pix.data,
            message: 'Orders retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async register(request, response) {
      try {
         const { user_id, cIDCompany, cIDProduct, quantity } = request.body;

         const cart = await Orders.findOne({
            user_id,
            cIDCompany,
            cIDProduct,
         });

         if (cart) {
            cart.quantity += quantity;
            await cart.save();
         } else {
            await Orders.create({
               user_id,
               cIDCompany,
               cIDProduct,
               quantity,
            });
         }

         return response.json({
            success: true,
            message: 'Cart added successfully',
         });
      } catch (error) {
         return response.status(500).json({
            success: false,
            message:
               'Could not possible process your request now. Try again later',
         });
      }
   }
}
