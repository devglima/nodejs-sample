import { find } from '../Models/Faqs.js';

class FaqsController {
   static async getFaqs(req, res) {
      await find((err, faqs) => {
         if (err) return res.status(404).json({ Error: err.message });
         return res.status(200).json({
            success: true,
            data: faqs,
            message: 'Faqs retrieved successfully',
         });
      });
   }
}

export default FaqsController;
