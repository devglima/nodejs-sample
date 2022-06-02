'use strict';

import { Router } from 'express';
import { getFavorites } from '../App/Controllers/FavoritesController.js';
import verifyJWT from '../config/jwt.js';

const router = Router();

router.get('/favorites', verifyJWT, getFavorites);

export default router;
