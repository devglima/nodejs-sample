'use strict';

import express from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { CartController } from '../App/Controllers/CartController.js';

const Route = express.Router();

Route.get('/carts', authenticate, CartController.index);

export default Route;
