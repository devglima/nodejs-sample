'use strict';

import { Router } from 'express';
import { authenticate } from './../Middleware/AuthMiddleware.js';
import { FaqsController } from './../Controllers/FaqsController.js';

import { createFaqValidator } from './../Validators/CreateFaqsValidator.js';

const Route = Router();

Route.get('/faqs', authenticate, FaqsController.index)
   .get('/faqs/show/:id', authenticate, FaqsController.show)
   .delete('/faqs/delete/:id', authenticate, FaqsController.delete)
   .post(
      '/faqs/create',
      [authenticate, createFaqValidator],
      FaqsController.create
   )
   .put(
      '/faqs/update/:id',
      [authenticate, createFaqValidator],
      FaqsController.update
   );

export default Route;
