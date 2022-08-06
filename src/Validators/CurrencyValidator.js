import * as yup from 'yup';
import validators from '../Services/ValidatorService.js';
import Currencies from '../Models/Currencies.js';

validators(yup);

export const currencyValidator = async (req, res, next) => {
   const schema = yup.object({
      name: yup
         .string('Currency must be a string')
         .required('Currency name is required')
         .unique({
            table: Currencies,
            column: 'name',
            where: req.params.id
               ? {
                    _id: { $ne: req.params.id },
                 }
               : null,
            message: 'Currency already exists',
         }),
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
