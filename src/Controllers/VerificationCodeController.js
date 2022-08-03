/* eslint-disable no-unused-vars */
import { VerificationCodeRepository } from '../Repositories/VerificationCodeRepository.js';

export class VerificationCodeController {
   static async validate(request, response) {
      try {
         const { type, value, status } = request.body;

         if (!type || !value)
            return response.status(422).send({
               success: false,
               message: 'The type and value are required',
            });

         //Set where condition for verification code
         //if data parameter is not provided
         var whereCondition = {};
         whereCondition[type] = value;

         const verifiedCode = await VerificationCodeRepository.verify(
            whereCondition,
            type
         );

         if (!verifiedCode.success)
            return response.status(422).send({
               success: false,
               message: verifiedCode.message,
            });

         if (status != undefined && status === true) {
            //Update verification code status
            await VerificationCodeRepository.update(whereCondition, {
               status,
            });

            verifiedCode.status = status;
         }

         return response.status(200).send(verifiedCode);
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }
}
