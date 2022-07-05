import Favorites from '../Models/Favorites.js';
import Foods from '../Models/Foods.js';

export class FavoritesRepository {
   static async get($match) {
      let favorites = await Favorites.aggregate([{ $match }]).sort({
         createdAt: 'desc',
      });

      favorites = favorites.map(async (favorite) => {
         order.food = await Foods.findById(favorite.cIDProduct).select({
            id: 1,
            name: 1,
            price: 1,
         });

         return favorite;
      });

      return await Promise.all(favorites);
   }
}
