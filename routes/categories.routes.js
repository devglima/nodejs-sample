'use strict';

import express from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { CategoriesController } from '../App/Controllers/CategoriesController.js';

import { categoryValidator } from '../App/Validators/CategoriesValidator.js';

const Route = express.Router();

Route.post(
   '/categories/create',
   [authenticate, categoryValidator],
   CategoriesController.create
)
   .get('/categories', authenticate, CategoriesController.index)
   .get('/categories/:id', authenticate, CategoriesController.show)
   .put(
      '/categories/update/:id',
      [authenticate, categoryValidator],
      CategoriesController.update
   )
   .delete(
      '/categories/delete/:id',
      [authenticate],
      CategoriesController.delete
   );

export default Route;
