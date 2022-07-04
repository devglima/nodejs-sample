import Settings from '../Models/Settings.js';

export class SettingsController {
   constructor() {}

   static async index(request, response) {
      try {
         return response.send({
            success: true,
            data: await Settings.find(),
         });
      } catch (error) {
         return response.status(500).send({
            error,
            success: false,
            message: 'Could not possible process your request',
         });
      }
   }

   static async show(request, response) {
      try {
         const { key } = request.params;
         const setting = await Settings.findOne({ key });

         return response.send({
            success: true,
            data: setting,
         });
      } catch (error) {
         return response.status(500).send({
            error: error.message,
            success: false,
            message: 'Could not possible process your request',
         });
      }
   }

   static async update(request, response) {
      const { key, values: value } = request.body;

      try {
         await Settings.updateOne({ key }, { value: value }, { upsert: true });

         return response.status(200).send({
            success: true,
            message: 'Settings updated successfully',
         });
      } catch (error) {
         return response.status(500).send({
            error,
            success: false,
            message: 'Could not possible process your request',
         });
      }
   }
}
