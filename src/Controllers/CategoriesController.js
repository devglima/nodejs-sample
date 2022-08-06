import Categories from '../Models/Categories.js';
import { CategoryRepository } from '../Repositories/CategoryRepository.js';

export class CategoriesController {
   /**
    * Show all categories
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         const categories = await CategoryRepository.get(request);

         return response.status(200).send({
            success: true,
            //...CategoryRepository.filters(request),
            ...categories,
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
   }

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async create(request, response) {
      try {
         const category = await Categories.create(request.body);

         return response.status(200).json({
            success: true,
            data: category,
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
         await Categories.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: await Categories.findById(id),
            message: 'Category update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Could not possible update category. Try again later',
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
