'use strict';

import { Router } from 'express';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import { FaqsController } from '../App/Controllers/FaqsController.js';

const Route = Router();

Route.get('/faqs', authenticate, FaqsController.index);

export default Route;
