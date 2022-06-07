import { Router } from 'express';

import { UserController } from '../App/Controllers/UserController.js';
import { authenticate } from '../App/Middleware/AuthMiddleware.js';
import validator from '../App/Middleware/Validator.js';
import { createUserValidator } from '../App/Validators/UserValidator.js';

const Route = Router();

Route.post(
   '/users/register',
   [authenticate, validator(createUserValidator)],
   UserController.register
)
   .get('/users', authenticate, UserController.index)
   .get('/users/:id', authenticate, UserController.show)
   .put('/users/update/:id', authenticate, UserController.update)
   .delete('/users/delete/:id', authenticate, UserController.update);

export default Route;
