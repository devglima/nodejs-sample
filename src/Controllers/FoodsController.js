import Foods from '../Models/Foods.js';

export class FoodsController {
   /**
    * Show all foods
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         const foods = await Foods.find().sort({ createdAt: 'desc' });

         return response.status(200).send({
            success: false,
            data: foods,
            message: 'Foods retrieved successfully',
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
    * Show single foods
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async show(request, response) {
      try {
         const { id } = request.params;
         const foods = await Foods.findById(id);

         if (!foods)
            return response.status(404).json({
               success: false,
               message: 'Product not found',
            });

         return response.json({
            success: true,
            data: foods,
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
         const products = await Foods.create(request.body);

         return response.status(200).json({
            success: true,
            data: products,
            message: 'Product created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Can not create product. Try again later',
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
         await Foods.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: await Foods.findById(id),
            message: 'Product update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
         });
      }
   }

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async delete(req, res) {
      try {
         const { id } = req.params;
         await Foods.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not delete food. Try again later.',
         });
      }
   }

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async foodsWithOrders(req, res) {
      try {
         var foodWithOrders = await Foods.aggregate([
            {
               $lookup: {
                  from: 'orders',
                  localField: 'order_id',
                  foreignField: 'id',
                  as: 'orders',
               },
            },
         ]);

         return res.status(200).json({
            success: true,
            data: foodWithOrders,
         });
      } catch (error) {
         return res.status(422).json({
            success: false,
            message: 'Foods not retrieved. Try again later',
         });
      }
   }

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async food_reviews(request, response) {}

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async food_filter(request, response) {}

   /**
    *
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async foodsByCategory(request, response) {
      var categoryID = req.params.categoryID;

      try {
         const foods = await Foods.find({ category_id: categoryID });

         return response.status(200).send({
            success: true,
            data: foods,
            message: 'Foods retrieved successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not process your request. Try again later.',
         });
      }
   }
}
