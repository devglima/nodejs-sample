import Faqs from '../Models/Faqs.js';

export class FaqsController {
   static async index(req, res) {
      try {
         const faqs = await Faqs.find();
         return res.status(200).json({
            success: true,
            data: faqs,
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faqs',
         });
      }
   }

   static async show(req, res) {
      try {
         const { id } = req.params;
         const faqs = await Faqs.findById(id);

         if (!faqs)
            return res.status(404).json({
               success: false,
               message: 'Faq not founded',
            });

         return res.status(200).json({
            success: true,
            data: faqs,
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faq',
         });
      }
   }

   static async create(req, res) {
      try {
         const createdFaq = await Faqs.create(req.body);
         return res.status(200).json({
            success: true,
            data: createdFaq,
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faq',
         });
      }
   }

   static async update(req, res) {
      try {
         const { id } = req.params;
         const createdFaq = await Faqs.findByIdAndUpdate(id, {
            $set: req.body,
         });

         return res.status(200).json({
            success: true,
            data: createdFaq,
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faq',
         });
      }
   }

   static async delete(req, res) {
      try {
         const { id } = req.params;
         await Faqs.findByIdAndDelete(id);

         return res.status(200).json({
            success: true,
            message: 'Faq deleted successfully',
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faq. Try again later.',
         });
      }
   }
}
