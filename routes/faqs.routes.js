'use strict';

import { Router } from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { FaqsController } from '../App/Controllers/FaqsController.js';

import { createFaqValidator } from '../App/Validators/CreateFaqsValidator.js';

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
