'use strict';

import { Router } from 'express';
import { RestaurantsController } from './../Controllers/RestaurantsController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/restaurants', authenticate, RestaurantsController.index);

export default Route;
