import Favorites from '../Models/Favorites.js';

export class FavoritesController {
   static async index(req, res) {
      try {
         const favorites = await Favorites.find();

         if (!favorites)
            return res.status(404).json({
               success: false,
               message: 'Orders not found',
            });

         return res.status(200).json({
            success: true,
            data: favorites,
            message: 'Favorites retrieved successfully',
         });
      } catch (error) {
         return res.status(500).json({
            error: error.message,
            success: false,
            message: 'Favorites not retrieved',
         });
      }
   }
}
