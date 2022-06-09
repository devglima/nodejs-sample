'use strict';

import Carts from '../Models/Carts.js';
import UserCustomer from '../Models/UserCustomer.js';
import Products from '../Models/Foods.js';

export class CartController {
   constructor() {}

   static async index(request, response) {
      try {
         let carts = await Carts.aggregate([
            {
               $lookup: {
                  from: 'users',
                  localField: 'user_id',
                  foreignField: 'id',
                  as: 'user',
                  pipeline: [
                     {
                        $project: { name: 1, email: 1 },
                     },
                  ],
               },
            },
         ])
            .sort({ created_at: 'desc' })
            .project({
               food_id: 0,
               delivery_address_id: 0,
            });
         //Get products by cIdPRoduct and cIDCompany
         carts = carts.map(async (cart) => {
            var product = await Products.findOne({
               cIDCompany: cart.cIDCompany,
               cIDProduct: cart.cIDProduct,
            }).select({ cIDProduct: 0, cIDCompany: 0 });

            cart.product = product;
            return cart;
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

   static async add(request, response) {
      try {
         const { user_id, cIDCompany, cIDProduct, quantity } = request.body;

         const cart = await Carts.findOne({
            user_id,
            cIDCompany,
            cIDProduct,
         });

         if (cart) {
            cart.quantity += quantity;
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
