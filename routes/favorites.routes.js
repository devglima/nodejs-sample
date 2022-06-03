'use strict';

import { Router } from 'express';
import { FavoritesController } from '../App/Controllers/FavoritesController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/favorites', authenticate, FavoritesController.index);

export default Route;
