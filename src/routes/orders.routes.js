'use strict';

import { Router } from 'express';
import { OrdersController } from './../Controllers/OrdersController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = Router();

Route.post('/orders/create', authenticate, OrdersController.store)
   .get('/orders', authenticate, OrdersController.index)
   .get('/orders/:id', authenticate, OrdersController.show)
   .post('/orders/parameters', authenticate, OrdersController.orderParameters)
   .post('/orders/pix', authenticate, OrdersController.pix);

export default Route;
