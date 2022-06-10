'use strict';

import express from 'express';
import { CurrenciesController }  from '../App/Controllers/CurrenciesController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = express.Router();

Route.get('/currencies', authenticate, CurrenciesController.index)
    .post(
        '/currencies/create',
        authenticate,
        CurrenciesController.create
    )
    .get('/currencies/:id', authenticate, CurrenciesController.show)
    .put(
        '/currencies/update/:id',
        authenticate,
        CurrenciesController.update
    )
    .delete(
        '/currencies/delete/:id',
        authenticate,
        CurrenciesController.delete
    );

export default Route;
