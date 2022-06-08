'use strict';

import express from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { FoodsController } from '../App/Controllers/FoodsController.js';

const Route = express.Router();

Route.post(
   '/foods/create',
   authenticate,
   FoodsController.create
)
   .get('/foods', authenticate, FoodsController.index)
   .get('/food_orders', authenticate, FoodsController.foodsWithOrders)
   .get('/foods/:id', authenticate, FoodsController.show)
   .put(
      '/foods/update/:id',
      authenticate,
      FoodsController.update
   )
   .delete(
      '/foods/delete/:id',
      authenticate,
      FoodsController.delete
   );

export default Route;