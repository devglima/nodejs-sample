//import { checkSchema } from 'express-validator';
import * as yup from 'yup';
import User from '../Models/user.js';
import validatores from '../Services/ValidatorService.js';

validatores(yup);

export const createUserValidator = yup.object({
   name: yup.string().required('Category name is required'),
   email: yup
      .string()
      .unique(User, 'email', 'Email already used')
      .required('Category name is required'),
});

export const updateUserValidator = yup.object({
   name: yup.string().required('Category name is required'),
   email: yup
      .string()
      .unique(User, 'email', 'Email already used')
      .required('Category name is required'),
});
