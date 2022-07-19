import * as yup from 'yup';
import validators from '../Services/ValidatorService.js';
import Categories from '../Models/Categories.js';

validators(yup);

export const categoryValidator = async (req, res, next) => {
   const schema = yup.object({
      name: yup
         .string('Category must be a string')
         .unique({
            table: Categories,
            column: 'name',
            where: req.params.id
               ? {
                    _id: { $ne: req.params.id },
                 }
               : null,
            message: 'Category already exists',
         })
         .required('Category name is required'),
   });

   try {
      await schema.validate(req.body, { strict: true });
      next();
   } catch (error) {
      return res
         .status(422)
         .json({ success: false, type: error.type, message: error.message });
   }
};
