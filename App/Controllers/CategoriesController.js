import Categories from '../Models/Categories.js';

export class CategoriesController {
   /**
    * Show all categories
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         const categories = await Categories.find().sort({
            created_at: 'desc',
         });

         return response.status(200).send({
            success: false,
            data: categories,
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }

   /**
    * Show single categories
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async show(request, response) {
      try {
         const { id } = request.params;
         const categories = await Categories.findById(id);

         if (!categories)
            return response.status(404).json({
               success: false,
               message: 'Category not found',
            });

         return response.json({
            success: true,
            data: categories,
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later',
         });
      }

      /* var categories = await Categories.aggregate([
         { $match: { id: categoryID } },
         {
            $lookup: {
               from: 'foods',
               localField: 'id',
               foreignField: 'category_id',
               as: 'foods',
            },
         },
      ]); */
   }

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async create(request, response) {
      try {
         await Categories.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'Category created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Can not create categories. Try again later',
         });
      }
   }

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async update(request, response) {
      try {
         const { id } = request.params;
         const update = await Categories.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: update,
            message: 'Category update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Categories retrieved successfully',
         });
      }
   }

   static async delete(req, res) {
      try {
         const { id } = req.params;
         await Categories.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve category. Try again later.',
         });
      }
   }
}
