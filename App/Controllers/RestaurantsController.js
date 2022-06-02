import { find } from '../Models/Restaurants.js';

class RestaurantsController {
   static async getRestaurants(req, res) {
      await find((err, restaurants) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: restaurants,
            message: 'Restaurants retrieved successfully',
         });
      });
   }
}

export default RestaurantsController;
