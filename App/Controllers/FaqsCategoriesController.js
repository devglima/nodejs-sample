import FaqsCategories from '../Models/FaqCategories.js';

export class FaqsCategoriesController {
   static async index(req, res) {
      try {
         const faqsCategories = await FaqsCategories.find();
         return res.status(200).json({
            success: true,
            data: faqsCategories,
         });
      } catch (error) {
         return res.status(500).json({
            success: false,
            message: 'Could not retrieve faqsCategories',
         });
      }
   }

   static async show(req, res) {
      try {
         const { id } = req.params;
         const faqsCategories = await FaqsCategories.findById(id);

         if (!faqsCategories)
            return res.status(404).json({
               success: false,
               message: 'Faq not founded',
            });

         return res.status(200).json({
            success: true,
            data: faqsCategories,
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
         const createdFaq = await FaqsCategories.create(req.body);
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
         const createdFaq = await FaqsCategories.findByIdAndUpdate(id, {
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
         await FaqsCategories.findByIdAndDelete(id);

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
