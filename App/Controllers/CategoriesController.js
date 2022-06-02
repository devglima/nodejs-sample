import Categories from '../Models/Categories.js';

export class CategoriesController {
   /**
    * Show all categories
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      await Categories.find((err, categories) => {
         if (err) return response.status(404).json({ Error: err.message });
         return response.status(200).json({
            success: true,
            data: categories,
         });
      });
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

         return response.json({
            success: true,
            data: categories,
         });
      } catch (error) {
         return response.status(422).json({
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
         const { name } = request.body;

         const categories = await Categories.findOne({ name });

         if (categories)
            return response.status(200).json({
               success: true,
               message: 'Category name already exists',
            });

         await Categories.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'Category created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: true,
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
         const { name, id } = request.body;
         const categories = await Categories.findOne({ name });

         if (categories && categories._id.toString() !== id)
            return response.status(200).json({
               success: true,
               message: 'Category name already exists',
            });

         await Categories.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'Category created successfully',
         });
      } catch (error) {
         return response.status(200).json({
            error: error.message,
            success: true,
            message: 'Categories retrieved successfully',
         });
      }
   }

   /* static async getFaq_Categories(request, response) {
      await faq_Categories.find((err, faq_categories) => {
         if (err) return response.status(404).json({ Error: error.message });
         return response.status(200).json({
            success: true,
            data: faq_categories,
            message: 'Faq Categories retrieved successfully',
         });
      });
   } */
}
