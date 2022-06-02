import Categories from '../Models/categories.js';

export class CategoriesController {
   /**
    * Show all categories
    * @param {*} request
    * @param {*} response
    */

   static async index(request, response) {
      await Categories.find((err, categories) => {
         if (err) return response.status(404).json({ Error: err.message });
         return response.status(200).json({
            success: true,
            data: categories,
            message: 'Categories retrieved successfully',
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
