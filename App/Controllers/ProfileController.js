import User from '../Models/user.js';
import { Hash } from '../../config/hash.js';
import auth from '../Utils/auth.js';

export class ProfileController {
   constructor() {}

   static async show(request, response) {
      try {
         const { _id: userId } = await auth(request);

         const user = await User.findById(userId);

         user.password = undefined;
         return response.status(200).send({
            success: true,
            data: user,
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }

   static async update(request, response) {
      const { _id: userId } = await auth(request);

      await User.findByIdAndUpdate(userId, { $set: request.body }, (err) => {
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
         const { _id: userId } = await auth(request);
         const { password, newPassword, confirmPassword } = request.body;
         delete request.body.id;

         const user = await User.findById(userId);

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

         await User.findByIdAndUpdate(userId, {
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

   static async setDeviceChosenLanguage(request, response) {
      try {
         const { _id: userId } = await auth(request);
         const { device_chosen_language } = request.body;

         await User.findByIdAndUpdate(userId, {
            $set: { device_chosen_language },
         });

         return response.status(200).json({
            success: true,
            message: 'Device updated successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not update password. Try again later.',
         });
      }
   }
}
