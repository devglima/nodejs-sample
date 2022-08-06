import { Router } from 'express';

import { UserController } from './../Controllers/UserController.js';
import { authenticate } from './../Middleware/AuthMiddleware.js';
import validator from './../Middleware/Validator.js';
import { createUserValidator } from './../Validators/UserValidator.js';

const Route = Router();

Route.post(
   '/users/register',
   [authenticate, validator(createUserValidator)],
   UserController.register
)
   .get('/users', authenticate, UserController.index)
   .get('/users/:id', authenticate, UserController.show)
   .put('/users/update/:id', authenticate, UserController.update)
   .delete('/users/delete/:id', authenticate, UserController.delete);

export default Route;
