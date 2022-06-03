'use strict';

import { Router } from 'express';
import { RestaurantsController } from '../App/Controllers/RestaurantsController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/restaurants', authenticate, RestaurantsController.index);

export default Route;
