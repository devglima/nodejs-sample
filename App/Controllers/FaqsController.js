import Faqs from '../Models/Faqs.js';

export class FaqsController {
   static async index(req, res) {
      await Faqs.find((err, faqs) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: faqs,
            message: 'Faqs retrieved successfully',
         });
      });
   }
}
