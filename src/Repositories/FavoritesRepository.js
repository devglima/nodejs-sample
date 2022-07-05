import Favorites from '../Models/Favorites.js';
import Foods from '../Models/Foods.js';

export class FavoritesRepository {
   static async get($match) {
      let favorites = await Favorites.aggregate([{ $match }]).sort({
         createdAt: 'desc',
      });

      favorites = favorites.map(async (favorite) => {
         favorite.food = await Foods.find({ cIDProduct: favorite.cIDProduct }).select({
            id: 1,
            name: 1,
            price: 1,
            discountPrice: 1,
            image: 1,
            description: 1,
            ingredients: 1,
            weight: 1,
            featured: 1,
            cIDProduct: 1,
            cIDCompany: 1,
            cImage: 1,
            xIDUnitMeasureType: 1,
         });

         return favorite;
      });

      return await Promise.all(favorites);
   }
}
