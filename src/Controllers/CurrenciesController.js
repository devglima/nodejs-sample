import Currencies from '../Models/Currencies.js';
//import Orders from '../Models/Orders.js';

export class CurrenciesController {
   /**
    * Show all Currencies
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async index(request, response) {
      try {
         /* const paginateOptions = {
            // page: parseInt(request.query.page ?? 1),
            //limit: parseInt(request.query.limit ?? 20),
            customLabels: {
               docs: 'data',
               limit: 'limit',
               totalDocs: 'total',
            },
         }; */

         const currencies = await Currencies.find({});

         return response.status(200).send({
            data: currencies,
            success: true,
            message: 'Currencies retrieved successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Currencies not retrieved',
         });
      }
   }

   /**
    * Show single Currencie
    * @param {*} request
    * @param {*} response
    * @returns
    */

   static async show(request, response) {
      try {
         const { id } = request.params;
         const currencies = await Currencies.findById(id);

         if (!currencies)
            return response.status(404).json({
               success: false,
               message: 'Currencie not found',
            });

         return response.json({
            success: true,
            data: currencies,
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
    * Create Currencie
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async create(request, response) {
      try {
         await Currencies.create(request.body);

         return response.status(200).json({
            success: true,
            message: 'Currencie created successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Can not create Currencie. Try again later',
         });
      }
   }

   /**
    * Update Currencie
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async update(request, response) {
      try {
         const { id } = request.params;
         const update = await Currencies.findByIdAndUpdate(id, request.body);

         return response.status(200).json({
            success: true,
            data: update,
            message: 'Currencie update successfully',
         });
      } catch (error) {
         return response.status(500).json({
            error: error.message,
            success: false,
            message: 'Currencies retrieved successfully',
         });
      }
   }

   /**
    * Delete Currencie
    * @param {*} request
    * @param {*} response
    * @returns
    */
   static async delete(req, res) {
      try {
         const { id } = req.params;
         await Currencies.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'Currencie deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve Currencie. Try again later.',
         });
      }
   }
}
