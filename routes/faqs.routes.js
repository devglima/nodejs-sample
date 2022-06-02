'use strict';

import { Router } from 'express';
import { getFaqs } from '../App/Controllers/FaqsController.js';
import verifyJWT from '../config/jwt.js';

const router = Router();

router.get('/faqs', verifyJWT, getFaqs);

export default router;
