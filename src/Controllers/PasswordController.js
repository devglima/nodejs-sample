import User from '../Models/user.js';
import { Hash } from '../config/hash.js';
import { VerificationCodeController as VerificationCode } from '../Controllers/VerificationCodeController.js';

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

         return response.status(200).send({
            success: true,
            data: await VerificationCode.generate({
               userId: user._id,
               type: 'reset password',
            }),
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
         const { password, confirmPassword } = request.body;
         const { token: verificationCodeToken } = request.params;

         const verifiedCode = await VerificationCode.verified(
            {
               token: verificationCodeToken,
            },
            'token'
         );

         if (!verifiedCode.success)
            return response.status(422).json(verifiedCode);

         if (password != confirmPassword)
            return response.status(422).send({
               success: false,
               message: 'Passwords do not match',
            });

         //Update password
         await User.findByIdAndUpdate(verifiedCode.user._id, {
            password: await Hash.make(password),
         });

         return response.status(200).send({
            success: true,
            message: 'Your password  was updated successfully',
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
