import User from '../Models/user.js';
import { Hash } from '../config/hash.js';

export class UserController {
   constructor() {}

   static async index(request, response) {
      try {
         const users = await User.find().select(['-password']);

         return response.status(200).send({
            success: true,
            data: users,
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }

   static async show(request, response) {
      try {
         const { id } = request.params;
         const user = await User.findById(id).select('-password');

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

   static async register(request, response) {
      try {
         request.body.password = await Hash.make(request.body.password);
         const register = await User.insert({ $set: request.body });

         delete register.password;
         return response.status(200).json({
            success: true,
            message: 'User registed successfully',
         });
      } catch (error) {
         return response.send({
            error: error.message,
            success: false,
            message: 'Could not register. Try again later.',
         });
      }
   }

   static async update(request, response) {
      try {
         const { id } = request.params;
         await User.findByIdAndUpdate(id, { $set: request.body });

         return response.status(200).json({
            success: true,
            message: 'User updated successfully',
         });
      } catch (error) {
         return response.send({
            error: error.message,
            success: false,
            message: 'Could not update. Try again later.',
         });
      }
   }

   static async delete(req, res) {
      try {
         const { id } = req.params;
         await User.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faq. Try again later.',
         });
      }
   }
}
