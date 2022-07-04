import Favorites from '../Models/Favorites.js';
import auth from '../Utils/auth.js';

export class FavoritesController {
   /**
    * Show all favorites
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         const { id: user_id } = await auth(request);
         const favorites = await Favorites.find();

         return response.status(200).send({
            success: true,
            data: favorites,
            message: 'Favorites retrieved successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Favorites not retrieved',
         });
      }
   }

   /**
    * Show single favorite
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async show(request, response) {
      try {
         const { id } = request.params;
         const favorites = await Favorites.findById(id);

         if (!favorites)
            return response.status(404).json({
               success: false,
               message: 'Favorite not found',
            });

         return response.json({
            success: true,
            data: favorites,
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later',
         });
      }
   }

   /**
    * Create favorite
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async create(request, response) {
      try {
         await Favorites.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'Favorite created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Can not create favorite. Try again later',
         });
      }
   }

   /**
    * Update favorite
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async update(request, response) {
      try {
         const { id } = request.params;
         const update = await Favorites.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: update,
            message: 'Favorite update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Favorites retrieved successfully',
         });
      }
   }

   /**
    * Delete favorite
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async delete(req, res) {
      try {
         const { id } = req.params;
         await Favorites.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'Favorite deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve favorite. Try again later.',
         });
      }
   }
}
