import { Router } from 'express';

import { ProfileController } from '../App/Controllers/UserController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/users', authenticate, ProfileController.show)
   .put('/users/update', authenticate, ProfileController.update)
   .put(
      '/users/update-password',
      authenticate,
      ProfileController.updatePassword
   )
   .put(
      '/users/setDeviceChosenLanguage',
      authenticate,
      ProfileController.setDeviceChosenLanguage
   );

export default Route;
