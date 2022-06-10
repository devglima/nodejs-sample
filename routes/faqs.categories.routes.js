'use strict';

import express from 'express';
import { FaqsCategoriesController } from '../App/Controllers/FaqsCategoriesController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';

const Route = express.Router();

Route.get('/faq_categories', authenticate, FaqsCategoriesController.index)
    .post(
        '/faq_categories/create',
        authenticate,
        FaqsCategoriesController.create
    )
    .get('/faq_categories/:id', authenticate, FaqsCategoriesController.show)
    .put(
        '/faq_categories/update/:id',
        authenticate,
        FaqsCategoriesController.update
    )
    .delete(
        '/faq_categories/delete/:id',
        authenticate,
        FaqsCategoriesController.delete
    );

export default Route;
