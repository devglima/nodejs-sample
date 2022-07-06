/* eslint-disable no-unused-vars */
import CustomCardFoods from '../Models/CustomCardFoods.js';
import CustomCards from '../Models/CustomCards.js';
import Products from '../Models/Foods.js';

export class CustomCardRepository {
   static async get($match = null) {
      let customCards = await CustomCards.aggregate().sort({
         createdAt: 'desc',
      });

      customCards = customCards.map(async (customCard) => {
         var customCardFood = await CustomCardFoods.findOne({
            custom_card_id: customCard.id,
         }).select({
            custom_card_id: 1,
            cIDProduct: 1,
         });

         //get product item
         customCard.foods = await Products.find();

         return customCard;
      });

      return await Promise.all(customCards);
   }
}
