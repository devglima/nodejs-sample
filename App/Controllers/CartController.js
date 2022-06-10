'use strict';

import Carts from '../Models/Carts.js';
import UserCustomer from '../Models/UserCustomer.js';
import { CartRepository } from '../Repositories/CartRepository.js';
import auth from '../Utils/auth.js';

export class CartController {
   constructor() {}

   static async index(request, response) {
      try {
         const { id: user_id } = await auth(request);
         let carts = await CartRepository.get({
            user_id,
         });

         return response.json({
            success: true,
            data: await Promise.all(carts),
            message: 'Carts retrieved successfully',
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
         const carts = await CartRepository.get({
            user_id,
            id: parseInt(request.params.id),
         });

         if (carts.length <= 0)
            return response.status(404).json({
               success: false,
               message: 'Cart not found',
            });

         return response.json({
            success: true,
            data: carts[0],
            message: 'Carts retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async count(request, response) {
      try {
         const count = await Carts.countDocuments();
         return response.json({
            success: true,
            total: count,
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }

   static async add(request, response) {
      try {
         const { user_id, cIDCompany, cIDProduct, quantity } = request.body;

         const cart = await Carts.findOne({
            user_id,
            cIDCompany,
            cIDProduct,
         });

         if (cart) {
            let qtd = quantity <= 0 ? 1 : quantity;
            cart.quantity += qtd;
            await cart.save();
         } else {
            await Carts.create({
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

   static async paymentConditionPrice(request, response) {
      try {
         //const { id_user, cIDPaymentCondition, items } = request.body;

         const userCustomer = await UserCustomer.find();

         return response.json({
            success: true,
            data: false,
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not possible process your request. Try again later',
         });
      }
   }

   static async delete(request, response) {
      try {
         const { id } = request.params;

         await Carts.findByIdAndDelete(id);

         return response.json({
            success: true,
            message: 'Cart deleted successfully.',
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
