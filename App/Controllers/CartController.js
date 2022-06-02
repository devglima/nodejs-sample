'use strict';

import Carts from '../Models/Carts.js';

export class CartController {
   constructor() {}

   static async index(request, response) {
      try {
         const carts = await Carts.find();

         return response.status({
            success: true,
            data: carts,
            message: 'Carts retrieved successfully',
         });
      } catch (error) {
         return response.status(422).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }
}
