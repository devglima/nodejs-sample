'use strict';

import { Router } from 'express';
import { CustomCardController } from './../Controllers/CustomCardController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';

const Route = Router();

Route.get('/custom_cards', authenticate, CustomCardController.index);

export default Route;
