'use strict';

import { Router } from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { CartController } from '../App/Controllers/CartController.js';

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
   .delete('/carts/delete/:id', authenticate, CartController.delete);

export default Route;
