import Restaurants from '../Models/Restaurants.js';

export class RestaurantsController {
   static async index(req, res) {
      await Restaurants.find((err, restaurants) => {
         if (err)
            return res.status(404).json({
               success: false,
               message: 'Restaurants not retrieved',
            });
         return res.status(200).json({
            success: true,
            data: restaurants,
            message: 'Restaurants retrieved successfully',
         });
      });
   }
}
