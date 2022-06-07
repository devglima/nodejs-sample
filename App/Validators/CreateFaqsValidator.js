//import { checkSchema } from 'express-validator';
import * as yup from 'yup';
import validator from '../Middleware/Validator.js';
import validators from '../Services/ValidatorService.js';

validators(yup);

export const createFaqValidator = validator(
   yup.object({
      answer: yup.string().required('Answer is required'),
      question: yup.string().required('Question is required'),
   })
);
