'use strict';

import express from 'express';
import validator from '../App/Middleware/Validator.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { CategoriesController } from '../App/Controllers/CategoriesController.js';

import { createCategoryValidator } from '../App/Validators/CategoriesValidator.js';

const Route = express.Router();

Route.get('/categories', authenticate, CategoriesController.show)
   .get('/show/:id', authenticate, CategoriesController.show)
   .post(
      '/categories/create',
      [authenticate, validator(createCategoryValidator)],
      CategoriesController.create
   )
   .post(
      '/categories/update',
      [authenticate, validator(createCategoryValidator)],
      CategoriesController.update
   );

export default Route;
