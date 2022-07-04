/**
 * This is the main entry point for the application.
 * Basicly all routes are defined here.
 * To add new routes just import the route file here
 */

import express from 'express';

// Import controllers here
import { authenticate } from './../Middleware/AuthMiddleware.js';
import { AuthController } from './../Controllers/AuthController.js';

import { SettingsController } from './../Controllers/SettingsController.js';
import { PasswordController } from '../Controllers/PasswordController.js';

//Import routes files here

import profileRoute from './profile.routes.js';
import categoryRoute from './categories.routes.js';
import userRoute from './users.routes.js';
import faqsRoute from './faqs.routes.js';
import faqsCategoriesRoute from './faqs.categories.routes.js';
import ordersRoute from './orders.routes.js';
import foodsRoute from './foods.routes.js';
import favoritesRoute from './favorites.routes.js';
import currenciesRoute from './currencies.routes.js';
import notificationRoute from './notification.routes.js';
import orderStatusesRoute from './order.statuses.routes.js';
import cartRoute from './cart.routes.js';
import paymentRoutes from './payment.routes.js';
//import paymentRoutes from './payment.routes.js';

const Route = express.Router();
Route.get('/', (req, res) => {
   res.send('Server is up');
});

//Auth routes
Route.post('/login', AuthController.login)
   .post('/register', AuthController.register)
   .post('/logout', AuthController.logout);

//Password reset
Route.post('/password/forgot', PasswordController.forgot).post(
   '/password/reset',
   PasswordController.reset
);

//Settings app routes
Route.get('/settings', authenticate, SettingsController.index)
   .put('/settings/update', authenticate, SettingsController.update)
   .get('/settings/:key', authenticate, SettingsController.show);

//Call others routes here
Route.use(
   userRoute,
   categoryRoute,
   profileRoute,
   faqsRoute,
   ordersRoute,
   foodsRoute,
   favoritesRoute,
   currenciesRoute,
   cartRoute,
   paymentRoutes,
   notificationRoute,
   orderStatusesRoute,
   faqsCategoriesRoute
);

export default Route;
