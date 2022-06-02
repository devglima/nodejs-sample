import { find } from '../Models/Favorites.js';

class FavoritesController {
   static async getFavorites(req, res) {
      await find((err, favorites) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: favorites,
            message: 'Favorites retrieved successfully',
         });
      });
   }
}

export default FavoritesController;
