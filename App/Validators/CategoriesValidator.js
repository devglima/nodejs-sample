//import { checkSchema } from 'express-validator';
import * as yup from 'yup';

export const createCategoryValidator = yup.object({
   name: yup.string().required('Category name is required'),
});
