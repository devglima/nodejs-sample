/**
 *
 * @param {*} schema
 * @returns
 * @description
 * This function is used to validate the schema.
 */
const validator = (schema) => async (req, res, next) => {
   try {
      await schema.validate(req.body, { strict: true });
      next();
   } catch (error) {
      return res.status(422).json({ type: error.type, message: error.message });
   }
};

export default validator;
