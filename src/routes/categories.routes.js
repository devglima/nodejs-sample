'use strict';

import express from 'express';
import { authenticate } from './../Middleware/AuthMiddleware.js';
import { CategoriesController } from './../Controllers/CategoriesController.js';

import { categoryValidator } from './../Validators/CategoriesValidator.js';

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
