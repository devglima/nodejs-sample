import Favorites from '../Models/Favorites.js';
import axios from 'axios';

export class FavoritesRepository {
   static async get($match) {
      return await Favorites.aggregate([
         {
            $match,
         },
         {
            $lookup: {
               from: 'foods',
               localField: 'cProductID',
               foreignField: 'cProductID',
               as: 'food',
            },
         },
         { $unwind: '$food' },
      ])
         .project({
            food_id: 0,
         });
   }
}
