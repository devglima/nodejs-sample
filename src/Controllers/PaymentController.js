import Payment from '../Models/Payments.js';
import { PaymentRepository } from '../Repositories/PaymentRepository.js';
import auth from '../Utils/auth.js';

export class PaymentController {
   constructor() {}

   static async index(request, response) {
      try {
         const { _id: user_id } = await auth(request);
         const payments = await PaymentRepository.get({
            user_id,
         });

         return response.json({
            success: true,
            data: payments,
            message: 'Payment retrieved successfully',
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

         const orders = await PaymentRepository.get({
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

   static async pix(request, response) {
      try {
         const pix = await PaymentRepository.getPix(request.body);

         return response.json({
            success: true,
            data: pix,
            message: 'Payment retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async add(request, response) {
      try {
         const { user_id, cIDCompany, cIDProduct, quantity } = request.body;

         const cart = await Payment.findOne({
            user_id,
            cIDCompany,
            cIDProduct,
         });

         if (cart) {
            cart.quantity += quantity;
            await cart.save();
         } else {
            await Payment.create({
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
