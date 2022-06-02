/**
 * This is the main entry point for the application.
 * Basicly all routes are defined here.
 * To add new routes just import the route file here
 */

import express from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

// Import controllers here
import { AuthController } from '../App/Controllers/AuthController.js';
import { ProfileController } from '../App/Controllers/ProfileController.js';
import { SettingsController } from '../App/Controllers/SettingsController.js';

//Import routes files here
import categoryRoute from './categories.routes.js';

const Route = express.Router();
Route.get('/', (req, res) => {
   res.send('Server is up');
});

//Auth routes
Route.post('/login', AuthController.login)
   .post('/register', AuthController.register)
   .post('/logout', AuthController.logout);

//Settings app routes
Route.get('/settings', authenticate, SettingsController.index).put(
   '/settings/update',
   authenticate,
   SettingsController.update
);

//Profiles routes
Route.get('/profile', authenticate, ProfileController.show)
   .put('/profile/update', authenticate, ProfileController.update)
   .put(
      '/profile/update-password',
      authenticate,
      ProfileController.updatePassword
   );

//Call others routes here
Route.use(categoryRoute);

export default Route;
