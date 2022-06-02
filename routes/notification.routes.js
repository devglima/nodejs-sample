'use strict';

import { Router } from 'express';
import {
   getNotifications,
   getNotificationTypes,
} from '../App/Controllers/NotificationController.js';
import verifyJWT from '../config/jwt.js';

const router = Router();

router
   .get('/notifications', verifyJWT, getNotifications)
   .get('/notification_types', verifyJWT, getNotificationTypes);

export default router;
