'use strict';

import { Router } from 'express';
import { getRestaurants } from '../App/Controllers/RestaurantsController.js';
import verifyJWT from '../utils/verifyJWT.js';

const router = Router();

router.get('/restaurants', verifyJWT, getRestaurants);

export default router;
