import { Router } from 'express';

import { ProfileController } from '../App/Controllers/ProfileController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/profile', authenticate, ProfileController.show)
   .put('/profile/update', authenticate, ProfileController.update)
   .put(
      '/profile/update-password',
      authenticate,
      ProfileController.updatePassword
   )
   .put(
      '/profile/setDeviceChosenLanguage',
      authenticate,
      ProfileController.setDeviceChosenLanguage
   );

export default Route;
