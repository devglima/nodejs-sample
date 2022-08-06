'use strict';

import express from 'express';
import { currencyValidator } from '../Validators/CurrencyValidator.js';
import { CurrenciesController } from './../Controllers/CurrenciesController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = express.Router();

Route.get('/currencies', authenticate, CurrenciesController.index)
   .post(
      '/currencies/create',
      [authenticate, currencyValidator],
      CurrenciesController.create
   )
   .get('/currencies/:id', authenticate, CurrenciesController.show)
   .put(
      '/currencies/update/:id',
      [authenticate, currencyValidator],
      CurrenciesController.update
   )
   .delete('/currencies/delete/:id', authenticate, CurrenciesController.delete);

export default Route;
