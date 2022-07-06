import { CustomCardRepository } from '../Repositories/CustomCardRepository.js';
import auth from '../Utils/auth.js';

export class CustomCardController {
   constructor() {}

   static async index(request, response) {
      try {
         const { _id: user_id } = await auth(request);
         const CustomCards = await CustomCardRepository.get({ user_id });

         return response.json({
            success: true,
            data: CustomCards,
            message: 'Custom cards retrieved successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request now. Try again later',
         });
      }
   }
}
