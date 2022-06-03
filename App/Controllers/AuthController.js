'use strict';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';
import { Hash } from '../../config/hash.js';

export class AuthController {
   constructor() {}

   static async login(request, response) {
      try {
         const { email, password } = request.body;

         const user = await User.findOne({ email });

         if (!user)
            return response.status(422).json({
               success: false,
               message: 'User not found',
            });

         if (!(await Hash.compare(password, user.password)))
            return response.status(422).json({
               success: false,
               message: 'Invalid password',
            });

         const token = jwt.sign({ id: user._id }, process.env.SECRET, {
            expiresIn: 3600,
         });

         user.password = undefined;
         return response.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            token: token,
            data: user,
         });
      } catch (error) {
         return response.status(500).json({
            success: false,
            message: error.message,
         });
      }
   }

   static async register(request, response) {
      try {
         const { email } = request.body;
         const user = await User.findOne({ email });

         if (user)
            return response.status(422).json({
               success: false,
               message: 'User alread exist',
            });

         request.body.password = await Hash.make(request.body.password);
         const register = await User.create(request.body);

         const token = jwt.sign({ id: register.id }, process.env.SECRET, {
            expiresIn: 7200,
         });

         return response.status(422).json({
            success: true,
            token: token,
            data: register,
            message: 'User was registed successfully',
         });
      } catch (error) {
         return response.status(422).json({
            success: false,
            message: error.message,
         });
      }
   }

   static async setDeviceChosenLanguage(request, response) {
      const { id, device_chosen_language } = request.body;

      await User.findByIdUpdate(id, { $set: device_chosen_language }, (err) => {
         if (!err) {
            return response.status(200).json({
               success: true,
               message: 'User device chosen language set successfully',
            });
         } else {
            return response.status(500).send({ message: err.message });
         }
      });
   }

   static async logout(request, response) {
      let header = request.headers['authorization'];
      header = header ? header.split(' ') : []; // ['Bearer', 'token']

      if (header.length <= 0)
         return response
            .status(401)
            .json({ success: false, message: 'No token provided.' });

      if (header[0].toLowerCase() !== 'bearer')
         return response
            .status(500)
            .json({ auth: false, message: 'Invalid token' });

      //const token = header[1]; //Get token string

      return response.status(200).json({
         success: true,
         message: 'User logout successfully',
      });
   }
}
