'use strict';

import express from 'express';
import { FavoritesController } from './../Controllers/FavoritesController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = express.Router();

Route.get('/favorites', authenticate, FavoritesController.index)
   .post('/favorites/create', authenticate, FavoritesController.create)
   .get('/favorites/:id', authenticate, FavoritesController.show)
   .put('/favorites/update/:id', authenticate, FavoritesController.update)
   .delete('/favorites/delete/:id', authenticate, FavoritesController.delete);

export default Route;
