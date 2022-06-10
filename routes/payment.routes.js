'use strict';

import { Router } from 'express';
import { PaymentController } from '../App/Controllers/PaymentController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/payments', authenticate, PaymentController.index)
   .post(
      '/payments/parameters',
      authenticate,
      PaymentController.orderParameters
   )
   .post('/payments/pix', authenticate, PaymentController.pix);

export default Route;
