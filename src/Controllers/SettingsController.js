import Settings from '../Models/Settings.js';

export class SettingsController {
   constructor() {}

   static async index(request, response) {
      return response.send({
         success: true,
         data: await Settings.find(),
      });
   }

   static async update(request, response) {
      try {
         await Settings.updateOne(request.body);

         return response.status(422).send({
            success: true,
            data: 'Settings updated successfully',
         });
      } catch (error) {
         return response.status(422).send({
            error,
            success: false,
            message: 'Could not possible process your request',
         });
      }
   }
}
