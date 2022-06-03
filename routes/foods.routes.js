'use strict';

import { Router } from 'express';
import { FoodsController } from '../App/Controllers/OrdersController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/foods', authenticate, FoodsController.index).get(
   '/food_orders',
   authenticate,
   FoodsController.withOrders
);

export default Route;
