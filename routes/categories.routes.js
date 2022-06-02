'use strict';

import express from 'express';
import validator from '../App/Middleware/Validator.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { CategoriesController } from '../App/Controllers/CategoriesController.js';

import { createCategoryValidator } from '../App/Validators/CategoriesValidator.js';
//import { validationResult } from 'express-validator';

const Route = express.Router();

Route.post('/categories', [validator(createCategoryValidator)])
   //.get('/faq_categories', authenticate, CategoriesController.)
   //.get('/foods', authenticate, getFoods)
   .get('/categories/:id', authenticate, CategoriesController.show);

export default Route;
