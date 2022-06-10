'use strict';

import express from 'express';
import { NotificationsController } from '../App/Controllers/NotificationController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = express.Router();

Route.get('/notifications', authenticate, NotificationsController.index)
    .post(
        '/notifications/create',
        authenticate,
        NotificationsController.create
    )
    .get('/notifications/:id', authenticate, NotificationsController.show)
    .put(
        '/notifications/update/:id',
        authenticate,
        NotificationsController.update
    )
    .delete(
        '/notifications/delete/:id',
        authenticate,
        NotificationsController.delete
    )
    .get('/notifications_types', authenticate, NotificationsController.getNotificationTypes);

export default Route;