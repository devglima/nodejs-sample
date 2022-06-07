import Currencies from '../Models/Currencies.js';

class CurrenciesController {
   static async index(req, res) {
      await Currencies.find((err, currencies) => {
         if (err)
            return res.status(404).json({
               success: false,
               message: 'Currencies retrieved successfully',
            });

         return res.status(200).json({
            success: true,
            data: currencies,
            message: 'Currencies retrieved successfully',
         });
      });
   }
}

export default CurrenciesController;
