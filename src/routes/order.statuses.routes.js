'use strict';

import express from 'express';
import { OrderStatusesController } from './../Controllers/OrderStatusesController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = express.Router();

Route.get('/order_statuses', authenticate, OrderStatusesController.index)
   .post('/order_statuses/create', authenticate, OrderStatusesController.create)
   .get('/order_statuses/:id', authenticate, OrderStatusesController.show)
   .put(
      '/order_statuses/update/:id',
      authenticate,
      OrderStatusesController.update
   )
   .delete(
      '/order_statuses/delete/:id',
      authenticate,
      OrderStatusesController.delete
   );

export default Route;
