import User from '../Models/user.js';
import { Hash } from '../config/hash.js';
import auth from '../Utils/auth.js';
import verificationCode from '../Utils/verificationCode.js';

export class PasswordController {
   constructor() {}

   static async forgot(request, response) {
      try {
         const { email } = request.body;
         const user = await User.findOne({ email }, 'id email');

         if (!user)
            return response.status(404).send({
               success: false,
               message: 'User not found',
            });

         const res = await verificationCode.generate({
            userId: user.id,
            type: 'reset password',
         });

         return response.status(200).send({
            success: true,
            data: res,
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }

   static async reset(request, response) {
      try {
         return response.status(200).send({
            success: true,
            data: res,
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }
}
