import User from '../Models/user.js';
import { Hash } from '../../config/hash.js';
import useAuth from '../Utils/auth.js';

export class ProfileController {
   constructor() {}

   static async show(request, response) {
      const { id } = useAuth().user();

      const user = await User.findById(id);

      user.password = undefined;
      return response.status(200).send({
         success: true,
         data: user,
      });
   }

   static async update(request, response) {
      const { id } = request.body;
      delete request.body.id;

      await User.findByIdAndUpdate(id, { $set: request.body }, (err) => {
         if (!err) {
            return response.status(200).json({
               success: true,
               message: 'User updated successfully',
            });
         } else {
            return response.send({
               error: err.message,
               success: false,
               message: 'Could not update password. Try again later.',
            });
         }
      });
   }

   static async updatePassword(request, response) {
      try {
         const { id, password, newPassword, confirmPassword } = request.body;
         delete request.body.id;

         const user = await User.findById(id);

         if (!(await Hash.compare(password, user.password)))
            return response.status(422).json({
               success: false,
               message: 'Invalid password',
            });

         if (newPassword !== confirmPassword)
            return response.status(422).json({
               success: false,
               message: 'Password does not match',
            });

         await User.findByIdAndUpdate(id, {
            $set: { password: await Hash.make(newPassword) },
         });

         return response.status(200).json({
            success: true,
            message: 'User updated successfully',
         });
      } catch (error) {
         return response.status(422).send({
            error: error.message,
            success: false,
            message: 'Could not update password. Try again later.',
         });
      }
   }
}
