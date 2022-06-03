//import { checkSchema } from 'express-validator';
import * as yup from 'yup';
import validator from '../Middleware/Validator.js';

export const createFaqValidator = validator(
   yup.object({
      answer: yup.string().required('Answer is required'),
      question: yup.string().required('Question is required'),
   })
);
