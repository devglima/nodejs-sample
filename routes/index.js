/**
 * This is the main entry point for the application.
 * Basicly all routes are defined here.
 * To add new routes just import the route file here
 */

import express from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

// Import controllers here
import { AuthController } from '../App/Controllers/AuthController.js';

import { SettingsController } from '../App/Controllers/SettingsController.js';

//Import routes files here
import categoryRoute from './categories.routes.js';
import userRoute from './user.routes.js';
import faqsRoute from './faqs.routes.js';
import ordersRoute from './orders.routes.js';
import foodsRoute from './foods.routes.js';
import favoritesRoute from './favorites.routes.js';
import restaurantsRoute from './restaurants.routes.js';
import currencieRoute from './currencie.routes.js';

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

//Call others routes here
Route.use(
   categoryRoute,
   userRoute,
   faqsRoute,
   ordersRoute,
   foodsRoute,
   favoritesRoute,
   restaurantsRoute,
   currencieRoute
);

export default Route;
