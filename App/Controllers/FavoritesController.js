import Favorites from '../Models/Favorites.js';

export class FavoritesController {
   static async index(req, res) {
      try {
         const favorites = await Favorites.find();
         return res.status(500).json({
            success: true,
            data: favorites,
            message: 'Favorites retrieved successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Favorites not retrieved',
         });
      }
   }
}
