'use strict';

import { Router } from 'express';
import { authenticate } from './../Middleware/AuthMiddleware.js';
import { CartController } from './../Controllers/CartController.js';

const Route = Router();

Route.get('/carts', authenticate, CartController.index)
   .get('/carts/count', authenticate, CartController.count)
   .post(
      '/carts/payment-condition-price',
      authenticate,
      CartController.paymentConditionPrice
   )
   .post('/carts/create', authenticate, CartController.add)
   .put('/carts/update', authenticate, CartController.add)
   .get('/carts/:id', authenticate, CartController.show)
   .delete('/carts/delete/:id', authenticate, CartController.delete);

export default Route;
