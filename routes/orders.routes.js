'use strict';

import { Router } from 'express';
import {
   getOrders,
   getOrdersStatuses,
} from '../App/Controllers/OrdersController.js';
import verifyJWT from '../utils/verifyJWT.js';

const router = Router();

router
   .get('/orders', verifyJWT, getOrders)
   .get('/order_statuses', verifyJWT, getOrdersStatuses);

export default router;
