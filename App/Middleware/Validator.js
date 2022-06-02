import * as yup from 'yup';

const validator = (schema) => async (req, res, next) => {
   try {
      await schema.validate(
         { id: yup.string().optional(), ...req.body },
         { strict: true }
      );
      next();
   } catch (error) {
      return res.status(500).json({ type: error.type, message: error.message });
   }
};

export default validator;
