const validator = (schema) => async (req, res, next) => {
   try {
      await schema.validate(req.body, { strict: true });
      next();
   } catch (error) {
      return res.status(500).json({ type: error.type, message: error.message });
   }
};

export default validator;