'use strict';

import { Router } from 'express';
import { OrdersController } from '../App/Controllers/OrdersController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/orders', authenticate, OrdersController.index) /* .get(
   '/order_statuses',
   authenticate,
   OrdersController
) */;

export default Route;
