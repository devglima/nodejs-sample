'use strict';

import { Router } from 'express';
import { OrdersController } from '../App/Controllers/OrdersController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/orders', authenticate, OrdersController.index)
   .get('/orders/:id', authenticate, OrdersController.show)
   .post('/orders/parameters', authenticate, OrdersController.orderParameters)
   .post('/orders/pix', authenticate, OrdersController.pix);

export default Route;
