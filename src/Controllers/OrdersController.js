import Orders from '../Models/Orders.js';
import { OrderRepository } from '../Repositories/OrderRepository.js';
import { PaymentRepository } from '../Repositories/PaymentRepository.js';
import auth from '../Utils/auth.js';

export class OrdersController {
   constructor() {}

   static async store(request, response) {
      try {
         const { id: userId } = await auth(request);
         //const { method } = request.body;

         /* if (method === 'Credit Card (Stripe Gateway)') return;
         else if (method === 'Credit Card (Iugu Gateway)') return;
         else */

         request.body.user_id = userId; //Setting user id to req body
         const order = await OrderRepository.create(request);

         if (order.id) await PaymentRepository.paymentCash(request);

         return response.status(200).json({
            success: true,
            data: order,
            message: 'Order registered successfullydd',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message:
               'Could not possible process your request now. Try again later',
         });
      }
   }

   static async index(request, response) {
      try {
         const { id: user_id } = await auth(request);
         const orders = await OrderRepository.get({ user_id });

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

         const orders = await Orders.find();

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
}
