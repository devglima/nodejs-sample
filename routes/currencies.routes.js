import { Router } from 'express';
import CurrenciesController from '../App/Controllers/currenciesController.js';

import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/currencies', authenticate, CurrenciesController);

export default Route
