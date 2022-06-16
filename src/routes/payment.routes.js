'use strict';

import { Router } from 'express';
import { PaymentController } from './../Controllers/PaymentController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = Router();

Route
   /* .post(
      '/payments/parameters',
      authenticate,
      PaymentController.orderParameters
   ) */
   .post('/payments/pix', authenticate, PaymentController.pix)
   .get('/payments', authenticate, PaymentController.index)
   .get('/payments/:id', authenticate, PaymentController.show);

export default Route;
